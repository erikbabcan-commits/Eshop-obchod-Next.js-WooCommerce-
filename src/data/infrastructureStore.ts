// ── Infrastructure Store ──────────────────────────────────
// UI-only configuration display. All values are PLACEHOLDERS.
//
// ⚠️  SECRETS MUST NEVER BE STORED IN CLIENT-SIDE CODE.
// ⚠️  Real credentials, API keys, and connection strings belong
//     in server-side environment variables only.
// ⚠️  Only NEXT_PUBLIC_* variables are safe for the client bundle.

import type {
  InfrastructureConfig,
  SupabaseConfig,
  FirebaseConfig,
  WordPressConfig,
  CustomApiConfig,
  DatabaseConfig,
  DockerConfig,
  VPSConfig,
  EnvVariable,
  HealthCheck,
  ActivityLog } from
'../types/infrastructure';

// All secret fields are empty strings — they are configured on the server.

export const DEFAULT_SUPABASE: SupabaseConfig = {
  projectUrl: '', // Set via server env: SUPABASE_URL
  anonKey: '', // Set via server env: SUPABASE_ANON_KEY (public, but loaded from env)
  serviceRoleKey: '', // ⚠️ SERVER ONLY — never expose to client
  jwtSecret: '', // ⚠️ SERVER ONLY — never expose to client
  dbConnectionString: '', // ⚠️ SERVER ONLY — never expose to client
  realtimeEnabled: true,
  storageEnabled: true,
  edgeFunctionsUrl: '' // Set via server env
};

export const DEFAULT_FIREBASE: FirebaseConfig = {
  apiKey: '', // Set via NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: '', // Set via NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  projectId: '', // Set via NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: '', // Set via NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  messagingSenderId: '', // Set via NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  appId: '', // Set via NEXT_PUBLIC_FIREBASE_APP_ID
  measurementId: '', // Set via NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  databaseUrl: '', // Set via server env
  serviceAccountJson: '', // ⚠️ SERVER ONLY — never expose to client
  useEmulators: false,
  emulatorHost: 'localhost'
};

export const DEFAULT_WORDPRESS: WordPressConfig = {
  siteUrl: '', // Set via server env: WP_SITE_URL
  apiUrl: '', // Set via server env: WP_API_URL
  consumerKey: '', // ⚠️ SERVER ONLY — never expose to client
  consumerSecret: '', // ⚠️ SERVER ONLY — never expose to client
  apiVersion: 'wc/v3',
  verifySsl: true,
  jwtAuthEndpoint: '', // Set via server env
  jwtToken: '' // ⚠️ SERVER ONLY — never expose to client
};

export const DEFAULT_CUSTOM_API: CustomApiConfig = {
  baseUrl: '', // Set via server env: API_BASE_URL
  authType: 'bearer',
  authToken: '', // ⚠️ SERVER ONLY — never expose to client
  apiKeyHeader: 'X-API-Key',
  apiKeyValue: '', // ⚠️ SERVER ONLY — never expose to client
  basicUsername: '', // ⚠️ SERVER ONLY — never expose to client
  basicPassword: '', // ⚠️ SERVER ONLY — never expose to client
  timeout: 30000,
  retryAttempts: 3,
  customHeaders: [
  { key: 'Content-Type', value: 'application/json' },
  { key: 'Accept', value: 'application/json' }]

};

export const DEFAULT_DATABASE: DatabaseConfig = {
  provider: 'postgresql',
  host: '', // ⚠️ SERVER ONLY
  port: 5432,
  name: '', // ⚠️ SERVER ONLY
  username: '', // ⚠️ SERVER ONLY
  password: '', // ⚠️ SERVER ONLY
  connectionString: '', // ⚠️ SERVER ONLY — never expose to client
  sslEnabled: true,
  poolMin: 2,
  poolMax: 10,
  migrationsEnabled: true,
  seedOnDeploy: false
};

