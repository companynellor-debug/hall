import { useEffect, useRef, useState } from 'react';
import { Paperclip, Square, X, Sparkles, Play } from 'lucide-react';
import { Icon } from './ui/Icon';
import { ShinyButton } from './ui/ShinyButton';
import { HallMascot } from './HallMascot';
import { StepRow, MessageActions, ModelPicker, TasksList, type TaskItem } from './ChatBits';
import { filesFor, planFor, SUGGESTIONS, type FileEdit } from '../features/chat/agentSim';
import hallMascot from '../assets/hall-mascot.png';

type Tab = 'chat' | 'tarefas';
type Mode = 'plan' | 'build';
type Feedback = 'up' | 'down' | undefined;

type TextMsg = { id: number; kind: 'text'; role: 'user'; text: string; time: string; files: string[] };
type PlanMsg = { id: number; kind: 'plan'; time: string; prompt: string; steps: string[]; ready: boolean; executed: boolean; feedback?: Feedback };
type RunMsg = {
  id: number; kind: 'run'; time: string; prompt: string;
  stage: number; files: FileEdit[]; buildTime: string; result: string; expanded: boolean; stopped: boolean; feedback?: Feedback;
};
type Msg = TextMsg | PlanMsg | RunMsg;

const now = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
let seq = 1;

export interface ChatPaneProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
  initialPrompt?: string;
  onBuildStart?: () => void;
  onBuildDone?: (prompt: string) => void;
  onBuildCancel?: () => void;
}

