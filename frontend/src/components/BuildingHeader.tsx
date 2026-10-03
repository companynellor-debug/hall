import { HallMark, IconChevronLeft, IconLayout, IconGear, IconSparkles, IconExternal } from './icons';
import { useState, useRef, useEffect } from 'react';

interface BuildingHeaderProps {
  projectName: string;
  buildStage: 'initializing' | 'planning' | 'executing' | 'preview_ready' | 'complete' | 'error';
  selectedModel: string;
  onBack: () => void;
  onToggleRightToolbar: () => void;
  showRightToolbar: boolean;
}

const stageIcons: Record<string, React.ReactNode> = {
  initializing: <HallMark size={14} className="stage-icon pulse" />,
  planning: <IconSparkles size={14} className="stage-icon pulse" />,
  executing: <HallMark size={14} className="stage-icon spin" />,
  preview_ready: <IconExternal size={14} className="stage-icon" />,
  complete: <IconSparkles size={14} className="stage-icon" />,
  error: <IconSparkles size={14} className="stage-icon error" />,
};

const stageLabels: Record<string, string> = {
  initializing: 'Inicializando',
  planning: 'Planejando',
  executing: 'Construindo',
  preview_ready: 'Preview pronto',
  complete: 'Concluído',
  error: 'Erro',
};

export function BuildingHeader({
  projectName,
  buildStage,
  selectedModel,
  onBack,
  onToggleRightToolbar,
  showRightToolbar,
}: BuildingHeaderProps) {
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setModelMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const MODELS = [
    { value: 'auto', label: 'Auto', icon: 'mic' },
    { value: 'hall-core', label: 'HALL Core', icon: 'cpu' },
    { value: 'hall-pro', label: 'HALL Pro', icon: 'zap' },
  ] as const;

  return (
    <header className="building-header">
      <div className="header-left">
        <button className="header-back-btn" onClick={onBack} aria-label="Voltar para Home">
          <IconChevronLeft size={18} />
        </button>
        <div className="project-info">
          <HallMark size={18} className="header-logo" />
          <div className="project-details">
            <span className="project-name">{projectName}</span>
            <div className="build-status">
              {stageIcons[buildStage]}
              <span className="status-label">{stageLabels[buildStage]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="model-selector" ref={menuRef}>
          <button
            className="model-btn fluid-glass"
            onClick={() => setModelMenuOpen(!modelMenuOpen)}
            aria-expanded={modelMenuOpen}
            aria-haspopup="listbox"
            aria-label="Selecionar modelo"
          >
            <IconSparkles size={14} />
            <span>{selectedModel}</span>
            <IconChevronLeft size={12} className={modelMenuOpen ? 'rotated' : ''} />
          </button>
          {modelMenuOpen && (
            <ul className="model-menu" role="listbox" aria-label="Selecionar modelo">
              {MODELS.map((m) => (
                <li key={m.value} role="option" onClick={() => setModelMenuOpen(false)}>
                  <span>{m.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="header-right">
        <button className="header-action-btn fluid-glass" onClick={onToggleRightToolbar} aria-label={showRightToolbar ? 'Ocultar barra de ferramentas' : 'Mostrar barra de ferramentas'} title={showRightToolbar ? 'Ocultar ferramentas' : 'Mostrar ferramentas'}>
          <IconLayout size={18} />
        </button>
        <button className="header-action-btn fluid-glass" aria-label="Configurações do projeto" title="Configurações">
          <IconGear size={18} />
        </button>
      </div>
    </header>
  );
}