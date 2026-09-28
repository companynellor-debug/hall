import { useState } from 'react'
import type { FileNode } from '../data/workspace'
import { IconChevronDown, IconChevronRight, IconFile, IconFolder } from './icons'

export type TreeApi = {
  root: FileNode[]
  open: (path: string) => void
}

function glyphClass(name: string): string {
  const dot = name.lastIndexOf('.')
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : ''
  if (ext === 'tsx' || ext === 'ts') return 'g-code'
  return ''
}

type RowProps = {
  node: FileNode
  depth: number
  activePath: string
  onOpen: (path: string) => void
}

function splitName(name: string): [string, string] {
  const dot = name.lastIndexOf('.')
  if (dot <= 0) return [name, '']
  return [name.slice(0, dot), name.slice(dot)]
}

function Row({ node, depth, activePath, onOpen }: RowProps) {
  const [expanded, setExpanded] = useState(true)

  if (node.kind === 'dir') {
    return (
      <>
        <button
          className="tree-row"
          style={{ paddingLeft: 8 + depth * 13 }}
          onClick={() => setExpanded((v) => !v)}
        >
          <span className="chevron">
            {expanded ? <IconChevronDown size={12} /> : <IconChevronRight size={12} />}
          </span>
          <span className="glyph g-dir">
            <IconFolder size={14} />
          </span>
          <span className="tree-filename">{node.name}</span>
        </button>
        {expanded &&
          node.children?.map((child) => (
            <Row
              key={child.path}
              node={child}
              depth={depth + 1}
              activePath={activePath}
              onOpen={onOpen}
            />
          ))}
      </>
    )
  }

  const [stem, ext] = splitName(node.name)

  return (
    <button
      className={`tree-row${activePath === node.path ? ' selected' : ''}`}
      style={{ paddingLeft: 8 + depth * 13 + 14 }}
      onClick={() => onOpen(node.path)}
    >
      <span className="chevron" />
      <span className={`glyph ${glyphClass(node.name)}`}>
        <IconFile size={14} />
      </span>
      <span className="tree-filename">
        {stem}
        {ext && <span className="tree-file-ext">{ext}</span>}
      </span>
    </button>
  )
}

type Props = {
  nodes: FileNode[]
  activePath: string
  onOpen: (path: string) => void
}

export function FileTree({ nodes, activePath, onOpen }: Props) {
  return (
    <div>
      {nodes.map((node) => (
        <Row key={node.path} node={node} depth={0} activePath={activePath} onOpen={onOpen} />
      ))}
    </div>
  )
}
