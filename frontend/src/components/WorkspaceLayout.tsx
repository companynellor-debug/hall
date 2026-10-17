import { useEffect, useMemo, useState } from 'react';
import { ChatPane } from './ChatPane';
import { PreviewPane } from './PreviewPane';
import { ConsolePane } from './ConsolePane';
import { Icon } from './ui/Icon';
import {
  IconMonitor, IconTablet, IconSmartphone,
  IconArrowLeft, IconArrowRight, IconRefresh, IconCode2, IconTerminal, IconLock,
} from './icons';
import { makeSiteHtml } from '../features/preview/siteTemplate';

type PreviewTab = 'preview' | 'code' | 'console';
type Device = 'desktop' | 'tablet' | 'mobile';
type RailId = 'changes' | 'files' | 'health';
type Version = { prompt: string; at: number };

interface Props {
  projectName: string;
  initialPrompt?: string;
  chatTab?: 'chat' | 'tarefas';
  onChatTabChange?: (tab: 'chat' | 'tarefas') => void;
  previewTab?: PreviewTab;
  onPreviewTabChange?: (tab: PreviewTab) => void;
  rail?: RailId;
  onRailChange?: (id: RailId) => void;
}

const ago = (ts: number, now: number) => {
  const s = Math.max(0, Math.round((now - ts) / 1000));
  return s < 10 ? 'agora' : s < 60 ? `há ${s}s` : `há ${Math.round(s / 60)} min`;
};

export function WorkspaceLayout({ projectName, initialPrompt, chatTab, onChatTabChange, previewTab: previewTabProp, onPreviewTabChange }: Props) {
  const [internalPreviewTab, setInternalPreviewTab] = useState<PreviewTab>('preview');
  const previewTab = previewTabProp ?? internalPreviewTab;
  const setPreviewTab = (t: PreviewTab) => { setInternalPreviewTab(t); onPreviewTabChange?.(t); };
  const [device, setDevice] = useState<Device>('desktop');
  const [versions, setVersions] = useState<Version[]>([]);
  const [idx, setIdx] = useState(-1);
  const [building, setBuilding] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [frameKey, setFrameKey] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 5000);
    return () => window.clearInterval(t);
  }, []);

  const current = versions[idx];
  const html = useMemo(() => (current ? makeSiteHtml(projectName, current.prompt, idx + 1) : null), [current, projectName, idx]);
  const slug = (projectName || 'nellor').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24) || 'app';

  const onBuildDone = (prompt: string) => {
    setVersions((v) => {
      setIdx(v.length);
      return [...v, { prompt, at: Date.now() }];
    });
    setNow(Date.now());
    setBuilding(false);
  };

  const reload = () => {
    if (!html) return;
    setReloading(true);
    window.setTimeout(() => { setFrameKey((k) => k + 1); setReloading(false); }, 650);
  };

  const openTab = () => {
    if (!html) return;
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    window.open(url, '_blank', 'noopener');
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  const copyCode = async () => {
    if (!html) return;
    await navigator.clipboard?.writeText(html).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="ws-body">
      <aside className="ws-chat-region" data-testid="chat-region">
        <ChatPane
          activeTab={chatTab}
          onTabChange={onChatTabChange}
          initialPrompt={initialPrompt}
          onBuildStart={() => setBuilding(true)}
          onBuildDone={onBuildDone}
          onBuildCancel={() => setBuilding(false)}
        />
      </aside>

      <section className="ws-main">
        <header className="ws-pv-head">
          <div className="ws-pv-tabs">
            <button className={`ws-pv-tab${previewTab === 'preview' ? ' active' : ''}`} onClick={() => setPreviewTab('preview')} data-testid="tab-preview">
              <IconMonitor size={15} /> Preview
            </button>
            <button className={`ws-pv-tab${previewTab === 'code' ? ' active' : ''}`} onClick={() => setPreviewTab('code')} data-testid="tab-code">
              <IconCode2 size={15} /> Código
            </button>
            <button className={`ws-pv-tab${previewTab === 'console' ? ' active' : ''}`} onClick={() => setPreviewTab('console')} data-testid="tab-console">
              <IconTerminal size={15} /> Console
            </button>
          </div>
          <div className="ws-pv-tools">
            {versions.length > 0 && <span className="pv2-version" data-testid="pv-version">v{idx + 1} de {versions.length}</span>}
            <button className="ws-pv-icon" title="Abrir preview em nova aba" onClick={openTab} disabled={!html} data-testid="pv-open-external">
              <Icon name="external-link" size={16} />
            </button>
            <div className="ws-dev-group">
              {([['desktop', IconMonitor, 'Desktop'], ['tablet', IconTablet, 'Tablet'], ['mobile', IconSmartphone, 'Mobile']] as const).map(([d, Ico, label]) => (
                <button key={d} className={`ws-dev-btn${device === d ? ' active' : ''}`} onClick={() => setDevice(d)} title={label} data-testid={`dev-${d}`}>
                  <Ico size={15} />
                </button>
              ))}
            </div>
          </div>
        </header>

        {previewTab === 'preview' && (
          <div className="ws-pv-bar">
            <div className="ws-pv-bar-left">
              <div className="ws-pv-nav">
                <button className="ws-pv-navbtn" title="Versão anterior" disabled={idx <= 0} onClick={() => setIdx((i) => i - 1)} data-testid="pv-back"><IconArrowLeft size={15} /></button>
                <button className="ws-pv-navbtn" title="Próxima versão" disabled={idx >= versions.length - 1} onClick={() => setIdx((i) => i + 1)} data-testid="pv-forward"><IconArrowRight size={15} /></button>
                <button className={`ws-pv-navbtn${reloading ? ' spinning' : ''}`} title="Recarregar" disabled={!html} onClick={reload} data-testid="pv-reload"><IconRefresh size={15} /></button>
              </div>
              <span className="ws-pv-sync" data-testid="pv-sync">
                {building ? 'Construindo…' : current ? `Atualizado ${ago(current.at, now)}` : 'Aguardando primeiro build'}
              </span>
            </div>
            <div className="ws-url">
              <IconLock size={12} />
              <span>https://{slug}.hall.app</span>
            </div>
            <button className="ws-newtab" onClick={openTab} disabled={!html} data-testid="pv-newtab">
              Abrir em nova aba <Icon name="external-link" size={13} />
            </button>
          </div>
        )}

        <div className={`ws-pv-body device-${device}`}>
          {previewTab === 'preview' && <PreviewPane device={device} html={html} building={building} reloading={reloading} frameKey={frameKey} />}
          {previewTab === 'code' && (html ? (
            <div className="pv2-code" data-testid="code-view">
              <div className="pv2-code-head">
                <span><IconCode2 size={13} /> index.html</span>
                <button onClick={copyCode} data-testid="code-copy">{copied ? 'Copiado!' : 'Copiar'}</button>
              </div>
              <pre>{html}</pre>
            </div>
          ) : (
            <div className="ws-pv-empty">
              <IconCode2 size={40} />
              <h3>Visualização de código</h3>
              <p>Os arquivos editados pela IA aparecem aqui conforme o build avança.</p>
            </div>
          ))}
          {previewTab === 'console' && <ConsolePane />}
        </div>
      </section>
    </div>
  );
}

export default WorkspaceLayout;
