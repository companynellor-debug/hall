import { Icon } from '../ui/Icon';

export function HomeHeader() {
  return (
    <header className="home-header" role="banner">
      <div className="home-header-left">
        <div className="home-logo" aria-label="HALL">
          <img src="/assets/hall/logo-full.png" alt="HALL" className="home-logo-img" style={{ height: '32px' }} />
        </div>
      </div>
      <div className="home-header-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#666', marginBottom: '0.25rem' }}>Boa noite, Nakor</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
      </div>
    </header>
  );
}
