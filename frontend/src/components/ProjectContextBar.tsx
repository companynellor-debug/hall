import { IconGitBranch, IconChevronDown, IconRefreshCw, IconSettings, IconCheck } from './icons';
import { useState, useRef, useEffect } from 'react';

interface ProjectContextBarProps {
  projectName: string;
  branch: string;
  onBranchChange: (branch: string) => void;
  onSync: () => void;
  onSettings: () => void;
  isSyncing: boolean;
  lastSync: string;
  availableBranches: string[];
}

export function ProjectContextBar({
  projectName,
  branch,
  onBranchChange,
  onSync,
  onSettings,
  isSyncing,
  lastSync,
  availableBranches,
}: ProjectContextBarProps) {
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);
  const branchMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (branchMenuRef.current && !branchMenuRef.current.contains(e.target as Node)) {
        setBranchMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="project-context-bar">
      <div className="project-context-left">
        <div className="project-avatar">
          {projectName.charAt(0).toUpperCase()}
        </div>
        <div className="project-info">
          <span className="project-name">{projectName}</span>
        </div>
        <div className="branch-selector" ref={branchMenuRef}>
          <button
            className="branch-btn fluid-glass"
            onClick={() => setBranchMenuOpen(!branchMenuOpen)}
            aria-expanded={branchMenuOpen}
            aria-haspopup="listbox"
            aria-label="Selecionar branch"
          >
            <IconGitBranch size={14} />
            <span>{branch}</span>
            <IconChevronDown size={10} className={branchMenuOpen ? 'rotated' : ''} />
          </button>
          {branchMenuOpen && (
            <ul className="branch-menu" role="listbox" aria-label="Branches disponíveis">
              {availableBranches.map((b) => (
                <li key={b} role="option" aria-selected={branch === b} onClick={() => { onBranchChange(b); setBranchMenuOpen(false); }}>
                  {branch === b && <IconCheck size={12} className="branch-check" />}
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="project-context-right">
        <span className="sync-status" aria-live="polite">
          <span className="sync-indicator" />
          Último sync {lastSync}
        </span>
        <button
          className="sync-btn fluid-glass"
          onClick={onSync}
          disabled={isSyncing}
          aria-label="Sincronizar com Git"
          title="Sincronizar"
        >
          {isSyncing ? (
            <>
              <IconRefreshCw size={14} className="spin" />
              <span>Sincronizando...</span>
            </>
          ) : (
            <>
              <IconRefreshCw size={14} />
              <span>Sync Git</span>
            </>
          )}
        </button>
        <button
          className="project-settings-btn fluid-glass"
          onClick={onSettings}
          aria-label="Configurações do projeto"
          title="Configurações"
        >
          <IconSettings size={16} />
          <span>Configurações</span>
        </button>
      </div>
    </div>
  );
}