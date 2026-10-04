import type { ReactNode } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/* ---- Card ---- */
export function SettingsCard({
  icon, title, subtitle, action, children, className = '',
}: {
  icon?: ReactNode; title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
  return (
    <section className={`st-card ${className}`}>
      <header className="st-card-head">
        <div className="st-card-head-main">
          {icon && <span className="st-card-icon">{icon}</span>}
          <div className="st-card-titles">
            <h3 className="st-card-title">{title}</h3>
            {subtitle && <p className="st-card-sub">{subtitle}</p>}
          </div>
        </div>
        {action && <div className="st-card-action">{action}</div>}
      </header>
      <div className="st-card-body">{children}</div>
    </section>
  );
}

/* ---- Status badge ---- */
export type BadgeTone = 'ok' | 'warn' | 'error' | 'neutral';
export function StatusBadge({ tone, label, dot = true }: { tone: BadgeTone; label: string; dot?: boolean }) {
  return (
    <span className={`st-badge ${tone}`} data-testid="status-badge">
      {dot && <span className="st-badge-dot" />}
      {label}
    </span>
  );
}

/* ---- Field label + helper ---- */
export function Field({ label, helper, counter, children }: { label: string; helper?: string; counter?: string; children: ReactNode }) {
  return (
    <div className="st-field">
      <label className="st-field-label">{label}</label>
      {children}
      <div className="st-field-foot">
        {helper && <span className="st-field-helper">{helper}</span>}
        {counter && <span className="st-field-counter">{counter}</span>}
      </div>
    </div>
  );
}

/* ---- Input / Textarea ---- */
export function SettingsInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`st-input ${props.className ?? ''}`} />;
}
export function SettingsTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`st-textarea ${props.className ?? ''}`} />;
}

/* ---- Select ---- */
export function SettingsSelect({
  value, onChange, options, dotTone, 'data-testid': testid,
}: {
  value: string; onChange: (v: string) => void; options: string[]; dotTone?: BadgeTone; 'data-testid'?: string;
}) {
  return (
    <div className="st-select">
      {dotTone && <span className={`st-select-dot ${dotTone}`} />}
      <select value={value} onChange={(e) => onChange(e.target.value)} data-testid={testid}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={15} className="st-select-chev" />
    </div>
  );
}

/* ---- Toggle ---- */
export function SettingsToggle({ checked, onChange, 'data-testid': testid }: { checked: boolean; onChange: (v: boolean) => void; 'data-testid'?: string }) {
  return (
    <button
      type="button"
      className={`st-toggle${checked ? ' on' : ''}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      data-testid={testid}
    >
      <span className="st-toggle-knob" />
    </button>
  );
}

/* ---- Buttons ---- */
export function Btn({
  variant = 'secondary', children, ...rest
}: { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...rest} className={`st-btn ${variant} ${rest.className ?? ''}`}>{children}</button>;
}

export { Check };
