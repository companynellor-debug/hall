import { useState } from 'react';
import { HomeScreen } from './components/home/HomeScreen';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import Background from './components/ui/Background';
import './index.css';

type View = 'home' | 'workspace';

function App() {
  const [view, setView] = useState<View>('home');
  const [projectName, setProjectName] = useState('');

  const handleBackToHome = () => {
    setView('home');
    setProjectName('');
  };

  const handleImportGithub = (url: string) => {
    // Extract repo name from URL
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    const repoName = match ? match[2].replace(/\.git$/, '') : 'Imported Project';
    setProjectName(repoName);
    setView('workspace');
  };

  const handleCreateProject = (desc: string) => {
    // For now, just switch to workspace with a generated name
    const projectName = desc.slice(0, 30).replace(/[^a-zA-Z0-9\s-]/g, '').trim() || 'New Project';
    setProjectName(projectName);
    setView('workspace');
  };

  return (
    <div className="app">
      <Background />
      {view === 'home' ? (
        <HomeScreen onCreate={handleCreateProject} onImportGithub={handleImportGithub} />
      ) : (
        <ProjectWorkspace onBack={handleBackToHome} projectName={projectName} />
      )}
    </div>
  );
}

export default App;