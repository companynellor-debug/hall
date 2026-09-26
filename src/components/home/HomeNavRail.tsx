import { Icon } from '../ui/Icon';

export function HomeNavRail() {
  return (
    <nav className="home-nav-rail" aria-label="Navegação principal">
      <button className="nav-rail-item" aria-label="Buscar projetos" title="Buscar projetos">
        <Icon name="search" size={20} />
      </button>
      <button className="nav-rail-item" aria-label="Projetos recentes" title="Projetos recentes">
        <Icon name="clock" size={20} />
      </button>
      <div className="nav-rail-spacer" />
      <button className="nav-rail-item" aria-label="Configurações" title="Configurações">
        <Icon name="settings" size={20} />
      </button>
    </nav>
  );
}