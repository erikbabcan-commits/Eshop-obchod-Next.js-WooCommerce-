import { describe, it, expect } from './testUtils';
import {
  sanitizeHtml,
  sanitizeInput,
  sanitizeUrl,
  validatePassword,
  validateEmail,
  checkRateLimit,
  resetRateLimit,
  generateCSRFToken,
  validateCSRFToken,
  isSessionExpired,
  isSessionIdle,
  maskSensitiveData,
  maskEmail,
  isAdminUser,
  hasAdminAccess } from
'../services/security';

// ── XSS Prevention ────────────────────────────────────────

describe('Security — XSS Prevention (sanitizeHtml)', () => {
  it('should strip script tags', () => {
    const input = 'Hello <script>alert("xss")</script> World';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert');
    expect(result).toContain('Hello');
    expect(result).toContain('World');
  });

  it('should strip all HTML tags', () => {
    const input = '<div><p>Text</p><img src="x" onerror="alert(1)"></div>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).toContain('Text');
  });

  it('should strip event handlers', () => {
    const input = '<img src="x" onerror="alert(1)">';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('onerror');
    expect(result).not.toContain('alert');
  });

  it('should strip javascript: protocol', () => {
    const input = 'javascript:alert(1)';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('javascript:');
  });

  it('should strip data: protocol', () => {
    const input = 'data:text/html,<script>alert(1)</script>';
    const result = sanitizeHtml(input);
    expect(result).not.toContain('data:');
  });

  it('should handle empty input', () => {
    expect(sanitizeHtml('')).toBe('');
  });

  it('should preserve clean text', () => {
    const input = 'This is clean text with numbers 123 and symbols @#$';
    expect(sanitizeHtml(input)).toBe(input);
  });
});

describe('Security — Input Sanitization (sanitizeInput)', () => {
  it('should encode HTML entities', () => {
    const input = '<script>alert("xss")</script>';
    const result = sanitizeInput(input);
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('"');
  });

  it('should handle ampersands', () => {
    const result = sanitizeInput('Tom & Jerry');
    expect(result).toContain('&amp;');
  });

  it('should handle single quotes', () => {
    const result = sanitizeInput("it's a test");
    expect(result).toContain('&#x27;');
  });
});

describe('Security — URL Sanitization', () => {
  it('should block javascript: URLs', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('');
  });

  it('should block data: URLs', () => {
    expect(sanitizeUrl('data:text/html,<h1>hi</h1>')).toBe('');
  });

  it('should allow https URLs', () => {
    const url = 'https://example.com/path?q=test';
    expect(sanitizeUrl(url)).toBe(url);
  });

  it('should allow http URLs', () => {
    const url = 'http://localhost:3000';
    expect(sanitizeUrl(url)).toBe(url);
  });

  it('should handle empty input', () => {
    expect(sanitizeUrl('')).toBe('');
  });
});

// ── Password Validation ───────────────────────────────────

describe('Security — Password Validation', () => {
  it('should reject short passwords', () => {
    const result = validatePassword('Ab1!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Minimo 8 caratteri');
  });

  it('should reject passwords without uppercase', () => {
    const result = validatePassword('abcdefg1!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Almeno una lettera maiuscola');
  });

  it('should reject passwords without numbers', () => {
    const result = validatePassword('Abcdefgh!');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Almeno un numero');
  });

  it('should reject passwords without special characters', () => {
    const result = validatePassword('Abcdefg1');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Almeno un carattere speciale (!@#$%...)');
  });

  it('should accept strong passwords', () => {
    const result = validatePassword('MyStr0ng!Pass');
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.score).toBeGreaterThanOrEqual(3);
  });

  it('should reject common passwords', () => {
    const result = validatePassword('password');
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Password troppo comune');
  });

  it('should give higher score for longer passwords', () => {
    const short = validatePassword('Ab1!efgh');
    const long = validatePassword('Ab1!efghijklmnop');
    expect(long.score).toBeGreaterThanOrEqual(short.score);
  });
});

// ── Email Validation ──────────────────────────────────────

describe('Security — Email Validation', () => {
  it('should accept valid emails', () => {
    const validEmails = [
    'user@example.com',
    'user.name@domain.it',
    'user+tag@example.org',
    'user123@sub.domain.com'];

    validEmails.forEach((email) => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(true);
    });
  });

  it('should reject empty email', () => {
    const result = validateEmail('');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Email obbligatoria');
  });

  it('should reject emails without @', () => {
    const result = validateEmail('notanemail');
    expect(result.isValid).toBe(false);
  });

  it('should reject emails without domain', () => {
    const result = validateEmail('user@');
    expect(result.isValid).toBe(false);
  });

  it('should reject emails without TLD', () => {
    const result = validateEmail('user@domain');
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Dominio email non valido');
  });

  it('should reject emails with short TLD', () => {
    const result = validateEmail('user@domain.x');
    expect(result.isValid).toBe(false);
  });
});

// ── Rate Limiter ──────────────────────────────────────────

