import { useState } from 'react';
import { HomeScreen } from './components/home/HomeScreen';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import { ProjectSettings } from './components/settings/ProjectSettings';
import type { SectionId } from './components/settings/data';
import Background from './components/ui/Background';
import './index.css';

type View = 'home' | 'workspace' | 'settings';

function App() {
  const [view, setView] = useState<View>('home');
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [settingsSection, setSettingsSection] = useState<SectionId>('overview');

  const handleBackToHome = () => {
    setView('home');
    setProjectName('');
    setProjectId('');
  };

  const handleImportGithub = (url: string) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    const repoName = match ? match[2].replace(/\.git$/, '') : 'Imported Project';
    setProjectName(repoName);
    setProjectId(repoName.toLowerCase().replace(/\s+/g, '-'));
    setView('workspace');
  };

  const handleCreateProject = (desc: string) => {
    const words = desc.replace(/[^a-zA-Z0-9\sÀ-ÿ]/g, '').trim().split(/\s+/).slice(0, 3).join(' ');
    const projectName = words || 'Novo Projeto';
    setProjectName(projectName);
    setProjectId(projectName.toLowerCase().replace(/\s+/g, '-'));
    setView('workspace');
  };

  const handleOpenSettings = (section: SectionId = 'overview') => {
    setSettingsSection(section);
    setView('settings');
  };

  return (
    <div className="app">
      {view !== 'settings' && <Background />}
      {view === 'home' ? (
        <HomeScreen onCreate={handleCreateProject} onImportGithub={handleImportGithub} onOpenSettings={handleOpenSettings} />
      ) : view === 'settings' ? (
        <ProjectSettings
          projectId={projectId || 'default-project'}
          projectName={projectName}
          initialSection={settingsSection}
          onHome={handleBackToHome}
          onOpenProject={() => setView('workspace')}
        />
      ) : (
        <ProjectWorkspace
          onBack={handleBackToHome}
          projectName={projectName}
          onOpenSettings={handleOpenSettings}
        />
      )}
    </div>
  );
}

export default App;