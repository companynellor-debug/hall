import { Icon } from '../ui/Icon';

interface HallBrandProps {
  size?: 'sm' | 'md' | 'lg';
  showTag?: boolean;
}

export function HallBrand({ size = 'md', showTag = true }: HallBrandProps) {
  const sizes = {
    sm: { logo: 18, word: 'text-xl', tag: 'text-xs' },
    md: { logo: 24, word: 'text-2xl', tag: 'text-xs' },
    lg: { logo: 32, word: 'text-3xl', tag: 'text-sm' },
  };

  const s = sizes[size];

  return (
    <div className="hall-brand" aria-label="HALL">
      <span className="hall-logo" aria-hidden="true">
        <Icon name="zap" size={s.logo} className="text-accent" />
      </span>
      <span className={`hall-wordmark ${s.word}`}>HALL</span>
      {showTag && <span className={`hall-tag ${s.tag}`}>IDE</span>}
    </div>
  );
}