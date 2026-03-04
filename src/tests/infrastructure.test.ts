import { describe, it, expect } from './testUtils';
import {
  DEFAULT_SUPABASE,
  DEFAULT_FIREBASE,
  DEFAULT_WORDPRESS,
  DEFAULT_CUSTOM_API,
  DEFAULT_DATABASE,
  DEFAULT_DOCKER,
  DEFAULT_VPS,
  MOCK_ENV_VARIABLES,
  MOCK_HEALTH_CHECKS,
  DEFAULT_INFRASTRUCTURE } from
'../data/infrastructureStore';
import {
  MOCK_ORDERS,
  MOCK_CUSTOMERS,
  MOCK_PLUGINS,
  DEFAULT_WP_SETTINGS } from
'../data/adminStore';

// ── Infrastructure Config — No Secrets in Bundle ──────────

describe('Infrastructure — No Secrets in Client Bundle', () => {
  it('Supabase serviceRoleKey should be empty', () => {
    expect(DEFAULT_SUPABASE.serviceRoleKey).toBe('');
  });

  it('Supabase jwtSecret should be empty', () => {
    expect(DEFAULT_SUPABASE.jwtSecret).toBe('');
  });

  it('Supabase dbConnectionString should be empty', () => {
    expect(DEFAULT_SUPABASE.dbConnectionString).toBe('');
  });

  it('Firebase serviceAccountJson should be empty', () => {
    expect(DEFAULT_FIREBASE.serviceAccountJson).toBe('');
  });

  it('WordPress consumerKey should be empty', () => {
    expect(DEFAULT_WORDPRESS.consumerKey).toBe('');
  });

  it('WordPress consumerSecret should be empty', () => {
    expect(DEFAULT_WORDPRESS.consumerSecret).toBe('');
  });

  it('WordPress jwtToken should be empty', () => {
    expect(DEFAULT_WORDPRESS.jwtToken).toBe('');
  });

  it('Custom API authToken should be empty', () => {
    expect(DEFAULT_CUSTOM_API.authToken).toBe('');
  });

  it('Custom API apiKeyValue should be empty', () => {
    expect(DEFAULT_CUSTOM_API.apiKeyValue).toBe('');
  });

  it('Custom API basicPassword should be empty', () => {
    expect(DEFAULT_CUSTOM_API.basicPassword).toBe('');
  });

  it('Database password should be empty', () => {
    expect(DEFAULT_DATABASE.password).toBe('');
  });

  it('Database connectionString should be empty', () => {
    expect(DEFAULT_DATABASE.connectionString).toBe('');
  });

  it('Docker registryPassword should be empty', () => {
    expect(DEFAULT_DOCKER.registryPassword).toBe('');
  });

  it('VPS sshUser should be empty', () => {
    expect(DEFAULT_VPS.sshUser).toBe('');
  });

  it('VPS sshKeyPath should be empty', () => {
    expect(DEFAULT_VPS.sshKeyPath).toBe('');
  });

  it('VPS ipAddress should be empty (no hardcoded IPs)', () => {
    expect(DEFAULT_VPS.ipAddress).toBe('');
  });

  it('WP Settings consumerKey should be empty', () => {
    expect(DEFAULT_WP_SETTINGS.consumerKey).toBe('');
  });

  it('WP Settings consumerSecret should be empty', () => {
    expect(DEFAULT_WP_SETTINGS.consumerSecret).toBe('');
  });

  it('secret env variables should not contain real values', () => {
    MOCK_ENV_VARIABLES.filter((v) => v.isSecret).forEach((v) => {
      // Secret values should be masked or empty, never real credentials
      const isMasked = v.value === '' || v.value === '••••••••';
      expect(isMasked).toBe(true);
    });
  });
});

// ── Infrastructure Config Structure ───────────────────────

