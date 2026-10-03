import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { HallMark, IconSend, IconAttach, IconCheck, IconChevronDown, IconLoader } from './icons';

type MessageRole = 'user' | 'assistant' | 'system';
type BuildStage = 'initializing' | 'planning' | 'executing' | 'preview_ready' | 'complete' | 'error';
type ChatTab = 'chat' | 'tasks';

interface Message {
  role: MessageRole;
  content: string;
  timestamp: Date;
  buildStage?: BuildStage;
  isBuilding?: boolean;
  filesCollapsed?: boolean;
}

interface BuildStep {
  id: string;
  label: string;
  icon: 'analyzing' | 'planning' | 'editing' | 'build';
}

const stageFlow: BuildStep[] = [
  { id: 'initializing', label: 'Analisando projeto...', icon: 'analyzing' },
  { id: 'planning', label: 'Planejando alterações...', icon: 'planning' },
  { id: 'executing', label: 'Editando 3 arquivos...', icon: 'editing' },
  { id: 'preview_ready', label: 'Build passou', icon: 'build' },
];

const editedFiles = [
  { path: 'src/app/dashboard/page.tsx', added: 72, removed: 12 },
  { path: 'src/components/RevenueChart.tsx', added: 156, removed: 8 },
  { path: 'src/components/MetricCard.tsx', added: 34, removed: 4 },
];

const tasks = [
  { id: '1', title: 'Configurar estrutura do projeto', status: 'done' as const },
  { id: '2', title: 'Implementar componentes principais', status: 'done' as const },
  { id: '3', title: 'Configurar build e TypeScript', status: 'done' as const },
  { id: '4', title: 'Preparar ambiente de preview', status: 'done' as const },
  { id: '5', title: 'Validar aplicação no navegador', status: 'pending' as const },
];

function IconEye({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconGitHub({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function IconMore({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}

function IconLightning({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}


interface BuildingChatPaneProps {
  messages: Message[];
  buildStage: BuildStage;
  isProcessing: boolean;
  onSend: (content: string) => void;
}

export function BuildingChatPane({
  messages,
  buildStage,
  isProcessing,
  onSend,
}: BuildingChatPaneProps) {
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<ChatTab>('chat');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [filesCollapsed, setFilesCollapsed] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, buildStage, isProcessing]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isProcessing) return;
    onSend(text);
    setInput('');
    inputRef.current?.focus();
  }, [input, isProcessing, onSend]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSend();
    }
  }, [handleSend]);

  const currentStageIndex = stageFlow.findIndex(s => s.id === buildStage);
  const isComplete = buildStage === 'complete' || buildStage === 'error';
  const showBuilding = isProcessing && !isComplete;

  const activeStageIndex = useMemo(() => {
    if (!showBuilding) return stageFlow.length;
    return Math.max(0, currentStageIndex);
  }, [showBuilding, currentStageIndex]);

  const getStageStatus = (index: number) => {
    if (index < activeStageIndex) return 'done';
    if (index === activeStageIndex && showBuilding) return 'active';
    return 'pending';
  };

  const renderMessage = (msg: Message, index: number) => {
    return (
      <div key={index} className="msg">
        <div className={`msg-avatar ${msg.role === 'user' ? 'user-avatar' : 'assistant-avatar'}`}>
          {msg.role === 'user' ? 'N' : <HallMark size={16} />}
        </div>
        <div className="msg-content">
          <div className="msg-header">
            <span className="msg-author">{msg.role === 'user' ? 'Você' : 'HALL'}</span>
            <span className="msg-time">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="msg-text">{msg.content}</div>
        </div>
      </div>
    );
  };

  return (
    <section className="building-chat">
      <div className="chat-header">
        <div className="chat-tabs">
          <button
            className={`chat-tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <span>Chat</span>
          </button>
          <button
            className={`chat-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <span>Tarefas</span>
          </button>
        </div>
      </div>

      <div className="chat-messages" ref={scrollRef}>
        {activeTab === 'chat' ? (
          <>
            {messages.map((msg, i) => renderMessage(msg, i))}
            {/* ... resto do render ... */}
          </>
        ) : (
          <div className="tasks-list">
            {tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.status}`}>
                <span className="task-title">{task.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chat-input-wrap">
        <div className="chat-input-card">
          <div className="chat-textarea-wrap">
            <textarea
              ref={inputRef}
              className="chat-textarea"
              placeholder="Descreva a alteração..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessing}
              rows={1}
            />
          </div>
          <div className="chat-input-actions">
            <div className="chat-input-left">
              <button className="chat-input-btn">
                <IconAttach size={16} />
              </button>
              <button className="chat-pill">
                <span>Nakor's Project</span>
                <IconChevronDown size={10} />
              </button>
              <button className="chat-pill build active">
                <IconLightning size={12} />
                <span>BUILD</span>
              </button>
            </div>
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isProcessing}
            >
              <IconSend size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuildingChatPane;