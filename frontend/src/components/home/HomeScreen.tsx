import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../ui/Icon';
import { CrowdCanvas } from '../ui/CrowdCanvas';
import { ImportGithub } from './ImportGithub';
import { HomeSidebar } from './sidebar/HomeSidebar';
import { useSidebarStore } from './sidebar/useSidebarStore';
import hallLogoFull from '../../assets/hall-logo-full.png';
import './home.css';

interface HomeScreenProps {
  onCreate: (desc: string) => void;
  onImportGithub: (url: string) => void;
  onOpenSettings: () => void;
}

const CHIPS: { label: string; icon: 'sparkles' | 'code' | 'file' | 'clock'; prompt: string }[] = [
  { label: 'Iniciar novo projeto', icon: 'sparkles', prompt: 'Quero criar um novo projeto: ' },
  { label: 'Revisão de código', icon: 'code', prompt: 'Faça uma revisão de código de ' },
  { label: 'Criar diretrizes', icon: 'file', prompt: 'Crie diretrizes de desenvolvimento para ' },
  { label: 'Estimar tarefa', icon: 'clock', prompt: 'Estime o esforço da seguinte tarefa: ' },
];

const PLACEHOLDERS = [
  'Ex.: um SaaS para gerenciar meus clientes, com autenticação e um painel moderno…',
  'Ex.: um marketplace B2B com pagamentos e dashboard de métricas…',
  'Ex.: uma API REST com rate limiting, autenticação JWT e documentação…',
  'Ex.: um app de chat em tempo real com salas e notificações…',
  'Ex.: um painel admin com gráficos, tabelas e exportação de dados…',
  'Ex.: um site institucional com blog, formulário e SEO otimizado…',
];

export function HomeScreen({ onCreate, onImportGithub, onOpenSettings }: HomeScreenProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState('');
  const store = useSidebarStore();
  const [mobileNav, setMobileNav] = useState(false);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);

  // Fecha o menu de modelo ao clicar fora
  useEffect(() => {
    if (!modelMenuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!modelMenuRef.current?.contains(e.target as Node)) setModelMenuOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [modelMenuOpen]);

  // Typewriter placeholder — via ref, sem re-renders
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
        if (!el.value) el.placeholder = current.slice(0, charLen);
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 6) return 'Boa madrugada';
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }, []);

  const focusComposer = () => textareaRef.current?.focus();

  const newChat = useCallback(() => {
    setPrompt('');
    textareaRef.current?.focus();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = prompt.trim();
    if (!text) return;
    store.addChat(text);
    onCreate(text);
    setPrompt('');
  };

  return (
    <div className="hl-page">
      <div className="hl-shell">
        {/* Sidebar */}
        <HomeSidebar
          store={store}
          onNewChat={() => { setMobileNav(false); newChat(); }}
          mobileOpen={mobileNav}
          onCloseMobile={() => setMobileNav(false)}
          onOpenChat={(chat) => onCreate(chat.prompt)}
          onOpenSettings={onOpenSettings}
        />

        {/* Main */}
        <main className="hl-main" role="main">
          <div className="hl-topbar">
            <button className="hl-menu-btn" onClick={() => setMobileNav(true)} aria-label="Abrir menu" data-testid="home-mobile-menu-btn">
              <Icon name="menu" size={17} />
            </button>
            <span className="hl-topbar-title" data-testid="home-topbar-title">Novo chat</span>
          </div>

          <div className="hl-crowd" aria-hidden="true">
            <CrowdCanvas
              src="https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png"
              rows={15}
              cols={7}
            />
          </div>

          <div className="hl-hero">
            <img src={hallLogoFull} alt="HALL — Build without limits" className="hl-hero-logo" data-testid="home-hero-logo" />
            <h1 className="hl-greeting">{greeting}, Nakor</h1>
            <p className="hl-sub">Como posso ajudar você hoje?</p>

            <form className="hl-composer" onSubmit={submit}>
              <textarea
                ref={textareaRef}
                className="hl-textarea"
                placeholder="Pergunte algo…"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    submit(e);
                  }
                }}
                aria-label="Descreva seu projeto"
                rows={2}
              />
              <div className="hl-composer-bar">
                <div className="hl-model-menu-wrap" ref={modelMenuRef}>
                  <button
                    type="button"
                    className={`hl-model-chip${modelMenuOpen ? ' open' : ''}`}
                    onClick={() => setModelMenuOpen((o) => !o)}
                    aria-haspopup="menu"
                    aria-expanded={modelMenuOpen}
                    aria-label="Selecionar modelo"
                    title="Selecionar modelo"
                  >
                    Auto
                    <Icon name="chevron-down" size={12} />
                  </button>
                  {modelMenuOpen && (
                    <div className="hl-model-menu" role="menu">
                      <button
                        type="button"
                        className="hl-model-item active"
                        role="menuitemradio"
                        aria-checked="true"
                        onClick={() => setModelMenuOpen(false)}
                      >
                        <span className="hl-model-item-main">
                          <span className="hl-model-item-name">Auto</span>
                          <span className="hl-model-item-desc">O HALL escolhe o melhor modelo</span>
                        </span>
                        <Icon name="check" size={14} />
                      </button>
                      <div className="hl-model-menu-divider" />
                      <button
                        type="button"
                        className="hl-model-item"
                        role="menuitem"
                        onClick={() => {
                          setModelMenuOpen(false);
                          onOpenSettings();
                        }}
                      >
                        <span className="hl-model-item-main">
                          <span className="hl-model-item-name">Configurar</span>
                          <span className="hl-model-item-desc">Modelos & agentes do projeto</span>
                        </span>
                        <Icon name="settings" size={14} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="hl-composer-actions">
                  <button type="button" className="hl-icon-btn" onClick={newChat} aria-label="Novo projeto" title="Novo projeto">
                    <Icon name="plus" size={16} />
                  </button>
                  <ImportGithub onImport={onImportGithub} />
                  <button type="button" className="hl-icon-btn" aria-label="Falar" title="Falar">
                    <Icon name="mic" size={16} />
                  </button>
                  <button
                    type="submit"
                    className="hl-send"
                    disabled={!prompt.trim()}
                    aria-label="Enviar"
                    title="Enviar"
                  >
                    <Icon name="arrow-right" size={16} />
                  </button>
                </div>
              </div>
            </form>

            <div className="hl-chips">
              {CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="hl-chip"
                  onClick={() => {
                    setPrompt(chip.prompt);
                    focusComposer();
                  }}
                >
                  <Icon name={chip.icon} size={13} />
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomeScreen;
