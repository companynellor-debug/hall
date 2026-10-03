import { FileTree, type TreeApi } from './FileTree';
import { fileTree } from '../data/workspace';
import { IconFile, IconGitBranch, IconTerminal, IconChevronDown, IconCheck, IconAlertCircle } from './icons';
import { useState, useCallback } from 'react';

type AuxTab = 'files' | 'changes' | 'console';
type BuildStage = 'initializing' | 'planning' | 'executing' | 'preview_ready' | 'complete' | 'error';

interface BuildingAuxPaneProps {
  activeTab: AuxTab;
  onTabChange: (tab: AuxTab) => void;
  projectName: string;
  buildStage: BuildStage;
  isExpanded?: boolean;
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

const buildLogs = [
  { type: 'info', time: '14:32:10', message: '[HALL] Iniciando construção do projeto...' },
  { type: 'info', time: '14:32:11', message: '[HALL] Analisando prompt do usuário' },
  { type: 'info', time: '14:32:12', message: '[HALL] Plano gerado: 4 etapas, 8 arquivos' },
  { type: 'info', time: '14:32:13', message: '[HALL] Criando estrutura de pastas' },
  { type: 'success', time: '14:32:14', message: '[HALL] ✓ src/ criado' },
  { type: 'success', time: '14:32:14', message: '[HALL] ✓ src/components/ criado' },
  { type: 'info', time: '14:32:15', message: '[HALL] Escrevendo src/App.tsx' },
  { type: 'success', time: '14:32:16', message: '[HALL] ✓ src/App.tsx escrito (45 linhas)' },
  { type: 'info', time: '14:32:16', message: '[HALL] Escrevendo src/components/Header.tsx' },
  { type: 'success', time: '14:32:17', message: '[HALL] ✓ src/components/Header.tsx escrito (120 linhas)' },
  { type: 'info', time: '14:32:18', message: '[HALL] Escrevendo src/components/ChatPane.tsx' },
  { type: 'success', time: '14:32:20', message: '[HALL] ✓ src/components/ChatPane.tsx escrito (280 linhas)' },
  { type: 'info', time: '14:32:20', message: '[HALL] Configurando Vite e TypeScript' },
  { type: 'success', time: '14:32:21', message: '[HALL] ✓ vite.config.ts configurado' },
  { type: 'success', time: '14:32:22', message: '[HALL] ✓ package.json atualizado com dependências' },
  { type: 'info', time: '14:32:23', message: '[HALL] Executando typecheck...' },
  { type: 'success', time: '14:32:25', message: '[HALL] ✓ TypeScript: 0 erros' },
  { type: 'info', time: '14:32:25', message: '[HALL] Iniciando servidor de desenvolvimento' },
  { type: 'success', time: '14:32:27', message: '[HALL] ✓ Preview disponível em http://localhost:5173' },
  { type: 'success', time: '14:32:28', message: '[HALL] Construção concluída com sucesso!' },
];

export function BuildingAuxPane({
  activeTab,
  onTabChange,
  projectName: _projectName,
  buildStage: _buildStage,
  isExpanded = false,
}: BuildingAuxPaneProps) {
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

  return (
    <aside className={`building-aux ${isExpanded ? 'expanded' : ''}`}>
      <div className="aux-tabs">
        <button
          className={`aux-tab ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => onTabChange('files')}
          title="Arquivos"
        >
          <IconFile size={14} />
          <span>Arquivos</span>
        </button>
        <button
          className={`aux-tab ${activeTab === 'changes' ? 'active' : ''}`}
          onClick={() => onTabChange('changes')}
          title="Alterações"
        >
          <IconGitBranch size={14} />
          <span>Alterações</span>
          <span className="changes-badge">{changedFiles.length}</span>
        </button>
        <button
          className={`aux-tab ${activeTab === 'console' ? 'active' : ''}`}
          onClick={() => onTabChange('console')}
          title="Console"
        >
          <IconTerminal size={14} />
          <span>Console</span>
        </button>
      </div>

      <div className="aux-content">
        {activeTab === 'files' && (
          <div className="aux-panel files-panel">
            <div className="aux-section">
              <button className="aux-section-header" onClick={() => toggleSection('explorer')}>
                <span className="section-title">Explorer</span>
                <IconChevronDown size={12} className={expandedSections.explorer ? 'open' : ''} />
              </button>
              {expandedSections.explorer && (
                <div className="aux-section-body">
                  <div className="explorer-section">Hall</div>
                  <FileTree nodes={treeApi.root} activePath="" onOpen={treeApi.open} />
                </div>
              )}
            </div>

            <div className="aux-section">
              <button className="aux-section-header" onClick={() => toggleSection('outline')}>
                <span className="section-title">Outline</span>
                <IconChevronDown size={12} className={expandedSections.outline ? 'open' : ''} />
              </button>
              {expandedSections.outline && (
                <div className="aux-section-body outline-body">
                  <div className="outline-item">App</div>
                  <div className="outline-item indent">Header</div>
                  <div className="outline-item indent">ChatPane</div>
                  <div className="outline-item indent">PreviewPane</div>
                  <div className="outline-item">BuildProvider</div>
                </div>
              )}
            </div>

            <div className="aux-section">
              <button className="aux-section-header" onClick={() => toggleSection('timeline')}>
                <span className="section-title">Timeline</span>
                <IconChevronDown size={12} className={expandedSections.timeline ? 'open' : ''} />
              </button>
              {expandedSections.timeline && (
                <div className="aux-section-body timeline-body">
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

        {activeTab === 'changes' && (
          <div className="aux-panel changes-panel">
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

        {activeTab === 'console' && (
          <div className="aux-panel console-panel">
            <div className="console-toolbar">
              <select className="console-filter">
                <option value="all">Todas</option>
                <option value="success">Sucesso</option>
                <option value="info">Info</option>
                <option value="error">Erros</option>
              </select>
              <button className="btn btn-ghost btn-sm" title="Limpar console">
                <IconTerminal size={12} />
              </button>
            </div>
            <div className="console-output">
              {buildLogs.map((log, i) => (
                <div key={i} className={`console-line ${log.type}`}>
                  <span className="console-time">{log.time}</span>
                  <span className="console-message">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}