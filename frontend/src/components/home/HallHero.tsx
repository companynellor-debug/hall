import { useRef, useState, useCallback, useEffect } from 'react';
import { Textarea } from '../ui/Textarea';
import { Icon } from '../ui/Icon';
import { ImportGithub } from './ImportGithub';
import { OrbitingCirclesGlobe } from './OrbitingCirclesGlobe';
import WireframeForms from '../ui/wireframe-forms';

const PLACEHOLDERS = [
  'Ex.: um SaaS para gerenciar meus clientes, com autenticação e um painel moderno…',
  'Ex.: um marketplace B2B com pagamentos e dashboard de métricas…',
  'Ex.: uma API REST com rate limiting, autenticação JWT e documentação…',
  'Ex.: um app de chat em tempo real com salas e notificações…',
  'Ex.: um painel admin com gráficos, tabelas e exportação de dados…',
  'Ex.: um site institucional com blog, formulários e SEO otimizado…',
];

export function HallHero({ onSubmit, onImportGithub, onOpenSettings }: { onSubmit: (desc: string) => void; onImportGithub: (url: string) => void; onOpenSettings: () => void }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription] = useState('');

  // Typewriter placeholder — driven via ref (no React re-renders, keeps the composer light & responsive)
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.placeholder = PLACEHOLDERS[0];
      return;
    }

    let rafId = 0;
    let last = 0;
    let phIndex = 0;
    let charLen = 0;
    let deleting = false;

    const animate = (time: number) => {
      const current = PLACEHOLDERS[phIndex];
      const speed = deleting ? 30 : 55;
      const pause = 1200;

      if (time - last >= (charLen === current.length && !deleting ? pause : speed)) {
        last = time;
        if (!deleting && charLen < current.length) {
          charLen++;
        } else if (!deleting && charLen === current.length) {
          deleting = true;
        } else if (deleting && charLen > 0) {
          charLen--;
        } else {
          deleting = false;
          phIndex = (phIndex + 1) % PLACEHOLDERS.length;
        }
        // update the DOM placeholder only when the field is empty (don't fight user input)
        if (!el.value) el.placeholder = current.slice(0, charLen);
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const text = description.trim();
    if (!text) return;
    onSubmit(text);
    setDescription('');
    textareaRef.current?.focus();
  }, [description, onSubmit]);

  return (
    <section className="hero" role="main" aria-labelledby="hero-title">
      <div
        className="relative"
        style={{ width: '200px', height: '200px', marginBottom: 'var(--space-6)', overflow: 'hidden' }}
        aria-hidden="true"
      >
        <WireframeForms
          variant="sphere"
          mode="dark"
          speed={1}
          size={1}
          length={1}
          density={1}
          opacity={1}
        />
      </div>

      <h1 id="hero-title" className="hero-title">What are you building today?</h1>

      <form className="composer-main" onSubmit={handleSubmit}>
        <Textarea
          ref={textareaRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={PLACEHOLDERS[0]}
          rows={5}
          aria-label="Project description"
          className="composer-textarea"
        />

        <div className="composer-footer">
          <div className="composer-actions">
            <button
              type="button"
              className="new-chat-btn fluid-glass"
              onClick={() => { setDescription(''); textareaRef.current?.focus(); }}
              aria-label="Novo projeto"
              title="Novo projeto"
            >
              <Icon name="plus" size={18} />
            </button>

            <div className="model-select-wrapper">
              <button
                type="button"
                className="model-select-btn fluid-glass"
                onClick={onOpenSettings}
                aria-label="Configurações do projeto"
                title="Configurações do projeto"
              >
                <Icon name="more-vertical" size={18} />
              </button>
            </div>

            <ImportGithub onImport={onImportGithub} />
          </div>

          <button
            type="submit"
            className="build-btn fluid-glass"
            disabled={!description.trim()}
            aria-label="Enviar prompt"
          >
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </form>
      <OrbitingCirclesGlobe />
    </section>
  );
}