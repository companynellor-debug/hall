import { useState, useCallback, useEffect, useRef } from 'react';
import { BuildGlobalHeader } from './BuildGlobalHeader';
import { ProjectContextBar } from './ProjectContextBar';
import { BuildingChatPane } from './BuildingChatPane';
import { BuildingPreviewPane } from './BuildingPreviewPane';
import { BuildingVerticalToolbar } from './BuildingVerticalToolbar';

type BuildStage = 'initializing' | 'planning' | 'executing' | 'preview_ready' | 'complete' | 'error';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  buildStage?: BuildStage;
  isBuilding?: boolean;
  filesCollapsed?: boolean;
}

interface BuildingWorkspaceProps {
  onBack: () => void;
  projectName: string;
  initialPrompt: string;
  selectedModel: string;
}

const AVAILABLE_BRANCHES = ['main', 'develop', 'feature/chat', 'feature/preview'];

const stageFlow: BuildStage[] = ['initializing', 'planning', 'executing', 'preview_ready', 'complete'];

export function BuildingWorkspace({ onBack, projectName, initialPrompt }: BuildingWorkspaceProps) {
  const displayName = projectName || "Nakor's Project";
  const [buildStage, setBuildStage] = useState<BuildStage>('initializing');
  const [showRightToolbar] = useState(true);
  const [activeRightTool, setActiveRightTool] = useState<'files' | 'changes' | 'health'>('files');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('há 2 minutos');
  const stageStartRef = useRef<Date | null>(null);
  const buildTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavigateHome = useCallback(() => {
    onBack();
  }, [onBack]);

  const handleNavigateProjects = useCallback(() => {
    console.log('Navigate to projects');
  }, []);

  const handleNavigateResources = useCallback(() => {
    console.log('Navigate to resources');
  }, []);

  const handleNavigateCommunity = useCallback(() => {
    console.log('Navigate to community');
  }, []);

  const handleOpenGitHub = useCallback(() => {
    window.open('https://github.com', '_blank');
  }, []);

  const handleOpenSettings = useCallback(() => {
    console.log('Open settings');
  }, []);

  const handleBranchChange = useCallback((branch: string) => {
    setCurrentBranch(branch);
  }, []);

  const handleSync = useCallback(async () => {
    setIsSyncing(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSyncing(false);
    setLastSync('agora mesmo');
  }, []);

  const clearBuildTimeout = useCallback(() => {
    if (buildTimeoutRef.current) {
      clearTimeout(buildTimeoutRef.current);
      buildTimeoutRef.current = null;
    }
  }, []);

  const runBuildSimulation = useCallback((
    setMessagesFn: React.Dispatch<React.SetStateAction<Message[]>>,
    setBuildStageFn: React.Dispatch<React.SetStateAction<BuildStage>>,
    setPreviewUrlFn: React.Dispatch<React.SetStateAction<string | null>>,
    setIsProcessingFn: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    clearBuildTimeout();

    const totalStages = stageFlow.length;

    const updateStage = (index: number) => {
      if (index >= totalStages) return;

      const stage = stageFlow[index];
      setBuildStageFn(stage);

      setMessagesFn(prev => {
        const newMessages = [...prev];
        const lastMsgIndex = newMessages.length - 1;
        if (lastMsgIndex >= 0 && newMessages[lastMsgIndex].role === 'assistant' && newMessages[lastMsgIndex].isBuilding) {
          newMessages[lastMsgIndex] = {
            ...newMessages[lastMsgIndex],
            buildStage: stage,
          };
        }
        return newMessages;
      });

      if (index < totalStages - 1) {
        const delays = [800, 1500, 2000, 1000];
        buildTimeoutRef.current = setTimeout(() => {
          updateStage(index + 1);
        }, delays[index]);
      } else {
        buildTimeoutRef.current = setTimeout(() => {
          setPreviewUrlFn('http://localhost:5173');
          setBuildStageFn('complete');
          setMessagesFn(prev => {
            const newMessages = [...prev];
            const lastMsgIndex = newMessages.length - 1;
            if (lastMsgIndex >= 0 && newMessages[lastMsgIndex].role === 'assistant' && newMessages[lastMsgIndex].isBuilding) {
              newMessages[lastMsgIndex] = {
                ...newMessages[lastMsgIndex],
                content: 'Pronto! A seção de analytics foi adicionada ao dashboard com o gráfico de receita dos últimos 7 dias e os principais indicadores de performance (receita total, ticket médio, conversão).',
                isBuilding: false,
                buildStage: 'complete',
              };
            }
            return newMessages;
          });
          setIsProcessingFn(false);
        }, 500);
      }
    };

    updateStage(0);
  }, [clearBuildTimeout]);

  useEffect(() => {
    const initialMessages: Message[] = [
      { role: 'user', content: initialPrompt, timestamp: new Date() },
      { role: 'assistant', content: '', timestamp: new Date(), isBuilding: true, buildStage: 'initializing' },
    ];
    setMessages(initialMessages);
    setBuildStage('initializing');
    stageStartRef.current = new Date();
    setIsProcessing(true);

    runBuildSimulation(setMessages, setBuildStage, setPreviewUrl, setIsProcessing);

    return () => clearBuildTimeout();
  }, [initialPrompt, runBuildSimulation, clearBuildTimeout]);

  const handleSendMessage = useCallback((content: string) => {
    if (!content.trim() || isProcessing) return;

    clearBuildTimeout();

    setMessages(prev => [
      ...prev,
      { role: 'user', content: content.trim(), timestamp: new Date() },
      { role: 'assistant', content: '', timestamp: new Date(), isBuilding: true, buildStage: 'initializing' },
    ]);

    setIsProcessing(true);
    setBuildStage('initializing');

    runBuildSimulation(setMessages, setBuildStage, setPreviewUrl, setIsProcessing);
  }, [isProcessing, clearBuildTimeout, runBuildSimulation]);

  return (
    <div className="building-workspace">
      <BuildGlobalHeader
        onNavigateHome={handleNavigateHome}
        onNavigateProjects={handleNavigateProjects}
        onNavigateResources={handleNavigateResources}
        onNavigateCommunity={handleNavigateCommunity}
        onOpenGitHub={handleOpenGitHub}
        onOpenSettings={handleOpenSettings}
      />

      <ProjectContextBar
        projectName={displayName}
        branch={currentBranch}
        onBranchChange={handleBranchChange}
        onSync={handleSync}
        onSettings={handleOpenSettings}
        isSyncing={isSyncing}
        lastSync={lastSync}
        availableBranches={AVAILABLE_BRANCHES}
      />

      <div className="building-body">
        <aside className="building-chat-panel">
          <BuildingChatPane
            messages={messages}
            buildStage={buildStage}
            isProcessing={isProcessing}
            onSend={handleSendMessage}
          />
        </aside>

        <div className="resizer-vertical" />

        <main className="building-preview-panel">
          <BuildingPreviewPane
            buildStage={buildStage}
            previewUrl={previewUrl}
            projectName={displayName}
          />
        </main>

        {showRightToolbar && (
          <>
            <div className="resizer-vertical toolbar-resizer" />
            <aside className="building-right-toolbar">
              <BuildingVerticalToolbar
                activeTool={activeRightTool}
                onToolChange={setActiveRightTool}
                buildStage={buildStage}
              />
            </aside>
          </>
        )}
      </div>
    </div>
  );
}

export default BuildingWorkspace;