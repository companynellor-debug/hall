import { useRef, useEffect, useState } from 'react'
import { IconPlay, IconRefresh } from './icons'

const DEFAULT_PREVIEW_URL = 'http://localhost:5173'

export function PreviewPane() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [previewUrl] = useState(DEFAULT_PREVIEW_URL)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [serverRunning, setServerRunning] = useState(false)

  useEffect(() => {
    checkServer()
    const interval = setInterval(checkServer, 5000)
    return () => clearInterval(interval)
  }, [previewUrl])

  const checkServer = async () => {
    try {
      await fetch(previewUrl, { mode: 'no-cors' })
      setServerRunning(true)
    } catch {
      setServerRunning(false)
    }
  }

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      setIsLoading(false)
      setHasError(false)
      setServerRunning(true)
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      setServerRunning(false)
    }

    iframe.addEventListener('load', handleLoad)
    iframe.addEventListener('error', handleError)

    return () => {
      iframe.removeEventListener('load', handleLoad)
      iframe.removeEventListener('error', handleError)
    }
  }, [])

  const handleReload = () => {
    setIsLoading(true)
    setHasError(false)
    const iframe = iframeRef.current
    if (iframe) {
      iframe.src = iframe.src
    }
  }

  const handleStartServer = () => {
    setIsLoading(true)
    setHasError(false)
  }

  if (hasError) {
    return (
      <div className="preview-empty">
        <svg className="hall-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
        </svg>
        <h3>Preview indisponível</h3>
        <p>O servidor de desenvolvimento não está respondendo em <code>{previewUrl}</code>.</p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="preview-cta" onClick={handleReload}>
            <IconRefresh size={14} /> Tentar novamente
          </button>
          <button className="preview-cta" onClick={handleStartServer} style={{ background: 'var(--color-accent-bg)', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
            <IconPlay size={14} /> Iniciar servidor
          </button>
        </div>
        <p style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          Execute <code>npm run dev</code> no terminal do projeto para iniciar o servidor de preview.
        </p>
      </div>
    )
  }

  if (isLoading || !serverRunning) {
    return (
      <div className="preview-loading">
        <svg className="hall-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2 4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5Z" />
          <path d="M8.5 12.5l2.5 2.5 4.5-5" />
        </svg>
        <div className="hall-spinner" />
        <h3>{isLoading ? 'Carregando preview...' : 'Aguardando servidor de desenvolvimento'}</h3>
        <p>{isLoading ? 'Aguarde enquanto o HALL carrega a visualização.' : `Inicie o servidor com <code>npm run dev</code> na pasta do projeto. O preview conectará automaticamente em ${previewUrl}.`}</p>
      </div>
    )
  }

  return (
    <div className="preview-screen">
      <iframe
        ref={iframeRef}
        className="preview-frame"
        src={previewUrl}
        title="Preview do Projeto"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
      />
    </div>
  )
}