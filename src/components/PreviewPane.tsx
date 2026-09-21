import { IconArrowLeft, IconArrowRight, IconExternal, IconLock, IconRefresh } from './icons'

export function PreviewPane() {
  return (
    <section className="preview">
      <div className="preview-bar">
        <span className="preview-label">Preview</span>
        <div className="preview-nav">
          <button title="Voltar">
            <IconArrowLeft size={13} />
          </button>
          <button title="Avançar">
            <IconArrowRight size={13} />
          </button>
          <button title="Recarregar">
            <IconRefresh size={13} />
          </button>
        </div>
        <div className="preview-address">
          <span className="lock">
            <IconLock size={11} />
          </span>
          http://localhost:5173
        </div>
        <div className="preview-nav">
          <button title="Abrir externo">
            <IconExternal size={13} />
          </button>
        </div>
      </div>

      <div className="preview-viewport">
        <div className="preview-screen">
          <div className="preview-navline">
            <span className="preview-dots">
              <i />
              <i />
              <i />
            </span>
            <span>localhost:5173</span>
          </div>
          <div className="preview-body">
            <span className="preview-kicker">hall / workspace</span>
            <h1>
              Ship with <span style={{ color: 'var(--color-accent)' }}>precision</span>
            </h1>
            <p>A development environment tuned for focus.</p>
            <button className="preview-cta">Ver relatório →</button>
            <div className="preview-metrics">
              <div className="preview-metric">
                <b>128</b>
                <span>builds</span>
              </div>
              <div className="preview-metric">
                <b>0</b>
                <span>errors</span>
              </div>
              <div className="preview-metric">
                <b>7</b>
                <span>agents</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}