import { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Icon } from '../ui/Icon';

export function ImportGithub({ onImport }: { onImport: (url: string) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = url.trim();
    if (!val) { setError('Enter a repository URL'); return; }
    if (!/^https?:\/\/(github|gitlab)\.com\/.+/.test(val)) {
      setError('Only GitHub or GitLab URLs are supported');
      return;
    }
    setError('');
    onImport(val);
    setModalOpen(false);
    setUrl('');
  };

  return (
    <>
      <div className="import-github">
        <Button variant="secondary" onClick={() => setModalOpen(true)}>
          <Icon name="github" size={16} />
          Import from GitHub
        </Button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setError(''); setUrl(''); }} title="Import from GitHub" size="md">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper" style={{marginBottom:'var(--space-4)'}}>
            <label htmlFor="github-url" className="input-label">Repository URL</label>
            <input
              id="github-url"
              type="url"
              className="input"
              placeholder="https://github.com/owner/repo"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              aria-describedby={error ? 'github-error' : undefined}
              autoFocus
            />
            {error && <p id="github-error" className="input-error-text">{error}</p>}
            <p className="input-helper">Supports GitHub and GitLab repositories</p>
          </div>
          <div className="modal-footer">
            <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Import</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}