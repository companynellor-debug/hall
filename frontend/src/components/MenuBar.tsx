import { useEffect, useRef, useState } from 'react'
import { menus } from '../data/workspace'
import { HallMark, IconBell, IconChevronDown, IconSearch } from './icons'

export function MenuBar() {
  const [open, setOpen] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="topbar" ref={ref}>
      <div className="topbar-brand">
        <span className="hall-logo">
          <HallMark size={20} />
        </span>
        <span className="topbar-word">HALL</span>
        <span className="topbar-version">v0.1.0</span>
      </div>

      <div className="menubar">
        {Object.keys(menus).map((label) => {
          const isOpen = open === label
          return (
            <div
              key={label}
              className={`menubar-item${isOpen ? ' open' : ''}`}
              onPointerDown={() => setOpen(isOpen ? null : label)}
              onPointerEnter={() => {
                if (open && !isOpen) setOpen(label)
              }}
            >
              {label}
              {isOpen && (
                <div className="menu">
                  {menus[label].map((entry, i) =>
                    entry === '—' ? (
                      <div key={i} className="menu-sep" />
                    ) : (
                      <button key={i} className="menu-entry" onPointerDown={() => setOpen(null)}>
                        <span className="menu-entry-label">{entry.label}</span>
                        {entry.hint && <span className="menu-hint">{entry.hint}</span>}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="topbar-right">
        <div className="topbar-workspace">
          hall-workspace
          <IconChevronDown size={11} />
        </div>
        <button className="topbar-icon" title="Search">
          <IconSearch size={16} />
        </button>
        <button className="topbar-icon" title="Notifications">
          <IconBell size={16} />
        </button>
      </div>
    </div>
  )
}