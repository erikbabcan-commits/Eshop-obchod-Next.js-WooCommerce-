import { describe, it, expect } from './testUtils';
import { api } from '../services/api';

// ── API Service Structure Tests ───────────────────────────
// These tests verify the API client is correctly structured.
// Integration tests against a real backend should run in CI
// with a test server available.

describe('API Service — Client Structure', () => {
  it('should export products namespace with all methods', () => {
    expect(typeof api.products.getAll).toBe('function');
    expect(typeof api.products.getBySlug).toBe('function');
    expect(typeof api.products.getByCategory).toBe('function');
    expect(typeof api.products.getByBrand).toBe('function');
    expect(typeof api.products.search).toBe('function');
  });

  it('should export categories namespace with all methods', () => {
    expect(typeof api.categories.getAll).toBe('function');
    expect(typeof api.categories.getBySlug).toBe('function');
  });

  it('should export brands namespace with all methods', () => {
    expect(typeof api.brands.getAll).toBe('function');
    expect(typeof api.brands.getBySlug).toBe('function');
  });

  it('should export auth namespace with all methods', () => {
    expect(typeof api.auth.login).toBe('function');
    expect(typeof api.auth.register).toBe('function');
    expect(typeof api.auth.getCurrentUser).toBe('function');
    expect(typeof api.auth.logout).toBe('function');
  });

  it('should export orders namespace', () => {
    expect(typeof api.orders.submit).toBe('function');
  });

  it('should export newsletter namespace', () => {
    expect(typeof api.newsletter.subscribe).toBe('function');
  });
});

describe('API Service — No Hardcoded Secrets', () => {
  it('should not contain localStorage references in auth methods', () => {
    // Verify the auth functions are real fetch-based, not localStorage-based
    const loginStr = api.auth.login.toString();
    const registerStr = api.auth.register.toString();
    const logoutStr = api.auth.logout.toString();
    const getCurrentUserStr = api.auth.getCurrentUser.toString();

    expect(loginStr).not.toContain('localStorage');
    expect(registerStr).not.toContain('localStorage');
    expect(logoutStr).not.toContain('localStorage');
    expect(getCurrentUserStr).not.toContain('localStorage');
  });

  it('should not contain mock delay functions', () => {
    const loginStr = api.auth.login.toString();
    expect(loginStr).not.toContain('randomDelay');
    expect(loginStr).not.toContain('setTimeout');
  });
});