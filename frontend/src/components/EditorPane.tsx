import { Editor, loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import tsWorker from '../../node_modules/monaco-editor/esm/vs/language/typescript/ts.worker.js?worker'
import { fileContents } from '../data/workspace'
import { IconClose, IconFile, IconChevronRight } from './icons'

loader.config({ monaco })

self.MonacoEnvironment = {
  getWorker() {
    return new tsWorker()
  },
}

monaco.editor.defineTheme('hall', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '686F7A', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'F02432' },
    { token: 'keyword.json', foreground: 'F02432' },
    { token: 'string', foreground: 'C7A34B' },
    { token: 'string.html', foreground: '43C47A' },
    { token: 'number', foreground: 'F08A93' },
    { token: 'type', foreground: '8FB8D8' },
    { token: 'identifier', foreground: 'F3F4F6' },
    { token: 'delimiter', foreground: '686F7A' },
    { token: 'tag', foreground: 'F02432' },
    { token: 'attribute.name', foreground: 'C7A34B' },
    { token: 'attribute.value', foreground: '43C47A' },
  ],
  colors: {
    'editor.background': '#090B0E',
    'editor.foreground': '#F3F4F6',
    'editorGutter.background': '#090B0E',
    'editor.lineHighlightBackground': '#0D0F12',
    'editor.lineHighlightBorder': '#00000000',
    'editorLineNumber.foreground': '#4B515B',
    'editorLineNumber.activeForeground': '#F02432',
    'editorCursor.foreground': '#F02432',
    'editor.selectionBackground': '#2A2D34',
    'editor.inactiveSelectionBackground': '#23262C',
    'editorIndentGuide.background1': '#15181C',
    'editorIndentGuide.activeBackground1': '#2B3038',
    'editorWidget.background': '#111318',
    'editorWidget.border': '#2B3038',
    'scrollbarSlider.background': '#2B3038',
    'scrollbarSlider.hoverBackground': '#3A4048',
    'scrollbarSlider.activeBackground': '#F02432',
    'editorBracketMatch.background': '#F0243233',
    'editorBracketMatch.border': '#F0243266',
  },
})

type Props = {
  tabs: string[]
  activePath: string
  onSelect: (path: string) => void
  onClose: (path: string) => void
}

function tabGlyph(name: string): string {
  const dot = name.lastIndexOf('.')
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : ''
  if (ext === 'tsx' || ext === 'ts') return 'g-blue'
  if (ext === 'css') return 'g-sage'
  if (ext === 'json') return 'g-sand'
  return ''
}

export function EditorPane({ tabs, activePath, onSelect, onClose }: Props) {
  const crumbs = activePath ? activePath.split('/').filter(Boolean) : []

  return (
    <section className="editor">
      <div className="editor-tabs">
        {tabs.map((path) => {
          const name = path.split('/').pop() ?? path
          const dot = name.lastIndexOf('.')
          const stem = dot > 0 ? name.slice(0, dot) : name
          const ext = dot > 0 ? name.slice(dot) : ''
          return (
            <div
              key={path}
              className={`editor-tab${path === activePath ? ' active' : ''}`}
              onClick={() => onSelect(path)}
            >
              <span className={`glyph ${tabGlyph(name)}`}>
                <IconFile size={12} />
              </span>
              {stem}
              {ext && <span className="ext-small">{ext}</span>}
              <button
                className="editor-tab-close"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose(path)
                }}
              >
                <IconClose size={12} />
              </button>
            </div>
          )
        })}
        <div className="tabs-side">TypeScript</div>
      </div>

      <nav className="editor-crumb">
        {crumbs.map((seg, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {i > 0 && (
              <span className="crumb-sep">
                <IconChevronRight size={10} />
              </span>
            )}
            <span className={`crumb-seg${i === crumbs.length - 1 ? ' last' : ''}`}>{seg}</span>
          </span>
        ))}
      </nav>

      <div className="editor-host">
        <Editor
          key={activePath}
          path={activePath}
          language="typescript"
          value={fileContents[activePath] ?? ''}
          theme="hall"
          options={{
            fontFamily: "'Cascadia Mono', Consolas, monospace",
            fontSize: 13,
            lineHeight: 20,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 14, bottom: 14 },
            renderLineHighlight: 'line',
            smoothScrolling: true,
            cursorBlinking: 'phase',
            cursorSmoothCaretAnimation: 'on',
            bracketPairColorization: { enabled: false },
            guides: { indentation: true },
            overviewRulerLanes: 0,
            scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
            automaticLayout: true,
            tabSize: 2,
          }}
        />
      </div>
    </section>
  )
}