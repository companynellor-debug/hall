import { useEffect, useRef, useState } from 'react'
import { HallMark, IconAttach, IconCheck, IconChevronDown, IconSend } from './icons'

type Mode = 'plan' | 'build'
type State = 'idle' | 'thinking' | 'analyzing' | 'executing'

type Message = {
  role: 'user' | 'assistant'
  text: string
}

const stateFlow: State[] = ['thinking', 'analyzing', 'executing']

const models = ['OpenCode Core', 'HALL Swift', 'HALL Deep']

const stateText: Record<Exclude<State, 'idle'>, string> = {
  thinking: 'Pensando...',
  analyzing: 'Analisando projeto...',
  executing: 'Editando 3 arquivos...',
}

const runReplies: Record<Mode, string> = {
  plan: 'Plano estruturado. Proponho: refatorar o componente de métricas, mover o estado para um hook e ajustar o estilo. Revise e confirme para entrar em BUILD.',
  build: 'Edições aplicadas em 3 arquivos. Tipos verificados e build passou sem erros. Preview atualizado.',
}

const quickActions = ['Analisar este projeto', 'Adicionar componente', 'Corrigir erros', 'Melhorar design']

export function ChatPane() {
  const [mode, setMode] = useState<Mode>('plan')
  const [model, setModel] = useState(models[0])
  const [modelOpen, setModelOpen] = useState(false)
  const [state, setState] = useState<State>('idle')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Pronto para planejar. Descreva o que você quer construir, modificar ou analisar.',
    },
  ])
  const timers = useRef<number[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, state])

  const send = (preset?: string) => {
    const text = (preset ?? input).trim()
    if (!text || state !== 'idle') return
    setMessages((m) => [...m, { role: 'user', text }])
    setInput('')
    stateFlow.forEach((s, i) => {
      timers.current.push(window.setTimeout(() => setState(s), 500 + i * 850))
    })
    timers.current.push(
      window.setTimeout(() => {
        setState('idle')
        setMessages((m) => [...m, { role: 'assistant', text: runReplies[mode] }])
        inputRef.current?.focus()
      }, 500 + stateFlow.length * 850),
    )
  }

  const running = state !== 'idle'
  const stageIdx = running ? stateFlow.indexOf(state) : -1

  let dotsHtml = null
  if (running) {
    dotsHtml = (
      <span className="hall-dots">
        {stateFlow.map((s, i) => (
          <span
            key={s}
            className={`hall-dot${i < stageIdx ? ' done' : ''}${i === stageIdx ? ' now' : ''}`}
          />
        ))}
      </span>
    )
  }

  return (
    <section className="chat">
      <div className="chat-header">
        <div className="chat-title">
          <span className="hall-logo">
            <HallMark size={15} />
          </span>
          <span>HALL / CHAT</span>
        </div>

        <div className="chat-modes">
          <span className="label">Mode</span>
          <div className="modes-seg">
            <button
              className={`mode-btn${mode === 'plan' ? ' mode-active' : ''}`}
              onClick={() => setMode('plan')}
            >
              PLAN
            </button>
            <button
              className={`mode-btn${mode === 'build' ? ' mode-active' : ''}`}
              onClick={() => setMode('build')}
            >
              BUILD
            </button>
          </div>
        </div>

        <div className="chat-model">
          <span className="label">Model</span>
          <button className="model-btn" onClick={() => setModelOpen((v) => !v)}>
            {model}
            <IconChevronDown size={11} />
          </button>
          {modelOpen && (
            <div className="model-menu">
              {models.map((m) => (
                <button
                  key={m}
                  className="model-entry"
                  onClick={() => {
                    setModel(m)
                    setModelOpen(false)
                  }}
                >
                  {m}
                  {m === model && (
                    <span className="model-check">
                      <IconCheck size={10} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="chat-messages" ref={scrollRef}>
        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="msg user">
              {m.text}
            </div>
          ) : (
            <div key={i} className="msg assistant">
              <span className="msg-avatar">
                <HallMark size={13} />
              </span>
              <div className="msg-body">
                <div className="msg-role">HALL</div>
                {m.text}
              </div>
            </div>
          ),
        )}
        {running && stageIdx >= 0 && (
          <div className="chat-state">
            <span className="msg-avatar">
              <HallMark size={13} />
            </span>
            <span>
              {stateText[state]} {dotsHtml}
            </span>
          </div>
        )}
      </div>

      <div className="chat-quick">
        {quickActions.map((a) => (
          <button key={a} className="quick-chip" onClick={() => send(a)}>
            {a}
          </button>
        ))}
      </div>

      <div className="chat-input-wrap">
        <div className="chat-input">
          <button className="chat-attach" title="Anexar">
            <IconAttach size={15} />
          </button>
          <input
            ref={inputRef}
            placeholder="Descreva a tarefa..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') send()
              if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) send()
            }}
          />
          <button className="chat-send" onClick={() => send()} title="Enviar">
            <IconSend size={15} />
          </button>
        </div>
      </div>

      <div className="chat-context">
        Contexto: <b>hall-workspace</b> · Ctrl+Enter para enviar
      </div>
    </section>
  )
}