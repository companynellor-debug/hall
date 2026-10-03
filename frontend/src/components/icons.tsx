type IconProps = {
  size?: number
  className?: string
}

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

/* HALL logo: >_ terminal prompt */
export function HallMark({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square">
      <path d="M5 6l7 6-7 6" />
      <path d="M13 18h6" />
    </svg>
  )
}

export function IconExplorer({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1" />
    </svg>
  )
}

export function IconSearch({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

export function IconAgent({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5Z" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  )
}

export function IconApps({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
    </svg>
  )
}

export function IconShield({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 3 5 6v5.5c0 4.5 3 7.5 7 9.5 4-2 7-5 7-9.5V6Z" />
    </svg>
  )
}

export function IconGear({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
    </svg>
  )
}

export function IconChevronDown({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function IconChevronRight({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

export function IconFolder({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M3 6a1 1 0 0 1 1-1h4.5l2 2.5H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
    </svg>
  )
}

export function IconFile({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
    </svg>
  )
}

export function IconClose({ size = 12 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function IconGitBranch({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="18" cy="8" r="2.4" />
      <path d="M6 8.4v7.2M18 10.4c0 3-2.5 4.6-6 4.6" />
    </svg>
  )
}

export function IconBuild({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="m14 6 4 4-8.5 8.5L4 20l1.5-5.5Z" />
      <path d="m12 8 4 4" />
    </svg>
  )
}

export function IconArrowLeft({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
    </svg>
  )
}

export function IconArrowRight({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M5 12h14m0 0-6-6m6 6-6 6" />
    </svg>
  )
}

export function IconRefresh({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v4h-4" />
    </svg>
  )
}

export function IconSend({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export function IconLock({ size = 11 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="5" y="11" width="14" height="9" rx="1" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

export function IconCheck({ size = 12 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

export function IconPlus({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function IconExternal({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M19 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5.5" />
    </svg>
  )
}

export function IconBell({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M6 9a6 6 0 0 1 12 0c0 3 1 4 1 5H5c0-1 1-2 1-5Z" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  )
}

export function IconAttach({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M14.5 6.5 9 12a2.1 2.1 0 0 0 3 3l6.5-6.5a3.9 3.9 0 0 0-5.5-5.5L6 10a5.9 5.9 0 0 0 8.5 8.5l5-5" />
    </svg>
  )
}

export function IconConsole({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="m7 7 5 5-5 5M13 17h5" />
    </svg>
  )
}

export function IconRadio({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="2" />
      <path d="M7.7 7.7a6 6 0 0 0 0 8.6M16.3 7.7a6 6 0 0 1 0 8.6" />
    </svg>
  )
}

export function IconPuzzle({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M10 4h4v3a2 2 0 1 0 3 2h3v4h-3a2 2 0 1 0-3 2v3h-4v-3a2 2 0 1 0-3-2H4v-4h3a2 2 0 1 0 3-2Z" />
    </svg>
  )
}

export function IconCommit({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconPlay({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

export function IconSquare({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  )
}

export function IconMonitor({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M2 9h20" />
      <path d="M12 17v4" />
    </svg>
  )
}

export function IconTablet({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}

export function IconSmartphone({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}

export function IconCode2({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M18 16l4-4-4-4" />
      <path d="M6 8l-4 4 4 4" />
      <path d="M14.5 4h-9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

export function IconTerminal({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M4 17l5-5 5 5" />
      <path d="M20 17H4" />
      <path d="M4 7h16" />
    </svg>
  )
}