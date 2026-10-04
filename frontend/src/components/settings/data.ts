export type SectionId =
  | 'overview' | 'models' | 'github' | 'integrations' | 'security'
  | 'design' | 'deploy' | 'environment' | 'logs' | 'advanced';

export const MODEL_OPTIONS = ['DeepSeek', 'GLM-5', 'Nemotron', 'Qwen', 'Claude Sonnet', 'GPT'];

export type AgentKey = 'coding' | 'design' | 'security' | 'review';

export interface AgentMeta {
  key: AgentKey;
  title: string;
  description: string;
}

export const AGENTS: AgentMeta[] = [
  { key: 'coding', title: 'Coding Agent', description: 'Implementação, refatoração e tarefas de engenharia.' },
  { key: 'design', title: 'Design Agent', description: 'UI/UX, prototipagem e design de interfaces.' },
  { key: 'security', title: 'Security Agent', description: 'Análise de vulnerabilidades e boas práticas.' },
  { key: 'review', title: 'Review Agent', description: 'Revisão de código, qualidade e documentação.' },
];

export interface SettingsForm {
  name: string;
  description: string;
  workspace: string;
  status: 'Ativo' | 'Pausado' | 'Arquivado';
  agents: Record<AgentKey, { model: string; active: boolean }>;
  security: { deps: boolean; env: boolean; deploy: boolean; confirm: boolean; scan: boolean };
  design: { theme: 'System' | 'Dark' | 'Light'; device: 'Desktop' | 'Tablet' | 'Mobile'; instructions: string };
  github: { repo: string; branch: string; autoSync: boolean };
  deploy: { provider: string; branch: string; url: string; autoDeploy: boolean };
}

export function makeDefaultForm(projectName: string): SettingsForm {
  return {
    name: projectName,
    description: 'Plataforma de gestão e automação para pequenas e médias empresas.',
    workspace: "Nakor's Project",
    status: 'Ativo',
    agents: {
      coding: { model: 'DeepSeek', active: true },
      design: { model: 'GLM-5', active: true },
      security: { model: 'Nemotron', active: true },
      review: { model: 'Qwen', active: true },
    },
    security: { deps: true, env: false, deploy: false, confirm: true, scan: true },
    design: { theme: 'System', device: 'Desktop', instructions: '' },
    github: { repo: `companynellor-debug/${projectName.toLowerCase()}`, branch: 'main', autoSync: true },
    deploy: { provider: 'Vercel', branch: 'main', url: `https://app.${projectName.toLowerCase()}.com`, autoDeploy: true },
  };
}

export const WORKSPACES = ["Nakor's Project", 'Time Nellor', 'Pessoal'];
export const STATUSES: SettingsForm['status'][] = ['Ativo', 'Pausado', 'Arquivado'];

export type ConnState = 'connected' | 'disconnected';

export interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  state: ConnState;
  icon: 'github' | 'supabase' | 'vercel' | 'asaas' | 'stripe';
}

export const INTEGRATIONS: IntegrationItem[] = [
  { id: 'github', name: 'GitHub', description: 'Repositório e automações de CI/CD.', state: 'connected', icon: 'github' },
  { id: 'supabase', name: 'Supabase', description: 'Banco de dados e autenticação.', state: 'connected', icon: 'supabase' },
  { id: 'vercel', name: 'Vercel', description: 'Deploy e hospedagem.', state: 'connected', icon: 'vercel' },
  { id: 'asaas', name: 'Asaas', description: 'Pagamentos e cobrança.', state: 'connected', icon: 'asaas' },
  { id: 'stripe', name: 'Stripe', description: 'Pagamentos (opcional).', state: 'disconnected', icon: 'stripe' },
];

export interface ProviderItem {
  id: string;
  name: string;
  description: string;
  icon: 'nvidia' | 'openrouter';
}

export const PROVIDERS: ProviderItem[] = [
  { id: 'nvidia', name: 'NVIDIA', description: 'Modelos Nemotron, infraestrutura GPU.', icon: 'nvidia' },
  { id: 'openrouter', name: 'OpenRouter', description: 'Acesso a múltiplos modelos (DeepSeek, Qwen, GLM).', icon: 'openrouter' },
];

export interface EnvVar { id: string; key: string; scope: 'Production' | 'Preview' | 'Development' }

export const ENV_VARS: EnvVar[] = [
  { id: '1', key: 'API_URL', scope: 'Production' },
  { id: '2', key: 'DATABASE_URL', scope: 'Production' },
  { id: '3', key: 'NEXT_PUBLIC_APP_URL', scope: 'Preview' },
];

export type LogLevel = 'INFO' | 'WARNING' | 'ERROR';
export interface LogRow { id: string; level: LogLevel; message: string; source: string; time: string }

export const LOGS: LogRow[] = [
  { id: '1', level: 'INFO', message: 'Build iniciado', source: 'build', time: '12:04:21' },
  { id: '2', level: 'INFO', message: 'Build finalizado', source: 'build', time: '12:04:53' },
  { id: '3', level: 'WARNING', message: 'Webhook demorou para responder', source: 'webhooks', time: '12:06:10' },
  { id: '4', level: 'ERROR', message: 'Deploy falhou', source: 'deploy', time: '12:09:44' },
  { id: '5', level: 'INFO', message: 'Nova sincronização com GitHub', source: 'github', time: '12:12:02' },
];
