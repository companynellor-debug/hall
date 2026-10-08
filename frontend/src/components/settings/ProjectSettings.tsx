import { useState, useCallback, useMemo } from 'react';
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
import { useProjectSettings } from '../../features/project-settings/hooks/useProjectSettings';
import { mockProjectSettingsRepository } from '../../features/project-settings/mocks/repository';
import './settings.css';

interface Props {
  projectId: string;
  projectName: string;
  onHome: () => void;
  onOpenProject: () => void;
}

const NAV = ['Início', 'Projetos', 'Recursos', 'Comunidade'];

export function ProjectSettings({ projectId, projectName, onHome, onOpenProject }: Props) {
  const display = projectName || 'Nellor';
  const initial = display.charAt(0).toUpperCase();

  const {
    settings,
    availableModels,
    isLoading,
    isSaving,
    error,
    updateProject,
    updateAgent,
    updateSecurity,
    updateDesign,
    updateDeployment,
    updateGitHub,
    connectProvider,
    disconnectProvider,
    connectIntegration,
    disconnectIntegration,
    upsertEnvVar,
    deleteEnvVar,
    save,
    discard,
  } = useProjectSettings({ projectId, repository: mockProjectSettingsRepository });

  const [active, setActive] = useState<SectionId>('overview');
  const [savedForm, setSavedForm] = useState<SettingsForm>(() => makeDefaultForm(display));
  const [form, setForm] = useState<SettingsForm>(() => makeDefaultForm(display));

  const update = useCallback((fn: (f: SettingsForm) => SettingsForm) => setForm(fn), []);
  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(savedForm), [form, savedForm]);

  const onSave = useCallback(() => {
    save();
    setSavedForm(form);
  }, [save, form]);

  const onDiscard = useCallback(() => {
    discard();
    setForm(savedForm);
  }, [discard, savedForm]);

  if (!settings || isLoading) {
    return (
      <div className="st-page" data-testid="project-settings">
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
        </header>
        <div className="st-scroll">
          <div className="st-loading" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'300px',color:'#8a8d93'}}>
            <div style={{textAlign:'center'}}>
              <div className="st-spinner" style={{width:32,height:32,border:'3px solid #222',borderTopColor:'#e53935',borderRadius:'50%',animation:'spin 1s linear infinite',margin:'0 auto 16px'}} />
              <p>Carregando configurações...</p>
              <p style={{fontSize:12,color:'#5c5c5c',marginTop:8}}>Se demorar, clique para recarregar</p>
              <button onClick={() => window.location.reload()} style={{marginTop:16,padding:'8px 16px',background:'#e53935',color:'#fff',border:'none',borderRadius:6,cursor:'pointer'}}>Recarregar página</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: always render something even if there's an unexpected state
  if (!settings) {
    console.warn('[ProjectSettings] Unexpected state: no settings, not loading, no error');
    return (
      <div className="st-page" data-testid="project-settings">
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
        </header>
        <div className="st-scroll">
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'300px',color:'#e53935',textAlign:'center',padding:24}}>
            <div>
              <p style={{fontSize:16,fontWeight:600,marginBottom:8}}>Não foi possível carregar as configurações</p>
              <p style={{fontSize:13,color:'#8a8d93',marginBottom:16}}>O projeto pode não existir ou houve um erro de conexão.</p>
              <button onClick={() => window.location.reload()} style={{padding:'10px 20px',background:'#e53935',color:'#fff',border:'none',borderRadius:6,cursor:'pointer'}}>Tentar novamente</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="st-page" data-testid="project-settings">
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
        </header>
        <div className="st-scroll">
          <div className="st-error">
            <p>Não foi possível carregar as configurações.</p>
            <button className="st-btn" onClick={() => window.location.reload()}>Tentar novamente</button>
          </div>
        </div>
      </div>
    );
  }

  const renderSection = useCallback(() => {
    const baseProps = {
      form,
      update,
      savedForm,
      setForm,
      availableModels,
      updateProject,
      updateAgent,
      updateSecurity,
      updateDesign,
      updateDeployment,
      updateGitHub,
      connectProvider,
      disconnectProvider,
      connectIntegration,
      disconnectIntegration,
      upsertEnvVar,
      deleteEnvVar,
    };

    switch (active) {
      case 'overview':
        return <OverviewSection {...baseProps} />;
      case 'models':
        return <ModelsSection {...baseProps} />;
      case 'github':
        return <GithubSection {...baseProps} />;
      case 'integrations':
        return <IntegrationsSection {...baseProps} />;
      case 'security':
        return <SecuritySection {...baseProps} />;
      case 'design':
        return <DesignSection {...baseProps} />;
      case 'deploy':
        return <DeploySection {...baseProps} />;
      case 'environment':
        return <EnvironmentSection {...baseProps} />;
      case 'logs':
        return <LogsSection />;
      case 'advanced':
        return <AdvancedSection />;
    }
  }, [active, form, update, savedForm, setForm, availableModels, updateProject, updateAgent, updateSecurity, updateDesign, updateDeployment, updateGitHub, connectProvider, disconnectProvider, connectIntegration, disconnectIntegration, upsertEnvVar, deleteEnvVar, save, discard]);

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
            <span className="ws-user-av">{initial}</span>
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
              <Btn variant="primary" onClick={onSave} disabled={!dirty || isSaving} data-testid="save-btn">
                {isSaving ? 'Salvando...' : 'Salvar alterações'}
              </Btn>
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