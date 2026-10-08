export type ProjectStatus = 'active' | 'paused' | 'archived';

export interface Project {
  id: string;
  workspaceId: string;
  name: string;
  slug: string;
  description?: string;
  avatar?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export type AgentRole = 'coding' | 'design' | 'security' | 'review';

export interface AgentAssignment {
  id: string;
  projectId: string;
  role: AgentRole;
  providerId?: string;
  modelId?: string;
  enabled: boolean;
  configuration?: Record<string, unknown>;
}

export interface AvailableModel {
  id: string;
  providerId: string;
  name: string;
  displayName: string;
  enabled: boolean;
  capabilities?: string[];
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'pending' | 'error';

export interface ProviderConnection {
  id: string;
  projectId: string;
  providerKey: string;
  displayName: string;
  status: ConnectionStatus;
  capabilities?: string[];
  connectedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface IntegrationConnection {
  id: string;
  projectId: string;
  integrationKey: string;
  displayName: string;
  description?: string;
  category?: string;
  status: ConnectionStatus;
  metadata?: Record<string, unknown>;
}

export interface GitHubSettings {
  connected: boolean;
  repositoryId?: string;
  repositoryFullName?: string;
  defaultBranch?: string;
  autoSync?: boolean;
  lastSyncAt?: string;
}

export interface SecuritySettings {
  allowAgentDependencyInstall: boolean;
  allowAgentEnvironmentChanges: boolean;
  allowAgentDeployments: boolean;
  requireApprovalForSensitiveActions: boolean;
  securityScanEnabled: boolean;
}

export interface DesignSettings {
  preferredTheme: 'system' | 'light' | 'dark';
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  designInstructions?: string;
}

export interface DeploymentSettings {
  provider?: string;
  productionUrl?: string;
  productionBranch?: string;
  autoDeploy: boolean;
  status: 'not_configured' | 'ready' | 'deploying' | 'error';
}

export interface EnvironmentVariableMeta {
  id: string;
  key: string;
  environment: 'development' | 'preview' | 'production';
  hasValue: boolean;
  createdAt: string;
  updatedAt: string;
}

export type HealthStatus = 'ok' | 'warning' | 'error' | 'unknown';

export interface HealthCheck {
  status: HealthStatus;
  message?: string;
  checkedAt?: string;
}

export interface ProjectHealth {
  build: HealthCheck;
  security: HealthCheck;
  webhooks: HealthCheck;
}

export interface ProjectSettings {
  project: Project;
  agents: AgentAssignment[];
  providers: ProviderConnection[];
  integrations: IntegrationConnection[];
  github: GitHubSettings;
  security: SecuritySettings;
  design: DesignSettings;
  deployment: DeploymentSettings;
  environmentVariables: EnvironmentVariableMeta[];
  health: ProjectHealth;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  status?: ProjectStatus;
}

export interface UpdateAgentInput {
  providerId?: string;
  modelId?: string;
  enabled?: boolean;
  configuration?: Record<string, unknown>;
}

export interface UpdateSecuritySettingsInput {
  allowAgentDependencyInstall?: boolean;
  allowAgentEnvironmentChanges?: boolean;
  allowAgentDeployments?: boolean;
  requireApprovalForSensitiveActions?: boolean;
  securityScanEnabled?: boolean;
}

export interface UpdateDesignSettingsInput {
  preferredTheme?: 'system' | 'light' | 'dark';
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
  designInstructions?: string;
}

export interface UpdateDeploymentSettingsInput {
  provider?: string;
  productionUrl?: string;
  productionBranch?: string;
  autoDeploy?: boolean;
}

export interface UpdateGitHubSettingsInput {
  repositoryId?: string;
  repositoryFullName?: string;
  defaultBranch?: string;
  autoSync?: boolean;
}

export interface ConnectProviderInput {
  providerKey: string;
  metadata?: Record<string, unknown>;
}

export interface ConnectIntegrationInput {
  integrationKey: string;
  metadata?: Record<string, unknown>;
}

export interface EnvironmentVariableInput {
  key: string;
  environment: 'development' | 'preview' | 'production';
  value?: string;
}