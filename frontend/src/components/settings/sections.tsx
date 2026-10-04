import { useState } from 'react';
import {
  LayoutGrid, Bot, Link2, Puzzle, Activity, Webhook, MoreHorizontal,
  Cpu, Boxes, Database, Triangle, CreditCard, Shield, Palette, Rocket, Variable, ScrollText,
  SlidersHorizontal, CircleCheck, TriangleAlert, Plus, Pencil, Trash2, Search, RefreshCw,
} from 'lucide-react';
import { Icon } from '../ui/Icon';
import {
  SettingsCard, StatusBadge, Field, SettingsInput, SettingsTextarea, SettingsSelect,
  SettingsToggle, Btn,
} from './ui';
import {
  AGENTS, MODEL_OPTIONS, WORKSPACES, STATUSES, INTEGRATIONS, PROVIDERS, ENV_VARS, LOGS,
  type SettingsForm, type AgentKey, type IntegrationItem, type ProviderItem, type LogLevel,
} from './data';

type Update = (fn: (f: SettingsForm) => SettingsForm) => void;
interface SectionProps { form: SettingsForm; update: Update }

/* =================== Brand icon =================== */
function BrandIcon({ name, size = 22 }: { name: string; size?: number }) {
  switch (name) {
    case 'github': return <Icon name="github" size={size} />;
    case 'nvidia': return <Cpu size={size} color="#76b900" />;
    case 'openrouter': return <Boxes size={size} />;
    case 'supabase': return <Database size={size} color="#3ecf8e" />;
    case 'vercel': return <Triangle size={size} fill="currentColor" />;
    case 'asaas': return <span className="st-brand-letter" style={{ color: '#2a6bff' }}>a</span>;
    case 'stripe': return <CreditCard size={size} color="#8a7dff" />;
    default: return <Puzzle size={size} />;
  }
}

/* =================== OVERVIEW =================== */
function AgentModelRow({ k, form, update }: { k: AgentKey; form: SettingsForm; update: Update }) {
  const meta = AGENTS.find((a) => a.key === k)!;
  const cfg = form.agents[k];
  return (
    <div className="st-agent-row" data-testid={`agent-row-${k}`}>
      <div className="st-agent-info">
        <div className="st-agent-title">{meta.title}</div>
        <div className="st-agent-desc">{meta.description}</div>
      </div>
      <SettingsSelect
        value={cfg.model}
        options={MODEL_OPTIONS}
        onChange={(v) => update((f) => ({ ...f, agents: { ...f.agents, [k]: { ...f.agents[k], model: v } } }))}
        data-testid={`agent-model-${k}`}
      />
      <StatusBadge tone={cfg.active ? 'ok' : 'neutral'} label={cfg.active ? 'Ativo' : 'Inativo'} />
    </div>
  );
}

function HealthRow({ icon, title, desc, tone, badge }: { icon: React.ReactNode; title: string; desc: string; tone: 'ok' | 'warn' | 'error'; badge: string }) {
  return (
    <div className="st-health-row">
      <span className={`st-health-ico ${tone}`}>{icon}</span>
      <div className="st-health-info">
        <div className="st-health-title">{title}</div>
        <div className="st-health-desc">{desc}</div>
      </div>
      <StatusBadge tone={tone} label={badge} />
    </div>
  );
}

function ProviderCard({ p }: { p: ProviderItem }) {
  return (
    <div className="st-provider" data-testid={`provider-${p.id}`}>
      <div className="st-provider-top">
        <span className="st-brand">{<BrandIcon name={p.icon} size={24} />}</span>
        <div className="st-provider-main">
          <div className="st-provider-name">{p.name}</div>
          <span className="st-conn ok"><span className="st-badge-dot" />Conectado</span>
        </div>
        <button className="st-more" aria-label="Mais opções"><MoreHorizontal size={16} /></button>
      </div>
      <p className="st-provider-desc">{p.description}</p>
    </div>
  );
}

