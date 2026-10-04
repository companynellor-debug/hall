import { useMemo, useState } from 'react';
import { ChevronDown, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Icon } from '../ui/Icon';
import hallLogo from '../../assets/hall-logo.png';
import { SettingsSidebar } from './SettingsSidebar';
import { Btn } from './ui';
import { makeDefaultForm, type SectionId, type SettingsForm } from './data';
import {
  OverviewSection, ModelsSection, GithubSection, IntegrationsSection, SecuritySection,
  DesignSection, DeploySection, EnvironmentSection, LogsSection, AdvancedSection,
} from './sections';
import './settings.css';

interface Props {
  projectName: string;
  onHome: () => void;
  onOpenProject: () => void;
}

const NAV = ['Início', 'Projetos', 'Recursos', 'Comunidade'];

export function ProjectSettings({ projectName, onHome, onOpenProject }: Props) {
  const display = projectName || 'Nellor';
  const initial = display.charAt(0).toUpperCase();

  const [active, setActive] = useState<SectionId>('overview');
  const [saved, setSaved] = useState<SettingsForm>(() => makeDefaultForm(display));
  const [form, setForm] = useState<SettingsForm>(() => makeDefaultForm(display));

  const update = (fn: (f: SettingsForm) => SettingsForm) => setForm(fn);
  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(saved), [form, saved]);

  const onSave = () => setSaved(form);
  const onDiscard = () => setForm(saved);

  const renderSection = () => {
    switch (active) {
      case 'overview': return <OverviewSection form={form} update={update} />;
      case 'models': return <ModelsSection form={form} update={update} />;
      case 'github': return <GithubSection form={form} update={update} />;
      case 'integrations': return <IntegrationsSection />;
      case 'security': return <SecuritySection form={form} update={update} />;
      case 'design': return <DesignSection form={form} update={update} />;
      case 'deploy': return <DeploySection form={form} update={update} />;
      case 'environment': return <EnvironmentSection />;
      case 'logs': return <LogsSection />;
      case 'advanced': return <AdvancedSection />;
    }
  };

  return (
    <div className="st-page" data-testid="project-settings">
      {/* Global HALL header */}
      <header className="ws-topbar">
        <div className="ws-topbar-left">
          <button className="ws-brand" onClick={onHome} aria-label="Início" data-testid="st-home-btn">
            <img src={hallLogo} className="ws-brand-logo" alt="HALL" />
            <span className="ws-brand-word">HALL</span>
          </button>
          <nav className="ws-nav">
            {NAV.map((n, i) => (
              <button key={n} className={`ws-nav-item${i === 0 ? ' active' : ''}`}>{n}</button>
            ))}
          </nav>
        </div>
        <div className="ws-topbar-right">
          <button className="ws-icon-btn" aria-label="GitHub"><Icon name="github" size={18} /></button>
          <button className="ws-icon-btn" aria-label="Configurações"><Icon name="settings" size={18} /></button>
          <span className="ws-topbar-divider" />
          <button className="ws-user">
            <span className="ws-user-av">N</span>
            <span className="ws-user-name">Nakor</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </header>

      <div className="st-scroll">
        {/* Breadcrumb */}
        <nav className="st-breadcrumb" data-testid="st-breadcrumb">
          <button onClick={onOpenProject}>Projetos</button>
          <span className="st-bc-sep">›</span>
          <button onClick={onOpenProject}>{display}</button>
          <span className="st-bc-sep">›</span>
          <span className="st-bc-current">Configurações</span>
        </nav>

        {/* Heading */}
        <div className="st-heading">
          <div className="st-heading-left">
            <span className="st-project-av">{initial}</span>
            <div className="st-heading-text">
              <div className="st-heading-row">
                <h1>{display}</h1>
                <span className="st-project-badge">Projeto</span>
              </div>
              <p>Configure agentes, integrações e preferências do seu projeto.</p>
            </div>
          </div>
          <div className="st-heading-actions">
            <Btn variant="secondary" onClick={onOpenProject} data-testid="open-project-btn">
              Abrir projeto <ExternalLink size={14} />
            </Btn>
            <button className="st-more lg" aria-label="Mais opções" data-testid="heading-more"><MoreHorizontal size={18} /></button>
          </div>
        </div>

        <div className="st-divider" />

        {/* Layout */}
        <div className="st-layout">
          <SettingsSidebar active={active} onChange={setActive} />

          <main className="st-content">
            <div className="st-savebar">
              <span className="st-savebar-label">Última atualização há 5 minutos</span>
              <Btn variant="secondary" onClick={onDiscard} disabled={!dirty} data-testid="discard-btn">Descartar</Btn>
              <Btn variant="primary" onClick={onSave} disabled={!dirty} data-testid="save-btn">Salvar alterações</Btn>
            </div>
            {renderSection()}
          </main>
        </div>

        <footer className="st-footer">
          <div className="st-footer-left">
            <span className="st-footer-brand">HALL</span>
            <span className="st-footer-tag">Construir o amanhã, mais rápido.</span>
          </div>
          <div className="st-footer-right">
            <button>Status</button>
            <button>Documentação</button>
            <button>Suporte</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ProjectSettings;
