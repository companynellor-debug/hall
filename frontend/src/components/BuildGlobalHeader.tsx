import { HallMark, IconHouse, IconFolder, IconBookOpen, IconUsersRound, IconGithub, IconSettings, IconChevronDown, IconUserRound } from './icons';
import { useState, useRef, useEffect } from 'react';

interface BuildGlobalHeaderProps {
  onNavigateHome: () => void;
  onNavigateProjects: () => void;
  onNavigateResources: () => void;
  onNavigateCommunity: () => void;
  onOpenGitHub: () => void;
  onOpenSettings: () => void;
}

export function BuildGlobalHeader({
  onNavigateHome,
  onNavigateProjects,
  onNavigateResources,
  onNavigateCommunity,
  onOpenGitHub,
  onOpenSettings,
}: BuildGlobalHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="build-global-header">
      <div className="global-header-left">
        <button className="global-logo-btn" onClick={onNavigateHome} aria-label="HALL Home">
          <HallMark size={20} className="global-logo" />
        </button>
        <nav className="global-nav" role="navigation" aria-label="Navegação principal">
          <button className="global-nav-item active" onClick={onNavigateHome} aria-current="page">
            <IconHouse size={16} />
            <span>Início</span>
          </button>
          <button className="global-nav-item" onClick={onNavigateProjects}>
            <IconFolder size={16} />
            <span>Projetos</span>
          </button>
          <button className="global-nav-item" onClick={onNavigateResources}>
            <IconBookOpen size={16} />
            <span>Recursos</span>
          </button>
          <button className="global-nav-item" onClick={onNavigateCommunity}>
            <IconUsersRound size={16} />
            <span>Comunidade</span>
          </button>
        </nav>
      </div>

      <div className="global-header-right">
        <button className="global-action-btn" onClick={onOpenGitHub} aria-label="GitHub" title="GitHub">
          <IconGithub size={18} />
        </button>
        <button className="global-action-btn" onClick={onOpenSettings} aria-label="Configurações" title="Configurações">
          <IconSettings size={18} />
        </button>
        <div className="global-divider" aria-hidden="true" />
        <div className="global-user-menu" ref={userMenuRef}>
          <button
            className="global-user-trigger"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            <div className="global-user-avatar">
              <IconUserRound size={20} />
            </div>
            <span className="global-user-name">Usuário</span>
            <IconChevronDown size={12} className={userMenuOpen ? 'rotated' : ''} />
          </button>
          {userMenuOpen && (
            <div className="global-user-dropdown" role="menu">
              <div className="global-user-info">
                <div className="global-user-avatar large">
                  <IconUserRound size={28} />
                </div>
                <div>
                  <span className="global-user-name">Usuário</span>
                  <span className="global-user-email">usuario@hall.dev</span>
                </div>
              </div>
              <div className="global-dropdown-divider" />
              <button className="global-dropdown-item" role="menuitem">
                <IconSettings size={14} />
                <span>Configurações</span>
              </button>
              <button className="global-dropdown-item" role="menuitem">
                <IconBookOpen size={14} />
                <span>Documentação</span>
              </button>
              <div className="global-dropdown-divider" />
              <button className="global-dropdown-item danger" role="menuitem">
                <IconChevronDown size={14} className="logout-icon" />
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}