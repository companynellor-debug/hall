import { HallBrand } from './HallBrand';
import { HallHero } from './HallHero';
import { ProjectComposer } from './ProjectComposer';
import { RecentProjects } from './RecentProjects';
import { ImportGithub } from './ImportGithub';

const mockProjects = [
  { id: '1', name: 'HALL', description: 'Development environment for agentic coding', tech: ['React', 'TypeScript'], time: '12 min ago', status: 'active' as const },
  { id: '2', name: 'Nellor', description: 'B2B marketplace', tech: ['React', 'Supabase'], time: 'Yesterday', status: 'idle' as const },
  { id: '3', name: 'ApiHub', description: 'API gateway with rate limiting', tech: ['Go', 'PostgreSQL'], time: '3 days ago', status: 'idle' as const },
];

export function HomeScreen() {
  const handleCreate = (desc: string) => {
    console.log('Create project:', desc);
  };

  return (
    <div className="home-root">
      <div className="planet" aria-hidden="true" />
      <main className="home-main" role="main">
        <div style={{width:'100%', maxWidth:'900px', marginBottom:'var(--space-6)'}}>
          <HallBrand size="lg" showTag />
        </div>
        <HallHero />
        <ProjectComposer onSubmit={handleCreate} />
        <div className="secondary-actions">
          <button type="button" className="secondary-btn" onClick={() => console.log('New project')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            New project
          </button>
          <ImportGithub onImport={(url) => console.log('import', url)} />
        </div>
        <RecentProjects projects={mockProjects} onOpen={(id) => console.log('open', id)} />
      </main>
    </div>
  );
}