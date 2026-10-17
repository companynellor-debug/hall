import { useEffect, useMemo, useRef, useState } from 'react';
import { FolderPlus, MessageSquarePlus, PanelLeftClose, PanelLeftOpen, Search, X } from 'lucide-react';
import hallLogo from '../../../assets/hall-mascot.png';
import { isToday, type Chat, type SidebarStore } from './useSidebarStore';
import { ChatItem } from './ChatItem';
import { FolderItem } from './FolderItem';
import { UserMenu } from './UserMenu';
import './sidebar.css';

interface Props {
  store: SidebarStore;
  onNewChat: () => void;
  onOpenChat: (chat: Chat) => void;
  onOpenSettings: () => void;
}

export function HomeSidebar({ store, onNewChat, onOpenChat, onOpenSettings }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('hall.sidebar.collapsed') === '1');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => localStorage.setItem('hall.sidebar.collapsed', collapsed ? '1' : '0'), [collapsed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCollapsed(false);
        requestAnimationFrame(() => searchRef.current?.focus());
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const q = search.trim().toLowerCase();
  const visible = useMemo(
    () => store.chats.filter((c) => !q || c.title.toLowerCase().includes(q) || c.prompt.toLowerCase().includes(q)),
    [store.chats, q],
  );
  const loose = visible.filter((c) => !c.folderId);
  const groups = [
    { label: 'Fixados', items: loose.filter((c) => c.pinned) },
    { label: 'Hoje', items: loose.filter((c) => !c.pinned && isToday(c.createdAt)) },
    { label: 'Anteriores', items: loose.filter((c) => !c.pinned && !isToday(c.createdAt)) },
  ].filter((g) => g.items.length);
  const folders = store.folders.filter((f) => !q || visible.some((c) => c.folderId === f.id) || f.name.toLowerCase().includes(q));

  const renderChat = (c: Chat) => (
    <ChatItem key={c.id} chat={c} folders={store.folders} store={store} editing={editing === c.id} setEditing={setEditing} onOpen={onOpenChat} />
  );

  const expandAndFocus = () => {
    setCollapsed(false);
    requestAnimationFrame(() => searchRef.current?.focus());
  };

  return (
    <aside className={`hl-side sb${collapsed ? ' collapsed' : ''}`} data-testid="home-sidebar">
      <div className="hl-brand">
        <button className="sb-logo-btn" onClick={onNewChat} title="Início" data-testid="sb-logo-btn">
          <img src={hallLogo} alt="HALL" className="hl-brand-logo" />
        </button>
        <button className="hl-side-collapse sb-collapse" onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'} title={collapsed ? 'Expandir menu' : 'Recolher menu'} data-testid="sb-collapse-btn">
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
        </button>
      </div>

      {collapsed ? (
        <div className="sb-rail">
          <button className="sb-rail-btn" onClick={expandAndFocus} title="Buscar (Ctrl K)" data-testid="sb-rail-search"><Search size={17} /></button>
          <button className="sb-rail-btn dark" onClick={onNewChat} title="Novo chat" data-testid="sb-rail-new-chat"><MessageSquarePlus size={17} /></button>
          <button className="sb-rail-btn" onClick={() => { setCollapsed(false); setEditing(store.addFolder()); }} title="Nova pasta" data-testid="sb-rail-new-folder"><FolderPlus size={17} /></button>
        </div>
      ) : (
        <>
          <label className="hl-search sb-search">
            <Search size={14} />
            <input ref={searchRef} type="text" placeholder="Buscar chats" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Escape' && setSearch('')} data-testid="sb-search-input" />
            {search ? (
              <button className="sb-search-clear" onClick={() => setSearch('')} aria-label="Limpar busca" data-testid="sb-search-clear"><X size={12} /></button>
            ) : (
              <kbd className="sb-kbd">Ctrl K</kbd>
            )}
          </label>

          <button className="hl-new-chat sb-new-chat" onClick={onNewChat} data-testid="sb-new-chat-btn">
            <MessageSquarePlus size={15} />
            Novo chat
          </button>

          <div className="sb-scroll">
            <div className="hl-section">
              <span className="hl-section-label">Pastas</span>
              <button className="hl-section-add" aria-label="Nova pasta" title="Nova pasta" onClick={() => setEditing(store.addFolder())} data-testid="sb-new-folder-btn">
                <FolderPlus size={12} />
              </button>
            </div>
            {folders.length === 0 && <p className="hl-empty">{q ? 'Nenhuma pasta encontrada' : 'Crie pastas para organizar'}</p>}
            {folders.map((f) => {
              const items = visible.filter((c) => c.folderId === f.id);
              return (
                <FolderItem key={f.id} folder={f} count={items.length} store={store} editing={editing === f.id} setEditing={setEditing} forceOpen={!!q}>
                  {items.map(renderChat)}
                </FolderItem>
              );
            })}

            <div className="hl-section">
              <span className="hl-section-label">Chats</span>
              <button className="hl-section-add" aria-label="Novo chat" title="Novo chat" onClick={onNewChat} data-testid="sb-section-new-chat">
                <MessageSquarePlus size={12} />
              </button>
            </div>
            {groups.length === 0 && (
              <p className="hl-empty" data-testid="sb-empty">{q ? `Nada encontrado para "${search}"` : 'Nenhum chat ainda'}</p>
            )}
            {groups.map((g) => (
              <div key={g.label} className="sb-group">
                <span className="sb-group-label">{g.label}</span>
                {g.items.map(renderChat)}
              </div>
            ))}
          </div>
        </>
      )}

      <UserMenu collapsed={collapsed} onOpenSettings={onOpenSettings} />
    </aside>
  );
}
