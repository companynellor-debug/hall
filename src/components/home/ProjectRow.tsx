import { Icon } from '../ui/Icon';

interface ProjectRowProps {
  name: string;
  description: string;
  tech?: string[];
  time: string;
  status?: 'active' | 'idle' | 'building';
  icon?: 'message-square' | 'bar-chart' | 'users' | 'cube' | 'code';
  onClick?: () => void;
}

const iconMap: Record<string, 'message-square' | 'bar-chart' | 'users' | 'cube' | 'code'> = {
  'message-square': 'message-square',
  'bar-chart': 'bar-chart',
  'users': 'users',
  'cube': 'cube',
  'code': 'code',
};

export function ProjectRow({ name, description, tech = [], time, status = 'idle', icon = 'code', onClick }: ProjectRowProps) {
  const IconComponent = iconMap[icon] ? icon : 'code';

  return (
    <button
      className="project-row"
      onClick={onClick}
      type="button"
      aria-label={`Abrir projeto ${name}`}
    >
      <div className="project-icon" aria-hidden="true">
        <Icon name={IconComponent} size={20} />
      </div>
      <div className="project-info">
        <div className="project-name">{name}</div>
        <div className="project-desc">{description}</div>
        <div className="project-meta">
          {tech.map((t, i) => (
            <span key={i} className="project-tech-tag">{t}</span>
          ))}
          <span className="project-time">{time}</span>
        </div>
      </div>
      <span className={`project-status ${status === 'active' ? 'pulse' : status === 'building' ? 'pulse' : ''}`} aria-hidden="true" />
    </button>
  );
}