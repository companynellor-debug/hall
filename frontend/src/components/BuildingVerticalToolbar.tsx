import { FileTree, type TreeApi } from './FileTree';
import { fileTree } from '../data/workspace';
import { IconFile, IconHeartPulse, IconChevronDown, IconCheck, IconAlertCircle, IconLayoutDashboard, IconFolder, IconFileText } from './icons';
import { useState, useCallback } from 'react';

type RightTool = 'files' | 'changes' | 'health';
type BuildStage = 'initializing' | 'planning' | 'executing' | 'preview_ready' | 'complete' | 'error';

interface BuildingVerticalToolbarProps {
  activeTool: RightTool;
  onToolChange: (tool: RightTool) => void;
  buildStage: BuildStage;
}

const changedFiles = [
  { path: 'src/App.tsx', status: 'modified', lines: '+45 -12' },
  { path: 'src/components/Header.tsx', status: 'added', lines: '+120' },
  { path: 'src/components/ChatPane.tsx', status: 'added', lines: '+280' },
  { path: 'src/components/PreviewPane.tsx', status: 'added', lines: '+190' },
  { path: 'package.json', status: 'modified', lines: '+8 -2' },
  { path: 'vite.config.ts', status: 'added', lines: '+35' },
  { path: 'tsconfig.json', status: 'modified', lines: '+3 -1' },
  { path: 'README.md', status: 'added', lines: '+65' },
];

const healthChecks = [
  { label: 'TypeScript', status: 'pass', detail: '0 erros' },
  { label: 'ESLint', status: 'pass', detail: '0 avisos' },
  { label: 'Build', status: 'pass', detail: 'sucesso' },
  { label: 'Testes', status: 'pending', detail: 'não executados' },
  { label: 'Segurança', status: 'pass', detail: '0 vulnerabilidades' },
];

export function BuildingVerticalToolbar({
  activeTool,
  onToolChange,
  buildStage,
}: BuildingVerticalToolbarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    explorer: true,
    changes: true,
    outline: false,
    timeline: false,
  });

  const treeApi: TreeApi = {
    root: fileTree,
    open: () => {},
  };

  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'added': return <IconCheck size={10} className="status-added" />;
      case 'modified': return <IconAlertCircle size={10} className="status-modified" />;
      case 'deleted': return <IconAlertCircle size={10} className="status-deleted" />;
      default: return <IconFile size={10} />;
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'pass': return <IconCheck size={12} className="health-pass" />;
      case 'fail': return <IconAlertCircle size={12} className="health-fail" />;
      case 'pending': return <IconLayoutDashboard size={12} className="health-pending" />;
      default: return <IconLayoutDashboard size={12} />;
    }
  };

  const toolConfig = [
    { id: 'files', icon: 'files', label: 'Arquivos' },
    { id: 'changes', icon: 'changes', label: 'Alterações', badge: changedFiles.length },
    { id: 'health', icon: 'health', label: 'Saúde' },
  ] as const;

  return (
    <aside className="vertical-toolbar">
      <nav className="toolbar-nav" role="navigation" aria-label="Ferramentas do workspace">
        {toolConfig.map((tool) => (
          <button
            key={tool.id}
            className={`toolbar-btn ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => onToolChange(tool.id as RightTool)}
            title={tool.label}
            aria-label={tool.label}
            aria-pressed={activeTool === tool.id}
          >
            {tool.icon === 'files' && <IconFolder size={20} />}
            {tool.icon === 'changes' && (
              <>
                <IconFileText size={20} />
                {tool.badge && tool.badge > 0 && (
                  <span className="toolbar-badge">{tool.badge}</span>
                )}
              </>
            )}
            {tool.icon === 'health' && <IconHeartPulse size={20} />}
            <span className="toolbar-tooltip">{tool.label}</span>
          </button>
        ))}
      </nav>

      <div className="toolbar-content">
        {activeTool === 'files' && (
          <div className="toolbar-panel files-panel">
            <div className="toolbar-section">
              <button className="toolbar-section-header" onClick={() => toggleSection('explorer')}>
                <span className="section-title">Explorer</span>
                <IconChevronDown size={12} className={expandedSections.explorer ? 'open' : ''} />
              </button>
              {expandedSections.explorer && (
                <div className="toolbar-section-body">
                  <div className="toolbar-section-label">Hall</div>
                  <FileTree nodes={treeApi.root} activePath="" onOpen={treeApi.open} />
                </div>
              )}
            </div>

            <div className="toolbar-section">
              <button className="toolbar-section-header" onClick={() => toggleSection('outline')}>
                <span className="section-title">Outline</span>
                <IconChevronDown size={12} className={expandedSections.outline ? 'open' : ''} />
              </button>
              {expandedSections.outline && (
                <div className="toolbar-section-body outline-body">
                  <div className="outline-item">App</div>
                  <div className="outline-item indent">Header</div>
                  <div className="outline-item indent">ChatPane</div>
                  <div className="outline-item indent">PreviewPane</div>
                  <div className="outline-item">BuildProvider</div>
                </div>
              )}
            </div>

            <div className="toolbar-section">
              <button className="toolbar-section-header" onClick={() => toggleSection('timeline')}>
                <span className="section-title">Timeline</span>
                <IconChevronDown size={12} className={expandedSections.timeline ? 'open' : ''} />
              </button>
              {expandedSections.timeline && (
                <div className="toolbar-section-body timeline-body">
                  <div className="timeline-item">
                    <span className="timeline-time">14:32:28</span>
                    <span className="timeline-event">Build concluído</span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-time">14:32:25</span>
                    <span className="timeline-event">Typecheck passou</span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-time">14:32:13</span>
                    <span className="timeline-event">Iniciando execução</span>
                  </div>
                  <div className="timeline-item">
                    <span className="timeline-time">14:32:10</span>
                    <span className="timeline-event">Build iniciado</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTool === 'changes' && (
          <div className="toolbar-panel changes-panel">
            <div className="changes-header">
              <span className="changes-title">Alterações do Build</span>
              <span className="changes-summary">
                {changedFiles.filter(f => f.status === 'added').length} novos · 
                {changedFiles.filter(f => f.status === 'modified').length} modificados
              </span>
            </div>
            <div className="changes-list">
              {changedFiles.map((file) => (
                <div key={file.path} className="change-item">
                  <div className="change-status">
                    {getStatusIcon(file.status)}
                  </div>
                  <div className="change-info">
                    <span className="change-path">{file.path}</span>
                    <span className="change-lines">{file.lines}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="changes-footer">
              <button className="btn btn-secondary btn-sm">Ver diff completo</button>
              <button className="btn btn-primary btn-sm">Commit alterações</button>
            </div>
          </div>
        )}

        {activeTool === 'health' && (
          <div className="toolbar-panel health-panel">
            <div className="health-header">
              <span className="health-title">Saúde do Projeto</span>
              <span className={`health-status ${buildStage === 'complete' ? 'healthy' : buildStage === 'error' ? 'unhealthy' : 'checking'}`}>
                {buildStage === 'complete' ? 'Saudável' : buildStage === 'error' ? 'Com problemas' : 'Verificando...'}
              </span>
            </div>
            <div className="health-list">
              {healthChecks.map((check, i) => (
                <div key={i} className="health-item">
                  <div className="health-icon">
                    {getHealthIcon(check.status)}
                  </div>
                  <div className="health-info">
                    <span className="health-label">{check.label}</span>
                    <span className="health-detail">{check.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}