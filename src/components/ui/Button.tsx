import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', loading = false, icon, iconPosition = 'left', children, disabled, ...props }, ref) => {
    const base = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;
    const loadingClass = loading ? 'btn-loading' : '';

    return (
      <button
        ref={ref}
        className={`${base} ${variantClass} ${sizeClass} ${loadingClass} ${className}`.trim()}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className="btn-spinner" aria-hidden="true" />}
        {!loading && icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
        <span className="btn-text">{children}</span>
        {!loading && icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';