describe('Infrastructure — Config Structure', () => {
  it('should have valid active backend', () => {
    const validBackends = ['supabase', 'firebase', 'wordpress', 'custom'];
    expect(validBackends).toContain(DEFAULT_INFRASTRUCTURE.activeBackend);
  });

  it('should contain all sub-configs', () => {
    expect(DEFAULT_INFRASTRUCTURE.supabase).toBeTruthy();
    expect(DEFAULT_INFRASTRUCTURE.firebase).toBeTruthy();
    expect(DEFAULT_INFRASTRUCTURE.wordpress).toBeTruthy();
    expect(DEFAULT_INFRASTRUCTURE.customApi).toBeTruthy();
    expect(DEFAULT_INFRASTRUCTURE.database).toBeTruthy();
    expect(DEFAULT_INFRASTRUCTURE.docker).toBeTruthy();
    expect(DEFAULT_INFRASTRUCTURE.vps).toBeTruthy();
  });

  it('should contain env variables', () => {
    expect(DEFAULT_INFRASTRUCTURE.environments.length).toBeGreaterThan(0);
  });

  it('should contain health checks', () => {
    expect(DEFAULT_INFRASTRUCTURE.healthChecks.length).toBeGreaterThan(0);
  });
});

describe('Infrastructure — Database Config Structure', () => {
  it('should have valid provider', () => {
    const validProviders = [
    'postgresql',
    'mysql',
    'sqlite',
    'firebase-rtdb',
    'firestore',
    'supabase-pg'];

    expect(validProviders).toContain(DEFAULT_DATABASE.provider);
  });

  it('should have valid port number', () => {
    expect(DEFAULT_DATABASE.port).toBeGreaterThan(0);
    expect(DEFAULT_DATABASE.port).toBeLessThan(65536);
  });

  it('should have pool settings', () => {
    expect(DEFAULT_DATABASE.poolMin).toBeGreaterThanOrEqual(0);
    expect(DEFAULT_DATABASE.poolMax).toBeGreaterThan(DEFAULT_DATABASE.poolMin);
  });
});

describe('Infrastructure — Docker Config Structure', () => {
  it('should have valid restart policy', () => {
    const validPolicies = ['no', 'always', 'on-failure', 'unless-stopped'];
    expect(validPolicies).toContain(DEFAULT_DOCKER.restartPolicy);
  });

  it('should have port mappings', () => {
    expect(DEFAULT_DOCKER.ports.length).toBeGreaterThan(0);
    DEFAULT_DOCKER.ports.forEach((p) => {
      expect(p.host).toBeGreaterThan(0);
      expect(p.container).toBeGreaterThan(0);
    });
  });

  it('should have health check command', () => {
    expect(DEFAULT_DOCKER.healthCheckCmd).toBeTruthy();
  });
});

describe('Infrastructure — VPS Config Structure', () => {
  it('should have valid SSH port', () => {
    expect(DEFAULT_VPS.sshPort).toBeGreaterThan(0);
    expect(DEFAULT_VPS.sshPort).toBeLessThan(65536);
  });

  it('should have valid reverse proxy', () => {
    const validProxies = ['nginx', 'caddy', 'traefik', 'apache', 'none'];
    expect(validProxies).toContain(DEFAULT_VPS.reverseProxy);
  });

  it('should have backup schedule in cron format', () => {
    expect(DEFAULT_VPS.backupSchedule).toMatch(
      /^[\d*\/,-]+\s[\d*\/,-]+\s[\d*\/,-]+\s[\d*\/,-]+\s[\d*\/,-]+$/
    );
  });
});

// ── Environment Variables ─────────────────────────────────

describe('Infrastructure — Environment Variables', () => {
  it('should have variables', () => {
    expect(MOCK_ENV_VARIABLES.length).toBeGreaterThan(0);
  });

  it('should have unique IDs', () => {
    const ids = MOCK_ENV_VARIABLES.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have valid environments', () => {
    const validEnvs = ['development', 'staging', 'production'];
    MOCK_ENV_VARIABLES.forEach((v) => {
      expect(validEnvs).toContain(v.environment);
    });
  });

  it('should have valid categories', () => {
    const validCats = [
    'api',
    'database',
    'auth',
    'storage',
    'email',
    'analytics',
    'other'];

    MOCK_ENV_VARIABLES.forEach((v) => {
      expect(validCats).toContain(v.category);
    });
  });

  it('should mark sensitive values as secret', () => {
    const sensitiveKeys = [
    'DATABASE_URL',
    'SUPABASE_ANON_KEY',
    'JWT_SECRET',
    'SMTP_PASSWORD',
    'STRIPE_SECRET_KEY'];

    MOCK_ENV_VARIABLES.filter((v) => sensitiveKeys.includes(v.key)).forEach(
      (v) => {
        expect(v.isSecret).toBe(true);
      }
    );
  });
});

