import { useState, useCallback, useRef } from 'react';
import { ChatPane } from './ChatPane';
import { PreviewPane } from './PreviewPane';
import { ConsolePane } from './ConsolePane';
import { IconMonitor, IconTablet, IconSmartphone, IconExternal, IconCode2, IconTerminal, IconRefresh, IconLock, IconArrowLeft, IconArrowRight } from './icons';

type PreviewTab = 'preview' | 'code' | 'console';

export function WorkspaceLayout() {
  const [previewTab, setPreviewTab] = useState<PreviewTab>('preview');
  const [chatWidth, setChatWidth] = useState(34);
  const chatRegionRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = chatWidth;

    const handleMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const containerWidth = window.innerWidth;
      const newWidthPercent = ((startWidth / 100) * containerWidth + deltaX) / containerWidth * 100;
      const clamped = Math.max(28, Math.min(42, newWidthPercent));
      setChatWidth(clamped);
    };

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  }, [chatWidth]);

  return (
    <div className="workspace-layout">
      <div className="workspace-body">
        {/* Left Panel - Chat */}
        <aside
          ref={chatRegionRef}
          className="chat-region"
          style={{ width: `${chatWidth}%` }}
        >
          <ChatPane />
        </aside>

        {/* Resizer */}
        <div
          ref={resizerRef}
          className="resizer-vertical"
          onMouseDown={startResize}
          aria-label="Redimensionar painel do chat"
        />

        {/* Right Panel - Preview */}
        <section className="preview-region">
          {/* Preview Toolbar */}
          <header className="preview-toolbar">
            <div className="preview-toolbar-left">
              <button
                className={`preview-tab ${previewTab === 'preview' ? 'active' : ''}`}
                onClick={() => setPreviewTab('preview')}
              >
                <IconMonitor size={14} />
                Preview
              </button>
              <button
                className={`preview-tab ${previewTab === 'code' ? 'active' : ''}`}
                onClick={() => setPreviewTab('code')}
              >
                <IconCode2 size={14} />
                Código
              </button>
              <button
                className={`preview-tab ${previewTab === 'console' ? 'active' : ''}`}
                onClick={() => setPreviewTab('console')}
              >
                <IconTerminal size={14} />
                Console
              </button>
            </div>

            <div className="preview-toolbar-center">
              <button
                className={`preview-device-btn ${previewTab === 'preview' ? 'active' : ''}`}
                title="Desktop"
              >
                <IconMonitor size={14} />
              </button>
              <button
                className="preview-device-btn"
                title="Tablet"
              >
                <IconTablet size={14} />
              </button>
              <button
                className="preview-device-btn"
                title="Mobile"
              >
                <IconSmartphone size={14} />
              </button>
            </div>

            <div className="preview-toolbar-right">
              <div className="preview-url">
                <IconLock size={11} />
                https://localhost:5173
              </div>
              <button className="preview-nav-btn" title="Voltar">
                <IconArrowLeft size={13} />
              </button>
              <button className="preview-nav-btn" title="Avançar">
                <IconArrowRight size={13} />
              </button>
              <button className="preview-nav-btn" title="Recarregar">
                <IconRefresh size={13} />
              </button>
              <button className="preview-nav-btn" title="Abrir em nova aba">
                <IconExternal size={13} />
              </button>
            </div>
          </header>

          {/* Preview Content */}
          <div className="preview-viewport">
            {previewTab === 'preview' && <PreviewPane />}
            {previewTab === 'code' && (
              <div className="preview-empty">
                <svg className="hall-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3 0 2.12 2.12 0 0 1 0-3L11 11l6.91-6.91a2.12 2.12 0 0 1 3 0 2.12 2.12 0 0 1 0 3l-3.77 3.77a1 1 0 0 0 0 1.4 1 1 0 0 0 1.4 0l3.77-3.77a4 4 0 0 0-5.66-5.66z" />
                </svg>
                <h3>Visualização de Código</h3>
                <p>Selecione um arquivo no painel lateral para visualizar o código aqui.</p>
              </div>
            )}
            {previewTab === 'console' && <ConsolePane />}
          </div>
        </section>
      </div>
    </div>
  );
}

export default WorkspaceLayout;