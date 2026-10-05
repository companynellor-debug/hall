import { HallHero } from './HallHero';
import { HomeHeader } from './HomeHeader';
import { HomeNavRail } from './HomeNavRail';

interface HomeScreenProps {
  onCreate: (desc: string) => void;
  onImportGithub: (url: string) => void;
  onOpenSettings: () => void;
}

export function HomeScreen({ onCreate, onImportGithub, onOpenSettings }: HomeScreenProps) {
  return (
    <div className="home-root">
      <HomeHeader />
      <HomeNavRail />
      <main className="home-main" role="main">
        <HallHero onSubmit={onCreate} onImportGithub={onImportGithub} onOpenSettings={onOpenSettings} />
      </main>
    </div>
  );
}
