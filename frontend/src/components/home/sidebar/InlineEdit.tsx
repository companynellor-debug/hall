import { useEffect, useRef, useState } from 'react';

interface Props {
  value: string;
  onCommit: (v: string) => void;
  onCancel: () => void;
  testId: string;
}

export function InlineEdit({ value, onCommit, onCancel, testId }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  const commit = () => (draft.trim() ? onCommit(draft.trim()) : onCancel());

  return (
    <input
      ref={ref}
      className="sb-inline-edit"
      data-testid={testId}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') onCancel();
      }}
    />
  );
}
