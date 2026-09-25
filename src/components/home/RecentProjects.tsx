import { ProjectRow } from './ProjectRow';

interface RecentProjectsProps {
  projects: Array<{
    id: string;
    name: string;
    description: string;
    tech: string[];
    time: string;
    status?: 'active' | 'idle' | 'building';
  }>;
  onOpen?: (id: string) => void;
}

export function RecentProjects({ projects, onOpen }: RecentProjectsProps) {
  if (!projects.length) return null;

  return (
    <section className="recent-section" aria-labelledby="recent-title">
      <div className="recent-header">
        <h2 id="recent-title" className="recent-title">Recent projects</h2>
      </div>
      <div className="recent-list" role="list">
        {projects.map((p) => (
          <ProjectRow
            key={p.id}
            name={p.name}
            description={p.description}
            tech={p.tech}
            time={p.time}
            status={p.status}
            onClick={() => onOpen?.(p.id)}
          />
        ))}
      </div>
    </section>
  );
}