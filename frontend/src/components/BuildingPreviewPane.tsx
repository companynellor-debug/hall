import { useRef, useEffect, useState } from 'react';
import { IconArrowLeft, IconArrowRight, IconExternal, IconLock, IconRefresh, IconMaximize, IconCode, IconTerminal, IconLayoutDashboard, IconMonitor, IconTablet, IconSmartphone } from './icons';

type BuildStage = 'initializing' | 'planning' | 'executing' | 'preview_ready' | 'complete' | 'error';

type PreviewTab = 'preview' | 'code' | 'console';
type DeviceView = 'desktop' | 'tablet' | 'mobile';

interface BuildingPreviewPaneProps {
  buildStage: BuildStage;
  previewUrl: string | null;
  projectName: string;
}

export function BuildingPreviewPane({ buildStage, previewUrl, projectName }: BuildingPreviewPaneProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>('preview');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isPreviewReady = buildStage === 'preview_ready' || buildStage === 'complete';
  const isBuilding = ['initializing', 'planning', 'executing'].includes(buildStage);

  useEffect(() => {
    if (previewUrl && iframeRef.current) {
      setIframeLoaded(false);
      setIframeError(false);
      iframeRef.current.src = previewUrl;
    }
  }, [previewUrl]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(false);
  };

  const tabConfig = [
    { id: 'preview', icon: 'layout', label: 'Preview' },
    { id: 'code', icon: 'code', label: 'Código' },
    { id: 'console', icon: 'terminal', label: 'Console' },
  ] as const;

  if (isBuilding) {
    return (
      <section className="building-preview preview-building">
        <div className="preview-bar">
          <div className="preview-tabs">
            {tabConfig.map((tab) => (
              <button
                key={tab.id}
                className={`preview-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id as PreviewTab)}
                disabled
              >
                {tab.icon === 'layout' && <IconLayoutDashboard size={14} />}
                {tab.icon === 'code' && <IconCode size={14} />}
                {tab.icon === 'terminal' && <IconTerminal size={14} />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="preview-address">
            <span className="lock"><IconLock size={11} /></span>
            <span>Aguardando build...</span>
          </div>
        </div>

        <div className="preview-viewport">
          <div className="preview-building-state">
            <div className="building-animation">
              <div className="building-orb" />
              <div className="building-orb secondary" />
              <div className="building-orb tertiary" />
            </div>
            <p className="building-message">
              {buildStage === 'initializing' && 'Inicializando ambiente de construção...'}
              {buildStage === 'planning' && 'Analisando solicitação e planejando alterações...'}
              {buildStage === 'executing' && 'Implementando código e configurando projeto...'}
            </p>
            <div className="building-steps">
              <div className="step done">✓ Ambiente preparado</div>
              {buildStage !== 'initializing' && <div className="step done">✓ Plano criado</div>}
              {buildStage === 'executing' && <div className="step active">◐ Escrevendo arquivos...</div>}
              {buildStage !== 'executing' && <div className="step pending">○ Aguardando execução</div>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!isPreviewReady || !previewUrl) {
    return (
      <section className="building-preview preview-empty">
        <div className="preview-bar">
          <div className="preview-tabs">
            {tabConfig.map((tab) => (
              <button
                key={tab.id}
                className={`preview-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id as PreviewTab)}
              >
                {tab.icon === 'layout' && <IconLayoutDashboard size={14} />}
                {tab.icon === 'code' && <IconCode size={14} />}
                {tab.icon === 'terminal' && <IconTerminal size={14} />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="preview-address">
            <span className="lock"><IconLock size={11} /></span>
            <span>Nenhum preview disponível</span>
          </div>
        </div>

        <div className="preview-viewport">
          <div className="preview-empty-state">
            <div className="empty-icon">
              <IconLayoutDashboard size={48} />
            </div>
            <h3>Preview não disponível</h3>
            <p>A visualização aparecerá aqui assim que a construção estiver pronta.</p>
            <div className="empty-hint">
              <IconRefresh size={14} />
              <span>O HALL está preparando o ambiente...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="building-preview preview-active">
      <div className="preview-bar">
        <div className="preview-tabs">
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              className={`preview-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as PreviewTab)}
            >
              {tab.icon === 'layout' && <IconLayoutDashboard size={14} />}
              {tab.icon === 'code' && <IconCode size={14} />}
              {tab.icon === 'terminal' && <IconTerminal size={14} />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="preview-nav">
          <button title="Voltar" disabled><IconArrowLeft size={13} /></button>
          <button title="Avançar" disabled><IconArrowRight size={13} /></button>
          <button title="Recarregar" onClick={() => iframeRef.current?.contentWindow?.location.reload()}>
            <IconRefresh size={13} />
          </button>
        </div>

        <div className="preview-address">
          <span className="lock"><IconLock size={11} /></span>
          <span>{previewUrl}</span>
        </div>

        <div className="preview-device-controls">
          <button
            className={`device-btn ${deviceView === 'desktop' ? 'active' : ''}`}
            onClick={() => setDeviceView('desktop')}
            title="Desktop"
            aria-label="Visualização desktop"
            aria-pressed={deviceView === 'desktop'}
          >
            <IconMonitor size={16} />
          </button>
          <button
            className={`device-btn ${deviceView === 'tablet' ? 'active' : ''}`}
            onClick={() => setDeviceView('tablet')}
            title="Tablet"
            aria-label="Visualização tablet"
            aria-pressed={deviceView === 'tablet'}
          >
            <IconTablet size={16} />
          </button>
          <button
            className={`device-btn ${deviceView === 'mobile' ? 'active' : ''}`}
            onClick={() => setDeviceView('mobile')}
            title="Mobile"
            aria-label="Visualização mobile"
            aria-pressed={deviceView === 'mobile'}
          >
            <IconSmartphone size={16} />
          </button>
        </div>

        <div className="preview-actions">
          <button className="preview-action-btn" title="Abrir em nova aba" onClick={() => window.open(previewUrl, '_blank')}>
            <IconExternal size={13} />
          </button>
          <button className="preview-action-btn" title="Tela cheia">
            <IconMaximize size={13} />
          </button>
        </div>
      </div>

      <div className="preview-viewport" data-device={deviceView}>
        {activeTab === 'preview' && (
          <div className="preview-content">
            {!iframeLoaded && !iframeError && (
              <div className="preview-loading">
                <div className="loading-spinner" />
                <p>Carregando preview...</p>
              </div>
            )}
            {iframeError && (
              <div className="preview-error-state">
                <IconExternal size={32} />
                <h3>Não foi possível carregar o preview</h3>
                <p>Verifique se o servidor de desenvolvimento está rodando.</p>
                <button className="btn btn-primary" onClick={() => window.open(previewUrl, '_blank')}>
                  Abrir em nova aba
                </button>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={previewUrl}
              className={`preview-iframe ${iframeLoaded ? 'loaded' : ''} ${iframeError ? 'error' : ''}`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={projectName}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="preview-code">
            <div className="code-placeholder">
              <IconCode size={32} />
              <h3>Visualização de código</h3>
              <p>Selecione um arquivo no painel lateral para visualizar o código.</p>
            </div>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="preview-console">
            <div className="console-output">
              <div className="console-line success">✓ Build completed successfully</div>
              <div className="console-line">📦 Bundling modules...</div>
              <div className="console-line">✓ 47 modules transformed</div>
              <div className="console-line success">✓ Vite dev server running at {previewUrl}</div>
              <div className="console-line">🔄 Hot Module Replacement enabled</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}