export function ChatPane({ activeTab, onTabChange, initialPrompt, onBuildStart, onBuildDone, onBuildCancel }: ChatPaneProps = {}) {
  const [internalTab, setInternalTab] = useState<Tab>('chat');
  const tab = activeTab ?? internalTab;
  const setTab = (t: Tab) => { setInternalTab(t); onTabChange?.(t); };
  const [mode, setMode] = useState<Mode>('build');
  const [model, setModel] = useState('Auto');
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const timers = useRef<number[]>([]);
  const activeRun = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }, [input]);

  const patch = (id: number, p: Partial<Omit<RunMsg, 'kind'>> | Partial<Omit<PlanMsg, 'kind'>>) =>
    setMessages((m) => m.map((msg) => (msg.id === id ? ({ ...msg, ...p } as Msg) : msg)));

  const push = (delay: number, fn: () => void) => timers.current.push(window.setTimeout(fn, delay));

  const startBuild = (prompt: string) => {
    const runId = seq++;
    const files = filesFor(prompt);
    const run: RunMsg = {
      id: runId, kind: 'run', time: now(), prompt, stage: 0, files, buildTime: `${18 + Math.round(Math.random() * 20)}s`,
      result: `Pronto! Editei ${files.length} arquivos, o build passou sem erros e o preview foi atualizado.`, expanded: true, stopped: false,
    };
    setMessages((m) => [...m, run]);
    setBusy(true);
    activeRun.current = runId;
    onBuildStart?.();
    push(900, () => patch(runId, { stage: 1 }));
    push(1800, () => patch(runId, { stage: 2 }));
    push(3000, () => patch(runId, { stage: 3 }));
    push(4200, () => {
      patch(runId, { stage: 4 });
      setBusy(false);
      activeRun.current = null;
      onBuildDone?.(prompt);
      inputRef.current?.focus();
    });
  };

  const startPlan = (prompt: string) => {
    const id = seq++;
    setMessages((m) => [...m, { id, kind: 'plan', time: now(), prompt, steps: planFor(prompt), ready: false, executed: false }]);
    setBusy(true);
    push(1300, () => { patch(id, { ready: true }); setBusy(false); });
  };

  const send = (raw?: string, forceMode?: Mode) => {
    const text = (raw ?? input).trim();
    if (!text || busy) return;
    setMessages((m) => [...m, { id: seq++, kind: 'text', role: 'user', text, time: now(), files: attachments }]);
    setInput('');
    setAttachments([]);
    if ((forceMode ?? mode) === 'plan') startPlan(text);
    else startBuild(text);
  };

  const stop = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current.length = 0;
    if (activeRun.current) patch(activeRun.current, { stopped: true });
    setMessages((m) => m.map((msg) => (msg.kind === 'plan' && !msg.ready ? { ...msg, ready: true } : msg)));
    activeRun.current = null;
    setBusy(false);
    onBuildCancel?.();
  };

  const executePlan = (p: PlanMsg) => {
    if (busy) return;
    patch(p.id, { executed: true });
    setMode('build');
    startBuild(p.prompt);
  };

  useEffect(() => {
    if (!initialPrompt) return;
    const t = window.setTimeout(() => send(initialPrompt, 'build'), 350);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tasks: TaskItem[] = messages
    .filter((m): m is RunMsg => m.kind === 'run')
    .map((r) => ({ id: r.id, prompt: r.prompt, time: r.time, files: r.files.length, status: r.stopped ? 'stopped' : r.stage >= 4 ? 'done' : 'running' }));

  const emptyState = messages.length === 0;

  return (
    <section className="ws-chat">
      <div className="ws-chat-tabs" role="tablist" aria-label="Chat e Tarefas">
        <button role="tab" aria-selected={tab === 'chat'} className={`ws-chat-tab${tab === 'chat' ? ' active' : ''}`} onClick={() => setTab('chat')} data-testid="chat-tab-chat">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8.5 8.5 0 0 1-8.5 8.5c-1.4 0-2.7-.33-3.86-.92L4 21l1.42-4.64A8.5 8.5 0 1 1 21 12Z" /></svg>
          Chat
        </button>
        <button role="tab" aria-selected={tab === 'tarefas'} className={`ws-chat-tab${tab === 'tarefas' ? ' active' : ''}`} onClick={() => setTab('tarefas')} data-testid="chat-tab-tarefas">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6h11M9 12h11M9 18h11" /><path d="m4 6 1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></svg>
          Tarefas
          {tasks.length > 0 && <span className="ws-tab-count">{tasks.length}</span>}
        </button>
        {busy && <span className="ws-chat-live" data-testid="chat-busy"><span /> trabalhando</span>}
      </div>

      {tab === 'chat' ? (
        <div className="ws-chat-scroll" ref={scrollRef} data-testid="chat-scroll">
          {emptyState && (
            <div className="ws-chat-empty" data-testid="chat-empty">
              <HallMascot state="idle" size={110} />
              <h3>O que vamos construir?</h3>
              <p>Descreva uma alteração, corrija um problema ou continue desenvolvendo seu projeto.</p>
              <div className="ws-suggest">
                {SUGGESTIONS.map((s, i) => (
                  <button key={s} className="ws-suggest-chip" style={{ animationDelay: `${i * 60}ms` }} onClick={() => { setInput(s); inputRef.current?.focus(); }} data-testid={`chat-suggestion-${i}`}>
                    <Sparkles size={12} /> {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            if (m.kind === 'text') {
              return (
                <div key={m.id} className="ws-msg user" data-testid="msg-user">
                  <div className="ws-msg-head">
                    <span className="ws-msg-av user">N</span>
                    <span className="ws-msg-name">Você</span>
                    <span className="ws-msg-time">{m.time}</span>
                  </div>
                  <div className="ws-msg-text">{m.text}</div>
                  {m.files.length > 0 && <div className="ws-attach-row">{m.files.map((f) => <span key={f} className="ws-attach"><Paperclip size={11} /> {f}</span>)}</div>}
                </div>
              );
            }
            const head = (
              <div className="ws-msg-head">
                <span className="ws-msg-av hall"><img src={hallMascot} alt="" /></span>
                <span className="ws-msg-name">HALL</span>
                <span className="ws-msg-badge">{m.kind === 'plan' ? 'Plano' : 'Build'}</span>
                <span className="ws-msg-time">{m.time}</span>
              </div>
            );
            if (m.kind === 'plan') {
              return (
                <div key={m.id} className="ws-msg assistant" data-testid="msg-plan">
                  {head}
                  {!m.ready ? (
                    <div className="ws-run"><StepRow label="Pensando no plano..." state="running" /></div>
                  ) : (
                    <>
                      <ol className="ws-plan">{m.steps.map((s, i) => <li key={s} style={{ animationDelay: `${i * 70}ms` }}>{s}</li>)}</ol>
                      <div className="ws-plan-foot">
                        <button className="ws-plan-run" disabled={m.executed || busy} onClick={() => executePlan(m)} data-testid="plan-execute">
                          <Play size={13} /> {m.executed ? 'Plano executado' : 'Executar plano'}
                        </button>
                        <MessageActions text={m.steps.join('\n')} feedback={m.feedback} onFeedback={(f) => patch(m.id, { feedback: m.feedback === f ? undefined : f })} onRetry={() => !busy && startPlan(m.prompt)} />
                      </div>
                    </>
                  )}
                </div>
              );
            }
            return (
              <div key={m.id} className="ws-msg assistant" data-testid="msg-run">
                {head}
                <div className="ws-run">
                  <StepRow label="Analisando projeto..." state={m.stage > 0 ? 'done' : m.stopped ? 'pending' : 'running'} />
                  {m.stage >= 1 && <StepRow label="Planejando alterações..." state={m.stage > 1 ? 'done' : m.stopped ? 'pending' : 'running'} />}
                  {m.stage >= 2 && (
                    <>
                      <StepRow label={`Editando ${m.files.length} arquivos...`} state={m.stage > 2 ? 'done' : m.stopped ? 'pending' : 'running'} chevron onToggle={() => patch(m.id, { expanded: !m.expanded })} expanded={m.expanded} />
                      {m.expanded && (
                        <div className="ws-files">
                          {m.files.map((f) => (
                            <div key={f.path} className="ws-file" data-testid="run-file">
                              <span className="ws-file-path">{f.path}</span>
                              <span className="ws-file-stat"><span className="ws-add">+{f.add}</span><span className="ws-del">-{f.del}</span></span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {m.stage >= 3 && !m.stopped && (
                    <div className="ws-build">
                      {m.stage >= 4 ? (
                        <>
                          <span className="ws-build-ico done"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" opacity="0.25" /><path d="m7 12 3 3 5-5" /></svg></span>
                          <span className="ws-build-label">Build passou</span>
                          <span className="ws-build-time">{m.buildTime}</span>
                        </>
                      ) : (
                        <><span className="ws-step-spin" /><span className="ws-build-label">Compilando...</span></>
                      )}
                    </div>
                  )}
                  {m.stopped && <div className="ws-stopped" data-testid="run-stopped"><Square size={11} /> Interrompido por você</div>}
                </div>
                {(m.stage >= 4 || m.stopped) && (
                  <>
                    {m.stage >= 4 && <div className="ws-msg-text">{m.result}</div>}
                    <MessageActions text={m.result} feedback={m.feedback} onFeedback={(f) => patch(m.id, { feedback: m.feedback === f ? undefined : f })} onRetry={() => !busy && startBuild(m.prompt)} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="ws-chat-scroll"><TasksList tasks={tasks} /></div>
      )}

      <div className="ws-composer">
        <div className={`ws-composer-box${busy ? ' busy' : ''}`}>
          {attachments.length > 0 && (
            <div className="ws-attach-row in">
              {attachments.map((f) => (
                <span key={f} className="ws-attach" data-testid="composer-attachment">
                  <Paperclip size={11} /> {f}
                  <button onClick={() => setAttachments((a) => a.filter((x) => x !== f))} aria-label={`Remover ${f}`}><X size={11} /></button>
                </span>
              ))}
            </div>
          )}
          <textarea
            ref={inputRef}
            className="ws-composer-input"
            placeholder={mode === 'plan' ? 'Descreva o que quer planejar antes de construir...' : 'Descreva uma alteração, peça uma funcionalidade...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
            data-testid="composer-input"
            style={{ minHeight: '48px' }}
          />
          <input ref={fileRef} type="file" multiple hidden onChange={(e) => { const names = Array.from(e.target.files ?? []).map((f) => f.name); setAttachments((a) => [...new Set([...a, ...names])]); e.target.value = ''; }} data-testid="composer-file-input" />
          <div className="ws-composer-foot">
            <div className="ws-composer-left">
              <button className="ws-composer-icon" title="Anexar arquivos" aria-label="Anexar" onClick={() => fileRef.current?.click()} data-testid="composer-attach">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              <div className="ws-seg" role="group" aria-label="Modo">
                <button className={`ws-seg-btn${mode === 'plan' ? ' active' : ''}`} onClick={() => setMode('plan')} data-testid="mode-plan">PLAN</button>
                <button className={`ws-seg-btn${mode === 'build' ? ' active build' : ''}`} onClick={() => setMode('build')} data-testid="mode-build">
                  <Icon name="zap" size={11} /> BUILD
                </button>
              </div>
              <ModelPicker value={model} onChange={setModel} />
            </div>
            {busy ? (
              <button className="ws-stop" onClick={stop} aria-label="Parar" title="Parar" data-testid="composer-stop"><Square size={13} fill="currentColor" /></button>
            ) : (
              <ShinyButton onClick={() => send()} disabled={!input.trim()} label="Enviar" title="Enviar" testId="composer-send" iconSize={38} cornerRadius={10}>
                <Icon name="arrow-right" size={17} />
              </ShinyButton>
            )}
          </div>
        </div>
        <div className="ws-composer-hint">Enter envia · Shift+Enter quebra linha · modo {mode === 'plan' ? 'PLAN só planeja' : 'BUILD constrói e atualiza o preview'}</div>
      </div>
    </section>
  );
}

export default ChatPane;
