import { useMemo, useState } from 'react';
import { ArrowLeft, ExternalLink, Eye, EyeOff, Loader2, Search, Server, X } from 'lucide-react';
import { IntegrationLogo } from './IntegrationLogo';
import { PROVIDER_CATALOG, CUSTOM_PROVIDER_ID, type ProviderMeta } from '../../features/project-settings/providerCatalog';

export interface ProviderSubmit {
  providerKey: string;
  apiKey: string;
  baseUrl: string;
  label: string;
  models: string[];
}

interface Props {
  connectedKeys: string[];
  initialKey?: string | null;
  onClose: () => void;
  onSubmit: (data: ProviderSubmit) => Promise<void>;
}

const CUSTOM_META: ProviderMeta = {
  id: CUSTOM_PROVIDER_ID, name: 'Personalizado', description: 'Qualquer API compatível com OpenAI.', domain: '',
  keyPlaceholder: 'Sua chave de API', docsUrl: '', models: [], needsKey: true, needsBaseUrl: true,
};

export function AddProviderModal({ connectedKeys, initialKey, onClose, onSubmit }: Props) {
  const [picked, setPicked] = useState<ProviderMeta | null>(() =>
    initialKey ? PROVIDER_CATALOG.find((p) => p.id === initialKey) ?? null : null,
  );
  const [q, setQ] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [label, setLabel] = useState('');
  const [models, setModels] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const list = useMemo(
    () => PROVIDER_CATALOG.filter((p) => !q || `${p.name} ${p.description} ${p.models.join(' ')}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );
  const isCustom = picked?.id === CUSTOM_PROVIDER_ID;
  const replacing = !!picked && connectedKeys.includes(picked.id);

  const pick = (p: ProviderMeta) => {
    setPicked(p);
    setError('');
    setBaseUrl(p.id === 'ollama' ? 'http://localhost:11434' : '');
  };

  const submit = async () => {
    if (!picked) return;
    if (picked.needsKey && apiKey.trim().length < 8) return setError('A chave de API parece curta demais.');
    if (picked.needsBaseUrl && !/^https?:\/\/.+/.test(baseUrl.trim())) return setError('Informe uma URL base válida (http/https).');
    const modelList = isCustom ? models.split(',').map((m) => m.trim()).filter(Boolean) : picked.models;
    if (isCustom && !label.trim()) return setError('Dê um nome para esse provedor.');
    if (isCustom && modelList.length === 0) return setError('Informe ao menos um modelo.');
    setBusy(true);
    setError('');
    try {
      await onSubmit({
        providerKey: isCustom ? `custom-${Date.now().toString(36)}` : picked.id,
        apiKey: apiKey.trim(), baseUrl: baseUrl.trim(), label: label.trim(), models: modelList,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pv-overlay" onMouseDown={onClose} data-testid="provider-modal">
      <div className="pv-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="pv-modal-head">
          {picked && !initialKey && (
            <button className="pv-icon-btn" onClick={() => setPicked(null)} aria-label="Voltar" data-testid="provider-modal-back"><ArrowLeft size={16} /></button>
          )}
          <div className="pv-modal-titles">
            <h3>{picked ? (replacing ? `Trocar chave · ${picked.name}` : `Conectar ${picked.name}`) : 'Adicionar provedor'}</h3>
            <p>{picked ? picked.description : 'Escolha um provedor de modelos ou adicione um personalizado.'}</p>
          </div>
          <button className="pv-icon-btn" onClick={onClose} aria-label="Fechar" data-testid="provider-modal-close"><X size={16} /></button>
        </header>

        {!picked ? (
          <div className="pv-modal-body">
            <label className="pv-search">
              <Search size={15} />
              <input autoFocus placeholder="Buscar provedor ou modelo…" value={q} onChange={(e) => setQ(e.target.value)} data-testid="provider-modal-search" />
            </label>
            <div className="pv-pick-grid">
              {list.map((p) => {
                const on = connectedKeys.includes(p.id);
                return (
                  <button key={p.id} className={`pv-pick${on ? ' on' : ''}`} onClick={() => pick(p)} data-testid={`provider-pick-${p.id}`}>
                    <span className="pv-logo"><IntegrationLogo domain={p.domain} name={p.name} size={20} /></span>
                    <span className="pv-pick-main">
                      <span className="pv-pick-name">{p.name}{p.tag && <em>{p.tag}</em>}</span>
                      <span className="pv-pick-desc">{on ? 'Conectado · trocar chave' : `${p.models.length} modelos`}</span>
                    </span>
                  </button>
                );
              })}
              <button className="pv-pick custom" onClick={() => pick(CUSTOM_META)} data-testid="provider-pick-custom">
                <span className="pv-logo"><Server size={18} /></span>
                <span className="pv-pick-main">
                  <span className="pv-pick-name">Personalizado</span>
                  <span className="pv-pick-desc">Compatível com OpenAI</span>
                </span>
              </button>
            </div>
            {list.length === 0 && <p className="pv-muted">Nenhum provedor encontrado — use “Personalizado”.</p>}
          </div>
        ) : (
          <div className="pv-modal-body">
            {isCustom && (
              <div className="pv-field">
                <label>Nome do provedor</label>
                <input className="pv-input" placeholder="Ex.: Meu servidor vLLM" value={label} onChange={(e) => setLabel(e.target.value)} data-testid="provider-label-input" />
              </div>
            )}
            {picked.needsBaseUrl && (
              <div className="pv-field">
                <label>URL base</label>
                <input className="pv-input" placeholder="https://api.exemplo.com/v1" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} data-testid="provider-baseurl-input" />
              </div>
            )}
            {picked.needsKey && (
              <div className="pv-field">
                <label>
                  Chave de API
                  {picked.docsUrl && <a href={picked.docsUrl} target="_blank" rel="noreferrer">Onde encontro? <ExternalLink size={11} /></a>}
                </label>
                <div className="pv-key">
                  <input
                    className="pv-input"
                    type={showKey ? 'text' : 'password'}
                    placeholder={picked.keyPlaceholder}
                    value={apiKey}
                    autoFocus
                    onChange={(e) => setApiKey(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                    data-testid="provider-key-input"
                  />
                  <button className="pv-icon-btn" onClick={() => setShowKey((s) => !s)} aria-label={showKey ? 'Ocultar chave' : 'Mostrar chave'} data-testid="provider-key-toggle">
                    {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <span className="pv-hint">A chave fica guardada só neste projeto e aparece mascarada.</span>
              </div>
            )}
            {isCustom ? (
              <div className="pv-field">
                <label>Modelos</label>
                <input className="pv-input" placeholder="llama-3-70b, mixtral-8x7b" value={models} onChange={(e) => setModels(e.target.value)} data-testid="provider-models-input" />
                <span className="pv-hint">Separe por vírgula.</span>
              </div>
            ) : (
              <div className="pv-field">
                <label>Modelos liberados</label>
                <div className="pv-chips">{picked.models.map((m) => <span key={m} className="pv-chip">{m}</span>)}</div>
              </div>
            )}
            {error && <p className="pv-error" data-testid="provider-error">{error}</p>}
          </div>
        )}

        {picked && (
          <footer className="pv-modal-foot">
            <button className="pv-btn ghost" onClick={onClose} data-testid="provider-cancel">Cancelar</button>
            <button className="pv-btn primary" onClick={submit} disabled={busy} data-testid="provider-submit">
              {busy ? <><Loader2 size={14} className="pv-spin" /> Verificando…</> : replacing ? 'Salvar nova chave' : 'Conectar'}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
