import { useState, useCallback } from 'react';
import {
  LayoutGrid, Bot, Activity, MoreHorizontal,
  Shield, Palette, Rocket, Variable, ScrollText,
  SlidersHorizontal, CircleCheck, TriangleAlert, CircleMinus, Plus, Pencil, Trash2, Search, RefreshCw, Puzzle,
  List,
} from 'lucide-react';
import { Icon } from '../ui/Icon';
import { BrandLogo } from './BrandLogo';
import {
  SettingsCard, StatusBadge, Field, SettingsInput, SettingsTextarea, SettingsSelect,
  SettingsToggle, Btn, type BadgeTone,
} from './ui';
import {
  AGENTS, WORKSPACES, STATUSES, PROVIDERS, INTEGRATIONS,
  type SettingsForm, type AgentKey, type LogLevel,
} from './data';
import type { UpdateProjectInput, UpdateAgentInput, AgentRole, AvailableModel, ProjectHealth, HealthStatus } from '../../features/project-settings/types';
import { ConnectionCard } from './ConnectionCard';
import { IntegrationLogo } from './IntegrationLogo';
import { INTEGRATION_DOMAINS, INTEGRATION_CATEGORIES_DOMAIN } from './integrationDomains';
import type { IntegrationDomain } from './integrationDomains';

type Update = (fn: (f: SettingsForm) => SettingsForm) => void;

interface SectionProps {
  settings: any;
  form: SettingsForm;
  update: Update;
  availableModels: AvailableModel[];
  updateProject: (input: UpdateProjectInput) => void;
  updateAgent: (role: AgentRole, input: UpdateAgentInput) => void;
  updateSecurity: (input: any) => void;
  updateDesign: (input: any) => void;
  updateDeployment: (input: any) => void;
  updateGitHub: (input: any) => void;
  connectProvider: (input: any) => Promise<void>;
  disconnectProvider: (providerKey: string) => Promise<void>;
  connectIntegration: (input: any) => Promise<void>;
  disconnectIntegration: (integrationKey: string) => Promise<void>;
  upsertEnvVar: (input: any) => Promise<void>;
  deleteEnvVar: (variableId: string) => Promise<void>;
}

function BrandIcon({ name, size = 22 }: { name: string; size?: number }) {
  return <BrandLogo name={name} size={size} />;
}

/* =================== Agent Model Row =================== */
function AgentModelRow({ k, settings, availableModels, updateAgent }: { k: AgentKey; settings: any; availableModels: AvailableModel[]; updateAgent: (role: AgentRole, input: UpdateAgentInput) => void }) {
  const meta = AGENTS.find((a) => a.key === k)!;
  const cfg = settings.agents.find((a: any) => a.role === k);
  const active = !!cfg?.enabled;
  const model = cfg?.modelId ?? '';
  const options = availableModels.filter(m => m.enabled).map(m => m.displayName);

  const handleChange = useCallback((v: string) => {
    const selected = availableModels.find(m => m.displayName === v);
    updateAgent(k, { modelId: v, providerId: selected?.providerId });
  }, [updateAgent, k, availableModels]);
  const handleToggle = useCallback(() => updateAgent(k, { enabled: !active }), [updateAgent, k, active]);

  return (
    <div className="st-agent-row" data-testid={`agent-row-${k}`}>
      <div className="st-agent-info">
        <div className="st-agent-title">{meta.title}</div>
        <div className="st-agent-desc">{meta.description}</div>
      </div>
      <SettingsSelect
        value={model}
        options={options}
        onChange={handleChange}
        placeholder={options.length === 0 ? 'Conecte um provedor' : 'Selecionar modelo'}
        disabled={options.length === 0}
        data-testid={`agent-model-${k}`}
      />
      <SettingsToggle checked={active} onChange={handleToggle} data-testid={`agent-toggle-${k}`} />
    </div>
  );
}

/* =================== Health Row =================== */
const HEALTH_ICON: Record<HealthStatus, typeof CircleCheck> = {
  ok: CircleCheck, warning: TriangleAlert, error: TriangleAlert, unknown: CircleMinus,
};
const HEALTH_TONE: Record<HealthStatus, BadgeTone> = {
  ok: 'ok', warning: 'warn', error: 'error', unknown: 'neutral',
};
const HEALTH_LABEL: Record<HealthStatus, string> = {
  ok: 'OK', warning: 'Atenção', error: 'Erro', unknown: 'Sem dados',
};

