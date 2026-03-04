// ── Security Utilities ────────────────────────────────────
// Input sanitization, validation, rate limiting, auth guards
//
// IMPORTANT: These are CLIENT-SIDE helpers only.
// Real authorization is enforced by the server on every request.
// UI guards exist for UX (hiding elements), not for security.

import type { User } from '../types';

// ── XSS / Input Sanitization ──────────────────────────────

const HTML_TAG_REGEX = /<[^>]*>/g;
const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const EVENT_HANDLER_REGEX = /\bon\w+\s*=\s*["'][^"']*["']/gi;
const DANGEROUS_PROTOCOLS = /javascript:|data:|vbscript:/gi;

export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return input.
  replace(SCRIPT_REGEX, '').
  replace(EVENT_HANDLER_REGEX, '').
  replace(HTML_TAG_REGEX, '').
  replace(DANGEROUS_PROTOCOLS, '').
  trim();
}

export function sanitizeInput(input: string): string {
  if (!input) return '';
  return sanitizeHtml(input).replace(/[<>"'&]/g, (char) => {
    const entities: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '&': '&amp;'
    };
    return entities[char] || char;
  });
}

export function sanitizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (DANGEROUS_PROTOCOLS.test(trimmed)) return '';
  return trimmed;
}

// ── Password Validation ───────────────────────────────────

export interface PasswordStrength {
  score: number; // 0-5
  label: string;
  errors: string[];
  isValid: boolean; // score >= 3
}

export function validatePassword(password: string): PasswordStrength {
  const errors: string[] = [];
  let score = 0;

  if (password.length >= 8) score++;else
  errors.push('Minimo 8 caratteri');

  if (password.length >= 12) score++;

  if (/[A-Z]/.test(password)) score++;else
  errors.push('Almeno una lettera maiuscola');

  if (/[a-z]/.test(password)) {

    // no score bump, but required
  } else {errors.push('Almeno una lettera minuscola');
  }

  if (/\d/.test(password)) score++;else
  errors.push('Almeno un numero');

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;else
  errors.push('Almeno un carattere speciale (!@#$%...)');

  // Common password check
  const commonPasswords = [
  'password',
  '12345678',
  'qwerty123',
  'admin123',
  'letmein',
  'welcome1'];

  if (commonPasswords.includes(password.toLowerCase())) {
    score = 0;
    errors.push('Password troppo comune');
  }

  const labels = [
  'Molto debole',
  'Debole',
  'Discreta',
  'Buona',
  'Forte',
  'Molto forte'];


  return {
    score,
    label: labels[Math.min(score, 5)],
    errors,
    isValid: score >= 3 && errors.length === 0
  };
}

// ── Email Validation ──────────────────────────────────────

export function validateEmail(email: string): {
  isValid: boolean;
  error?: string;
} {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email obbligatoria' };
  }

  const trimmed = email.trim().toLowerCase();

  const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Formato email non valido' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2)
  return { isValid: false, error: 'Formato email non valido' };

  const domain = parts[1];
  if (!domain.includes('.')) {
    return { isValid: false, error: 'Dominio email non valido' };
  }

  const tld = domain.split('.').pop() || '';
  if (tld.length < 2) {
    return { isValid: false, error: 'TLD email non valido' };
  }

  return { isValid: true };
}

// ── Rate Limiter ──────────────────────────────────────────

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  blocked: boolean;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs: number;
}

const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 10,
  windowMs: 60_000,
  blockDurationMs: 300_000
};

export function checkRateLimit(
key: string,
config: RateLimitConfig = DEFAULT_RATE_LIMIT)
: {allowed: boolean;remaining: number;retryAfterMs?: number;} {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry) {
    rateLimitStore.set(key, { count: 1, firstRequest: now, blocked: false });
    return { allowed: true, remaining: config.maxRequests - 1 };
  }

  if (entry.blocked) {
    const blockEnd = entry.firstRequest + config.blockDurationMs;
    if (now < blockEnd) {
      return { allowed: false, remaining: 0, retryAfterMs: blockEnd - now };
    }
    rateLimitStore.set(key, { count: 1, firstRequest: now, blocked: false });
    return { allowed: true, remaining: config.maxRequests - 1 };
  }

  if (now - entry.firstRequest > config.windowMs) {
    rateLimitStore.set(key, { count: 1, firstRequest: now, blocked: false });
    return { allowed: true, remaining: config.maxRequests - 1 };
  }

  entry.count++;
  if (entry.count > config.maxRequests) {
    entry.blocked = true;
    entry.firstRequest = now;
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: config.blockDurationMs
    };
  }

  return { allowed: true, remaining: config.maxRequests - entry.count };
}

export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

// ── CSRF Token ────────────────────────────────────────────

let csrfToken: string | null = null;

export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  csrfToken = Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
  return csrfToken;
}

export function validateCSRFToken(token: string): boolean {
  if (!csrfToken || !token) return false;
  if (token.length !== csrfToken.length) return false;
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ csrfToken.charCodeAt(i);
  }
  return result === 0;
}

// ── Session Management ────────────────────────────────────

const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours
const SESSION_IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export function isSessionExpired(loginTimestamp: number): boolean {
  const now = Date.now();
  return now - loginTimestamp > SESSION_MAX_AGE_MS;
}

export function isSessionIdle(lastActivityTimestamp: number): boolean {
  const now = Date.now();
  return now - lastActivityTimestamp > SESSION_IDLE_TIMEOUT_MS;
}

export function getSessionInfo(
loginTimestamp: number,
lastActivity: number)
: {
  isExpired: boolean;
  isIdle: boolean;
  remainingMs: number;
  idleRemainingMs: number;
} {
  const now = Date.now();
  return {
    isExpired: isSessionExpired(loginTimestamp),
    isIdle: isSessionIdle(lastActivity),
    remainingMs: Math.max(0, SESSION_MAX_AGE_MS - (now - loginTimestamp)),
    idleRemainingMs: Math.max(
      0,
      SESSION_IDLE_TIMEOUT_MS - (now - lastActivity)
    )
  };
}

// ── Data Masking ──────────────────────────────────────────

export function maskSensitiveData(
value: string,
visibleChars: number = 4)
: string {
  if (!value) return '';
  if (value.length <= visibleChars * 2) return '•'.repeat(value.length);
  const start = value.slice(0, visibleChars);
  const end = value.slice(-visibleChars);
  const masked = '•'.repeat(Math.min(value.length - visibleChars * 2, 20));
  return `${start}${masked}${end}`;
}

export function maskEmail(email: string): string {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return maskSensitiveData(email);
  const maskedLocal =
  local.length <= 2 ?
  local :
  local[0] + '•'.repeat(local.length - 2) + local[local.length - 1];
  return `${maskedLocal}@${domain}`;
}

// ── Auth Guard Helpers ────────────────────────────────────
// NOTE: These are UI-only guards for showing/hiding elements.
// Real authorization MUST be enforced by the server on every API call.
// Admin status is derived solely from the user object returned by GET /api/auth/me.

/**
 * Check if a user has admin privileges.
 * Derives admin status from the user object returned by the server.
 * No hardcoded emails — the server is the single source of truth.
 */
export function isAdminUser(user?: User | null): boolean {
  if (!user) return false;
  if (user.isAdmin) return true;
  if (user.roles && user.roles.includes('admin')) return true;
  return false;
}

/**
 * Check if a user has admin access (for UI guard purposes only).
 * Server enforces real authorization on every request.
 */
export function hasAdminAccess(user?: User | null): boolean {
  return isAdminUser(user);
}