export const DEFAULT_DOCKER: DockerConfig = {
  imageName: '', // Set via CI/CD
  imageTag: 'latest',
  registryUrl: '', // Set via CI/CD
  registryUsername: '', // ⚠️ SERVER ONLY
  registryPassword: '', // ⚠️ SERVER ONLY
  dockerfile: './Dockerfile',
  composeFile: './docker-compose.yml',
  networkMode: 'bridge',
  volumes: [],
  ports: [
  { host: 80, container: 3000 },
  { host: 443, container: 3000 }],

  envFile: '.env.production',
  restartPolicy: 'unless-stopped',
  healthCheckCmd: 'curl -f http://localhost:3000/health || exit 1',
  healthCheckInterval: 30,
  memoryLimit: '512m',
  cpuLimit: '1.0'
};

export const DEFAULT_VPS: VPSConfig = {
  provider: '',
  hostname: '',
  ipAddress: '', // ⚠️ Do not hardcode server IPs in client code
  sshPort: 22,
  sshUser: '', // ⚠️ SERVER ONLY
  sshKeyPath: '', // ⚠️ SERVER ONLY
  os: 'Ubuntu 22.04 LTS',
  reverseProxy: 'nginx',
  domain: '', // Set via server env
  sslProvider: 'letsencrypt',
  sslAutoRenew: true,
  firewallEnabled: true,
  allowedPorts: [22, 80, 443],
  monitoringEnabled: true,
  backupEnabled: true,
  backupSchedule: '0 3 * * *'
};

// Placeholder env variables — real values are managed on the server.
// Only NEXT_PUBLIC_* variables are safe for the client bundle.
export const MOCK_ENV_VARIABLES: EnvVariable[] = [
{
  id: 'env_1',
  key: 'NODE_ENV',
  value: 'production',
  environment: 'production',
  isSecret: false,
  description: 'Node.js environment',
  category: 'other'
},
{
  id: 'env_2',
  key: 'DATABASE_URL',
  value: '••••••••', // ⚠️ Server-only secret
  environment: 'production',
  isSecret: true,
  description: 'Primary database connection string',
  category: 'database'
},
{
  id: 'env_3',
  key: 'SUPABASE_URL',
  value: '', // Configured on server
  environment: 'production',
  isSecret: false,
  description: 'Supabase project URL',
  category: 'api'
},
{
  id: 'env_4',
  key: 'SUPABASE_ANON_KEY',
  value: '••••••••', // ⚠️ Server-only secret
  environment: 'production',
  isSecret: true,
  description: 'Supabase anonymous key',
  category: 'auth'
},
{
  id: 'env_5',
  key: 'JWT_SECRET',
  value: '••••••••', // ⚠️ Server-only secret
  environment: 'production',
  isSecret: true,
  description: 'JWT signing secret',
  category: 'auth'
},
{
  id: 'env_6',
  key: 'SMTP_HOST',
  value: '', // Configured on server
  environment: 'production',
  isSecret: false,
  description: 'SMTP server host',
  category: 'email'
},
{
  id: 'env_7',
  key: 'SMTP_PASSWORD',
  value: '••••••••', // ⚠️ Server-only secret
  environment: 'production',
  isSecret: true,
  description: 'SMTP password / API key',
  category: 'email'
},
{
  id: 'env_8',
  key: 'STRIPE_SECRET_KEY',
  value: '••••••••', // ⚠️ Server-only secret
  environment: 'production',
  isSecret: true,
  description: 'Stripe secret key',
  category: 'api'
},
{
  id: 'env_9',
  key: 'GA_TRACKING_ID',
  value: '', // Set via NEXT_PUBLIC_GA_TRACKING_ID
  environment: 'production',
  isSecret: false,
  description: 'Google Analytics ID',
  category: 'analytics'
},
{
  id: 'env_10',
  key: 'STORAGE_BUCKET',
  value: '', // Configured on server
  environment: 'production',
  isSecret: false,
  description: 'Cloud storage bucket name',
  category: 'storage'
},
{
  id: 'env_11',
  key: 'DATABASE_URL',
  value: '••••••••', // ⚠️ Server-only secret
  environment: 'development',
  isSecret: true,
  description: 'Dev database connection',
  category: 'database'
},
{
  id: 'env_12',
  key: 'NODE_ENV',
  value: 'development',
  environment: 'development',
  isSecret: false,
  description: 'Node.js environment',
  category: 'other'
}];


