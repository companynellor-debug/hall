import { useEffect, useRef, useState } from 'react';
import { Check, Copy, RotateCcw, ThumbsDown, ThumbsUp, ChevronDown, CircleCheck, CircleX, Loader2, ListChecks } from 'lucide-react';
import { Icon } from './ui/Icon';
import { MODELS } from '../features/chat/agentSim';

export function StepRow({ label, state, chevron, onToggle, expanded }: {
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

export function MessageActions({ text, feedback, onFeedback, onRetry }: {
  text: string; feedback?: 'up' | 'down'; onFeedback: (f: 'up' | 'down') => void; onRetry: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="ws-actions">
      <button className={`ws-action-btn${copied ? ' on' : ''}`} onClick={copy} aria-label="Copiar" title={copied ? 'Copiado!' : 'Copiar'} data-testid="action-copy">
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <button className={`ws-action-btn${feedback === 'up' ? ' on' : ''}`} onClick={() => onFeedback('up')} aria-label="Gostei" title="Gostei" data-testid="action-like"><ThumbsUp size={14} /></button>
      <button className={`ws-action-btn${feedback === 'down' ? ' on down' : ''}`} onClick={() => onFeedback('down')} aria-label="Não gostei" title="Não gostei" data-testid="action-dislike"><ThumbsDown size={14} /></button>
      <button className="ws-action-btn" onClick={onRetry} aria-label="Refazer" title="Refazer" data-testid="action-retry"><RotateCcw size={14} /></button>
      {copied && <span className="ws-copied" data-testid="action-copied">Copiado</span>}
    </div>
  );
}

export function ModelPicker({ value, onChange }: { value: string; onChange: (m: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);
  return (
    <div className="ws-model-wrap" ref={ref}>
      <button className="ws-chip" onClick={() => setOpen((o) => !o)} data-testid="composer-model">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 12v0M8 8v8M12 5v14M16 8v8M20 12v0" /></svg>
        {value}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="ws-pop up" role="menu" data-testid="composer-model-menu">
          {MODELS.map((m) => (
            <button key={m} role="menuitemradio" aria-checked={m === value} className={m === value ? 'active' : ''} onClick={() => { onChange(m); setOpen(false); }} data-testid={`model-option-${m.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
              <span>{m}{m === 'Auto' && <small>O HALL escolhe o melhor</small>}</span>
              {m === value && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export type TaskItem = { id: number; prompt: string; time: string; status: 'running' | 'done' | 'stopped'; files: number };

export function TasksList({ tasks }: { tasks: TaskItem[] }) {
  if (tasks.length === 0) {
    return (
      <div className="ws-chat-empty">
        <ListChecks size={28} style={{ opacity: 0.3 }} />
        <h3>Nenhuma tarefa ainda</h3>
        <p>As etapas de cada build aparecerão aqui.</p>
      </div>
    );
  }
  return (
    <div className="ws-tasks" data-testid="tasks-list">
      {tasks.map((t) => (
        <div key={t.id} className={`ws-task ${t.status}`} data-testid="task-item">
          <span className="ws-task-ico">
            {t.status === 'running' ? <Loader2 size={15} className="pv-spin" /> : t.status === 'done' ? <CircleCheck size={15} /> : <CircleX size={15} />}
          </span>
          <div className="ws-task-main">
            <div className="ws-task-title">{t.prompt}</div>
            <div className="ws-task-meta">
              {t.status === 'running' ? 'Em andamento' : t.status === 'done' ? `Concluído · ${t.files} arquivos` : 'Interrompido'} · {t.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
