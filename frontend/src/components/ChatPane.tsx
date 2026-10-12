import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui/Icon';
import { ShinyButton } from './ui/ShinyButton';
import hallLogo from '../assets/hall-logo.png';

type Tab = 'chat' | 'tarefas';
type Mode = 'plan' | 'build';

type FileEdit = { path: string; add: number; del: number };

type TextMsg = { id: number; kind: 'text'; role: 'user' | 'assistant'; text: string; time: string };
type RunMsg = {
  id: number;
  kind: 'run';
  role: 'assistant';
  time: string;
  stage: number; // 0 analyzing · 1 planning · 2 editing · 3 building · 4 done
  files: FileEdit[];
  buildTime: string;
  result: string;
  expanded: boolean;
};
type Msg = TextMsg | RunMsg;

const now = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

const SAMPLE_EDITS: FileEdit[] = [
  { path: 'src/App.tsx', add: 42, del: 8 },
  { path: 'src/components/Section.tsx', add: 96, del: 0 },
  { path: 'src/index.css', add: 23, del: 4 },
];

let seq = 1;

function StepRow({ label, state, chevron, onToggle, expanded }: {
  label: string; state: 'done' | 'running' | 'pending';
  chevron?: boolean; onToggle?: () => void; expanded?: boolean;
}) {
  return (
    <button className={`ws-step ${state}`} onClick={onToggle} disabled={!chevron} data-testid={`step-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <span className="ws-step-ico">
        {state === 'done' && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" opacity="0.25" /><path d="m7 12 3 3 5-5" /></svg>
        )}
        {state === 'running' && <span className="ws-step-spin" />}
        {state === 'pending' && <span className="ws-step-wait" />}
      </span>
      <span className="ws-step-label">{label}</span>
      {chevron && (
        <span className={`ws-step-chev${expanded ? ' open' : ''}`}>
          <Icon name="chevron-down" size={12} />
        </span>
      )}
    </button>
  );
}

export interface ChatPaneProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export function ChatPane({ activeTab, onTabChange }: ChatPaneProps = {}) {
  const [internalTab, setInternalTab] = useState<Tab>('chat');
  const tab = activeTab ?? internalTab;
  const setTab = (t: Tab) => { setInternalTab(t); onTabChange?.(t); };
  const [mode, setMode] = useState<Mode>('build');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const setStage = (id: number, stage: number) =>
    setMessages((m) => m.map((msg) => (msg.id === id && msg.kind === 'run' ? { ...msg, stage } : msg)));

  const toggleExpand = (id: number) =>
    setMessages((m) => m.map((msg) => (msg.id === id && msg.kind === 'run' ? { ...msg, expanded: !msg.expanded } : msg)));

  const send = () => {
    const text = input.trim();
    if (!text || busy) return;
    const userMsg: TextMsg = { id: seq++, kind: 'text', role: 'user', text, time: now() };
    const runId = seq++;
    const runMsg: RunMsg = {
      id: runId, kind: 'run', role: 'assistant', time: now(), stage: 0,
      files: SAMPLE_EDITS, buildTime: '32s',
      result: 'Pronto! As alterações foram aplicadas, o build passou sem erros e o preview foi atualizado.',
      expanded: true,
    };
    setMessages((m) => [...m, userMsg, runMsg]);
    setInput('');
    setBusy(true);
    const push = (delay: number, fn: () => void) => timers.current.push(window.setTimeout(fn, delay));
    push(900, () => setStage(runId, 1));
    push(1800, () => setStage(runId, 2));
    push(3000, () => setStage(runId, 3));
    push(4200, () => { setStage(runId, 4); setBusy(false); inputRef.current?.focus(); });
  };

  return (
    <section className="ws-chat">
      {/* Chat / Tarefas tabs - minimal */}
      <div className="ws-chat-tabs" role="tablist" aria-label="Chat e Tarefas">
        <button
          role="tab"
          aria-selected={tab === 'chat'}
          className={`ws-chat-tab${tab === 'chat' ? ' active' : ''}`}
          onClick={() => setTab('chat')}
          data-testid="chat-tab-chat"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.7-.33-3.86-.92L4 21l1.42-4.64A8.5 8.5 0 1 1 21 12Z" /></svg>
          Chat
        </button>
        <button
          role="tab"
          aria-selected={tab === 'tarefas'}
          className={`ws-chat-tab${tab === 'tarefas' ? ' active' : ''}`}
          onClick={() => setTab('tarefas')}
          data-testid="chat-tab-tarefas"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h11M9 12h11M9 18h11" /><path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></svg>
          Tarefas
        </button>
      </div>

      {tab === 'chat' ? (
        <div className="ws-chat-scroll" ref={scrollRef} data-testid="chat-scroll">
          {messages.length === 0 && (
            <div className="ws-chat-empty" data-testid="chat-empty">
              <img src={hallLogo} alt="HALL" className="ws-chat-empty-logo" />
              <h3>O que vamos construir?</h3>
              <p>Descreva uma alteração, corrija um problema ou continue desenvolvendo seu projeto.</p>
            </div>
          )}

          {messages.map((m) =>
            m.kind === 'text' ? (
              <div key={m.id} className={`ws-msg ${m.role}`} data-testid={`msg-${m.role}`}>
                <div className="ws-msg-head">
                  {m.role === 'user'
                    ? <span className="ws-msg-av user">N</span>
                    : <span className="ws-msg-av hall"><img src={hallLogo} alt="" /></span>}
                  <span className="ws-msg-name">{m.role === 'user' ? 'Você' : 'HALL'}</span>
                  <span className="ws-msg-time">{m.time}</span>
                </div>
                <div className="ws-msg-text">{m.text}</div>
              </div>
            ) : (
              <div key={m.id} className="ws-msg assistant" data-testid="msg-run">
                <div className="ws-msg-head">
                  <span className="ws-msg-av hall"><img src={hallLogo} alt="" /></span>
                  <span className="ws-msg-name">HALL</span>
                  <span className="ws-msg-time">{m.time}</span>
                </div>

                <div className="ws-run">
                  <StepRow label="Analisando projeto..." state={m.stage > 0 ? 'done' : 'running'} />
                  {m.stage >= 1 && <StepRow label="Planejando alterações..." state={m.stage > 1 ? 'done' : 'running'} />}
                  {m.stage >= 2 && (
                    <>
                      <StepRow
                        label={`Editando ${m.files.length} arquivos...`}
                        state={m.stage > 2 ? 'done' : 'running'}
                        chevron onToggle={() => toggleExpand(m.id)} expanded={m.expanded}
                      />
                      {m.expanded && (
                        <div className="ws-files">
                          {m.files.map((f) => (
                            <div key={f.path} className="ws-file" data-testid="run-file">
                              <span className="ws-file-path">{f.path}</span>
                              <span className="ws-file-stat">
                                <span className="ws-add">+{f.add}</span>
                                <span className="ws-del">-{f.del}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {m.stage >= 3 && (
                    <div className="ws-build">
                      {m.stage >= 4 ? (
                        <>
                          <span className="ws-build-ico done">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" opacity="0.25" /><path d="m7 12 3 3 5-5" /></svg>
                          </span>
                          <span className="ws-build-label">Build passou</span>
                          <span className="ws-build-time">{m.buildTime}</span>
                        </>
                      ) : (
                        <>
                          <span className="ws-step-spin" />
                          <span className="ws-build-label">Compilando...</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {m.stage >= 4 && (
                  <>
                    <div className="ws-msg-text">{m.result}</div>
                    <div className="ws-actions">
                      <button className="ws-action-btn" aria-label="Copiar" title="Copiar" data-testid="action-copy">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                      </button>
                      <button className="ws-action-btn" aria-label="Gostei" title="Gostei" data-testid="action-like">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v11" /><path d="M15 5l-1.8 5H21a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 19.6 21H7V10l4.3-7.1A1.5 1.5 0 0 1 14 3.4 2.6 2.6 0 0 1 15 5Z" /></svg>
                      </button>
                      <button className="ws-action-btn" aria-label="Não gostei" title="Não gostei" data-testid="action-dislike">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V3" /><path d="M9 19l1.8-5H3a2 2 0 0 1-2-2.3l1.4-7A2 2 0 0 1 4.4 3H17v11l-4.3 7.1A1.5 1.5 0 0 1 10 20.6 2.6 2.6 0 0 1 9 19Z" /></svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="ws-chat-scroll">
          <div className="ws-chat-empty">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}><path d="M9 6h11M9 12h11M9 18h11" /><path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></svg>
            <h3>Nenhuma tarefa ainda</h3>
            <p>As etapas de cada build aparecerão aqui.</p>
          </div>
        </div>
      )}

      {/* Composer - unified premium surface */}
      <div className="ws-composer">
        <div className="ws-composer-box">
          <textarea
            ref={inputRef}
            className="ws-composer-input"
            placeholder="Descreva uma alteração, peça uma funcionalidade..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
            data-testid="composer-input"
            style={{ minHeight: '48px' }}
          />
          <div className="ws-composer-foot">
            <div className="ws-composer-left">
              <button className="ws-composer-icon" title="Anexar" aria-label="Anexar" data-testid="composer-attach">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              <button className="ws-chip" data-testid="composer-project">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 4v16" /></svg>
                Projeto
                <Icon name="chevron-down" size={11} />
              </button>
              <div className="ws-seg" role="group" aria-label="Modo">
                <button
                  className={`ws-seg-btn${mode === 'plan' ? ' active' : ''}`}
                  onClick={() => setMode('plan')}
                  data-testid="mode-plan"
                >
                  PLAN
                </button>
                <button
                  className={`ws-seg-btn${mode === 'build' ? ' active build' : ''}`}
                  onClick={() => setMode('build')}
                  data-testid="mode-build"
                >
                  <Icon name="zap" size={11} /> BUILD
                </button>
              </div>
              <button className="ws-chip" data-testid="composer-model">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 12v0M8 8v8M12 5v14M16 8v8M20 12v0" /></svg>
                Auto
                <Icon name="chevron-down" size={11} />
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button className="ws-composer-icon" aria-label="Mais opções" data-testid="composer-more">
                <Icon name="more-horizontal" size={15} />
              </button>
              <ShinyButton
                onClick={send}
                disabled={!input.trim() || busy}
                label="Enviar"
                title="Enviar"
                testId="composer-send"
                iconSize={38}
                cornerRadius={10}
              >
                <Icon name="arrow-right" size={17} />
              </ShinyButton>
            </div>
          </div>
        </div>
        <div className="ws-composer-hint">Use @ para mencionar arquivos, / para comandos</div>
      </div>
    </section>
  );
}

export default ChatPane;