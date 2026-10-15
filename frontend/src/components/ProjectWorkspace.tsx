import { useState } from 'react';
import { WorkspaceLayout } from './WorkspaceLayout';
import { Icon, type IconName } from './ui/Icon';
import type { SectionId } from './settings/data';
import hallLogo from '../assets/hall-logo.png';

interface ProjectWorkspaceProps {
  onBack: () => void;
  projectName: string;
  onOpenSettings: (section?: SectionId) => void;
}

type WsNav = 'chat' | 'tarefas' | 'arquivos' | 'alteracoes' | 'logs';
type PvTab = 'preview' | 'code' | 'console';
type RailId = 'changes' | 'files' | 'health';

const TOP_NAV = [
  { label: 'Início', icon: 'home' },
  { label: 'Projetos', icon: 'folder' },
  { label: 'Recursos', icon: 'book' },
  { label: 'Comunidade', icon: 'users' },
] as const;

const SIDE_NAV: { id: WsNav; label: string; icon: IconName }[] = [
  { id: 'chat', label: 'Chat', icon: 'message-square' },
  { id: 'tarefas', label: 'Tarefas', icon: 'check' },
  { id: 'arquivos', label: 'Arquivos', icon: 'folder' },
  { id: 'alteracoes', label: 'Alterações', icon: 'file' },
  { id: 'logs', label: 'Logs', icon: 'terminal' },
];

const SIDE_SETTINGS: { id: SectionId; label: string; icon: IconName }[] = [
  { id: 'overview', label: 'Geral', icon: 'settings' },
  { id: 'models', label: 'Modelos & Agentes', icon: 'cpu' },
  { id: 'github', label: 'GitHub', icon: 'github' },
  { id: 'integrations', label: 'Integrações', icon: 'cube' },
  { id: 'deploy', label: 'Deploy', icon: 'server' },
  { id: 'environment', label: 'Ambiente', icon: 'globe' },
  { id: 'security', label: 'Segurança', icon: 'shield' },
  { id: 'design', label: 'Aparência', icon: 'star' },
  { id: 'advanced', label: 'Avançado', icon: 'code' },
];

