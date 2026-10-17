import type { ReactNode } from 'react';
import { ChevronRight, Folder as FolderIc, FolderOpen, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { Folder, SidebarStore } from './useSidebarStore';
import { usePopover } from './usePopover';
import { InlineEdit } from './InlineEdit';

interface Props {
  folder: Folder;
  count: number;
  store: SidebarStore;
  editing: boolean;
  setEditing: (id: string | null) => void;
  forceOpen: boolean;
  children: ReactNode;
}

export function FolderItem({ folder, count, store, editing, setEditing, forceOpen, children }: Props) {
  const menu = usePopover();
  const open = folder.open || forceOpen;

  return (
    <div className="sb-folder" data-testid={`sb-folder-${folder.id}`}>
      <div className={`sb-item${menu.open ? ' menu-open' : ''}`} ref={menu.ref}>
        <button className="sb-item-main" onClick={() => store.patchFolder(folder.id, { open: !folder.open })} data-testid={`sb-folder-toggle-${folder.id}`}>
          <ChevronRight size={12} className={`sb-chev${open ? ' open' : ''}`} />
          {open ? <FolderOpen size={13} className="sb-item-ic" /> : <FolderIc size={13} className="sb-item-ic" />}
          {editing ? (
            <InlineEdit
              value={folder.name}
              testId={`sb-folder-rename-input-${folder.id}`}
              onCommit={(name) => {
                store.patchFolder(folder.id, { name });
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <span className="sb-item-label">{folder.name}</span>
          )}
          <span className="sb-count">{count}</span>
        </button>
        <button className="sb-item-more" aria-label="Opções da pasta" onClick={() => menu.setOpen((o) => !o)} data-testid={`sb-folder-menu-${folder.id}`}>
          <MoreHorizontal size={14} />
        </button>
        {menu.open && (
          <div className="sb-menu" role="menu">
            <button role="menuitem" onClick={() => { setEditing(folder.id); menu.setOpen(false); }} data-testid="sb-folder-menu-rename"><Pencil size={13} /> Renomear</button>
            <div className="sb-menu-divider" />
            <button role="menuitem" className="danger" onClick={() => store.removeFolder(folder.id)} data-testid="sb-folder-menu-delete"><Trash2 size={13} /> Excluir pasta</button>
          </div>
        )}
      </div>
      <div className={`sb-folder-body${open ? ' open' : ''}`}>
        <div className="sb-folder-inner">
          {count === 0 ? <p className="sb-folder-empty">Pasta vazia — mova chats pelo menu ⋯</p> : children}
        </div>
      </div>
    </div>
  );
}
