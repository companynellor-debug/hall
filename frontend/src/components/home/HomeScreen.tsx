import { HallHero } from './HallHero';
import { HomeHeader } from './HomeHeader';
import { HomeNavRail } from './HomeNavRail';

interface HomeScreenProps {
  onCreate: (desc: string) => void;
  onImportGithub: (url: string) => void;
  selectedModel: 'auto' | 'hall-core' | 'hall-pro';
  onModelChange: (model: 'auto' | 'hall-core' | 'hall-pro') => void;
}

export function HomeScreen({ onCreate, onImportGithub, selectedModel, onModelChange }: HomeScreenProps) {
  return (
    <div className="home-root">
      <HomeHeader />
      <HomeNavRail />
      <main className="home-main" role="main">
        <HallHero 
          onSubmit={onCreate} 
          onImportGithub={onImportGithub}
          selectedModel={selectedModel}
          onModelChange={onModelChange}
        />
      </main>
    </div>
  );
}