function HealthRow({ title, desc, status }: { title: string; desc: string; status: HealthStatus }) {
  const HealthIcon = HEALTH_ICON[status];
  return (
    <div className="st-health-row">
      <span className={`st-health-ico ${status === 'unknown' ? '' : HEALTH_TONE[status]}`}>
        <HealthIcon size={18} />
      </span>
      <div className="st-health-info">
        <div className="st-health-title">{title}</div>
        <div className="st-health-desc">{desc || 'Ainda não verificado.'}</div>
      </div>
      <StatusBadge tone={HEALTH_TONE[status]} label={HEALTH_LABEL[status]} dot={status !== 'unknown'} />
    </div>
  );
}

/* =================== Provider Card =================== */
function ProviderCard({ p, connectProvider, disconnectProvider, settings }: { p: { id: string; name: string; description: string; icon: string }; connectProvider: (input: any) => Promise<void>; disconnectProvider: (providerKey: string) => Promise<void>; settings: { providers: Array<{ providerKey: string; status: string }> } }) {
  const [busy, setBusy] = useState(false);
  const provider = settings.providers.find(pv => pv.providerKey === p.id);
  const connected = provider?.status === 'connected';

  const handleConnect = useCallback(async () => { setBusy(true); try { await connectProvider({ providerKey: p.id }); } finally { setBusy(false); } }, [connectProvider, p.id]);
  const handleDisconnect = useCallback(async () => { setBusy(true); try { await disconnectProvider(p.id); } finally { setBusy(false); } }, [disconnectProvider, p.id]);

  return (
    <div className="st-provider" data-testid={`provider-${p.id}`}>
      <div className="st-provider-top">
        <span className="st-brand">{<BrandIcon name={p.icon} size={22} />}</span>
        <div className="st-provider-main">
          <div className="st-provider-name">{p.name}</div>
          <span className={`st-conn ${connected ? 'ok' : ''}`}><span className="st-badge-dot" />{connected ? 'Conectado' : 'Não conectado'}</span>
        </div>
        {connected && <button className="st-more" aria-label="Mais opções"><MoreHorizontal size={16} /></button>}
      </div>
      <p className="st-provider-desc">{p.description}</p>
      <div className="st-provider-actions">
        <Btn variant={connected ? 'secondary' : 'primary'} disabled={busy} onClick={connected ? handleDisconnect : handleConnect} data-testid={`provider-action-${p.id}`}>
          {busy ? 'Aguarde...' : connected ? 'Desconectar' : 'Conectar'}
        </Btn>
      </div>
    </div>
  );
}

