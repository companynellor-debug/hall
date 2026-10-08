import type { ProjectSettingsRepository } from '../repositories';
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
import {
  updateProjectSchema,
  updateAgentSchema,
  updateSecuritySettingsSchema,
  updateDesignSettingsSchema,
  updateDeploymentSettingsSchema,
  updateGitHubSettingsSchema,
  connectProviderSchema,
  connectIntegrationSchema,
  environmentVariableSchema,
} from '../schemas';

export class ProjectSettingsService {
  constructor(private readonly repository: ProjectSettingsRepository) {}

  async getProjectSettings(projectId: string): Promise<ProjectSettings> {
    return this.repository.getProjectSettings(projectId);
  }

  async getAvailableModels(projectId: string): Promise<AvailableModel[]> {
    return this.repository.getAvailableModels(projectId);
  }

  async updateProject(projectId: string, input: UpdateProjectInput): Promise<Project> {
    const validated = updateProjectSchema.parse(input);
    return this.repository.updateProject(projectId, validated);
  }

  async updateAgent(projectId: string, role: AgentRole, input: UpdateAgentInput): Promise<AgentAssignment> {
    const validated = updateAgentSchema.parse(input);
    return this.repository.updateAgent(projectId, role, validated);
  }

  async updateSecuritySettings(projectId: string, input: UpdateSecuritySettingsInput): Promise<SecuritySettings> {
    const validated = updateSecuritySettingsSchema.parse(input);
    return this.repository.updateSecuritySettings(projectId, validated);
  }

  async updateDesignSettings(projectId: string, input: UpdateDesignSettingsInput): Promise<DesignSettings> {
    const validated = updateDesignSettingsSchema.parse(input);
    return this.repository.updateDesignSettings(projectId, validated);
  }

  async updateDeploymentSettings(projectId: string, input: UpdateDeploymentSettingsInput): Promise<DeploymentSettings> {
    const validated = updateDeploymentSettingsSchema.parse(input);
    return this.repository.updateDeploymentSettings(projectId, validated);
  }

  async updateGitHubSettings(projectId: string, input: UpdateGitHubSettingsInput): Promise<GitHubSettings> {
    const validated = updateGitHubSettingsSchema.parse(input);
    return this.repository.updateGitHubSettings(projectId, validated);
  }

  async connectProvider(projectId: string, input: ConnectProviderInput): Promise<ProviderConnection> {
    const validated = connectProviderSchema.parse(input);
    const result = await this.repository.connectProvider(projectId, validated);
    return result.provider;
  }

  async disconnectProvider(projectId: string, providerKey: string): Promise<void> {
    return this.repository.disconnectProvider(projectId, providerKey);
  }

  async connectIntegration(projectId: string, input: ConnectIntegrationInput): Promise<IntegrationConnection> {
    const validated = connectIntegrationSchema.parse(input);
    const result = await this.repository.connectIntegration(projectId, validated);
    return result.integration;
  }

  async disconnectIntegration(projectId: string, integrationKey: string): Promise<void> {
    return this.repository.disconnectIntegration(projectId, integrationKey);
  }

  async upsertEnvironmentVariable(projectId: string, input: EnvironmentVariableInput): Promise<EnvironmentVariableMeta> {
    const validated = environmentVariableSchema.parse(input);
    return this.repository.upsertEnvironmentVariable(projectId, validated);
  }

  async deleteEnvironmentVariable(projectId: string, variableId: string): Promise<void> {
    return this.repository.deleteEnvironmentVariable(projectId, variableId);
  }

  async archiveProject(projectId: string): Promise<Project> {
    return this.repository.archiveProject(projectId);
  }

  async resetSettings(projectId: string): Promise<any> {
    return this.repository.resetSettings(projectId);
  }

  async deleteProject(projectId: string): Promise<void> {
    return this.repository.deleteProject(projectId);
  }
}

export const projectSettingsService = new ProjectSettingsService({} as any);