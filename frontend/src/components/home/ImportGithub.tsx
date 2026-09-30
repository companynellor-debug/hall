import { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Icon } from '../ui/Icon';

interface ImportGithubProps {
  onImport: (url: string) => void;
}

const MOCK_USER = { login: 'nakor-dev', name: 'Nakor' };

const MOCK_REPOS = [
  { name: 'saas-dashboard', description: 'Painel administrativo com métricas, cobrança e times.', private: false, language: 'TypeScript', color: '#3178c6', stars: 128, updated: 'há 2 dias' },
  { name: 'ecommerce-api', description: 'API REST com pagamentos, carrinho e autenticação JWT.', private: true, language: 'Python', color: '#3572A5', stars: 64, updated: 'há 5 dias' },
  { name: 'chat-realtime', description: 'Chat em tempo real com salas, presença e notificações.', private: false, language: 'TypeScript', color: '#3178c6', stars: 342, updated: 'há 3 horas' },
  { name: 'portfolio-site', description: 'Site pessoal com blog, animações e SEO.', private: false, language: 'JavaScript', color: '#f1e05a', stars: 12, updated: 'há 1 semana' },
  { name: 'ml-toolkit', description: 'Utilidades para pipelines de machine learning.', private: true, language: 'Python', color: '#3572A5', stars: 89, updated: 'há 1 mês' },
];

export function ImportGithub({ onImport }: ImportGithubProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<'connect' | 'select'>('connect');
  const [connecting, setConnecting] = useState(false);
  const [search, setSearch] = useState('');
  const [manual, setManual] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const reset = () => { setStep('connect'); setConnecting(false); setSearch(''); setManual(false); setUrl(''); setError(''); };
  const close = () => { setModalOpen(false); reset(); };

  const handleConnect = () => {
    setConnecting(true);
    window.setTimeout(() => { setConnecting(false); setStep('select'); }, 1100);
  };

  const pick = (repo: string) => { onImport(`https://github.com/${MOCK_USER.login}/${repo}`); close(); };

  const handleManual = (e: React.FormEvent) => {
    e.preventDefault();
    const val = url.trim();
    if (!/^https?:\/\/(github|gitlab)\.com\/.+/.test(val)) { setError('URL inválida — use um link do GitHub ou GitLab'); return; }
    onImport(val);
    close();
  };

  const filtered = MOCK_REPOS.filter(
    (r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button
        type="button"
        className="github-btn fluid-glass"
        onClick={() => setModalOpen(true)}
        aria-label="Importar do GitHub"
        data-testid="import-github-btn"
      >
        <Icon name="github" size={20} />
      </button>

      <Modal isOpen={modalOpen} onClose={close} title="Importar do GitHub" size={step === 'select' ? 'lg' : 'md'}>
        {step === 'connect' ? (
          <div className="gh-connect">
            <div className="github-modal-badge fluid-glass">
              <Icon name="github" size={34} />
            </div>
            <h3 className="gh-connect-title">Conecte sua conta do GitHub</h3>
            <p className="gh-connect-sub">Autorize o HALL a acessar seus repositórios para importar um projeto em segundos.</p>
            <button
              type="button"
              className="gh-connect-btn"
              onClick={handleConnect}
              disabled={connecting}
              data-testid="gh-connect-btn"
            >
              {connecting ? (
                <><Icon name="loader" size={18} className="gh-spin" /> Conectando…</>
              ) : (
                <><Icon name="github" size={18} /> Conectar conta do GitHub</>
              )}
            </button>
            <button type="button" className="gh-link" onClick={() => setManual((m) => !m)} data-testid="gh-manual-toggle">
              ou cole uma URL manualmente
            </button>
            {manual && (
              <form className="gh-manual" onSubmit={handleManual}>
                <input
                  className={`input ${error ? 'input-error' : ''}`}
                  type="url"
                  placeholder="https://github.com/usuario/repositorio"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); setError(''); }}
                  data-testid="gh-manual-url"
                />
                {error && <p className="input-error-text">{error}</p>}
                <Button type="submit" variant="primary">Importar</Button>
              </form>
            )}
          </div>
        ) : (
          <div className="gh-select">
            <div className="gh-account">
              <div className="gh-avatar" aria-hidden="true">{MOCK_USER.name[0]}</div>
              <div className="gh-account-info">
                <span className="gh-account-name">{MOCK_USER.login}</span>
                <span className="gh-account-meta"><Icon name="check" size={12} /> Conta conectada</span>
              </div>
              <button type="button" className="gh-link" onClick={() => setStep('connect')} data-testid="gh-switch-account">Trocar</button>
            </div>

            <div className="gh-search">
              <Icon name="search" size={16} />
              <input
                placeholder="Buscar repositório…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="gh-search"
                autoFocus
              />
            </div>

            <ul className="gh-repos" data-testid="gh-repo-list">
              {filtered.map((r) => (
                <li key={r.name}>
                  <button type="button" className="gh-repo" onClick={() => pick(r.name)} data-testid={`gh-repo-${r.name}`}>
                    <div className="gh-repo-top">
                      <span className="gh-repo-name"><Icon name="folder" size={14} /> {r.name}</span>
                      <span className={`gh-visibility ${r.private ? 'is-private' : 'is-public'}`}>{r.private ? 'Privado' : 'Público'}</span>
                    </div>
                    <p className="gh-repo-desc">{r.description}</p>
                    <div className="gh-repo-meta">
                      <span className="gh-lang"><span className="gh-dot" style={{ background: r.color }} />{r.language}</span>
                      <span className="gh-meta-item"><Icon name="star" size={12} /> {r.stars}</span>
                      <span className="gh-meta-item">{r.updated}</span>
                    </div>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && <li className="gh-empty">Nenhum repositório encontrado</li>}
            </ul>
          </div>
        )}
      </Modal>
    </>
  );
}
