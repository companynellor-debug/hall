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
  chatTab?: 'chat' | 'tarefas';
  onChatTabChange?: (tab: 'chat' | 'tarefas') => void;
  previewTab?: PreviewTab;
  onPreviewTabChange?: (tab: PreviewTab) => void;
  rail?: RailId;
  onRailChange?: (id: RailId) => void;
}

export function WorkspaceLayout({ projectName, chatTab, onChatTabChange, previewTab: previewTabProp, onPreviewTabChange }: Props) {
  const [internalPreviewTab, setInternalPreviewTab] = useState<PreviewTab>('preview');
  const previewTab = previewTabProp ?? internalPreviewTab;
  const setPreviewTab = (t: PreviewTab) => { setInternalPreviewTab(t); onPreviewTabChange?.(t); };
  const [device, setDevice] = useState<Device>('desktop');

  return (
    <div className="ws-body">
      {/* Left — Chat */}
      <aside className="ws-chat-region" data-testid="chat-region">
        <ChatPane activeTab={chatTab} onTabChange={onChatTabChange} />
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
            <div className="ws-pv-bar-left">
              <div className="ws-pv-nav">
                <button className="ws-pv-navbtn" title="Voltar"><IconArrowLeft size={15} /></button>
                <button className="ws-pv-navbtn" title="Avançar"><IconArrowRight size={15} /></button>
                <button className="ws-pv-navbtn" title="Recarregar"><IconRefresh size={15} /></button>
              </div>
              <span className="ws-pv-sync">Último sync há 2 minutos</span>
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
    </div>
  );
}

export default WorkspaceLayout;
