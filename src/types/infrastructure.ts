// ── Backend Provider Types ────────────────────────────────

export type BackendProvider = 'supabase' | 'firebase' | 'wordpress' | 'custom';
export type DatabaseProvider =
'postgresql' |
'mysql' |
'sqlite' |
'firebase-rtdb' |
'firestore' |
'supabase-pg';
export type DeploymentTarget =
'docker-vps' |
'vercel' |
'netlify' |
'railway' |
'fly-io' |
'custom-vps';
export type EnvironmentType = 'development' | 'staging' | 'production';
export type ServiceStatus = 'connected' | 'disconnected' | 'error' | 'checking';

// ── Supabase Config ───────────────────────────────────────

export interface SupabaseConfig {
  projectUrl: string;
  anonKey: string;
  serviceRoleKey: string;
  jwtSecret: string;
  dbConnectionString: string;
  realtimeEnabled: boolean;
  storageEnabled: boolean;
  edgeFunctionsUrl: string;
}

// ── Firebase Config ───────────────────────────────────────

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  databaseUrl: string;
  serviceAccountJson: string;
  useEmulators: boolean;
  emulatorHost: string;
}

// ── WordPress Config ──────────────────────────────────────

export interface WordPressConfig {
  siteUrl: string;
  apiUrl: string;
  consumerKey: string;
  consumerSecret: string;
  apiVersion: 'wc/v3' | 'wc/v2' | 'wc/v1';
  verifySsl: boolean;
  jwtAuthEndpoint: string;
  jwtToken: string;
}

// ── Custom REST API Config ────────────────────────────────

export interface CustomApiConfig {
  baseUrl: string;
  authType: 'bearer' | 'api-key' | 'basic' | 'oauth2' | 'none';
  authToken: string;
  apiKeyHeader: string;
  apiKeyValue: string;
  basicUsername: string;
  basicPassword: string;
  timeout: number;
  retryAttempts: number;
  customHeaders: {key: string;value: string;}[];
}

// ── Database Config ───────────────────────────────────────

export interface DatabaseConfig {
  provider: DatabaseProvider;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  connectionString: string;
  sslEnabled: boolean;
  poolMin: number;
  poolMax: number;
  migrationsEnabled: boolean;
  seedOnDeploy: boolean;
}

// ── Docker Config ─────────────────────────────────────────

export interface DockerConfig {
  imageName: string;
  imageTag: string;
  registryUrl: string;
  registryUsername: string;
  registryPassword: string;
  dockerfile: string;
  composeFile: string;
  networkMode: 'bridge' | 'host' | 'none';
  volumes: {hostPath: string;containerPath: string;}[];
  ports: {host: number;container: number;}[];
  envFile: string;
  restartPolicy: 'no' | 'always' | 'on-failure' | 'unless-stopped';
  healthCheckCmd: string;
  healthCheckInterval: number;
  memoryLimit: string;
  cpuLimit: string;
}

// ── VPS Config ────────────────────────────────────────────

export interface VPSConfig {
  provider: string;
  hostname: string;
  ipAddress: string;
  sshPort: number;
  sshUser: string;
  sshKeyPath: string;
  os: string;
  reverseProxy: 'nginx' | 'caddy' | 'traefik' | 'apache' | 'none';
  domain: string;
  sslProvider: 'letsencrypt' | 'cloudflare' | 'custom' | 'none';
  sslAutoRenew: boolean;
  firewallEnabled: boolean;
  allowedPorts: number[];
  monitoringEnabled: boolean;
  backupEnabled: boolean;
  backupSchedule: string;
}

// ── Environment Variable ──────────────────────────────────

export interface EnvVariable {
  id: string;
  key: string;
  value: string;
  environment: EnvironmentType;
  isSecret: boolean;
  description: string;
  category:
  'api' |
  'database' |
  'auth' |
  'storage' |
  'email' |
  'analytics' |
  'other';
}

// ── Health Check ──────────────────────────────────────────

export interface HealthCheck {
  id: string;
  name: string;
  service: string;
  status: ServiceStatus;
  responseTime?: number;
  lastChecked?: string;
  message?: string;
  endpoint?: string;
}

// ── Activity Log ──────────────────────────────────────────

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  category: 'deploy' | 'config' | 'database' | 'auth' | 'system' | 'error';
  details: string;
  user: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}

// ── Master Config ─────────────────────────────────────────

export interface InfrastructureConfig {
  activeBackend: BackendProvider;
  supabase: SupabaseConfig;
  firebase: FirebaseConfig;
  wordpress: WordPressConfig;
  customApi: CustomApiConfig;
  database: DatabaseConfig;
  docker: DockerConfig;
  vps: VPSConfig;
  environments: EnvVariable[];
  healthChecks: HealthCheck[];
  activityLogs: ActivityLog[];
}