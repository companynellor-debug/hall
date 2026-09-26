import { useRef, useState, useCallback, useEffect } from 'react';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
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

const MODELS = [
  { value: 'auto', label: 'Auto', icon: 'mic' },
  { value: 'hall-core', label: 'HALL Core', icon: 'cpu' },
  { value: 'hall-pro', label: 'HALL Pro', icon: 'zap' },
] as const;

export function HallHero({ onSubmit }: { onSubmit: (desc: string) => void }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription] = useState('');
  const [selectedModel, setSelectedModel] = useState<'auto' | 'hall-core' | 'hall-pro'>('auto');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const frameRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Typewriter animation for placeholder
  useEffect(() => {
    const animate = (time: number) => {
      const currentPlaceholder = PLACEHOLDERS[placeholderIndex];
      const speed = isDeleting ? 30 : 50;

      if (time - lastTimeRef.current >= speed) {
        lastTimeRef.current = time;

        if (!isDeleting && displayText.length < currentPlaceholder.length) {
          setDisplayText(currentPlaceholder.slice(0, displayText.length + 1));
        } else if (isDeleting && displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else if (!isDeleting && displayText === currentPlaceholder) {
          setIsDeleting(true);
        } else if (isDeleting && displayText === '') {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [displayText, isDeleting, placeholderIndex]);

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
          placeholder={displayText || PLACEHOLDERS[0]}
          rows={5}
          aria-label="Project description"
          className="composer-textarea"
        />

        <div className="composer-footer">
          <div className="composer-actions">
            <Button type="button" variant="ghost" size="sm" className="attach-btn" aria-label="Attach files">
              <Icon name="paperclip" size={16} />
              <span>Attach</span>
            </Button>

            <div className="model-select-wrapper">
              <button
                type="button"
                className="model-select-btn"
                onClick={() => setModelMenuOpen(!modelMenuOpen)}
                aria-expanded={modelMenuOpen}
                aria-haspopup="listbox"
                aria-label="Select model"
              >
                <Icon name={selectedModel === 'auto' ? 'mic' : selectedModel === 'hall-core' ? 'cpu' : 'zap'} size={14} />
                <span>{MODELS.find(m => m.value === selectedModel)?.label || 'Auto'}</span>
                <Icon name="chevron-down" size={12} />
              </button>
              {modelMenuOpen && (
                <ul className="model-menu" role="listbox" aria-label="Select model">
                  {MODELS.map((m) => (
                    <li key={m.value} role="option" aria-selected={selectedModel === m.value} onClick={() => { setSelectedModel(m.value as 'auto' | 'hall-core' | 'hall-pro'); setModelMenuOpen(false); }}>
                      <Icon name={m.icon} size={14} />
                      <span>{m.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ImportGithub onImport={(url) => console.log('import', url)} />
          </div>

          <Button type="submit" variant="primary" size="lg" disabled={!description.trim()} className="build-btn">
            <span>Build</span>
            <Icon name="arrow-right" size={18} />
          </Button>
        </div>
      </form>
      <OrbitingCirclesGlobe />
    </section>
  );
}