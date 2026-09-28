export type FileNode = {
  name: string
  path: string
  kind: 'file' | 'dir'
  children?: FileNode[]
}

export const fileTree: FileNode[] = [
  {
    name: 'src',
    path: 'src',
    kind: 'dir',
    children: [
      {
        name: 'components',
        path: 'src/components',
        kind: 'dir',
        children: [
          { name: 'Chat.tsx', path: 'src/components/Chat.tsx', kind: 'file' },
          { name: 'Preview.tsx', path: 'src/components/Preview.tsx', kind: 'file' },
          { name: 'Sidebar.tsx', path: 'src/components/Sidebar.tsx', kind: 'file' },
        ],
      },
      { name: 'App.tsx', path: 'src/App.tsx', kind: 'file' },
      { name: 'Home.tsx', path: 'src/Home.tsx', kind: 'file' },
      { name: 'index.css', path: 'src/index.css', kind: 'file' },
      { name: 'main.tsx', path: 'src/main.tsx', kind: 'file' },
    ],
  },
  { name: 'package.json', path: 'package.json', kind: 'file' },
  { name: 'tsconfig.json', path: 'tsconfig.json', kind: 'file' },
  { name: 'vite.config.ts', path: 'vite.config.ts', kind: 'file' },
]

export const fileContents: Record<string, string> = {
  'src/Home.tsx': `import { useState } from 'react'

interface Metric {
  label: string
  value: number
}

const metrics: Metric[] = [
  { label: 'builds', value: 128 },
  { label: 'scans', value: 42 },
  { label: 'agents', value: 7 },
]

export default function Home() {
  const [ready, setReady] = useState(false)

  return (
    <main className="home">
      <header>
        <span className="kicker">hall / workspace</span>
        <h1>
          Ship with <em>precision</em>
        </h1>
        <p>A development environment tuned for focus.</p>
      </header>

      <section className="stats">
        {metrics.map((m) => (
          <div key={m.label} className="stat">
            <b>{m.value}</b>
            <span>{m.label}</span>
          </div>
        ))}
      </section>

      <button onClick={() => setReady(true)}>
        {ready ? 'system online' : 'initialize'}
      </button>
    </main>
  )
}
`,
  'src/App.tsx': `import Home from './Home'

export default function App() {
  return <Home />
}
`,
  'src/main.tsx': `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`,
  'src/index.css': `:root {
  --bg: #04090f;
  --accent: #e39a4a;
}

body {
  margin: 0;
  background: var(--bg);
}
`,
  'src/components/Chat.tsx': `export function Chat() {
  return <section className="chat" />
}
`,
  'src/components/Preview.tsx': `export function Preview() {
  return <section className="preview" />
}
`,
  'src/components/Sidebar.tsx': `export function Sidebar() {
  return <aside className="rail" />
}
`,
  'package.json': `{
  "name": "hall-workspace",
  "private": true,
  "type": "module"
}
`,
  'tsconfig.json': `{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx"
  }
}
`,
  'vite.config.ts': `import { defineConfig } from 'vite'

export default defineConfig({})
`,
}

export type MenuEntry = {
  label: string
  hint?: string
}

const item = (label: string, hint?: string): MenuEntry => ({ label, hint })
const sep = '—' as const

export const menus: Record<string, (MenuEntry | typeof sep)[]> = {
  File: [
    item('Open Project'),
    item('Import Repository'),
    item('Recent Projects'),
    sep,
    item('Save', 'Ctrl S'),
    item('Close Project'),
  ],
  Edit: [
    item('Undo', 'Ctrl Z'),
    item('Redo', 'Ctrl Y'),
    sep,
    item('Cut', 'Ctrl X'),
    item('Copy', 'Ctrl C'),
    item('Paste', 'Ctrl V'),
    sep,
    item('Find in Files', 'Ctrl F'),
  ],
  Project: [
    item('New File', 'Ctrl N'),
    item('New Folder'),
    item('Rename'),
    item('Delete'),
    sep,
    item('Project Settings'),
  ],
  Agent: [
    item('Run Agent', 'Ctrl .'),
    item('Plan Mode'),
    item('Build Mode'),
    sep,
    item('Agent History'),
    item('Stop Agent', 'Ctrl ,'),
  ],
  Design: [
    item('Visual Identity'),
    item('Typography'),
    item('Colors'),
    item('Icons'),
    item('Motion'),
    sep,
    item('Audit Design'),
  ],
  Security: [
    item('Run Security Scan'),
    item('Secrets'),
    item('Dependencies'),
    item('API Exposure'),
    sep,
    item('Security Report'),
  ],
  Integrations: [
    item('Connectors'),
    item('Webhooks'),
    item('API Keys'),
    item('Environments'),
    sep,
    item('Sync Now'),
  ],
  Deploy: [
    item('Build'),
    item('Preview Deploy'),
    item('Production Deploy'),
    sep,
    item('Rollback'),
    item('Deploy Logs'),
  ],
  Help: [
    item('Welcome'),
    item('Documentation'),
    item('Keyboard Shortcuts'),
    item('Release Notes'),
    sep,
    item('About HALL'),
  ],
}

export type RailId = 'explorer' | 'search' | 'agent' | 'apps' | 'security' | 'settings'

export const railItems: { id: RailId; label: string }[] = [
  { id: 'explorer', label: 'Explorer' },
  { id: 'search', label: 'Search' },
  { id: 'agent', label: 'Agent' },
  { id: 'apps', label: 'Apps' },
  { id: 'security', label: 'Security' },
  { id: 'settings', label: 'Settings' },
]

export const sideData: Record<Exclude<RailId, 'explorer' | 'settings'>, { section: string; items: string[] }> = {
  search: {
    section: 'Recent',
    items: ['Home.tsx', 'ChatPane.tsx', 'EditorPane.tsx', 'vite.config.ts'],
  },
  agent: {
    section: 'Agents',
    items: ['hall-core', 'hall-build', 'hall-scan'],
  },
  apps: {
    section: 'Workspace',
    items: ['hall-web', 'hall-api', 'hall-docs'],
  },
  security: {
    section: 'Findings',
    items: ['0 critical', '0 high', '2 medium', '5 low'],
  },
}
