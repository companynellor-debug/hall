import { delay, generateId } from '../utils/helpers';
import type { ProjectSettingsRepository } from '../repositories';
import type {
  ProjectSettings,
  Project,
  AvailableModel,
  AgentAssignment,
  ProviderConnection,
  IntegrationConnection,
  GitHubSettings,
  SecuritySettings,
  DesignSettings,
  DeploymentSettings,
  EnvironmentVariableMeta,
  ProjectHealth,
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
  ProjectStatus,
  ConnectionStatus,
} from '../types';

function createDefaultProject(projectId: string, projectName: string): Project {
  return {
    id: projectId,
    workspaceId: 'ws-1',
    name: projectName,
    slug: projectName.toLowerCase().replace(/\s+/g, '-'),
    description: 'Plataforma de gestão e automação para pequenas e médias empresas.',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function createDefaultAgents(projectId: string): AgentAssignment[] {
  const roles: AgentRole[] = ['coding', 'design', 'security', 'review'];
  const models = ['DeepSeek', 'GLM-5', 'Nemotron', 'Qwen'];
  return roles.map((role, i) => ({
    id: generateId(),
    projectId,
    role,
    providerId: 'openrouter',
    modelId: models[i],
    enabled: true,
  }));
}

function createDefaultProviders(projectId: string): ProviderConnection[] {
  return [
    {
      id: generateId(),
      projectId,
      providerKey: 'nvidia',
      displayName: 'NVIDIA',
      status: 'connected',
      capabilities: ['Nemotron', 'GPU Infrastructure'],
      connectedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      projectId,
      providerKey: 'openrouter',
      displayName: 'OpenRouter',
      status: 'connected',
      capabilities: ['DeepSeek', 'Qwen', 'GLM', 'Claude'],
      connectedAt: new Date().toISOString(),
    },
  ];
}

function createDefaultIntegrations(projectId: string): IntegrationConnection[] {
  return [
    { id: generateId(), projectId, integrationKey: 'github', displayName: 'GitHub', description: 'Repositório e automações de CI/CD.', category: 'version-control', status: 'connected' },
    { id: generateId(), projectId, integrationKey: 'supabase', displayName: 'Supabase', description: 'Banco de dados e autenticação.', category: 'database', status: 'connected' },
    { id: generateId(), projectId, integrationKey: 'vercel', displayName: 'Vercel', description: 'Deploy e hospedagem.', category: 'hosting', status: 'connected' },
    { id: generateId(), projectId, integrationKey: 'asaas', displayName: 'Asaas', description: 'Pagamentos e cobrança.', category: 'payments', status: 'connected' },
    { id: generateId(), projectId, integrationKey: 'stripe', displayName: 'Stripe', description: 'Pagamentos (opcional).', category: 'payments', status: 'disconnected' },
  ];
}

function createDefaultGitHub(): GitHubSettings {
  return { connected: true, repositoryFullName: 'companynellor-debug/hall', defaultBranch: 'main', autoSync: true, lastSyncAt: new Date().toISOString() };
}

function createDefaultSecurity(): SecuritySettings {
  return { allowAgentDependencyInstall: true, allowAgentEnvironmentChanges: false, allowAgentDeployments: false, requireApprovalForSensitiveActions: true, securityScanEnabled: true };
}

function createDefaultDesign(): DesignSettings {
  return { preferredTheme: 'system', previewDevice: 'desktop', designInstructions: '' };
}

function createDefaultDeployment(): DeploymentSettings {
  return { provider: 'Vercel', productionUrl: 'https://app.hall.com', productionBranch: 'main', autoDeploy: true, status: 'ready' };
}

function createDefaultEnvironmentVariables(projectId: string) {
  return [
    { id: generateId(), key: 'API_URL', environment: 'production', hasValue: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: generateId(), key: 'DATABASE_URL', environment: 'production', hasValue: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: generateId(), key: 'NEXT_PUBLIC_APP_URL', environment: 'preview', hasValue: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];
}

function createDefaultHealth() {
  return {
    build: { status: 'ok', message: 'Último build concluído há 12 minutos', checkedAt: new Date().toISOString() },
    security: { status: 'warning', message: '1 alerta requer atenção', checkedAt: new Date().toISOString() },
    webhooks: { status: 'ok', message: 'Recebendo eventos normalmente', checkedAt: new Date().toISOString() },
  };
}

function createDefaultModels(): AvailableModel[] {
  return [
    { id: 'deepseek', providerId: 'openrouter', name: 'deepseek', displayName: 'DeepSeek', enabled: true, capabilities: ['coding', 'reasoning'] },
    { id: 'glm-5', providerId: 'openrouter', name: 'glm-5', displayName: 'GLM-5', enabled: true, capabilities: ['coding', 'general'] },
    { id: 'nemotron', providerId: 'nvidia', name: 'nemotron', displayName: 'Nemotron', enabled: true, capabilities: ['coding', 'reasoning'] },
    { id: 'qwen', providerId: 'openrouter', name: 'qwen', displayName: 'Qwen', enabled: true, capabilities: ['coding', 'multilingual'] },
    { id: 'claude-sonnet', providerId: 'openrouter', name: 'claude-sonnet', displayName: 'Claude Sonnet', enabled: true, capabilities: ['coding', 'reasoning', 'analysis'] },
    { id: 'gpt-4', providerId: 'openrouter', name: 'gpt-4', displayName: 'GPT-4', enabled: true, capabilities: ['coding', 'reasoning', 'general'] },
  ];
}

const projectCache = new Map<string, { project: any; agents: any[]; providers: any[]; integrations: any[]; github: any; security: any; design: any; deployment: any; environmentVariables: any[]; health: any }>();

function getOrCreateProject(projectId: string, projectName: string) {
  let cached = projectCache.get(projectId);
  if (!cached) {
    const project = { id: projectId, workspaceId: 'ws-1', name: projectName, slug: projectName.toLowerCase().replace(/\s+/g, '-'), description: 'Plataforma de gestão e automação para pequenas e médias empresas.', status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    cached = {
      project,
      agents: [
        { id: '1', projectId, role: 'coding', providerId: 'openrouter', modelId: 'deepseek', enabled: true },
        { id: '2', projectId, role: 'design', providerId: 'openrouter', modelId: 'glm-5', enabled: true },
        { id: '3', projectId, role: 'security', providerId: 'nvidia', modelId: 'nemotron', enabled: true },
        { id: '4', projectId, role: 'review', providerId: 'openrouter', modelId: 'qwen', enabled: true },
      ],
      providers: [
        { id: '1', projectId, providerKey: 'nvidia', displayName: 'NVIDIA', status: 'connected', capabilities: ['Nemotron'], connectedAt: new Date().toISOString() },
        { id: '2', projectId, providerKey: 'openrouter', displayName: 'OpenRouter', status: 'connected', capabilities: ['DeepSeek', 'Qwen'], connectedAt: new Date().toISOString() },
      ],
      integrations: [
        { id: '1', projectId, integrationKey: 'github', displayName: 'GitHub', description: 'Repositório', category: 'version-control', status: 'connected' },
        { id: '2', projectId, integrationKey: 'supabase', displayName: 'Supabase', description: 'Banco', category: 'database', status: 'connected' },
        { id: '3', projectId, integrationKey: 'vercel', displayName: 'Vercel', description: 'Deploy', category: 'hosting', status: 'connected' },
        { id: '4', projectId, integrationKey: 'asaas', displayName: 'Asaas', description: 'Pagamentos', category: 'payments', status: 'connected' },
        { id: '5', projectId, integrationKey: 'stripe', displayName: 'Stripe', description: 'Pagamentos', category: 'payments', status: 'disconnected' },
      ],
      github: { connected: true, repositoryFullName: 'companynellor-debug/hall', defaultBranch: 'main', autoSync: true, lastSyncAt: new Date().toISOString() },
      security: { allowAgentDependencyInstall: true, allowAgentEnvironmentChanges: false, allowAgentDeployments: false, requireApprovalForSensitiveActions: true, securityScanEnabled: true },
      design: { preferredTheme: 'system', previewDevice: 'desktop', designInstructions: '' },
      deployment: { provider: 'Vercel', productionUrl: 'https://app.hall.com', productionBranch: 'main', autoDeploy: true, status: 'ready' },
      environmentVariables: [
        { id: '1', key: 'API_URL', environment: 'production', hasValue: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '2', key: 'DATABASE_URL', environment: 'production', hasValue: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: '3', key: 'NEXT_PUBLIC_APP_URL', environment: 'preview', hasValue: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ],
      health: { build: { status: 'ok', message: 'OK', checkedAt: new Date().toISOString() }, security: { status: 'warning', message: '1 alerta', checkedAt: new Date().toISOString() }, webhooks: { status: 'ok', message: 'OK', checkedAt: new Date().toISOString() } },
    };
    projectCache.set(projectId, cached);
  }
  return cached;
}

export const mockProjectSettingsRepository: import('../repositories').ProjectSettingsRepository = {
  async getProjectSettings(projectId: string) {
    await delay(100);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    return cached;
  },

  async getAvailableModels(projectId: string) {
    await delay(50);
    return [
      { id: 'deepseek', providerId: 'openrouter', name: 'deepseek', displayName: 'DeepSeek', enabled: true, capabilities: ['coding'] },
      { id: 'glm-5', providerId: 'openrouter', name: 'glm-5', displayName: 'GLM-5', enabled: true, capabilities: ['coding'] },
      { id: 'nemotron', providerId: 'nvidia', name: 'nemotron', displayName: 'Nemotron', enabled: true, capabilities: ['coding'] },
      { id: 'qwen', providerId: 'openrouter', name: 'qwen', displayName: 'Qwen', enabled: true, capabilities: ['coding'] },
      { id: 'claude-sonnet', providerId: 'openrouter', name: 'claude-sonnet', displayName: 'Claude Sonnet', enabled: true, capabilities: ['coding'] },
      { id: 'gpt-4', providerId: 'openrouter', name: 'gpt-4', displayName: 'GPT-4', enabled: true, capabilities: ['coding'] },
    ];
  },

  async updateProject(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    if (input.name !== undefined) cached.project.name = input.name;
    if (input.description !== undefined) cached.project.description = input.description;
    if (input.status !== undefined) cached.project.status = input.status;
    cached.project.updatedAt = new Date().toISOString();
    return cached.project;
  },

  async updateAgent(projectId: string, role: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    const agent = cached.agents.find((a: any) => a.role === role);
    if (!agent) throw new Error(`Agent ${role} not found`);
    if (input.providerId !== undefined) agent.providerId = input.providerId;
    if (input.modelId !== undefined) agent.modelId = input.modelId;
    if (input.enabled !== undefined) agent.enabled = input.enabled;
    return agent;
  },

  async updateSecuritySettings(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    Object.assign(cached.security, input);
    return cached.security;
  },

  async updateDesignSettings(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    Object.assign(cached.design, input);
    return cached.design;
  },

  async updateDeploymentSettings(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    Object.assign(cached.deployment, input);
    return cached.deployment;
  },

  async updateGitHubSettings(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    Object.assign(cached.github, input);
    return cached.github;
  },

  async connectProvider(projectId: string, input: any) {
    await delay(500);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    const provider: any = { id: 'new', projectId, providerKey: input.providerKey, displayName: input.providerKey, status: 'connected' as const, connectedAt: new Date().toISOString() };
    cached.providers = cached.providers.filter((p: any) => p.providerKey !== input.providerKey);
    cached.providers.push(provider);
    return { provider };
  },

  async disconnectProvider(projectId: string, providerKey: string) {
    await delay(300);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    cached.providers = cached.providers.map((p: any) => p.providerKey === providerKey ? { ...p, status: 'disconnected' } : p);
  },

  async connectIntegration(projectId: string, input: any) {
    await delay(500);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    const integration: any = { id: 'new', projectId, integrationKey: input.integrationKey, displayName: input.integrationKey, status: 'connected' as const };
    cached.integrations = cached.integrations.filter((i: any) => i.integrationKey !== input.integrationKey);
    cached.integrations.push(integration);
    return { integration };
  },

  async disconnectIntegration(projectId: string, integrationKey: string) {
    await delay(300);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    cached.integrations = cached.integrations.map((i: any) => i.integrationKey === integrationKey ? { ...i, status: 'disconnected' } : i);
  },

  async upsertEnvironmentVariable(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    let variable = cached.environmentVariables.find((v: any) => v.key === input.key && v.environment === input.environment);
    if (!variable) {
      variable = { id: 'new', key: input.key, environment: input.environment, hasValue: !!input.value, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      cached.environmentVariables.push(variable);
    } else {
      variable.hasValue = !!input.value;
      variable.updatedAt = new Date().toISOString();
    }
    return variable;
  },

  async deleteEnvironmentVariable(projectId: string, variableId: string) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    cached.environmentVariables = cached.environmentVariables.filter((v: any) => v.id !== variableId);
  },

  async archiveProject(projectId: string) {
    await delay(300);
    const cached = getOrCreateProject(projectId, 'Hall Project');
    cached.project.status = 'archived';
    return cached.project;
  },

  async resetSettings(projectId: string) {
    await delay(300);
    projectCache.delete(projectId);
    return this.getProjectSettings(projectId);
  },

  async deleteProject(projectId: string) {
    await delay(300);
    projectCache.delete(projectId);
  },
};