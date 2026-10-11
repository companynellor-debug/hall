import { delay, generateId } from '../utils/helpers';
import type { ProjectSettingsRepository } from '../repositories';
import type { AvailableModel, ProjectSettings } from '../types';

/* ===================== Catálogos do produto (não são dados do projeto) ===================== */

const PROVIDER_CATALOG: Record<string, { displayName: string; description: string; models: AvailableModel[] }> = {
  nvidia: {
    displayName: 'NVIDIA',
    description: 'Modelos Nemotron, infraestrutura GPU.',
    models: [
      { id: 'nemotron', providerId: 'nvidia', name: 'nemotron', displayName: 'Nemotron', enabled: true, capabilities: ['coding', 'reasoning'] },
    ],
  },
  openrouter: {
    displayName: 'OpenRouter',
    description: 'Acesso a múltiplos modelos (DeepSeek, Qwen, GLM, Claude).',
    models: [
      { id: 'deepseek', providerId: 'openrouter', name: 'deepseek', displayName: 'DeepSeek', enabled: true, capabilities: ['coding', 'reasoning'] },
      { id: 'glm-5', providerId: 'openrouter', name: 'glm-5', displayName: 'GLM-5', enabled: true, capabilities: ['coding', 'general'] },
      { id: 'qwen', providerId: 'openrouter', name: 'qwen', displayName: 'Qwen', enabled: true, capabilities: ['coding', 'multilingual'] },
      { id: 'claude-sonnet', providerId: 'openrouter', name: 'claude-sonnet', displayName: 'Claude Sonnet', enabled: true, capabilities: ['coding', 'reasoning', 'analysis'] },
      { id: 'gpt-4', providerId: 'openrouter', name: 'gpt-4', displayName: 'GPT-4', enabled: true, capabilities: ['coding', 'reasoning', 'general'] },
    ],
  },
};

const INTEGRATION_CATALOG: Record<string, { displayName: string; description: string; category: string }> = {
  github: { displayName: 'GitHub', description: 'Repositório e automações de CI/CD.', category: 'version-control' },
  supabase: { displayName: 'Supabase', description: 'Banco de dados e autenticação.', category: 'database' },
  vercel: { displayName: 'Vercel', description: 'Deploy e hospedagem.', category: 'hosting' },
  asaas: { displayName: 'Asaas', description: 'Pagamentos e cobrança.', category: 'payments' },
  stripe: { displayName: 'Stripe', description: 'Pagamentos e cobrança internacional.', category: 'payments' },
};

/* ===================== Estado inicial: totalmente vazio ===================== */

const projectCache = new Map<string, ProjectSettings>();

function getOrCreateProject(projectId: string, projectName: string): ProjectSettings {
  let cached = projectCache.get(projectId);
  if (!cached) {
    const now = new Date().toISOString();
    cached = {
      project: {
        id: projectId,
        workspaceId: 'ws-1',
        name: projectName,
        slug: projectName.toLowerCase().replace(/\s+/g, '-'),
        description: '',
        status: 'active',
        createdAt: now,
        updatedAt: now,
      },
      agents: [
        { id: generateId(), projectId, role: 'coding', enabled: false },
        { id: generateId(), projectId, role: 'design', enabled: false },
        { id: generateId(), projectId, role: 'security', enabled: false },
        { id: generateId(), projectId, role: 'review', enabled: false },
      ],
      providers: [],
      integrations: [],
      github: { connected: false },
      security: {
        allowAgentDependencyInstall: false,
        allowAgentEnvironmentChanges: false,
        allowAgentDeployments: false,
        requireApprovalForSensitiveActions: true,
        securityScanEnabled: false,
      },
      design: { preferredTheme: 'system', previewDevice: 'desktop', designInstructions: '' },
      deployment: { autoDeploy: false, status: 'not_configured' },
      environmentVariables: [],
      health: {
        build: { status: 'unknown' },
        security: { status: 'unknown' },
        webhooks: { status: 'unknown' },
      },
    };
    projectCache.set(projectId, cached);
  }
  return cached;
}

