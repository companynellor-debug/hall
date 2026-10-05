import { useState } from 'react';
import { HomeScreen } from './components/home/HomeScreen';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import { ProjectSettings } from './components/settings/ProjectSettings';
import Background from './components/ui/Background';
import './index.css';

type View = 'home' | 'workspace' | 'settings';

function App() {
  const [view, setView] = useState<View>('home');
  const [projectName, setProjectName] = useState('');

  const handleBackToHome = () => {
    setView('home');
    setProjectName('');
  };

  const handleImportGithub = (url: string) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    const repoName = match ? match[2].replace(/\.git$/, '') : 'Imported Project';
    setProjectName(repoName);
    setView('workspace');
  };

  const handleCreateProject = (desc: string) => {
    const words = desc.replace(/[^a-zA-Z0-9\sÀ-ÿ]/g, '').trim().split(/\s+/).slice(0, 3).join(' ');
    const projectName = words || 'Novo Projeto';
    setProjectName(projectName);
    setView('workspace');
  };

  const handleOpenSettings = () => {
    setView('settings');
  };

  return (
    <div className="app">
      <Background />
      {view === 'home' ? (
        <HomeScreen onCreate={handleCreateProject} onImportGithub={handleImportGithub} onOpenSettings={handleOpenSettings} />
      ) : view === 'settings' ? (
        <ProjectSettings
          projectName={projectName}
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