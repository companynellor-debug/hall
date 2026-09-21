import { useCallback, useState } from 'react'
import { ChatPane } from './components/ChatPane'
import { ConsolePane } from './components/ConsolePane'
import { EditorPane } from './components/EditorPane'
import { MenuBar } from './components/MenuBar'
import { PreviewPane } from './components/PreviewPane'
import { Resizer } from './components/Resizer'
import { Sidebar } from './components/Sidebar'
import { StatusBar } from './components/StatusBar'
import { fileTree, type RailId } from './data/workspace'

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export default function App() {
  const [rail, setRail] = useState<RailId>('explorer')
  const [tabs, setTabs] = useState<string[]>(['src/Home.tsx'])
  const [activePath, setActivePath] = useState('src/Home.tsx')
  const [editorH, setEditorH] = useState(340)
  const [rightW, setRightW] = useState(420)
  const [consoleH, setConsoleH] = useState(180)
  const [explorerW, setExplorerW] = useState(230)

  const openFile = useCallback((path: string) => {
    setTabs((t) => (t.includes(path) ? t : [...t, path]))
    setActivePath(path)
  }, [])

  const closeTab = useCallback(
    (path: string) => {
      const idx = tabs.indexOf(path)
      const next = tabs.filter((p) => p !== path)
      setTabs(next)
      if (activePath === path) {
        setActivePath(next[Math.min(idx, next.length - 1)] ?? '')
      }
    },
    [tabs, activePath],
  )

  return (
    <div className="app">
      <MenuBar />

      <div className="app-body">
        <Sidebar
          active={rail}
          onSelect={setRail}
          activePath={activePath}
          tree={{ root: fileTree, open: openFile }}
          width={explorerW}
        />
        <Resizer axis="x" onDelta={(d) => setExplorerW((w) => clamp(w + d, 180, 320))} />

        <div className="center">
          <div className="editor" style={{ height: editorH }}>
            <EditorPane
              tabs={tabs}
              activePath={activePath}
              onSelect={setActivePath}
              onClose={closeTab}
            />
          </div>
          <Resizer axis="y" onDelta={(d) => setEditorH((h) => clamp(h + d, 160, 640))} />
          <ChatPane />
        </div>

        <Resizer axis="x" onDelta={(d) => setRightW((w) => clamp(w - d, 300, 760))} />

        <div className="right-col" style={{ width: rightW }}>
          <div className="preview">
            <PreviewPane />
          </div>
          <Resizer axis="y" onDelta={(d) => setConsoleH((h) => clamp(h - d, 120, 400))} />
          <div className="console" style={{ height: consoleH }}>
            <ConsolePane />
          </div>
        </div>
      </div>

      <StatusBar />
    </div>
  )
}