describe('Security — Rate Limiter', () => {
  it('should allow requests within limit', () => {
    resetRateLimit('test-rate-1');
    const config = { maxRequests: 3, windowMs: 60000, blockDurationMs: 60000 };

    const r1 = checkRateLimit('test-rate-1', config);
    expect(r1.allowed).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = checkRateLimit('test-rate-1', config);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(1);
  });

  it('should block after exceeding limit', () => {
    resetRateLimit('test-rate-2');
    const config = { maxRequests: 2, windowMs: 60000, blockDurationMs: 60000 };

    checkRateLimit('test-rate-2', config); // 1
    checkRateLimit('test-rate-2', config); // 2
    const r3 = checkRateLimit('test-rate-2', config); // 3 — blocked

    expect(r3.allowed).toBe(false);
    expect(r3.remaining).toBe(0);
    expect(r3.retryAfterMs).toBeGreaterThan(0);
  });

  it('should track different keys independently', () => {
    resetRateLimit('test-rate-a');
    resetRateLimit('test-rate-b');
    const config = { maxRequests: 1, windowMs: 60000, blockDurationMs: 60000 };

    checkRateLimit('test-rate-a', config); // 1 for A
    const rA = checkRateLimit('test-rate-a', config); // blocked for A
    const rB = checkRateLimit('test-rate-b', config); // 1 for B — should be allowed

    expect(rA.allowed).toBe(false);
    expect(rB.allowed).toBe(true);
  });
});

// ── CSRF Token ────────────────────────────────────────────

describe('Security — CSRF Token', () => {
  it('should generate valid token', () => {
    const token = generateCSRFToken();
    expect(token).toBeTruthy();
    expect(token.length).toBe(64); // 32 bytes = 64 hex chars
  });

  it('should validate correct token', () => {
    const token = generateCSRFToken();
    expect(validateCSRFToken(token)).toBe(true);
  });

  it('should reject incorrect token', () => {
    generateCSRFToken();
    expect(validateCSRFToken('wrong-token')).toBe(false);
  });

  it('should reject empty token', () => {
    generateCSRFToken();
    expect(validateCSRFToken('')).toBe(false);
  });
});

// ── Session Management ────────────────────────────────────

describe('Security — Session Management', () => {
  it('should detect expired session (>24h)', () => {
    const loginTime = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago
    expect(isSessionExpired(loginTime)).toBe(true);
  });

  it('should accept valid session (<24h)', () => {
    const loginTime = Date.now() - 1 * 60 * 60 * 1000; // 1 hour ago
    expect(isSessionExpired(loginTime)).toBe(false);
  });

  it('should detect idle session (>30min)', () => {
    const lastActivity = Date.now() - 31 * 60 * 1000; // 31 minutes ago
    expect(isSessionIdle(lastActivity)).toBe(true);
  });

  it('should accept active session (<30min)', () => {
    const lastActivity = Date.now() - 5 * 60 * 1000; // 5 minutes ago
    expect(isSessionIdle(lastActivity)).toBe(false);
  });
});

// ── Data Masking ──────────────────────────────────────────

describe('Security — Data Masking', () => {
  it('should mask middle of string', () => {
    const result = maskSensitiveData('sk_live_1234567890abcdef');
    expect(result.startsWith('sk_l')).toBe(true);
    expect(result.endsWith('cdef')).toBe(true);
    expect(result).toContain('•');
  });

  it('should fully mask short strings', () => {
    const result = maskSensitiveData('abc');
    expect(result).toBe('•••');
  });

  it('should handle empty input', () => {
    expect(maskSensitiveData('')).toBe('');
  });

  it('should mask email correctly', () => {
    const result = maskEmail('mario.rossi@example.it');
    expect(result).toContain('@example.it');
    expect(result).not.toContain('mario.rossi');
    expect(result).toContain('•');
  });

  it('should handle short email local part', () => {
    const result = maskEmail('ab@example.com');
    expect(result).toBe('ab@example.com');
  });
});

// ── Auth Guards ───────────────────────────────────────────
// Tests now use the User object-based API (no hardcoded emails).

describe('Security — Auth Guards', () => {
  it('should identify admin by isAdmin flag', () => {
    const adminUser = {
      id: '1',
      email: 'any@example.com',
      firstName: 'A',
      lastName: 'B',
      isAdmin: true
    };
    expect(isAdminUser(adminUser)).toBe(true);
  });

  it('should identify admin by roles array', () => {
    const adminUser = {
      id: '1',
      email: 'any@example.com',
      firstName: 'A',
      lastName: 'B',
      roles: ['admin']
    };
    expect(isAdminUser(adminUser)).toBe(true);
  });

  it('should reject non-admin user', () => {
    const regularUser = {
      id: '1',
      email: 'user@example.com',
      firstName: 'A',
      lastName: 'B',
      roles: ['customer']
    };
    expect(isAdminUser(regularUser)).toBe(false);
  });

  it('should reject user without roles or isAdmin', () => {
    const basicUser = {
      id: '1',
      email: 'user@example.com',
      firstName: 'A',
      lastName: 'B'
    };
    expect(isAdminUser(basicUser)).toBe(false);
  });

  it('should handle null/undefined user', () => {
    expect(isAdminUser(null)).toBe(false);
    expect(isAdminUser(undefined)).toBe(false);
  });

  it('should grant admin access via hasAdminAccess', () => {
    const adminUser = {
      id: '1',
      email: 'any@example.com',
      firstName: 'A',
      lastName: 'B',
      isAdmin: true
    };
    expect(hasAdminAccess(adminUser)).toBe(true);
  });

  it('should deny access for regular users via hasAdminAccess', () => {
    const regularUser = {
      id: '1',
      email: 'user@example.com',
      firstName: 'A',
      lastName: 'B',
      roles: ['customer']
    };
    expect(hasAdminAccess(regularUser)).toBe(false);
  });
});