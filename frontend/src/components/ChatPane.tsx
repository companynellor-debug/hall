import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui/Icon';
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
    <button className={`ws-step ${state}`} onClick={onToggle} disabled={!chevron}>
      <span className="ws-step-ico">
        {state === 'done' && (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" opacity="0.3" /><path d="m8 12 2.5 2.5L16 9" /></svg>
        )}
        {state === 'running' && <span className="ws-step-spin" />}
        {state === 'pending' && <span className="ws-step-wait" />}
      </span>
      <span className="ws-step-label">{label}</span>
      {chevron && (
        <span className={`ws-step-chev${expanded ? ' open' : ''}`}>
          <Icon name="chevron-down" size={14} />
        </span>
      )}
    </button>
  );
}

export function ChatPane() {
  const [tab, setTab] = useState<Tab>('chat');
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
      <div className="ws-chat-tabs">
        <button className={`ws-chat-tab${tab === 'chat' ? ' active' : ''}`} onClick={() => setTab('chat')} data-testid="chat-tab-chat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /></svg>
          Chat
        </button>
        <button className={`ws-chat-tab${tab === 'tarefas' ? ' active' : ''}`} onClick={() => setTab('tarefas')} data-testid="chat-tab-tarefas">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h11M9 12h11M9 18h11" /><path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></svg>
          Tarefas
        </button>
      </div>

      {tab === 'chat' ? (
        <div className="ws-chat-scroll" ref={scrollRef} data-testid="chat-scroll">
          {messages.length === 0 && (
            <div className="ws-chat-empty">
              <img src={hallLogo} alt="HALL" className="ws-chat-empty-logo" />
              <p>Descreva uma alteração para o HALL aplicar no seu projeto.</p>
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
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" opacity="0.3" /><path d="m8 12 2.5 2.5L16 9" /></svg>
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
                      <button className="ws-action-btn" data-testid="action-ver-mudancas">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        Ver mudanças
                      </button>
                      <button className="ws-action-btn" data-testid="action-salvar-github">
                        <Icon name="github" size={15} />
                        Salvar no GitHub
                      </button>
                      <button className="ws-action-btn icon" aria-label="Mais ações" data-testid="action-more">
                        <Icon name="more-horizontal" size={16} />
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
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}><path d="M9 6h11M9 12h11M9 18h11" /><path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></svg>
            <p>Nenhuma tarefa ainda. As etapas de cada build aparecerão aqui.</p>
          </div>
        </div>
      )}

      {/* Composer */}
      <div className="ws-composer">
        <div className="ws-composer-box">
          <textarea
            ref={inputRef}
            className="ws-composer-input"
            placeholder="Descreva a alteração..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={2}
            data-testid="composer-input"
          />
          <div className="ws-composer-foot">
            <div className="ws-composer-left">
              <button className="ws-composer-icon" title="Anexar" data-testid="composer-attach">
                <Icon name="paperclip" size={16} />
              </button>
              <button className="ws-chip" data-testid="composer-project">
                Nakor's Project
                <Icon name="chevron-down" size={13} />
              </button>
              <div className="ws-seg">
                <button className={`ws-seg-btn${mode === 'plan' ? ' active' : ''}`} onClick={() => setMode('plan')} data-testid="mode-plan">PLAN</button>
                <button className={`ws-seg-btn${mode === 'build' ? ' active build' : ''}`} onClick={() => setMode('build')} data-testid="mode-build">
                  <Icon name="zap" size={12} /> BUILD
                </button>
              </div>
              <button className="ws-chip" data-testid="composer-model">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 12v0M8 8v8M12 5v14M16 8v8M20 12v0" /></svg>
                Auto
                <Icon name="chevron-down" size={13} />
              </button>
            </div>
            <button className="ws-send" onClick={send} disabled={!input.trim() || busy} title="Enviar" data-testid="composer-send">
              <Icon name="arrow-right" size={18} />
            </button>
          </div>
        </div>
        <div className="ws-composer-hint">Use @ para mencionar arquivos, / para comandos</div>
      </div>
    </section>
  );
}

export default ChatPane;
