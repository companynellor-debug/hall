import { useState } from 'react'

type Tab = 'CONSOLE' | 'PROBLEMS' | 'OUTPUT' | 'TERMINAL'

const tabs: Tab[] = ['CONSOLE', 'PROBLEMS', 'OUTPUT', 'TERMINAL']

export function ConsolePane() {
  const [tab, setTab] = useState<Tab>('CONSOLE')

  return (
    <section className="console">
      <div className="console-tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={`console-tab${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="console-body">
        {tab === 'CONSOLE' && (
          <>
            <div className="console-line success">✓ Vite dev server running</div>
            <div className="console-line">
              <span className="label">Local:</span> http://localhost:5173
            </div>
            <div className="console-line">
              <span className="label">Network:</span> http://192.168.0.10:5173
            </div>
            <div className="console-line">
              <span className="label">Ready in</span> 324ms.
            </div>
          </>
        )}

        {tab === 'PROBLEMS' && (
          <div className="console-line">
            <span className="label">0 errors</span> · <span className="label">0 warnings</span> — nenhum problema encontrado.
          </div>
        )}

        {tab === 'OUTPUT' && (
          <>
            <div className="console-line">[HALL] typecheck passed in 1.2s</div>
            <div className="console-line">[HALL] build completed</div>
            <div className="console-line success">✓ ready</div>
          </>
        )}

        {tab === 'TERMINAL' && (
          <>
            <div className="console-line success">hall@workspace:~$</div>
            <div className="console-line">hall@workspace:~$ npm run dev</div>
            <div className="console-line success">✓ Vite dev server running</div>
          </>
        )}
      </div>
    </section>
  )
}