function NavGlyph({ name }: { name: string }) {
  const p = { width: 15, height: 15, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'home') return <svg {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>;
  if (name === 'folder') return <svg {...p}><path d="M3 7a1 1 0 0 1 1-1h5l2 2.5h8a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" /></svg>;
  if (name === 'book') return <svg {...p}><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H18a1 1 0 0 1 1 1v13H6a2 2 0 0 0-2 2Z" /><path d="M6 18a2 2 0 0 0-2 2" /></svg>;
  return <svg {...p}><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.3" /><path d="M16 20a5 5 0 0 1 5-5" /></svg>;
}

export function ProjectWorkspace({ onBack, projectName, onOpenSettings }: ProjectWorkspaceProps) {
  const display = projectName || 'Nellor';
  const initial = display.charAt(0).toUpperCase();

  const [nav, setNav] = useState<WsNav>('chat');
  const [chatTab, setChatTab] = useState<'chat' | 'tarefas'>('chat');
  const [previewTab, setPreviewTab] = useState<PvTab>('preview');
  const [rail, setRail] = useState<RailId>('changes');

  const selectNav = (id: WsNav) => {
    setNav(id);
    if (id === 'chat') setChatTab('chat');
    if (id === 'tarefas') setChatTab('tarefas');
    if (id === 'arquivos') { setPreviewTab('code'); setRail('files'); }
    if (id === 'alteracoes') { setPreviewTab('preview'); setRail('changes'); }
    if (id === 'logs') setPreviewTab('console');
  };

  return (
    <div className="ws" data-testid="workspace">
      {/* Topbar global */}
      <header className="ws-topbar">
        <div className="ws-topbar-left">
          <button className="ws-brand" onClick={onBack} aria-label="Voltar ao início" data-testid="ws-home-btn">
            <img src={hallLogo} className="ws-brand-logo" alt="HALL" />
            <span className="ws-brand-word">HALL</span>
          </button>
          <nav className="ws-nav">
            {TOP_NAV.map((n, i) => (
              <button key={n.label} className={`ws-nav-item${i === 0 ? ' active' : ''}`} data-testid={`ws-nav-${n.label.toLowerCase()}`}>
                <NavGlyph name={n.icon} />
                {n.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="ws-topbar-right">
          <button className="ws-icon-btn" aria-label="GitHub" data-testid="ws-github-btn">
            <Icon name="github" size={17} />
          </button>
          <button className="ws-icon-btn" aria-label="Configurações" onClick={() => onOpenSettings()} data-testid="ws-settings-icon">
            <Icon name="settings" size={17} />
          </button>
          <span className="ws-topbar-divider" />
          <button className="ws-user" data-testid="ws-user-menu">
            <span className="ws-user-av">N</span>
            <span className="ws-user-name">Nakor</span>
            <Icon name="chevron-down" size={13} />
          </button>
        </div>
      </header>

      <div className="ws-content">
        {/* Sidebar esquerda */}
        <nav className="ws-side" data-testid="ws-side">
          <div className="ws-side-head">
            <button className="ws-project" data-testid="ws-project-switcher">
              <span className="ws-project-av">{initial}</span>
              <span className="ws-project-info">
                <span className="ws-project-name">{display}</span>
                <span className="ws-project-status">Projeto ativo</span>
              </span>
              <Icon name="chevron-down" size={13} />
            </button>
            <button className="ws-branch" data-testid="ws-branch-switcher">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="8" r="2.2" />
                <path d="M6 8.2v7.6M18 10.2c0 2.8-2.2 4.4-5.5 4.4" />
              </svg>
              main
              <Icon name="chevron-down" size={11} />
            </button>
          </div>
          <div className="ws-side-group">
            {SIDE_NAV.map((n) => (
              <button
                key={n.id}
                className={`ws-side-item${nav === n.id ? ' active' : ''}`}
                onClick={() => selectNav(n.id)}
                data-testid={`side-${n.id}`}
              >
                <Icon name={n.icon} size={17} />
                {n.label}
              </button>
            ))}
          </div>
          <div className="ws-side-group">
            <span className="ws-side-label">Configurações</span>
            {SIDE_SETTINGS.map((s) => (
              <button
                key={s.label}
                className="ws-side-item"
                onClick={() => onOpenSettings(s.id)}
                data-testid={`side-settings-${s.label.toLowerCase()}`}
              >
                <Icon name={s.icon} size={17} />
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Coluna Chat + Preview + Rail */}
        <div className="ws-workarea">
          {/* Subbar do chat: contexto do projeto + ações */}
          <div className="ws-chatbar">
            <div className="ws-chatbar-left">
              <span className="ws-chatbar-av">{initial}</span>
              <span className="ws-chatbar-info">
                <span className="ws-chatbar-name">{display}</span>
                <span className="ws-chatbar-status">Projeto ativo</span>
              </span>
              <button className="ws-branch" data-testid="ws-chatbar-branch">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4e8a6b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="8" r="2.2" />
                  <path d="M6 8.2v7.6M18 10.2c0 2.8-2.2 4.4-5.5 4.4" />
                </svg>
                main
                <Icon name="chevron-down" size={11} />
              </button>
            </div>
            <div className="ws-chatbar-right">
              <button className="ws-btn" data-testid="ws-sync-git-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 11a8 8 0 0 0-14-5l-2 2M4 13a8 8 0 0 0 14 5l2-2" /><path d="M4 4v4h4M20 20v-4h-4" />
                </svg>
                Sync Git
              </button>
              <button className="ws-btn" onClick={() => onOpenSettings()} data-testid="ws-settings-btn">
                <Icon name="settings" size={14} />
                Configurações
              </button>
              <button className="ws-icon-btn" aria-label="Mais opções" data-testid="ws-more-btn">
                <Icon name="more-horizontal" size={16} />
              </button>
            </div>
          </div>

          <WorkspaceLayout
            projectName={display}
            chatTab={chatTab}
            onChatTabChange={(t) => { setChatTab(t); setNav(t); }}
            previewTab={previewTab}
            onPreviewTabChange={setPreviewTab}
            rail={rail}
            onRailChange={setRail}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectWorkspace;