/* =================== OVERVIEW =================== */
export function OverviewSection(props: SectionProps) {
  const { form, update, settings, availableModels, updateAgent, connectProvider, disconnectProvider, connectIntegration, disconnectIntegration } = props;

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => update(f => ({ ...f, name: e.target.value })), [update]);
  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => update(f => ({ ...f, description: e.target.value })), [update]);
  const handleWorkspaceChange = useCallback((v: string) => update(f => ({ ...f, workspace: v })), [update]);
  const handleStatusChange = useCallback((v: string) => update(f => ({ ...f, status: v as SettingsForm['status'] })), [update]);

  const health: ProjectHealth | undefined = settings?.health;

  return (
    <div className="st-sections">
      <SettingsCard
        icon={<LayoutGrid size={18} />}
        title="Project Overview"
        subtitle="Informações básicas e status do seu projeto."
      >
        <div className="st-overview-grid">
          <Field label="Nome do projeto" helper="Este é o nome exibido em todo o HALL.">
            <SettingsInput value={form.name} onChange={handleNameChange} placeholder="Nome do projeto" data-testid="overview-name" />
          </Field>
          <Field label="Descrição" counter={`${form.description.length}/280`}>
            <SettingsTextarea value={form.description} maxLength={280} rows={3} onChange={handleDescriptionChange} placeholder="Descreva o objetivo do projeto…" data-testid="overview-description" />
          </Field>
          <Field label="Workspace" helper="Este projeto pertence a este workspace.">
            <SettingsSelect value={form.workspace} options={WORKSPACES} onChange={handleWorkspaceChange} data-testid="overview-workspace" />
          </Field>
          <Field label="Status" helper="Estado atual do projeto.">
            <SettingsSelect value={form.status} options={STATUSES} dotTone={form.status === 'Ativo' ? 'ok' : form.status === 'Pausado' ? 'warn' : 'neutral'} onChange={handleStatusChange} data-testid="overview-status" />
          </Field>
        </div>
      </SettingsCard>

      <div className="st-two-col">
        <div className="st-col">
          <SettingsCard icon={<Bot size={18} />} title="Agent Responsibilities" subtitle="Defina quais modelos e agentes são responsáveis por cada tipo de tarefa.">
            <div className="st-agent-list">
              {AGENTS.map((a) => <AgentModelRow key={a.key} k={a.key} settings={settings} availableModels={availableModels} updateAgent={updateAgent} />)}
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<Activity size={18} />}
            title="Project Health"
            subtitle="Status geral do projeto e serviços associados."
          >
            {health ? (
              <div className="st-health-list">
                <HealthRow title="Build Status" status={health.build.status} desc={health.build.message ?? ''} />
                <HealthRow title="Security Scan" status={health.security.status} desc={health.security.message ?? ''} />
                <HealthRow title="Webhooks" status={health.webhooks.status} desc={health.webhooks.message ?? ''} />
              </div>
            ) : (
              <div className="st-empty">Nenhum dado de saúde disponível.</div>
            )}
          </SettingsCard>
        </div>

        <div className="st-col">
          <SettingsCard
            icon={<Puzzle size={18} />}
            title="Model Providers"
            subtitle="Conecte provedores de modelos para habilitar agentes."
          >
            <div className="st-provider-grid">
              {PROVIDERS.map((p) => <ProviderCard key={p.id} p={p} connectProvider={connectProvider} disconnectProvider={disconnectProvider} settings={settings} />)}
            </div>
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}

