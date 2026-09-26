import { Icon } from '../ui/Icon';

export function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-brand" aria-label="HALL">
        <Icon name="zap" size={20} className="navbar-logo" />
        <span className="hall-wordmark">HALL</span>
      </div>
      <div className="navbar-nav">
        <a href="#" className="navbar-link active" aria-current="page">Home</a>
        <a href="#" className="navbar-link">Projects</a>
        <a href="#" className="navbar-link">Resources</a>
        <a href="#" className="navbar-link">Community</a>
      </div>
      <div className="navbar-actions">
        <button className="navbar-icon-btn" aria-label="GitHub">
          <Icon name="github" size={16} />
        </button>
        <button className="navbar-icon-btn" aria-label="Settings">
          <Icon name="settings" size={16} />
        </button>
        <button className="navbar-avatar" aria-label="User profile">
          N
        </button>
      </div>
    </nav>
  );
}