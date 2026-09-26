import { HallHero } from './HallHero';
import { HomeHeader } from './HomeHeader';
import { HomeNavRail } from './HomeNavRail';
import { ChatPane } from '../ChatPane';

export function HomeScreen() {
  const handleCreate = (desc: string) => {
    console.log('Create project:', desc);
  };

  return (
    <div className="home-root">
      <HomeHeader />
      <HomeNavRail />
      <main className="home-main" role="main">
        <HallHero onSubmit={handleCreate} />
        <div className="chat-preview-content" style={{ maxHeight: '300px', overflow: 'auto', width: '100%', maxWidth: '720px', marginTop: '24px' }}>
          <ChatPane />
        </div>
      </main>
    </div>
  );
}