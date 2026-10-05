import {
  LayoutDashboard, BrainCircuit, Plug, ShieldCheck,
  PenSquare, Server, Terminal, Settings2, FileText,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Icon } from '../ui/Icon';
import type { SectionId } from './data';

interface Item { id: SectionId; label: string; icon?: LucideIcon; brand?: 'github' }

const ITEMS: Item[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'models', label: 'Models & Agents', icon: BrainCircuit },
  { id: 'github', label: 'GitHub', brand: 'github' },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'design', label: 'Design', icon: PenSquare },
  { id: 'deploy', label: 'Deploy', icon: Server },
  { id: 'environment', label: 'Environment', icon: Terminal },
  { id: 'logs', label: 'Logs', icon: FileText },
  { id: 'advanced', label: 'Advanced', icon: Settings2 },
];

export function SettingsSidebar({ active, onChange }: { active: SectionId; onChange: (id: SectionId) => void }) {
  return (
    <aside className="st-sidebar" data-testid="settings-sidebar">
      <div className="st-sidebar-title">Configurações do projeto</div>
      <nav className="st-sidebar-nav">
        {ITEMS.map((it) => {
          const LucIcon = it.icon;
          return (
            <button
              key={it.id}
              className={`st-nav-item${active === it.id ? ' active' : ''}`}
              onClick={() => onChange(it.id)}
              data-testid={`settings-nav-${it.id}`}
            >
              <span className="st-nav-ind" />
              <span className="st-nav-ico">
                {it.brand === 'github' ? <Icon name="github" size={18} /> : LucIcon && <LucIcon size={18} />}
              </span>
              <span className="st-nav-label">{it.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default SettingsSidebar;
