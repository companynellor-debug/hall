import { WorkspaceLayout } from './WorkspaceLayout';
import { Icon } from './ui/Icon';
import hallLogo from '../assets/hall-logo.png';

interface ProjectWorkspaceProps {
  onBack: () => void;
  projectName: string;
  onOpenSettings: () => void;
}

const NAV = [
  { label: 'Início', icon: 'home' },
  { label: 'Projetos', icon: 'folder' },
  { label: 'Recursos', icon: 'book' },
  { label: 'Comunidade', icon: 'users' },
] as const;

function NavIcon({ name }: { name: string }) {
  const p = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'home') return <svg {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>;
  if (name === 'folder') return <svg {...p}><path d="M3 7a1 1 0 0 1 1-1h5l2 2.5h8a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /></svg>;
  if (name === 'book') return <svg {...p}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H18a1 1 0 0 1 1 1v13H6a2 2 0 0 0-2 2Z" /><path d="M6 18a2 2 0 0 0-2 2" /></svg>;
  return <svg {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.3" /><path d="M16 20a5 5 0 0 1 5-5" /></svg>;
}

export function ProjectWorkspace({ onBack, projectName, onOpenSettings }: ProjectWorkspaceProps) {
  const display = projectName || 'Nellor';
  const initial = display.charAt(0).toUpperCase();

  return (
    <div className="ws" data-testid="workspace">
      {/* Global top navigation */}
      <header className="ws-topbar">
        <div className="ws-topbar-left">
          <button className="ws-brand" onClick={onBack} aria-label="Voltar ao início" data-testid="ws-home-btn">
            <img src={hallLogo} className="ws-brand-logo" alt="HALL" />
            <span className="ws-brand-word">HALL</span>
          </button>
          <nav className="ws-nav">
            {NAV.map((n, i) => (
              <button key={n.label} className={`ws-nav-item${i === 0 ? ' active' : ''}`} data-testid={`ws-nav-${n.label.toLowerCase()}`}>
                <NavIcon name={n.icon} />
                {n.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="ws-topbar-right">
          <button className="ws-icon-btn" aria-label="GitHub" data-testid="ws-github-btn">
            <Icon name="github" size={18} />
          </button>
          <span className="ws-topbar-divider" />
          <button className="ws-user" data-testid="ws-user-menu">
            <span className="ws-user-av">N</span>
            <span className="ws-user-name">Nakor</span>
            <Icon name="chevron-down" size={14} />
          </button>
        </div>
      </header>

      {/* Project context sub-bar */}
      <div className="ws-subbar">
        <div className="ws-subbar-left">
          <button className="ws-project" data-testid="ws-project-switcher">
            <span className="ws-project-av">{initial}</span>
            <span className="ws-project-name">{display}</span>
            <Icon name="chevron-down" size={14} />
          </button>
          <button className="ws-branch" data-testid="ws-branch-switcher">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="2.4" /><circle cx="6" cy="18" r="2.4" /><circle cx="18" cy="8" r="2.4" />
              <path d="M6 8.4v7.2M18 10.4c0 3-2.5 4.6-6 4.6" />
            </svg>
            main
            <Icon name="chevron-down" size={12} />
          </button>
        </div>
        <div className="ws-subbar-right">
          <span className="ws-sync-label">Último sync há 2 minutos</span>
          <button className="ws-btn" data-testid="ws-sync-git-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 11a8 8 0 0 0-14-5l-2 2M4 13a8 8 0 0 0 14 5l2-2" /><path d="M4 4v4h4M20 20v-4h-4" />
            </svg>
            Sync Git
          </button>
          <button className="ws-btn" onClick={onOpenSettings} data-testid="ws-settings-btn">
            <Icon name="settings" size={15} />
            Configurações
          </button>
        </div>
      </div>

      <WorkspaceLayout projectName={display} />
    </div>
  );
}

export default ProjectWorkspace;
