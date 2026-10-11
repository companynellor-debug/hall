import {
  LayoutDashboard, BrainCircuit, Plug, ShieldCheck,
  PenSquare, Server, Terminal, Settings2, FileText,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../ui/Icon';
import type { SectionId } from './data';

interface Item { id: SectionId; label: string; icon?: LucideIcon; brand?: 'github' }
interface Group { label?: string; items: Item[] }

const GROUPS: Group[] = [
  {
    label: 'Projeto',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'models', label: 'Models & Agents', icon: BrainCircuit },
      { id: 'github', label: 'GitHub', brand: 'github' },
      { id: 'integrations', label: 'Integrations', icon: Plug },
    ],
  },
  {
    label: 'Build',
    items: [
      { id: 'design', label: 'Design', icon: PenSquare },
      { id: 'deploy', label: 'Deploy', icon: Server },
      { id: 'environment', label: 'Environment', icon: Terminal },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { id: 'security', label: 'Security', icon: ShieldCheck },
      { id: 'logs', label: 'Logs', icon: FileText },
      { id: 'advanced', label: 'Advanced', icon: Settings2 },
    ],
  },
];

export function SettingsSidebar({ active, onChange }: { active: SectionId; onChange: (id: SectionId) => void }) {
  return (
    <aside className="st-sidebar" data-testid="settings-sidebar">
      {GROUPS.map((group) => (
        <div className="st-nav-group" key={group.label}>
          {group.label && <span className="st-nav-group-label">{group.label}</span>}
          <nav>
            {group.items.map((it) => {
              const LucIcon = it.icon;
              return (
                <button
                  key={it.id}
                  className={`st-nav-item${active === it.id ? ' active' : ''}`}
                  onClick={() => onChange(it.id)}
                  data-testid={`settings-nav-${it.id}`}
                >
                  <span className="st-nav-ico">
                    {it.brand === 'github' ? <Icon name="github" size={17} /> : LucIcon && <LucIcon size={17} strokeWidth={1.75} />}
                  </span>
                  <span className="st-nav-label">{it.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      ))}
    </aside>
  );
}

export default SettingsSidebar;