/* =================== MODELS & AGENTS =================== */
export function ModelsSection(props: SectionProps) {
  const { settings, availableModels, updateAgent } = props;
  const modelOptions = availableModels.filter(m => m.enabled).map(m => m.displayName);

  return (
    <div className="st-sections">
      <div className="st-section-head">
        <h2>Models & Agents</h2>
        <p>Configure os agentes responsáveis por cada tipo de tarefa do projeto.</p>
      </div>
      {modelOptions.length === 0 && (
        <p className="st-hint">Nenhum modelo disponível. Conecte um provedor de modelos na aba Overview para habilitar os agentes.</p>
      )}
      <div className="st-agent-cards">
        {AGENTS.map((a) => {
          const cfg = settings.agents.find((ag: any) => ag.role === a.key);
          const active = !!cfg?.enabled;
          const model = cfg?.modelId ?? '';
          return (
            <div key={a.key} className="st-agent-card" data-testid={`agent-card-${a.key}`}>
              <div className="st-agent-card-left">
                <span className="st-card-icon"><Bot size={18} /></span>
                <div>
                  <div className="st-agent-title">{a.title}</div>
                  <div className="st-agent-desc">{a.description}</div>
                </div>
              </div>
              <div className="st-agent-card-right">
                <SettingsSelect
                  value={modelOptions.includes(model) ? model : ''}
                  options={modelOptions}
                  onChange={(v) => {
                    const selected = availableModels.find(m => m.displayName === v);
                    updateAgent(a.key, { modelId: v, providerId: selected?.providerId });
                  }}
                  placeholder={modelOptions.length === 0 ? 'Conecte um provedor' : 'Selecionar modelo'}
                  disabled={modelOptions.length === 0}
                  data-testid={`models-select-${a.key}`}
                />
                <div className="st-agent-toggle">
                  <span className="st-mini-label">{active ? 'Ativo' : 'Inativo'}</span>
                  <SettingsToggle checked={active} onChange={() => updateAgent(a.key, { enabled: !active })} data-testid={`models-toggle-${a.key}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =================== GITHUB =================== */
export function GithubSection(props: SectionProps) {
  const { settings, updateGitHub, connectIntegration, disconnectIntegration } = props;
  const gh = settings.github ?? {};
  const connected = !!gh.connected && !!gh.repositoryFullName;
  const [repoDraft, setRepoDraft] = useState('');
  const [busy, setBusy] = useState(false);

  const handleConnect = useCallback(async () => {
    if (!repoDraft.trim()) return;
    setBusy(true);
    try {
      await connectIntegration({ integrationKey: 'github' });
      updateGitHub({
        connected: true,
        repositoryFullName: repoDraft.trim(),
        defaultBranch: 'main',
        autoSync: false,
      });
    } finally {
      setBusy(false);
    }
  }, [connectIntegration, updateGitHub, repoDraft]);

  const handleDisconnect = useCallback(async () => {
    setBusy(true);
    try {
      await disconnectIntegration('github');
      updateGitHub({ connected: false, repositoryFullName: undefined, lastSyncAt: undefined });
    } finally {
      setBusy(false);
    }
  }, [disconnectIntegration, updateGitHub]);

  const handleSyncNow = useCallback(() => {
    updateGitHub({ lastSyncAt: new Date().toISOString() });
  }, [updateGitHub]);

  return (
    <div className="st-sections">
      <div className="st-section-head">
        <h2>GitHub</h2>
        <p>Configure o repositório conectado ao projeto.</p>
      </div>

      {!connected ? (
        <SettingsCard icon={<Icon name="github" size={18} />} title="Conectar repositório" subtitle="Conecte um repositório GitHub para habilitar sincronização e CI/CD.">
          <div className="st-stack">
            <Field label="Repositório" helper="Formato: organização/repositório">
              <SettingsInput value={repoDraft} onChange={(e) => setRepoDraft(e.target.value)} placeholder="organização/repositório" data-testid="github-repo" />
            </Field>
            <div className="st-btn-row">
              <Btn variant="primary" disabled={busy || !repoDraft.trim()} onClick={handleConnect} data-testid="github-connect">
                {busy ? 'Conectando...' : 'Conectar GitHub'}
              </Btn>
            </div>
          </div>
        </SettingsCard>
      ) : (
        <SettingsCard icon={<Icon name="github" size={18} />} title="Repositório" subtitle="Conexão e sincronização com o GitHub.">
          <div className="st-stack">
            <div className="st-inline-row">
              <div className="st-inline-info">
                <div className="st-row-title">{gh.repositoryFullName}</div>
                <div className="st-row-desc">Branch padrão: {gh.defaultBranch || 'main'}</div>
              </div>
              <StatusBadge tone="ok" label="Conectado" />
            </div>
            <Field label="Branch padrão">
              <SettingsSelect value={gh.defaultBranch || 'main'} options={['main', 'develop', 'staging']} onChange={(v) => updateGitHub({ defaultBranch: v })} data-testid="github-branch" />
            </Field>
            <div className="st-inline-row">
              <div className="st-inline-info"><div className="st-row-title">Auto Sync</div><div className="st-row-desc">Sincronizar automaticamente a cada push.</div></div>
              <SettingsToggle checked={!!gh.autoSync} onChange={(v) => updateGitHub({ autoSync: v })} data-testid="github-autosync" />
            </div>
            <div className="st-inline-row">
              <div className="st-inline-info">
                <div className="st-row-title">Última sincronização</div>
                <div className="st-row-desc">{gh.lastSyncAt ? new Date(gh.lastSyncAt).toLocaleString('pt-BR') : 'Nunca sincronizado.'}</div>
              </div>
            </div>
            <div className="st-btn-row">
              <Btn variant="primary" onClick={handleSyncNow} data-testid="github-sync"><RefreshCw size={15} /> Sincronizar agora</Btn>
              <Btn variant="danger" disabled={busy} onClick={handleDisconnect} data-testid="github-disconnect">Desconectar</Btn>
            </div>
          </div>
        </SettingsCard>
      )}
    </div>
  );
}

/* =================== INTEGRATIONS =================== */
export function IntegrationsSection(props: SectionProps) {
  const { settings, connectIntegration, disconnectIntegration } = props;

  const isConnected = (id: string) => settings.integrations.some((i: any) => i.integrationKey === id && i.status === 'connected');

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredIntegrations = INTEGRATION_DOMAINS.filter((it) => {
    if (activeCategory !== 'all' && it.category !== activeCategory) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!it.name.toLowerCase().includes(q) && !it.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const categories = ['all', ...INTEGRATION_CATEGORIES_DOMAIN.map((c) => c.key)] as const;

  // Marquee: 3 linhas com logos deslizando (estilo hero)
  const marqueeRows: IntegrationDomain[][] = [0, 1, 2].map((row) =>
    INTEGRATION_DOMAINS.filter((_, i) => i % 3 === row)
  );

  return (
    <div className="st-sections st-integrations">
      {/* Hero */}
      <div className="st-lov-hero">
        <div className="st-lov-marquee" aria-hidden="true">
          {marqueeRows.map((row, idx) => (
            <div key={idx} className={`st-lov-marquee-row ${idx % 2 === 1 ? 'reverse' : ''}`}>
              <div className="st-lov-marquee-track">
                {[...row, ...row].map((it, i) => (
                  <span key={`${it.id}-${i}`} className="st-lov-marquee-chip">
                    <IntegrationLogo domain={it.domain} name={it.name} size={16} />
                    {it.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <h2 className="st-lov-title">Crie a partir do que você já usa</h2>
        <p className="st-lov-subtitle">
          Integrações conectam seu app a ferramentas externas como Stripe, Slack e Google.
          Configure em poucos cliques.
        </p>
        <div className="st-lov-actions">
          <a
            className="st-lov-btn ghost"
            href="https://docs.lovable.dev/integrations"
            target="_blank"
            rel="noreferrer"
          >
            Ver documentação
          </a>
        </div>
      </div>

      {/* Toolbar */}
      <div className="st-int-toolbar">
        <div className="st-int-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Buscar integrações..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="integrations-search"
          />
        </div>
        <div className="st-filter-group" role="group" aria-label="Categorias">
          {categories.map((cat) => {
            const category = INTEGRATION_CATEGORIES_DOMAIN.find((c) => c.key === cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                className={`st-filter-chip ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat}`}
              >
                <span>{category ? category.label : 'Todas'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de integrações */}
      {filteredIntegrations.length === 0 ? (
        <div className="st-empty">Nenhuma integração encontrada.</div>
      ) : (
        <div className="st-conn-rows">
          {filteredIntegrations.map((it) => (
            <ConnectionCard
              key={it.id}
              integration={it}
              isConnected={isConnected(it.id)}
              busy={false}
              onConnect={() => connectIntegration({ integrationKey: it.id })}
              onDisconnect={() => disconnectIntegration(it.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* =================== SECURITY =================== */
const SECURITY_OPTS: { key: keyof SettingsForm['security']; settingsKey: string; label: string; desc: string }[] = [
  { key: 'deps', settingsKey: 'allowAgentDependencyInstall', label: 'Permitir instalação de dependências', desc: 'O agente pode instalar novos pacotes.' },
  { key: 'env', settingsKey: 'allowAgentEnvironmentChanges', label: 'Permitir alterações em variáveis de ambiente', desc: 'O agente pode editar variáveis de ambiente.' },
  { key: 'deploy', settingsKey: 'allowAgentDeployments', label: 'Permitir deploy pelo agente', desc: 'O agente pode acionar deploys.' },
  { key: 'confirm', settingsKey: 'requireApprovalForSensitiveActions', label: 'Exigir confirmação para ações sensíveis', desc: 'Pedir aprovação antes de ações críticas.' },
  { key: 'scan', settingsKey: 'securityScanEnabled', label: 'Security scan automático', desc: 'Executar verificação de segurança a cada build.' },
];

export function SecuritySection(props: SectionProps) {
  const { settings, updateSecurity } = props;

  const handleToggle = useCallback((settingsKey: string, current: boolean) => updateSecurity({ [settingsKey]: !current }), [updateSecurity]);

  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Security</h2><p>Controle o que o agente pode fazer no seu projeto.</p></div>
      <SettingsCard icon={<Shield size={18} />} title="Permissões" subtitle="Defina políticas de segurança do projeto.">
        <div className="st-toggle-list">
          {SECURITY_OPTS.map((o) => {
            const current = !!settings.security[o.settingsKey as keyof typeof settings.security];
            return (
              <div key={o.key} className="st-inline-row">
                <div className="st-inline-info"><div className="st-row-title">{o.label}</div><div className="st-row-desc">{o.desc}</div></div>
                <SettingsToggle checked={current} onChange={() => handleToggle(o.settingsKey, current)} data-testid={`security-${o.key}`} />
              </div>
            );
          })}
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== DESIGN =================== */
export function DesignSection(props: SectionProps) {
  const { settings, updateDesign } = props;
  const design = settings.design ?? { preferredTheme: 'system', previewDevice: 'desktop', designInstructions: '' };

  const themeValue = design.preferredTheme === 'system' ? 'System' : design.preferredTheme === 'dark' ? 'Dark' : 'Light';
  const deviceValue = design.previewDevice === 'desktop' ? 'Desktop' : design.previewDevice === 'tablet' ? 'Tablet' : 'Mobile';

  const handleThemeChange = useCallback((v: string) => updateDesign({ preferredTheme: v.toLowerCase() }), [updateDesign]);
  const handleDeviceChange = useCallback((v: string) => updateDesign({ previewDevice: v.toLowerCase() }), [updateDesign]);
  const handleInstructionsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => updateDesign({ designInstructions: e.target.value }), [updateDesign]);

  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Design</h2><p>Preferências visuais e instruções de design do projeto.</p></div>
      <SettingsCard icon={<Palette size={18} />} title="Preferências" subtitle="Tema, dispositivo de preview e instruções.">
        <div className="st-stack">
          <Field label="Theme preference">
            <SettingsSelect value={themeValue} options={['System', 'Dark', 'Light']} onChange={handleThemeChange} data-testid="design-theme" />
          </Field>
          <Field label="Default preview device">
            <SettingsSelect value={deviceValue} options={['Desktop', 'Tablet', 'Mobile']} onChange={handleDeviceChange} data-testid="design-device" />
          </Field>
          <Field label="Design instructions" helper="Guie o Design Agent com diretrizes específicas.">
            <SettingsTextarea rows={4} value={design.designInstructions ?? ''} placeholder="Ex.: usar tons escuros, acento vermelho, tipografia densa…" onChange={handleInstructionsChange} data-testid="design-instructions" />
          </Field>
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== DEPLOY =================== */
const DEPLOY_STATUS: Record<string, { tone: BadgeTone; label: string }> = {
  not_configured: { tone: 'neutral', label: 'Não configurado' },
  ready: { tone: 'ok', label: 'Pronto' },
  deploying: { tone: 'warn', label: 'Publicando' },
  error: { tone: 'error', label: 'Erro' },
};

export function DeploySection(props: SectionProps) {
  const { settings, updateDeployment } = props;
  const deploy = settings.deployment ?? { autoDeploy: false, status: 'not_configured' };
  const status = DEPLOY_STATUS[deploy.status] ?? DEPLOY_STATUS.not_configured;

  const handleProviderChange = useCallback((v: string) => updateDeployment({ provider: v }), [updateDeployment]);
  const handleBranchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => updateDeployment({ productionBranch: e.target.value }), [updateDeployment]);
  const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => updateDeployment({ productionUrl: e.target.value }), [updateDeployment]);
  const handleAutoDeployChange = useCallback((v: boolean) => updateDeployment({ autoDeploy: v }), [updateDeployment]);

  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Deploy</h2><p>Configure como e onde o projeto é publicado.</p></div>
      <SettingsCard icon={<Rocket size={18} />} title="Deployment" subtitle="Provedor e configurações de produção.">
        <div className="st-stack">
          <Field label="Deployment provider">
            <SettingsSelect value={deploy.provider ?? ''} options={['Vercel', 'Netlify', 'Railway']} onChange={handleProviderChange} placeholder="Selecionar provedor" data-testid="deploy-provider" />
          </Field>
          <Field label="Production branch">
            <SettingsInput value={deploy.productionBranch ?? ''} onChange={handleBranchChange} placeholder="main" data-testid="deploy-branch" />
          </Field>
          <Field label="Production URL">
            <SettingsInput value={deploy.productionUrl ?? ''} onChange={handleUrlChange} placeholder="https://…" data-testid="deploy-url" />
          </Field>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Auto Deploy</div><div className="st-row-desc">Publicar automaticamente a cada merge na branch de produção.</div></div>
            <SettingsToggle checked={!!deploy.autoDeploy} onChange={handleAutoDeployChange} data-testid="deploy-autodeploy" />
          </div>
          <div className="st-inline-row">
            <div className="st-inline-info">
              <div className="st-row-title">Deployment Status</div>
              <div className="st-row-desc">{deploy.status === 'not_configured' ? 'Nenhum deploy configurado ainda.' : ''}</div>
            </div>
            <StatusBadge tone={status.tone} label={status.label} dot={deploy.status !== 'not_configured'} />
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== ENVIRONMENT =================== */
export function EnvironmentSection(props: SectionProps) {
  const { settings, upsertEnvVar, deleteEnvVar } = props;
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newEnv, setNewEnv] = useState<'development' | 'preview' | 'production'>('production');

  const handleAdd = useCallback(async () => {
    if (!newKey.trim()) return;
    await upsertEnvVar({ key: newKey.trim().toUpperCase(), environment: newEnv, value: newValue || undefined });
    setNewKey('');
    setNewValue('');
  }, [upsertEnvVar, newKey, newValue, newEnv]);

  const handleDelete = useCallback(async (variableId: string) => {
    await deleteEnvVar(variableId);
  }, [deleteEnvVar]);

  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Environment</h2><p>Variáveis de ambiente do projeto (valores ocultos).</p></div>
      <SettingsCard
        icon={<Variable size={18} />}
        title="Environment Variables"
        subtitle="Gerencie chaves e segredos por ambiente."
        action={
          <div className="st-env-new">
            <SettingsInput value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="KEY_NAME" />
            <SettingsInput value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Valor" type="password" />
            <SettingsSelect value={newEnv} options={['development', 'preview', 'production']} onChange={(v) => setNewEnv(v as 'development' | 'preview' | 'production')} />
            <Btn variant="primary" onClick={handleAdd} disabled={!newKey.trim()} data-testid="env-add"><Plus size={15} /> Adicionar</Btn>
          </div>
        }
      >
        {settings.environmentVariables.length === 0 ? (
          <div className="st-empty">Nenhuma variável configurada. Adicione a primeira acima.</div>
        ) : (
          <div className="st-env-list">
            {settings.environmentVariables.map((v: any) => (
              <div key={v.id} className="st-env-row" data-testid={`env-${v.key}`}>
                <span className="st-env-key">{v.key}</span>
                <span className="st-env-value">••••••••••</span>
                <StatusBadge tone="neutral" label={v.environment} dot={false} />
                <div className="st-env-actions">
                  <button className="st-more" aria-label="Editar"><Pencil size={15} /></button>
                  <button className="st-more danger" aria-label="Excluir" onClick={() => handleDelete(v.id)}><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SettingsCard>
    </div>
  );
}

/* =================== LOGS =================== */
export function LogsSection({ logs }: { logs?: { id: string; level: LogLevel; message: string; source: string; time: string }[] }) {
  const [q, setQ] = useState('');
  const [level, setLevel] = useState('Todos');
  const [source, setSource] = useState('Todas');
  const allLogs = logs ?? [];
  const sources = ['Todas', ...Array.from(new Set(allLogs.map((l) => l.source)))];
  const filtered = allLogs.filter((l) =>
    (level === 'Todos' || l.level === level) &&
    (source === 'Todas' || l.source === source) &&
    l.message.toLowerCase().includes(q.toLowerCase()),
  );
  const tone = (lv: LogLevel) => (lv === 'ERROR' ? 'error' : lv === 'WARNING' ? 'warn' : 'neutral');
  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Logs</h2><p>Eventos recentes do projeto.</p></div>
      <SettingsCard icon={<ScrollText size={18} />} title="Activity logs" subtitle="Filtre por nível, origem ou busca.">
        {allLogs.length === 0 ? (
          <div className="st-empty">Nenhum log registrado ainda.</div>
        ) : (
          <>
            <div className="st-logs-filters">
              <div className="st-search">
                <Search size={15} />
                <input placeholder="Buscar nos logs..." value={q} onChange={(e) => setQ(e.target.value)} data-testid="logs-search" />
              </div>
              <SettingsSelect value={level} options={['Todos', 'INFO', 'WARNING', 'ERROR']} onChange={setLevel} data-testid="logs-level" />
              <SettingsSelect value={source} options={sources} onChange={setSource} data-testid="logs-source" />
            </div>
            <div className="st-logs-list">
              {filtered.map((l) => (
                <div key={l.id} className="st-log-row" data-testid="log-row">
                  <span className={`st-log-level ${tone(l.level)}`}>{l.level}</span>
                  <span className="st-log-msg">{l.message}</span>
                  <span className="st-log-source">{l.source}</span>
                  <span className="st-log-time">{l.time}</span>
                </div>
              ))}
              {filtered.length === 0 && <div className="st-empty">Nenhum log encontrado para esses filtros.</div>}
            </div>
          </>
        )}
      </SettingsCard>
    </div>
  );
}

/* =================== ADVANCED =================== */
function ConfirmDialog({ title, message, confirmLabel, busy, onConfirm, onCancel }: { title: string; message: string; confirmLabel: string; busy: boolean; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="st-modal-overlay" onClick={onCancel}>
      <div className="st-modal" onClick={(e) => e.stopPropagation()} data-testid="confirm-dialog">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="st-btn-row end">
          <Btn variant="secondary" onClick={onCancel} disabled={busy} data-testid="confirm-cancel">Cancelar</Btn>
          <Btn variant="danger" onClick={onConfirm} disabled={busy} data-testid="confirm-ok">{busy ? 'Processando...' : confirmLabel}</Btn>
        </div>
      </div>
    </div>
  );
}

interface AdvancedProps {
  archiveProject: () => Promise<void>;
  resetSettings: () => Promise<void>;
  deleteProject: () => Promise<void>;
  onDeleted: () => void;
}

export function AdvancedSection({ archiveProject, resetSettings, deleteProject, onDeleted }: AdvancedProps) {
  const [pending, setPending] = useState<null | { title: string; message: string; label: string; run: () => Promise<void> }>(null);
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState(false);

  const confirm = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await pending.run();
      if (pending.label !== 'Excluir') {
        setToast(`${pending.label} concluído.`);
        setTimeout(() => setToast(''), 2500);
      }
      setPending(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Advanced</h2><p>Ações avançadas e zona de perigo.</p></div>
      <SettingsCard icon={<SlidersHorizontal size={18} />} title="Danger Zone" subtitle="Essas ações são irreversíveis. Use com cautela." className="danger">
        <div className="st-danger-list">
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Arquivar projeto</div><div className="st-row-desc">O projeto fica somente leitura até ser restaurado.</div></div>
            <Btn variant="danger" onClick={() => setPending({ title: 'Arquivar projeto', message: 'Tem certeza que deseja arquivar este projeto?', label: 'Arquivar', run: archiveProject })} data-testid="danger-archive">Arquivar</Btn>
          </div>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Resetar configurações</div><div className="st-row-desc">Restaura todas as configurações para os valores padrão.</div></div>
            <Btn variant="danger" onClick={() => setPending({ title: 'Resetar configurações', message: 'Isso restaurará todas as configurações. Continuar?', label: 'Resetar', run: resetSettings })} data-testid="danger-reset">Resetar</Btn>
          </div>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Excluir projeto</div><div className="st-row-desc">Exclui permanentemente o projeto e todos os dados.</div></div>
            <Btn variant="danger" onClick={() => setPending({ title: 'Excluir projeto', message: 'Esta ação não pode ser desfeita. Excluir definitivamente?', label: 'Excluir', run: async () => { await deleteProject(); onDeleted(); } })} data-testid="danger-delete">Excluir</Btn>
          </div>
        </div>
      </SettingsCard>
      {pending && <ConfirmDialog title={pending.title} message={pending.message} confirmLabel={pending.label} busy={busy} onConfirm={confirm} onCancel={() => setPending(null)} />}
      {toast && <div className="st-toast" data-testid="danger-toast">{toast}</div>}
    </div>
  );
}