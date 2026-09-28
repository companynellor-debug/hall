import { HallHero } from './HallHero';
import { HomeHeader } from './HomeHeader';
import { HomeNavRail } from './HomeNavRail';
import { ChatPane } from '../ChatPane';

interface HomeScreenProps {
  onCreate: (desc: string) => void;
  onImportGithub: (url: string) => void;
}

export function HomeScreen({ onCreate, onImportGithub }: HomeScreenProps) {
  return (
    <div className="home-root">
      <HomeHeader />
      <HomeNavRail />
      <main className="home-main" role="main">
        <HallHero onSubmit={onCreate} onImportGithub={onImportGithub} />
        <div className="chat-preview-content" style={{ maxHeight: '300px', overflow: 'auto', width: '100%', maxWidth: '720px', marginTop: '24px' }}>
          <ChatPane />
        </div>
      </main>
    </div>
  );
}