// Health checks — these would be fetched from a server endpoint in production.
// Placeholder data for UI display only.
export const MOCK_HEALTH_CHECKS: HealthCheck[] = [
{
  id: 'hc_1',
  name: 'Frontend App',
  service: 'React SPA',
  status: 'checking',
  responseTime: undefined,
  lastChecked: new Date().toISOString(),
  message: 'Awaiting health check...',
  endpoint: '/health'
},
{
  id: 'hc_2',
  name: 'Database',
  service: 'Database',
  status: 'checking',
  responseTime: undefined,
  lastChecked: new Date().toISOString(),
  message: 'Awaiting health check...',
  endpoint: '/api/health/db'
},
{
  id: 'hc_3',
  name: 'API Backend',
  service: 'Backend',
  status: 'checking',
  responseTime: undefined,
  lastChecked: new Date().toISOString(),
  message: 'Awaiting health check...',
  endpoint: '/api/health'
},
{
  id: 'hc_4',
  name: 'Cache',
  service: 'Cache',
  status: 'checking',
  responseTime: undefined,
  lastChecked: new Date().toISOString(),
  message: 'Awaiting health check...',
  endpoint: '/api/health/cache'
}];


// Activity logs — these would be fetched from a server endpoint in production.
export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log_1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    action: 'Admin login',
    category: 'auth',
    details: 'Admin user logged in successfully',
    user: 'admin@example.com',
    severity: 'info',
  },
  {
    id: 'log_2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    action: 'Product updated',
    category: 'config',
    details: 'Product "Whey Protein 1kg" price updated from €29.99 to €27.99',
    user: 'admin@example.com',
    severity: 'success',
  },
  {
    id: 'log_3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    action: 'Order status changed',
    category: 'system',
    details: 'Order #1042 status changed from "processing" to "shipped"',
    user: 'system',
    severity: 'info',
  },
  {
    id: 'log_4',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    action: 'Database backup',
    category: 'database',
    details: 'Scheduled database backup completed successfully (42 MB)',
    user: 'system',
    severity: 'success',
  },
  {
    id: 'log_5',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    action: 'Plugin activated',
    category: 'config',
    details: 'WooCommerce Stripe Gateway v7.6.1 activated',
    user: 'admin@example.com',
    severity: 'info',
  },
  {
    id: 'log_6',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    action: 'Failed login attempt',
    category: 'auth',
    details: 'Failed login attempt from IP 185.220.101.33',
    user: 'unknown',
    severity: 'warning',
  },
  {
    id: 'log_7',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    action: 'Deployment triggered',
    category: 'deploy',
    details: 'Production deployment v2.4.1 triggered via CI/CD pipeline',
    user: 'ci-bot',
    severity: 'info',
  },
  {
    id: 'log_8',
    timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    action: 'API error',
    category: 'error',
    details: 'WooCommerce REST API returned 500 on /wp-json/wc/v3/orders — retrying',
    user: 'system',
    severity: 'error',
  },
];

export const DEFAULT_INFRASTRUCTURE: InfrastructureConfig = {
  activeBackend: 'supabase',
  supabase: DEFAULT_SUPABASE,
  firebase: DEFAULT_FIREBASE,
  wordpress: DEFAULT_WORDPRESS,
  customApi: DEFAULT_CUSTOM_API,
  database: DEFAULT_DATABASE,
  docker: DEFAULT_DOCKER,
  vps: DEFAULT_VPS,
  environments: MOCK_ENV_VARIABLES,
  healthChecks: MOCK_HEALTH_CHECKS,
  activityLogs: MOCK_ACTIVITY_LOGS
};