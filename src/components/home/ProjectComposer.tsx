import { useRef, useState } from 'react';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

interface ProjectComposerProps {
  onSubmit: (description: string) => void;
  disabled?: boolean;
}

export function ProjectComposer({ onSubmit, disabled = false }: ProjectComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('hall-core');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = description.trim();
    if (!text || disabled) return;
    onSubmit(text);
    setDescription('');
    textareaRef.current?.focus();
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <div className="composer-card">
        <div className="composer-header">
          <span className="composer-label">Project Composer</span>
          <div className="composer-model">
            <select
              className="model-select"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              aria-label="Select model"
            >
              <option value="hall-core">HALL Core</option>
              <option value="hall-pro">HALL Pro</option>
              <option value="custom">Custom Model</option>
            </select>
          </div>
        </div>

        <Textarea
          ref={textareaRef}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you want to build…"
          rows={5}
          aria-label="Project description"
        />

        <div className="composer-footer">
          <div className="composer-actions">
            <Button type="button" variant="ghost" size="sm">
              <Icon name="paperclip" size={16} />
              Attach Context
            </Button>
            <Button type="button" variant="ghost" size="sm">
              <Icon name="folder" size={16} />
              Add Files
            </Button>
          </div>
          <Button type="submit" variant="primary" size="md" disabled={!description.trim() || disabled}>
            <Icon name="send" size={16} />
            Create Project
          </Button>
        </div>
      </div>
      <p className="composer-hint">Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> to create · <kbd>Tab</kbd> to navigate</p>
    </form>
  );
}