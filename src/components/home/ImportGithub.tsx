import { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Icon } from '../ui/Icon';

interface ImportGithubProps {
  onImport: (url: string) => void;
}

export function ImportGithub({ onImport }: ImportGithubProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = url.trim();
    if (!val) { setError('Digite a URL do repositório'); return; }
    if (!/^https?:\/\/(github|gitlab)\.com\/.+/.test(val)) {
      setError('Apenas URLs do GitHub ou GitLab são suportadas');
      return;
    }
    setError('');
    onImport(val);
    setModalOpen(false);
    setUrl('');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Button variant="secondary" size="md" onClick={openModal}>
        <Icon name="github" size={16} />
        Importar do GitHub
      </Button>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setError(''); setUrl(''); }} title="Importar do GitHub" size="md">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper" style={{marginBottom:'var(--space-4)'}}>
            <label htmlFor="github-url" className="input-label">URL do Repositório</label>
            <input
              id="github-url"
              type="url"
              className="input"
              placeholder="https://github.com/usuario/repositorio"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              aria-describedby={error ? 'github-error' : undefined}
              autoFocus
            />
            {error && <p id="github-error" className="input-error-text">{error}</p>}
            <p className="input-helper">Suporta repositórios do GitHub e GitLab</p>
          </div>
          <div className="modal-footer">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="primary">Importar</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}