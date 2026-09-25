import { Icon } from '../ui/Icon';

interface ProjectRowProps {
  name: string;
  description: string;
  tech?: string[];
  time: string;
  status?: 'active' | 'idle' | 'building';
  onClick?: () => void;
}

export function ProjectRow({ name, description, tech = [], time, status = 'idle', onClick }: ProjectRowProps) {
  return (
    <button
      className="project-row"
      onClick={onClick}
      type="button"
      aria-label={`Open project ${name}`}
    >
      <div className="project-icon" aria-hidden="true">
        <Icon name="code" size={18} />
      </div>
      <div className="project-info">
        <div className="project-name">{name}</div>
        <div className="project-desc">{description}</div>
        <div className="project-meta">
          {tech.map((t, i) => (
            <span key={i} className="project-tech">{t}</span>
          ))}
          <span className="project-time">{time}</span>
        </div>
      </div>
      <span className={`project-status ${status === 'active' ? 'status-active' : status === 'building' ? 'status-building' : ''}`} aria-hidden="true" />
    </button>
  );
}