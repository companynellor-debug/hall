import { useRef, useState, useCallback } from 'react';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { ImportGithub } from './ImportGithub';

interface ProjectComposerProps {
  onSubmit: (description: string) => void;
  disabled?: boolean;
}

const PROJECTS = [
  { value: 'nakor-project', label: "Nakor's Project", icon: 'folder' },
  { value: 'new-project', label: '+ Novo projeto', icon: 'plus' },
] as const;

const MODELS = [
  { value: 'auto', label: 'Auto', icon: 'mic' },
  { value: 'hall-core', label: 'HALL Core', icon: 'cpu' },
  { value: 'hall-pro', label: 'HALL Pro', icon: 'zap' },
] as const;

export function ProjectComposer({ onSubmit, disabled = false }: ProjectComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState<'nakor-project' | 'new-project'>('nakor-project');
  const [selectedModel, setSelectedModel] = useState<'auto' | 'hall-core' | 'hall-pro'>('auto');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const text = description.trim();
    if (!text || disabled) return;
    onSubmit(text);
    setDescription('');
    textareaRef.current?.focus();
  }, [description, disabled, onSubmit]);

  const handleNewProject = useCallback(() => {
    setSelectedProject('new-project');
    textareaRef.current?.focus();
  }, []);

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer-card">
        <div className="composer-header">
          <div className="composer-selectors" role="group" aria-label="Project and model selection">
            <div className="model-pills" role="radiogroup" aria-label="Select project">
              {PROJECTS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`model-pill ${selectedProject === p.value ? 'active' : ''}`}
                  role="radio"
                  aria-checked={selectedProject === p.value}
                  onClick={() => setSelectedProject(p.value as 'nakor-project' | 'new-project')}
                  disabled={disabled}
                >
                  <Icon name={p.icon} size={14} />
                  {p.label}
                </button>
              ))}
            </div>
            <div className="model-pills" role="radiogroup" aria-label="Select model">
              {MODELS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  className={`model-pill ${selectedModel === m.value ? 'active' : ''}`}
                  role="radio"
                  aria-checked={selectedModel === m.value}
                  onClick={() => setSelectedModel(m.value as 'auto' | 'hall-core' | 'hall-pro')}
                  disabled={disabled}
                >
                  <Icon name={m.icon} size={14} />
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Textarea
          ref={textareaRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o que você quer construir…"
          rows={6}
          aria-label="Project description"
          disabled={disabled}
          className="composer-textarea"
        />

        <div className="composer-footer">
          <div className="composer-actions">
            <Button type="button" variant="ghost" size="sm" disabled={disabled}>
              <Icon name="paperclip" size={16} />
              Anexar
            </Button>
          </div>
          <Button type="submit" variant="primary" size="md" disabled={!description.trim() || disabled}>
            Construir
            <Icon name="arrow-right" size={16} />
          </Button>
        </div>
        <p className="composer-hint">
          Pressione <kbd>Ctrl</kbd>+<kbd>Enter</kbd> para construir · <kbd>Tab</kbd> para navegar
        </p>
      </div>
      <div className="secondary-actions">
        <Button type="button" variant="secondary" size="md" onClick={handleNewProject} disabled={disabled}>
          <Icon name="plus" size={16} />
          Novo projeto
        </Button>
        <ImportGithub onImport={(url) => console.log('import', url)} />
      </div>
    </form>
  );
}