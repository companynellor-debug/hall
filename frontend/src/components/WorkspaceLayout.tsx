import { useState } from 'react';
import { ChatPane } from './ChatPane';
import { PreviewPane } from './PreviewPane';
import { ConsolePane } from './ConsolePane';
import { Icon } from './ui/Icon';
import {
  IconMonitor, IconTablet, IconSmartphone,
  IconArrowLeft, IconArrowRight, IconRefresh, IconCode2, IconTerminal, IconLock,
} from './icons';

type PreviewTab = 'preview' | 'code' | 'console';
type Device = 'desktop' | 'tablet' | 'mobile';
type RailId = 'changes' | 'files' | 'health';

interface Props {
  projectName: string;
}

function RailIcon({ id }: { id: RailId }) {
  const p = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (id === 'changes') return <svg {...p}><path d="M9 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8M14 3l5 5M14 3v5h5M19 14v7M15.5 17.5h7" /></svg>;
  if (id === 'files') return <svg {...p}><path d="M3 7a1 1 0 0 1 1-1h5l2 2.5h8a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /></svg>;
  return <svg {...p}><path d="M3 12h4l2 6 4-14 2 8h6" /></svg>;
}

export function WorkspaceLayout({ projectName }: Props) {
  const [previewTab, setPreviewTab] = useState<PreviewTab>('preview');
  const [device, setDevice] = useState<Device>('desktop');
  const [rail, setRail] = useState<RailId>('changes');

  return (
    <div className="ws-body">
      {/* Left — Chat */}
      <aside className="ws-chat-region" data-testid="chat-region">
        <ChatPane />
      </aside>

      {/* Center — Preview */}
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
            <button className="ws-pv-icon" title="Abrir preview" data-testid="pv-open-external">
              <Icon name="external-link" size={16} />
            </button>
            <div className="ws-dev-group">
              <button className={`ws-dev-btn${device === 'desktop' ? ' active' : ''}`} onClick={() => setDevice('desktop')} title="Desktop" data-testid="dev-desktop">
                <IconMonitor size={15} />
              </button>
              <button className={`ws-dev-btn${device === 'tablet' ? ' active' : ''}`} onClick={() => setDevice('tablet')} title="Tablet" data-testid="dev-tablet">
                <IconTablet size={15} />
              </button>
              <button className={`ws-dev-btn${device === 'mobile' ? ' active' : ''}`} onClick={() => setDevice('mobile')} title="Mobile" data-testid="dev-mobile">
                <IconSmartphone size={15} />
              </button>
            </div>
          </div>
        </header>

        {previewTab === 'preview' && (
          <div className="ws-pv-bar">
            <div className="ws-pv-nav">
              <button className="ws-pv-navbtn" title="Voltar"><IconArrowLeft size={15} /></button>
              <button className="ws-pv-navbtn" title="Avançar"><IconArrowRight size={15} /></button>
              <button className="ws-pv-navbtn" title="Recarregar"><IconRefresh size={15} /></button>
            </div>
            <div className="ws-url">
              <IconLock size={12} />
              <span>https://app.{(projectName || 'nellor').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24) || 'app'}.com</span>
            </div>
            <button className="ws-newtab" data-testid="pv-newtab">
              Abrir em nova aba <Icon name="external-link" size={13} />
            </button>
          </div>
        )}

        <div className={`ws-pv-body device-${device}`}>
          {previewTab === 'preview' && <PreviewPane device={device} />}
          {previewTab === 'code' && (
            <div className="ws-pv-empty">
              <IconCode2 size={40} />
              <h3>Visualização de código</h3>
              <p>Os arquivos editados pela IA aparecem aqui conforme o build avança.</p>
            </div>
          )}
          {previewTab === 'console' && <ConsolePane />}
        </div>
      </section>

      {/* Right — tool rail */}
      <nav className="ws-rail">
        {(['changes', 'files', 'health'] as RailId[]).map((id) => (
          <button
            key={id}
            className={`ws-rail-btn${rail === id ? ' active' : ''}`}
            onClick={() => setRail(id)}
            data-testid={`rail-${id}`}
          >
            <span className="ws-rail-ico">
              <RailIcon id={id} />
              {id === 'changes' && <span className="ws-rail-dot" />}
            </span>
            <span className="ws-rail-label">
              {id === 'changes' ? 'Changes' : id === 'files' ? 'Files' : 'Health'}
            </span>
          </button>
        ))}
        <button className="ws-rail-collapse" title="Recolher painel" data-testid="rail-collapse">
          <Icon name="chevron-right" size={16} />
        </button>
      </nav>
    </div>
  );
}

export default WorkspaceLayout;
