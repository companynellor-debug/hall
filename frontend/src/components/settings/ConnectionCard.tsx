import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { IntegrationLogo } from './IntegrationLogo';
import type { IntegrationDomain } from './integrationDomains';
import { Btn } from './ui';

interface ConnectionCardProps {
  integration: IntegrationDomain;
  isConnected: boolean;
  busy: boolean;
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
}

export function ConnectionCard({
  integration,
  isConnected,
  busy,
  onConnect,
  onDisconnect,
}: ConnectionCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = useCallback(() => {
    if (!isConnected) {
      setShowModal(true);
    }
  }, [isConnected]);

  const handleDisconnect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDisconnect();
  }, [onDisconnect]);

  const handleConnectFromModal = useCallback(() => {
    setShowModal(false);
    onConnect();
  }, [onConnect]);

  return (
    <>
      <div
        className={`st-conn-row ${isConnected ? 'connected' : ''}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
        data-testid={`connection-card-${integration.id}`}
      >
        <div className="st-conn-brand">
          <IntegrationLogo domain={integration.domain} name={integration.name} size={36} />
        </div>
        <div className="st-conn-info">
          <h4 className="st-conn-name">
            {integration.name}
            {isConnected && <span className="st-conn-dot" aria-label="Conectado" />}
          </h4>
          <p className="st-conn-desc">{integration.description}</p>
        </div>
        {isConnected && (
          <button
            className="st-conn-disconnect"
            onClick={handleDisconnect}
            disabled={busy}
            aria-label={`Desconectar ${integration.name}`}
            data-testid={`connection-action-${integration.id}`}
          >
            {busy ? '...' : 'Desconectar'}
          </button>
        )}
      </div>

      {/* Connection Modal */}
      {showModal && (
        <div className="st-modal-overlay" onClick={() => setShowModal(false)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="st-modal st-connect-modal" onClick={(e) => e.stopPropagation()}>
            <div className="st-modal-header">
              <div className="st-modal-brand">
                <IntegrationLogo domain={integration.domain} name={integration.name} size={48} />
              </div>
              <div>
                <h3 id="modal-title">{integration.name}</h3>
                <p className="st-modal-category">{integration.category}</p>
              </div>
              <button className="st-modal-close" onClick={() => setShowModal(false)} aria-label="Fechar">
                <X size={20} />
              </button>
            </div>
            <div className="st-modal-body">
              <p>{integration.description}</p>
              <div className="st-connect-steps">
                <h4>Como conectar:</h4>
                <ol>
                  <li>Clique em "Conectar agora" para iniciar a autorização</li>
                  <li>Você será redirecionado para <strong>{integration.name}</strong> para conceder permissões</li>
                  <li>Após autorizar, a integração ficará ativa automaticamente</li>
                </ol>
              </div>
            </div>
            <div className="st-modal-footer">
              <Btn variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Btn>
              <Btn variant="primary" disabled={busy} onClick={handleConnectFromModal}>
                {busy ? 'Conectando...' : 'Conectar agora'}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
