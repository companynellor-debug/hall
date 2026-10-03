import { useState } from 'react';
import { HomeScreen } from './components/home/HomeScreen';
import { BuildingWorkspace } from './components/BuildingWorkspace';
import Background from './components/ui/Background';
import './index.css';

type View = 'home' | 'building';

function App() {
  const [view, setView] = useState<View>('home');
  const [projectName, setProjectName] = useState('');
  const [selectedModel, setSelectedModel] = useState<'auto' | 'hall-core' | 'hall-pro'>('auto');
  const [lastPrompt, setLastPrompt] = useState('');

  const handleBackToHome = () => {
    setView('home');
    setProjectName('');
    setLastPrompt('');
  };

  const handleImportGithub = (url: string) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    const repoName = match ? match[2].replace(/\.git$/, '') : 'Imported Project';
    setProjectName(repoName);
    setView('building');
    setLastPrompt(`Importar repositório: ${url}`);
  };

  const handleCreateProject = (desc: string) => {
    const projectName = desc.slice(0, 30).replace(/[^a-zA-Z0-9\s-]/g, '').trim() || 'New Project';
    setProjectName(projectName);
    setView('building');
    setLastPrompt(desc);
  };

  const handleModelChange = (model: 'auto' | 'hall-core' | 'hall-pro') => {
    setSelectedModel(model);
  };

  return (
    <div className="app">
      <Background />
      {view === 'home' ? (
        <HomeScreen 
          onCreate={handleCreateProject} 
          onImportGithub={handleImportGithub}
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
        />
      ) : (
        <BuildingWorkspace
          onBack={handleBackToHome}
          projectName={projectName}
          initialPrompt={lastPrompt}
          selectedModel={selectedModel}
        />
      )}
    </div>
  );
}

export default App;