export const mockProjectSettingsRepository: ProjectSettingsRepository = {
  async getProjectSettings(projectId: string) {
    await delay(100);
    return getOrCreateProject(projectId, 'Novo Projeto');
  },

  async getAvailableModels(projectId: string) {
    await delay(50);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    return cached.providers
      .filter((p) => p.status === 'connected')
      .flatMap((p) => PROVIDER_CATALOG[p.providerKey]?.models ?? []);
  },

  async updateProject(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    if (input.name !== undefined) cached.project.name = input.name;
    if (input.description !== undefined) cached.project.description = input.description;
    if (input.status !== undefined) cached.project.status = input.status;
    cached.project.updatedAt = new Date().toISOString();
    return cached.project;
  },

  async updateAgent(projectId: string, role: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    const agent = cached.agents.find((a) => a.role === role);
    if (!agent) throw new Error(`Agent ${role} not found`);
    if (input.providerId !== undefined) agent.providerId = input.providerId;
    if (input.modelId !== undefined) agent.modelId = input.modelId;
    if (input.enabled !== undefined) agent.enabled = input.enabled;
    return agent;
  },

  async updateSecuritySettings(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    Object.assign(cached.security, input);
    return cached.security;
  },

  async updateDesignSettings(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    Object.assign(cached.design, input);
    return cached.design;
  },

  async updateDeploymentSettings(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    Object.assign(cached.deployment, input);
    if (cached.deployment.provider && cached.deployment.status === 'not_configured') {
      cached.deployment.status = 'ready';
    }
    return cached.deployment;
  },

  async updateGitHubSettings(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    Object.assign(cached.github, input);
    cached.project.updatedAt = new Date().toISOString();
    return cached.github;
  },

  async connectProvider(projectId: string, input: any) {
    await delay(500);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    const catalog = PROVIDER_CATALOG[input.providerKey];
    const provider = {
      id: generateId(),
      projectId,
      providerKey: input.providerKey,
      displayName: catalog?.displayName ?? input.providerKey,
      status: 'connected' as const,
      capabilities: catalog?.models.map((m) => m.displayName),
      connectedAt: new Date().toISOString(),
      metadata: input.metadata,
    };
    cached.providers = cached.providers.filter((p) => p.providerKey !== input.providerKey);
    cached.providers.push(provider);
    return { provider };
  },

  async disconnectProvider(projectId: string, providerKey: string) {
    await delay(300);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    cached.providers = cached.providers.filter((p) => p.providerKey !== providerKey);
  },

  async connectIntegration(projectId: string, input: any) {
    await delay(500);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    const catalog = INTEGRATION_CATALOG[input.integrationKey];
    const integration = {
      id: generateId(),
      projectId,
      integrationKey: input.integrationKey,
      displayName: catalog?.displayName ?? input.integrationKey,
      description: catalog?.description,
      category: catalog?.category,
      status: 'connected' as const,
      metadata: input.metadata,
    };
    cached.integrations = cached.integrations.filter((i) => i.integrationKey !== input.integrationKey);
    cached.integrations.push(integration);
    return { integration };
  },

  async disconnectIntegration(projectId: string, integrationKey: string) {
    await delay(300);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    cached.integrations = cached.integrations.filter((i) => i.integrationKey !== integrationKey);
  },

  async upsertEnvironmentVariable(projectId: string, input: any) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    let variable = cached.environmentVariables.find((v) => v.key === input.key && v.environment === input.environment);
    if (!variable) {
      variable = {
        id: generateId(),
        key: input.key,
        environment: input.environment,
        hasValue: !!input.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      cached.environmentVariables.push(variable);
    } else {
      variable.hasValue = !!input.value;
      variable.updatedAt = new Date().toISOString();
    }
    return variable;
  },

  async deleteEnvironmentVariable(projectId: string, variableId: string) {
    await delay(200);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    cached.environmentVariables = cached.environmentVariables.filter((v) => v.id !== variableId);
  },

  async archiveProject(projectId: string) {
    await delay(300);
    const cached = getOrCreateProject(projectId, 'Novo Projeto');
    cached.project.status = 'archived';
    cached.project.updatedAt = new Date().toISOString();
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
