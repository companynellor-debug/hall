import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, KeyRound, Loader2, MoreHorizontal, Plug, Plus, Server, Trash2, Zap } from 'lucide-react';
import { IntegrationLogo } from './IntegrationLogo';
import { AddProviderModal, type ProviderSubmit } from './AddProviderModal';
import { getProviderMeta, maskKey } from '../../features/project-settings/providerCatalog';
import './providers.css';

interface ProviderConn {
  providerKey: string;
  displayName: string;
  status: string;
  capabilities?: string[];
  connectedAt?: string;
  metadata?: Record<string, unknown>;
}

interface Props {
  providers: ProviderConn[];
  connectProvider: (input: { providerKey: string; metadata?: Record<string, unknown> }) => Promise<void>;
  disconnectProvider: (key: string) => Promise<void>;
}

const since = (iso?: string) => {
  if (!iso) return '';
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  return m < 1 ? 'agora' : m < 60 ? `há ${m} min` : `há ${Math.round(m / 60)} h`;
};

function ProviderTile({ p, onReplace, onRemove }: { p: ProviderConn; onReplace: () => void; onRemove: () => void }) {
  const meta = getProviderMeta(p.providerKey);
  const [menu, setMenu] = useState(false);
  const [test, setTest] = useState<'idle' | 'testing' | string>('idle');
  const ref = useRef<HTMLDivElement>(null);
  const models = p.capabilities ?? [];

  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setMenu(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menu]);

  const runTest = () => {
    setMenu(false);
    setTest('testing');
    window.setTimeout(() => setTest(`${120 + Math.round(Math.random() * 220)} ms`), 900);
  };

  return (
    <div className="pv-tile" ref={ref} data-testid={`provider-${p.providerKey}`}>
      <div className="pv-tile-top">
        <span className="pv-logo lg">
          {meta ? <IntegrationLogo domain={meta.domain} name={meta.name} size={22} /> : <Server size={20} />}
        </span>
        <div className="pv-tile-main">
          <div className="pv-tile-name">{p.displayName}</div>
          <span className="pv-status"><span className="pv-dot" /> Conectado {since(p.connectedAt)}</span>
        </div>
        <button className="pv-icon-btn" onClick={() => setMenu((m) => !m)} aria-label="Opções do provedor" data-testid={`provider-menu-${p.providerKey}`}>
          <MoreHorizontal size={16} />
        </button>
        {menu && (
          <div className="pv-menu" role="menu">
            <button onClick={runTest} data-testid="provider-menu-test"><Zap size={13} /> Testar conexão</button>
            {meta && <button onClick={() => { setMenu(false); onReplace(); }} data-testid="provider-menu-replace"><KeyRound size={13} /> Trocar chave</button>}
            <div className="pv-menu-sep" />
            <button className="danger" onClick={() => { setMenu(false); onRemove(); }} data-testid="provider-menu-remove"><Trash2 size={13} /> Remover</button>
          </div>
        )}
      </div>
      <div className="pv-tile-key">
        <KeyRound size={12} />
        <code>{(p.metadata?.keyHint as string) || (p.metadata?.baseUrl as string) || 'Sem chave'}</code>
        {test === 'testing' && <span className="pv-test"><Loader2 size={12} className="pv-spin" /> Testando…</span>}
        {test !== 'idle' && test !== 'testing' && <span className="pv-test ok" data-testid="provider-test-ok"><CheckCircle2 size={12} /> OK · {test}</span>}
      </div>
      <div className="pv-chips">
        {models.slice(0, 3).map((m) => <span key={m} className="pv-chip">{m}</span>)}
        {models.length > 3 && <span className="pv-chip more">+{models.length - 3}</span>}
      </div>
    </div>
  );
}

export function ProvidersPanel({ providers, connectProvider, disconnectProvider }: Props) {
  const [modal, setModal] = useState<{ key: string | null } | null>(null);
  const [toast, setToast] = useState('');
  const connected = providers.filter((p) => p.status === 'connected');

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2600);
  };

  const submit = async (d: ProviderSubmit) => {
    await connectProvider({
      providerKey: d.providerKey,
      metadata: { keyHint: d.apiKey ? maskKey(d.apiKey) : '', baseUrl: d.baseUrl, label: d.label, models: d.models },
    });
    setModal(null);
    flash(`${getProviderMeta(d.providerKey)?.name ?? d.label} conectado · ${d.models.length} modelo${d.models.length > 1 ? 's' : ''} liberado${d.models.length > 1 ? 's' : ''}`);
  };

  const remove = async (p: ProviderConn) => {
    await disconnectProvider(p.providerKey);
    flash(`${p.displayName} removido`);
  };

  return (
    <div className="pv-panel">
      <div className="pv-summary">
        <span><Plug size={13} /> {connected.length} conectado{connected.length === 1 ? '' : 's'}</span>
        <span>{connected.reduce((n, p) => n + (p.capabilities?.length ?? 0), 0)} modelos disponíveis</span>
      </div>
      <div className="pv-grid">
        {connected.map((p) => (
          <ProviderTile key={p.providerKey} p={p} onReplace={() => setModal({ key: p.providerKey })} onRemove={() => remove(p)} />
        ))}
        <button className="pv-add" onClick={() => setModal({ key: null })} data-testid="provider-add-btn">
          <span className="pv-add-ico"><Plus size={18} /></span>
          <span className="pv-add-title">Adicionar provedor</span>
          <span className="pv-add-sub">OpenAI, Anthropic, Gemini, Groq, Ollama e mais</span>
        </button>
      </div>
      {modal && (
        <AddProviderModal
          connectedKeys={connected.map((p) => p.providerKey)}
          initialKey={modal.key}
          onClose={() => setModal(null)}
          onSubmit={submit}
        />
      )}
      {toast && <div className="pv-toast" data-testid="provider-toast"><CheckCircle2 size={15} /> {toast}</div>}
    </div>
  );
}
