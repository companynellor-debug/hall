import { useState } from 'react';
import { Icon, type IconName } from '../ui/Icon';

export function HomeNavRail() {
  const [expanded, setExpanded] = useState(false);

  const items: { name: IconName; label: string }[] = [
    { name: 'search', label: 'Buscar projetos' },
    { name: 'clock', label: 'Projetos recentes' },
    { name: 'settings', label: 'Configurações' },
  ];

  return (
    <nav className="home-nav-rail" aria-label="Navegação principal">
      <button
        className="nav-rail-toggle fluid-glass"
        aria-label={expanded ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setExpanded(!expanded)}
      >
        <Icon name={expanded ? 'x' : 'menu'} size={20} />
      </button>

      <div className={`nav-rail-menu ${expanded ? 'open' : ''}`}>
        {items.map((item) => (
          <button
            key={item.name}
            className="nav-rail-item fluid-glass"
            aria-label={item.label}
            title={item.label}
          >
            <Icon name={item.name} size={20} />
          </button>
        ))}
      </div>
    </nav>
  );
}