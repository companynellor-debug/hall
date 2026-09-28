import { Icon } from '../ui/Icon';

interface RecentProjectsProps {
  projects: Array<{
    id: string;
    name: string;
    description: string;
    tech: string[];
    time: string;
    status?: 'active' | 'idle' | 'building';
    icon?: 'message-square' | 'bar-chart' | 'users' | 'cube' | 'code';
  }>;
  onOpen?: (id: string) => void;
}

export function RecentProjects({ projects, onOpen }: RecentProjectsProps) {
  if (!projects.length) {
    return (
      <section className="recent-section" aria-labelledby="recent-title">
        <div className="recent-header">
          <h2 id="recent-title" className="recent-title">Recent projects</h2>
        </div>
        <div className="recent-empty" role="status">
          <svg className="recent-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <p className="recent-empty-text">No projects yet</p>
          <p className="recent-empty-sub">Create your first project above to get started</p>
        </div>
      </section>
    );
  }

  return (
    <section className="recent-section" aria-labelledby="recent-title">
      <div className="recent-header">
        <h2 id="recent-title" className="recent-title">Recent projects</h2>
        <a href="#" className="view-all" aria-label="View all projects">
          View all <Icon name="chevron-right" size={12} />
        </a>
      </div>
      <div className="recent-list" role="list">
        {projects.map((p) => (
          <article
            key={p.id}
            className="recent-item"
            onClick={() => onOpen?.(p.id)}
            tabIndex={0}
            role="button"
            aria-label={`Open project ${p.name}`}
          >
            <div className="recent-item-info">
              <div className="recent-item-name">{p.name}</div>
              <div className="recent-item-meta">
                <span className="recent-item-time">{p.time}</span>
                <span className={`recent-item-status ${p.status === 'active' ? 'pulse' : ''}`} aria-hidden="true" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}