import { useState, useCallback } from 'react';
import { MenuBar } from './MenuBar';
import { Sidebar } from './Sidebar';
import { EditorPane } from './EditorPane';
import { ChatPane } from './ChatPane';
import { PreviewPane } from './PreviewPane';
import { ConsolePane } from './ConsolePane';
import { StatusBar } from './StatusBar';
import { type TreeApi } from './FileTree';
import { fileTree } from '../data/workspace';
import { type RailId } from '../data/workspace';

export function WorkspaceLayout() {
  const [activeRail, setActiveRail] = useState<RailId>('explorer');
  const [editorTabs, setEditorTabs] = useState<string[]>(['src/App.tsx', 'src/components/ChatPane.tsx']);
  const [activePath, setActivePath] = useState('src/App.tsx');
  const [sidebarWidth] = useState(280);

  const handleFileOpen = useCallback((path: string) => {
    setEditorTabs((prev) => prev.includes(path) ? prev : [...prev, path]);
    setActivePath(path);
    setActiveRail('explorer');
  }, []);

  const handleTabClose = useCallback((path: string) => {
    setEditorTabs((prev) => prev.filter((p) => p !== path));
    setActivePath((current) => {
      if (current !== path) return current;
      const remaining = editorTabs.filter((p) => p !== path);
      return remaining[remaining.length - 1] || '';
    });
  }, [editorTabs]);

  const handleTabSelect = useCallback((path: string) => {
    setActivePath(path);
  }, []);

  const handleRailSelect = useCallback((id: RailId) => {
    setActiveRail(id);
  }, []);

  const treeApi: TreeApi = {
    root: fileTree,
    open: handleFileOpen,
  };

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();

    const handleMove = () => {};

    const handleUp = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  };

  return (
    <div className="workspace-layout">
      <header className="workspace-header">
        <MenuBar />
      </header>

      <div className="workspace-body">
        <aside className="workspace-sidebar" style={{ width: sidebarWidth }}>
          <Sidebar
            active={activeRail}
            onSelect={handleRailSelect}
            activePath={activePath}
            tree={treeApi}
            width={sidebarWidth}
          />
        </aside>

        <div className="workspace-main">
          <div className="editor-chat-preview">
            <section className="editor-region">
              <EditorPane
                tabs={editorTabs}
                activePath={activePath}
                onSelect={handleTabSelect}
                onClose={handleTabClose}
              />
            </section>

            <div className="resizer-vertical" onMouseDown={startResize} />

            <aside className="chat-preview-region">
              <div className="chat-preview-tabs">
                <button className="tab-btn active">Chat</button>
                <button className="tab-btn">Preview</button>
              </div>
              <div className="chat-preview-content">
                <ChatPane />
                <PreviewPane />
              </div>
            </aside>
          </div>

          <div className="resizer-horizontal" onMouseDown={startResize} />

          <section className="console-region">
            <ConsolePane />
          </section>
        </div>
      </div>

      <footer className="workspace-footer">
        <StatusBar />
      </footer>
    </div>
  );
}

export default WorkspaceLayout;