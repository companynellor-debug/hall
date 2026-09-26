import { Icon } from '../ui/Icon';

export function HomeHeader() {
  return (
    <header className="home-header" role="banner">
      <div className="home-header-left">
        <div className="home-logo" aria-label="HALL">
          <Icon name="zap" size={24} className="home-logo-icon" />
          <span className="home-logo-wordmark">HALL</span>
        </div>
      </div>
      <div className="home-header-right">
        <div className="home-context">
          <span className="home-context-label">Model</span>
          <button className="home-model-select" aria-label="Select model" aria-expanded="false">
            <span>Auto</span>
            <Icon name="chevron-down" size={12} />
          </button>
        </div>
        <button className="home-avatar" aria-label="User profile">
          <span>U</span>
        </button>
      </div>
    </header>
  );
}