// ── Health Checks ─────────────────────────────────────────

describe('Infrastructure — Health Checks', () => {
  it('should have health checks', () => {
    expect(MOCK_HEALTH_CHECKS.length).toBeGreaterThan(0);
  });

  it('should have valid statuses', () => {
    const validStatuses = ['connected', 'disconnected', 'error', 'checking'];
    MOCK_HEALTH_CHECKS.forEach((hc) => {
      expect(validStatuses).toContain(hc.status);
    });
  });

  it('should have endpoints', () => {
    MOCK_HEALTH_CHECKS.forEach((hc) => {
      expect(hc.endpoint).toBeTruthy();
    });
  });
});

// ── Admin Store ───────────────────────────────────────────

describe('Admin Store — Orders', () => {
  it('should have orders', () => {
    expect(MOCK_ORDERS.length).toBeGreaterThan(0);
  });

  it('should have valid order statuses', () => {
    const validStatuses = [
    'pending',
    'processing',
    'completed',
    'cancelled',
    'refunded'];

    MOCK_ORDERS.forEach((order) => {
      expect(validStatuses).toContain(order.status);
    });
  });

  it('should have positive totals', () => {
    MOCK_ORDERS.forEach((order) => {
      expect(order.total).toBeGreaterThan(0);
    });
  });

  it('should have order items', () => {
    MOCK_ORDERS.forEach((order) => {
      expect(order.items.length).toBeGreaterThan(0);
    });
  });

  it('should have billing info', () => {
    MOCK_ORDERS.forEach((order) => {
      expect(order.billing.firstName).toBeTruthy();
      expect(order.billing.lastName).toBeTruthy();
      expect(order.billing.email).toBeTruthy();
    });
  });
});

describe('Admin Store — Customers', () => {
  it('should have customers', () => {
    expect(MOCK_CUSTOMERS.length).toBeGreaterThan(0);
  });

  it('should have valid roles', () => {
    MOCK_CUSTOMERS.forEach((customer) => {
      expect(['customer', 'administrator']).toContain(customer.role);
    });
  });

  it('should have non-negative spend', () => {
    MOCK_CUSTOMERS.forEach((customer) => {
      expect(customer.totalSpent).toBeGreaterThanOrEqual(0);
    });
  });

  it('should not contain hardcoded admin email', () => {
    MOCK_CUSTOMERS.forEach((customer) => {
      expect(customer.email).not.toBe('admin@isteroidi.it');
    });
  });
});

describe('Admin Store — Plugins', () => {
  it('should have plugins', () => {
    expect(MOCK_PLUGINS.length).toBeGreaterThan(0);
  });

  it('should have valid statuses', () => {
    MOCK_PLUGINS.forEach((plugin) => {
      expect(['active', 'inactive']).toContain(plugin.status);
    });
  });

  it('should have version strings', () => {
    MOCK_PLUGINS.forEach((plugin) => {
      expect(plugin.version).toBeTruthy();
      expect(plugin.version).toMatch(/^\d+\.\d+/);
    });
  });
});

describe('Admin Store — WP Settings', () => {
  it('should have valid API version', () => {
    expect(['wc/v3', 'wc/v2', 'wc/v1']).toContain(DEFAULT_WP_SETTINGS.version);
  });

  it('should not contain real consumer keys', () => {
    expect(DEFAULT_WP_SETTINGS.consumerKey).toBe('');
    expect(DEFAULT_WP_SETTINGS.consumerSecret).toBe('');
  });
});