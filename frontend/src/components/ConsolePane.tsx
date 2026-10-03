import { useState } from 'react'

type Tab = 'CONSOLE' | 'PROBLEMS' | 'OUTPUT' | 'TERMINAL'

const tabs: Tab[] = ['CONSOLE', 'PROBLEMS', 'OUTPUT', 'TERMINAL']

export function ConsolePane() {
  const [tab, setTab] = useState<Tab>('CONSOLE')

  return (
    <section className="console-tab">
      <div className="console-tab-header">
        <div className="console-tabs">
          {tabs.map((t) => (
            <button
              key={t}
              className={`console-tab-btn${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="console-tab-body">
        {tab === 'CONSOLE' && (
          <>
            <div className="console-line success">
              <span className="console-time">[10:24:12]</span>
              <span className="console-source">[vite]</span>
              ✓ Vite dev server running
            </div>
            <div className="console-line">
              <span className="console-time">[10:24:12]</span>
              <span className="console-source">[vite]</span>
              <span className="label">Local:</span> http://localhost:5173
            </div>
            <div className="console-line">
              <span className="console-time">[10:24:12]</span>
              <span className="console-source">[vite]</span>
              <span className="label">Network:</span> http://192.168.0.10:5173
            </div>
            <div className="console-line">
              <span className="console-time">[10:24:13]</span>
              <span className="console-source">[vite]</span>
              <span className="label">Ready in</span> 324ms.
            </div>
            <div className="console-line info">
              <span className="console-time">[10:25:45]</span>
              <span className="console-source">[HALL]</span>
              Build iniciado: modo BUILD
            </div>
            <div className="console-line success">
              <span className="console-time">[10:25:48]</span>
              <span className="console-source">[HALL]</span>
              ✓ src/components/Metrics.tsx atualizado
            </div>
            <div className="console-line success">
              <span className="console-time">[10:25:50]</span>
              <span className="console-source">[HALL]</span>
              ✓ src/hooks/useMetrics.ts criado
            </div>
            <div className="console-line success">
              <span className="console-time">[10:25:52]</span>
              <span className="console-source">[HALL]</span>
              ✓ Build concluído sem erros
            </div>
          </>
        )}

        {tab === 'PROBLEMS' && (
          <div className="console-line">
            <span className="console-time">[10:25:52]</span>
            <span className="console-source">[tsc]</span>
            <span className="label success">0 errors</span> · <span className="label">0 warnings</span> — nenhum problema encontrado.
          </div>
        )}

        {tab === 'OUTPUT' && (
          <>
            <div className="console-line">
              <span className="console-time">[10:25:45]</span>
              <span className="console-source">[HALL]</span>
              Iniciando build de produção...
            </div>
            <div className="console-line">
              <span className="console-time">[10:25:46]</span>
              <span className="console-source">[HALL]</span>
              Typecheck: verificação de tipos concluída
            </div>
            <div className="console-line info">
              <span className="console-time">[10:25:48]</span>
              <span className="console-source">[esbuild]</span>
              Bundle: 2.3 MB (gzipped: 480 KB)
            </div>
            <div className="console-line success">
              <span className="console-time">[10:25:52]</span>
              <span className="console-source">[HALL]</span>
              ✓ Build de produção concluído
            </div>
          </>
        )}

        {tab === 'TERMINAL' && (
          <>
            <div className="console-line success">
              <span className="console-time">[10:24:10]</span>
              hall@workspace:~$
            </div>
            <div className="console-line">
              <span className="console-time">[10:24:10]</span>
              hall@workspace:~$ npm run dev
            </div>
            <div className="console-line success">
              <span className="console-time">[10:24:12]</span>
              ✓ Vite dev server running on http://localhost:5173
            </div>
            <div className="console-line">
              <span className="console-time">[10:25:45]</span>
              hall@workspace:~$
            </div>
          </>
        )}
      </div>
    </section>
  )
}