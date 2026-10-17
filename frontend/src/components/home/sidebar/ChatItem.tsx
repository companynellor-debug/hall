import { FolderInput, MessageSquare, MoreHorizontal, Pencil, Pin, PinOff, Trash2, CornerUpLeft } from 'lucide-react';
import type { Chat, Folder, SidebarStore } from './useSidebarStore';
import { usePopover } from './usePopover';
import { InlineEdit } from './InlineEdit';

interface Props {
  chat: Chat;
  folders: Folder[];
  store: SidebarStore;
  editing: boolean;
  setEditing: (id: string | null) => void;
  onOpen: (chat: Chat) => void;
}

export function ChatItem({ chat, folders, store, editing, setEditing, onOpen }: Props) {
  const menu = usePopover();
  const act = (fn: () => void) => () => {
    fn();
    menu.setOpen(false);
  };

  return (
    <div className={`sb-item${menu.open ? ' menu-open' : ''}`} ref={menu.ref} data-testid={`sb-chat-${chat.id}`}>
      <button className="sb-item-main" onClick={() => !editing && onOpen(chat)} title={chat.prompt} data-testid={`sb-chat-open-${chat.id}`}>
        {chat.pinned ? <Pin size={13} className="sb-item-ic pinned" /> : <MessageSquare size={13} className="sb-item-ic" />}
        {editing ? (
          <InlineEdit
            value={chat.title}
            testId={`sb-chat-rename-input-${chat.id}`}
            onCommit={(title) => {
              store.patchChat(chat.id, { title });
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <span className="sb-item-label">{chat.title}</span>
        )}
      </button>
      <button className="sb-item-more" aria-label="Opções do chat" onClick={() => menu.setOpen((o) => !o)} data-testid={`sb-chat-menu-${chat.id}`}>
        <MoreHorizontal size={14} />
      </button>
      {menu.open && (
        <div className="sb-menu" role="menu">
          <button role="menuitem" onClick={act(() => setEditing(chat.id))} data-testid="sb-menu-rename"><Pencil size={13} /> Renomear</button>
          <button role="menuitem" onClick={act(() => store.patchChat(chat.id, { pinned: !chat.pinned }))} data-testid="sb-menu-pin">
            {chat.pinned ? <><PinOff size={13} /> Desafixar</> : <><Pin size={13} /> Fixar no topo</>}
          </button>
          {(folders.length > 0 || chat.folderId) && <div className="sb-menu-label">Mover para</div>}
          {folders.filter((f) => f.id !== chat.folderId).map((f) => (
            <button key={f.id} role="menuitem" onClick={act(() => store.patchChat(chat.id, { folderId: f.id }))} data-testid={`sb-menu-move-${f.id}`}>
              <FolderInput size={13} /> {f.name}
            </button>
          ))}
          {chat.folderId && (
            <button role="menuitem" onClick={act(() => store.patchChat(chat.id, { folderId: null }))} data-testid="sb-menu-move-root">
              <CornerUpLeft size={13} /> Tirar da pasta
            </button>
          )}
          <div className="sb-menu-divider" />
          <button role="menuitem" className="danger" onClick={act(() => store.removeChat(chat.id))} data-testid="sb-menu-delete"><Trash2 size={13} /> Excluir</button>
        </div>
      )}
    </div>
  );
}
