import { useState } from 'react';
import { HomeScreen } from './components/home/HomeScreen';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import './index.css';

type View = 'home' | 'workspace';

function App() {
  const [view, setView] = useState<View>('home');

  const handleBackToHome = () => {
    setView('home');
  };

  return (
    <div className="app">
      {view === 'home' ? (
        <HomeScreen />
      ) : (
        <ProjectWorkspace onBack={handleBackToHome} projectName="" />
      )}
    </div>
  );
}

export default App;