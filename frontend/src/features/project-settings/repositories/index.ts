import type {
  ProjectSettings,
  AvailableModel,
  Project,
  AgentAssignment,
  SecuritySettings,
  DesignSettings,
  DeploymentSettings,
  GitHubSettings,
  ProviderConnection,
  IntegrationConnection,
  EnvironmentVariableMeta,
  UpdateProjectInput,
  UpdateAgentInput,
  UpdateSecuritySettingsInput,
  UpdateDesignSettingsInput,
  UpdateDeploymentSettingsInput,
  UpdateGitHubSettingsInput,
  ConnectProviderInput,
  ConnectIntegrationInput,
  EnvironmentVariableInput,
  AgentRole,
} from '../types';

export interface ProjectSettingsRepository {
  getProjectSettings(projectId: string): Promise<ProjectSettings>;
  getAvailableModels(projectId: string): Promise<AvailableModel[]>;

  updateProject(projectId: string, input: UpdateProjectInput): Promise<Project>;
  updateAgent(projectId: string, role: AgentRole, input: UpdateAgentInput): Promise<AgentAssignment>;
  updateSecuritySettings(projectId: string, input: UpdateSecuritySettingsInput): Promise<SecuritySettings>;
  updateDesignSettings(projectId: string, input: UpdateDesignSettingsInput): Promise<DesignSettings>;
  updateDeploymentSettings(projectId: string, input: UpdateDeploymentSettingsInput): Promise<DeploymentSettings>;
  updateGitHubSettings(projectId: string, input: UpdateGitHubSettingsInput): Promise<GitHubSettings>;

  connectProvider(projectId: string, input: ConnectProviderInput): Promise<{ provider: ProviderConnection }>;
  disconnectProvider(projectId: string, providerKey: string): Promise<void>;

  connectIntegration(projectId: string, input: ConnectIntegrationInput): Promise<{ integration: IntegrationConnection }>;
  disconnectIntegration(projectId: string, integrationKey: string): Promise<void>;

  upsertEnvironmentVariable(projectId: string, input: EnvironmentVariableInput): Promise<EnvironmentVariableMeta>;
  deleteEnvironmentVariable(projectId: string, variableId: string): Promise<void>;

  archiveProject(projectId: string): Promise<Project>;
  resetSettings(projectId: string): Promise<ProjectSettings>;
  deleteProject(projectId: string): Promise<void>;
}