function IntegrationRow({ it }: { it: IntegrationItem }) {
  const connected = it.state === 'connected';
  return (
    <div className="st-int-row" data-testid={`integration-${it.id}`}>
      <span className="st-brand sm">{<BrandIcon name={it.icon} size={18} />}</span>
      <div className="st-int-info">
        <div className="st-int-name">{it.name}</div>
        <div className="st-int-desc">{it.description}</div>
      </div>
      <StatusBadge tone={connected ? 'ok' : 'neutral'} label={connected ? 'Conectado' : 'Não conectado'} />
      <Btn variant={connected ? 'secondary' : 'primary'} data-testid={`int-action-${it.id}`}>
        {connected ? 'Configurar' : 'Conectar'}
      </Btn>
      <button className="st-more" aria-label="Mais opções"><MoreHorizontal size={16} /></button>
    </div>
  );
}

export function OverviewSection({ form, update }: SectionProps) {
  return (
    <div className="st-sections">
      <SettingsCard
        icon={<LayoutGrid size={18} />}
        title="Project Overview"
        subtitle="Informações básicas e status do seu projeto."
      >
        <div className="st-overview-grid">
          <Field label="Nome do projeto" helper="Este é o nome exibido em todo o HALL.">
            <SettingsInput
              value={form.name}
              onChange={(e) => update((f) => ({ ...f, name: e.target.value }))}
              data-testid="overview-name"
            />
          </Field>
          <Field label="Descrição" counter={`${form.description.length}/280`}>
            <SettingsTextarea
              value={form.description}
              maxLength={280}
              rows={3}
              onChange={(e) => update((f) => ({ ...f, description: e.target.value }))}
              data-testid="overview-description"
            />
          </Field>
          <Field label="Workspace" helper="Este projeto pertence a este workspace.">
            <SettingsSelect value={form.workspace} options={WORKSPACES} onChange={(v) => update((f) => ({ ...f, workspace: v }))} data-testid="overview-workspace" />
          </Field>
          <Field label="Status" helper="Projeto ativo e pronto para uso.">
            <SettingsSelect
              value={form.status}
              options={STATUSES}
              dotTone={form.status === 'Ativo' ? 'ok' : form.status === 'Pausado' ? 'warn' : 'neutral'}
              onChange={(v) => update((f) => ({ ...f, status: v as SettingsForm['status'] }))}
              data-testid="overview-status"
            />
          </Field>
        </div>
      </SettingsCard>

      <div className="st-two-col">
        <div className="st-col">
          <SettingsCard icon={<Bot size={18} />} title="Agent Responsibilities" subtitle="Defina quais modelos e agentes são responsáveis por cada tipo de tarefa.">
            <div className="st-agent-list">
              {AGENTS.map((a) => <AgentModelRow key={a.key} k={a.key} form={form} update={update} />)}
            </div>
          </SettingsCard>

          <SettingsCard
            icon={<Activity size={18} />}
            title="Project Health"
            subtitle="Status geral do projeto e serviços associados."
            action={<Btn variant="secondary" data-testid="health-details">Ver detalhes</Btn>}
          >
            <div className="st-health-list">
              <HealthRow icon={<CircleCheck size={18} />} tone="ok" title="Build Status" desc="Último build concluído há 12 minutos." badge="OK" />
              <HealthRow icon={<TriangleAlert size={18} />} tone="warn" title="Security Scan" desc="1 alerta requer atenção." badge="1 aviso" />
              <HealthRow icon={<Webhook size={18} />} tone="ok" title="Webhooks" desc="Recebendo eventos normalmente." badge="Operacional" />
            </div>
          </SettingsCard>
        </div>

        <div className="st-col">
          <SettingsCard
            icon={<Link2 size={18} />}
            title="Connected Providers"
            subtitle="Provedores de modelos e infraestrutura conectados a este projeto."
            action={<Btn variant="secondary" data-testid="manage-providers">Gerenciar provedores</Btn>}
          >
            <div className="st-provider-grid">
              {PROVIDERS.map((p) => <ProviderCard key={p.id} p={p} />)}
            </div>
          </SettingsCard>

          <SettingsCard icon={<Puzzle size={18} />} title="Integrations" subtitle="Conecte ferramentas e serviços ao seu projeto.">
            <div className="st-int-list">
              {INTEGRATIONS.map((it) => <IntegrationRow key={it.id} it={it} />)}
            </div>
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}

/* =================== MODELS & AGENTS =================== */
export function ModelsSection({ form, update }: SectionProps) {
  return (
    <div className="st-sections">
      <div className="st-section-head">
        <h2>Models &amp; Agents</h2>
        <p>Configure os agentes responsáveis por cada tipo de tarefa do projeto.</p>
      </div>
      <div className="st-agent-cards">
        {AGENTS.map((a) => {
          const cfg = form.agents[a.key];
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
                <SettingsSelect value={cfg.model} options={MODEL_OPTIONS} onChange={(v) => update((f) => ({ ...f, agents: { ...f.agents, [a.key]: { ...f.agents[a.key], model: v } } }))} data-testid={`models-select-${a.key}`} />
                <div className="st-agent-toggle">
                  <span className="st-mini-label">{cfg.active ? 'Ativo' : 'Inativo'}</span>
                  <SettingsToggle checked={cfg.active} onChange={(v) => update((f) => ({ ...f, agents: { ...f.agents, [a.key]: { ...f.agents[a.key], active: v } } }))} data-testid={`models-toggle-${a.key}`} />
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
export function GithubSection({ form, update }: SectionProps) {
  return (
    <div className="st-sections">
      <div className="st-section-head">
        <h2>GitHub</h2>
        <p>Configure o repositório conectado ao projeto.</p>
      </div>
      <SettingsCard icon={<Icon name="github" size={18} />} title="Repositório" subtitle="Conexão e sincronização com o GitHub.">
        <div className="st-stack">
          <Field label="Repository">
            <SettingsInput value={form.github.repo} onChange={(e) => update((f) => ({ ...f, github: { ...f.github, repo: e.target.value } }))} data-testid="github-repo" />
          </Field>
          <Field label="Branch">
            <SettingsSelect value={form.github.branch} options={['main', 'develop', 'staging']} onChange={(v) => update((f) => ({ ...f, github: { ...f.github, branch: v } }))} data-testid="github-branch" />
          </Field>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Sync Status</div><div className="st-row-desc">Último sync há 2 minutos.</div></div>
            <StatusBadge tone="ok" label="Sincronizado" />
          </div>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Auto Sync</div><div className="st-row-desc">Sincronizar automaticamente a cada push.</div></div>
            <SettingsToggle checked={form.github.autoSync} onChange={(v) => update((f) => ({ ...f, github: { ...f.github, autoSync: v } }))} data-testid="github-autosync" />
          </div>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Last Sync</div><div className="st-row-desc">Hoje, 12:12</div></div>
          </div>
          <div className="st-btn-row">
            <Btn variant="primary" data-testid="github-sync"><RefreshCw size={15} /> Sincronizar agora</Btn>
            <Btn variant="danger" data-testid="github-disconnect">Desconectar</Btn>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== INTEGRATIONS =================== */
export function IntegrationsSection() {
  const connected = INTEGRATIONS.filter((i) => i.state === 'connected');
  const available = INTEGRATIONS.filter((i) => i.state !== 'connected');
  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Integrations</h2><p>Conecte ferramentas e serviços ao seu projeto.</p></div>
      <SettingsCard icon={<Puzzle size={18} />} title="Connected integrations" subtitle="Serviços já conectados a este projeto.">
        <div className="st-int-list">{connected.map((it) => <IntegrationRow key={it.id} it={it} />)}</div>
      </SettingsCard>
      <SettingsCard icon={<Plus size={18} />} title="Available integrations" subtitle="Conecte novos serviços.">
        <div className="st-int-list">{available.map((it) => <IntegrationRow key={it.id} it={it} />)}</div>
      </SettingsCard>
    </div>
  );
}

/* =================== SECURITY =================== */
const SECURITY_OPTS: { key: keyof SettingsForm['security']; label: string; desc: string }[] = [
  { key: 'deps', label: 'Permitir instalação de dependências', desc: 'O agente pode instalar novos pacotes.' },
  { key: 'env', label: 'Permitir alterações em variáveis de ambiente', desc: 'O agente pode editar variáveis de ambiente.' },
  { key: 'deploy', label: 'Permitir deploy pelo agente', desc: 'O agente pode acionar deploys.' },
  { key: 'confirm', label: 'Exigir confirmação para ações sensíveis', desc: 'Pedir aprovação antes de ações críticas.' },
  { key: 'scan', label: 'Security scan automático', desc: 'Executar verificação de segurança a cada build.' },
];
export function SecuritySection({ form, update }: SectionProps) {
  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Security</h2><p>Controle o que o agente pode fazer no seu projeto.</p></div>
      <SettingsCard icon={<Shield size={18} />} title="Permissões" subtitle="Defina políticas de segurança do projeto.">
        <div className="st-toggle-list">
          {SECURITY_OPTS.map((o) => (
            <div key={o.key} className="st-inline-row">
              <div className="st-inline-info"><div className="st-row-title">{o.label}</div><div className="st-row-desc">{o.desc}</div></div>
              <SettingsToggle checked={form.security[o.key]} onChange={(v) => update((f) => ({ ...f, security: { ...f.security, [o.key]: v } }))} data-testid={`security-${o.key}`} />
            </div>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== DESIGN =================== */
export function DesignSection({ form, update }: SectionProps) {
  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Design</h2><p>Preferências visuais e instruções de design do projeto.</p></div>
      <SettingsCard icon={<Palette size={18} />} title="Preferências" subtitle="Tema, dispositivo de preview e instruções.">
        <div className="st-stack">
          <Field label="Theme preference">
            <SettingsSelect value={form.design.theme} options={['System', 'Dark', 'Light']} onChange={(v) => update((f) => ({ ...f, design: { ...f.design, theme: v as SettingsForm['design']['theme'] } }))} data-testid="design-theme" />
          </Field>
          <Field label="Default preview device">
            <SettingsSelect value={form.design.device} options={['Desktop', 'Tablet', 'Mobile']} onChange={(v) => update((f) => ({ ...f, design: { ...f.design, device: v as SettingsForm['design']['device'] } }))} data-testid="design-device" />
          </Field>
          <Field label="Design instructions" helper="Guie o Design Agent com diretrizes específicas.">
            <SettingsTextarea rows={4} value={form.design.instructions} placeholder="Ex.: usar tons escuros, acento vermelho, tipografia densa…" onChange={(e) => update((f) => ({ ...f, design: { ...f.design, instructions: e.target.value } }))} data-testid="design-instructions" />
          </Field>
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== DEPLOY =================== */
export function DeploySection({ form, update }: SectionProps) {
  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Deploy</h2><p>Configure como e onde o projeto é publicado.</p></div>
      <SettingsCard icon={<Rocket size={18} />} title="Deployment" subtitle="Provedor e configurações de produção.">
        <div className="st-stack">
          <Field label="Deployment provider">
            <SettingsSelect value={form.deploy.provider} options={['Vercel', 'Netlify', 'Railway', 'Emergent']} onChange={(v) => update((f) => ({ ...f, deploy: { ...f.deploy, provider: v } }))} data-testid="deploy-provider" />
          </Field>
          <Field label="Production branch">
            <SettingsInput value={form.deploy.branch} onChange={(e) => update((f) => ({ ...f, deploy: { ...f.deploy, branch: e.target.value } }))} data-testid="deploy-branch" />
          </Field>
          <Field label="Production URL">
            <SettingsInput value={form.deploy.url} onChange={(e) => update((f) => ({ ...f, deploy: { ...f.deploy, url: e.target.value } }))} data-testid="deploy-url" />
          </Field>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Auto Deploy</div><div className="st-row-desc">Publicar automaticamente a cada merge na branch de produção.</div></div>
            <SettingsToggle checked={form.deploy.autoDeploy} onChange={(v) => update((f) => ({ ...f, deploy: { ...f.deploy, autoDeploy: v } }))} data-testid="deploy-autodeploy" />
          </div>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Deployment Status</div><div className="st-row-desc">Último deploy concluído com sucesso.</div></div>
            <StatusBadge tone="ok" label="Online" />
          </div>
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== ENVIRONMENT =================== */
export function EnvironmentSection() {
  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Environment</h2><p>Variáveis de ambiente do projeto (valores ocultos).</p></div>
      <SettingsCard
        icon={<Variable size={18} />}
        title="Environment Variables"
        subtitle="Gerencie chaves e segredos por ambiente."
        action={<Btn variant="primary" data-testid="env-add"><Plus size={15} /> Adicionar variável</Btn>}
      >
        <div className="st-env-list">
          {ENV_VARS.map((v) => (
            <div key={v.id} className="st-env-row" data-testid={`env-${v.key}`}>
              <span className="st-env-key">{v.key}</span>
              <span className="st-env-value">••••••••••</span>
              <StatusBadge tone="neutral" label={v.scope} dot={false} />
              <div className="st-env-actions">
                <button className="st-more" aria-label="Editar"><Pencil size={15} /></button>
                <button className="st-more danger" aria-label="Excluir"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== LOGS =================== */
export function LogsSection() {
  const [q, setQ] = useState('');
  const [level, setLevel] = useState('Todos');
  const [source, setSource] = useState('Todas');
  const sources = ['Todas', ...Array.from(new Set(LOGS.map((l) => l.source)))];
  const filtered = LOGS.filter((l) =>
    (level === 'Todos' || l.level === level) &&
    (source === 'Todas' || l.source === source) &&
    l.message.toLowerCase().includes(q.toLowerCase()),
  );
  const tone = (lv: LogLevel) => (lv === 'ERROR' ? 'error' : lv === 'WARNING' ? 'warn' : 'neutral');
  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Logs</h2><p>Eventos recentes do projeto.</p></div>
      <SettingsCard icon={<ScrollText size={18} />} title="Activity logs" subtitle="Filtre por nível, origem ou busca.">
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
          {filtered.length === 0 && <div className="st-empty">Nenhum log encontrado.</div>}
        </div>
      </SettingsCard>
    </div>
  );
}

/* =================== ADVANCED =================== */
function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel }: { title: string; message: string; confirmLabel: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="st-modal-overlay" onClick={onCancel}>
      <div className="st-modal" onClick={(e) => e.stopPropagation()} data-testid="confirm-dialog">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="st-btn-row end">
          <Btn variant="secondary" onClick={onCancel} data-testid="confirm-cancel">Cancelar</Btn>
          <Btn variant="danger" onClick={onConfirm} data-testid="confirm-ok">{confirmLabel}</Btn>
        </div>
      </div>
    </div>
  );
}

export function AdvancedSection() {
  const [pending, setPending] = useState<null | { title: string; message: string; label: string }>(null);
  const [toast, setToast] = useState('');
  const act = (title: string, message: string, label: string) => setPending({ title, message, label });
  const confirm = () => { setToast(`${pending?.label} (simulado) concluído.`); setPending(null); setTimeout(() => setToast(''), 2500); };
  return (
    <div className="st-sections">
      <div className="st-section-head"><h2>Advanced</h2><p>Ações avançadas e zona de perigo.</p></div>
      <SettingsCard icon={<SlidersHorizontal size={18} />} title="Danger Zone" subtitle="Essas ações são irreversíveis. Use com cautela." className="danger">
        <div className="st-danger-list">
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Arquivar projeto</div><div className="st-row-desc">O projeto fica somente leitura até ser restaurado.</div></div>
            <Btn variant="danger" onClick={() => act('Arquivar projeto', 'Tem certeza que deseja arquivar este projeto?', 'Arquivar')} data-testid="danger-archive">Arquivar</Btn>
          </div>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Resetar configurações</div><div className="st-row-desc">Restaura todas as configurações para os valores padrão.</div></div>
            <Btn variant="danger" onClick={() => act('Resetar configurações', 'Isso restaurará todas as configurações. Continuar?', 'Resetar')} data-testid="danger-reset">Resetar</Btn>
          </div>
          <div className="st-inline-row">
            <div className="st-inline-info"><div className="st-row-title">Excluir projeto</div><div className="st-row-desc">Exclui permanentemente o projeto e todos os dados.</div></div>
            <Btn variant="danger" onClick={() => act('Excluir projeto', 'Esta ação não pode ser desfeita. Excluir definitivamente?', 'Excluir')} data-testid="danger-delete">Excluir</Btn>
          </div>
        </div>
      </SettingsCard>
      {pending && <ConfirmDialog title={pending.title} message={pending.message} confirmLabel={pending.label} onConfirm={confirm} onCancel={() => setPending(null)} />}
      {toast && <div className="st-toast" data-testid="danger-toast">{toast}</div>}
    </div>
  );
}
