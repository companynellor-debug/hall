import type { ReactNode } from 'react'
import { sideData, railItems, type RailId } from '../data/workspace'
import {
  IconAgent,
  IconApps,
  IconExplorer,
  IconGear,
  IconSearch,
  IconShield,
} from './icons'
import { FileTree, type TreeApi } from './FileTree'
import { IconChevronDown, IconPlus } from './icons'

type Props = {
  active: RailId
  onSelect: (id: RailId) => void
  activePath: string
  tree: TreeApi
  width: number
}

const icons: Record<RailId, ReactNode> = {
  explorer: <IconExplorer size={19} />,
  search: <IconSearch size={19} />,
  agent: <IconAgent size={19} />,
  apps: <IconApps size={19} />,
  security: <IconShield size={19} />,
  settings: <IconGear size={19} />,
}

export function Sidebar({ active, onSelect, activePath, tree, width }: Props) {
  const panel: ReactNode = (() => {
    if (active === 'explorer') {
      return (
        <>
          <div className="explorer-header">
            <span className="explorer-title">Explorer</span>
            <button className="btn-icon" title="New file">
              <IconPlus size={14} />
            </button>
          </div>
          <div className="explorer-body">
            <div className="explorer-section">Hall</div>
            <FileTree nodes={tree.root} activePath={activePath} onOpen={tree.open} />
          </div>
          <div className="explorer-footer">
            <div className="explorer-footer-section">
              <span className="explorer-footer-title">Outline</span>
              <IconChevronDown size={12} />
            </div>
            <div className="explorer-footer-section">
              <span className="explorer-footer-title">Timeline</span>
              <IconChevronDown size={12} />
            </div>
          </div>
        </>
      )
    }

    if (active === 'search') {
      return (
        <>
          <div className="explorer-header">
            <span className="explorer-title">Search</span>
          </div>
          <div className="explorer-body">
            <div className="side-search">
              <IconSearch size={13} />
              <input placeholder="Buscar arquivos..." />
            </div>
            <div className="explorer-section">{sideData.search.section}</div>
            {sideData.search.items.map((item) => (
              <button key={item} className="list-row">
                <span className="list-dot" />
                {item}
              </button>
            ))}
          </div>
        </>
      )
    }

    if (active !== 'settings') {
      return (
        <>
          <div className="explorer-header">
            <span className="explorer-title">
              {railItems.find((r) => r.id === active)?.label}
            </span>
          </div>
          <div className="explorer-body">
            <div className="explorer-section">{sideData[active].section}</div>
            {sideData[active].items.map((item) => (
              <button key={item} className="list-row">
                <span className={`list-dot${active === 'security' ? ' on' : ''}`} />
                {item}
              </button>
            ))}
          </div>
        </>
      )
    }

    if (active === 'settings') {
      return (
        <>
          <div className="explorer-header">
            <span className="explorer-title">Settings</span>
          </div>
          <div className="explorer-body">
            <div className="explorer-section">HALL</div>
            <button className="list-row">
              <span className="list-dot" />
              Theme
            </button>
            <button className="list-row">
              <span className="list-dot" />
              Model
            </button>
            <button className="list-row">
              <span className="list-dot" />
              Shortcuts
            </button>
          </div>
        </>
      )
    }

    return null
  })()

  return (
    <>
      <nav className="rail">
        {railItems.map((item) => (
          <button
            key={item.id}
            className={`rail-btn${active === item.id ? ' active' : ''}`}
            title={item.label}
            onClick={() => onSelect(item.id)}
          >
            {icons[item.id]}
          </button>
        ))}
        <div className="rail-spacer" />
        <div className="rail-foot">
          <span className="rail-version" style={{ fontSize: 9, letterSpacing: 1, color: 'var(--color-text-disabled)' }}>
            H
          </span>
        </div>
      </nav>

      <aside className="explorer" style={{ width }}>
        {panel}
      </aside>
    </>
  )
}