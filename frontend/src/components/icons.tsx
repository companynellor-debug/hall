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

export function IconSettings({ size = 18 }: IconProps) {
  return <IconGear size={size} />;
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

export function IconFileText({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
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

export function IconLoader({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

export function IconAlertCircle({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  )
}

export function IconClock({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

export function IconSparkles({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M12 3v2m0 14v2m9-9h-2M4 12H2m12.73-9.73l-1.41 1.41M7.05 7.05l-1.41 1.41M17.07 17.07l-1.41 1.41M8.36 17.07l1.41-1.41" />
    </svg>
  )
}

export function IconMaximize({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

export function IconCode({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  )
}

export function IconTerminal({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M4 17l5-5 5 5M12 2v20M9 7h10M9 12h6M9 17h10" />
    </svg>
  )
}

export function IconLayoutDashboard({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

export function IconLayout({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  )
}

export function IconChevronLeft({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="m15 15-6-6 6-6" />
    </svg>
  )
}

export function IconX({ size = 12 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function IconHistory({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <path d="M8 14a6 6 0 0 1 8 0" />
    </svg>
  )
}

export function IconHeartPulse({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      <path d="M23 21v-4" />
      <path d="M17 17l5-5" />
    </svg>
  )
}

export function IconMessageSquare({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function IconListTodo({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

export function IconMonitor({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
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

export function IconHouse({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  )
}

export function IconBookOpen({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 1-3 3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3 3h7z" />
    </svg>
  )
}

export function IconUsersRound({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 21a8 8 0 0 0-16 0" />
      <circle cx="14" cy="16" r="5" />
    </svg>
  )
}

export function IconGithub({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.93 3.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export function IconUserRound({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
    </svg>
  )
}

export function IconRefreshCw({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M21 12a9 9 0 1 1-9 9 9.75 9.75 0 0 1 6.74-2.74L21 16" />
    </svg>
  )
}

export function IconCode2({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  )
}

export function IconPanelsTopLeft({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}