import { ChevronsUpDown, Keyboard, LogOut, Settings, Sparkles } from 'lucide-react';
import { usePopover } from './usePopover';

export function UserMenu({ collapsed, onOpenSettings }: { collapsed: boolean; onOpenSettings: () => void }) {
  const menu = usePopover();

  return (
    <div className="sb-user-wrap" ref={menu.ref}>
      <button className={`hl-user sb-user${menu.open ? ' open' : ''}`} onClick={() => menu.setOpen((o) => !o)} data-testid="sb-user-btn" title="Conta">
        <span className="hl-user-av">N</span>
        <span className="sb-user-meta sb-hide">
          <span className="hl-user-name">Nakor</span>
          <span className="sb-user-plan">Plano Pro</span>
        </span>
        <ChevronsUpDown size={14} className="sb-user-chev sb-hide" />
      </button>
      {menu.open && (
        <div className={`sb-menu sb-menu-up${collapsed ? ' side' : ''}`} role="menu" data-testid="sb-user-menu">
          <div className="sb-menu-head">
            <strong>Nakor</strong>
            <span>nakor@hall.dev</span>
          </div>
          <button role="menuitem" onClick={() => { menu.setOpen(false); onOpenSettings(); }} data-testid="sb-user-settings"><Settings size={13} /> Configurações</button>
          <button role="menuitem" onClick={() => menu.setOpen(false)} data-testid="sb-user-upgrade"><Sparkles size={13} /> Plano e uso</button>
          <button role="menuitem" onClick={() => menu.setOpen(false)} data-testid="sb-user-shortcuts">
            <Keyboard size={13} /> Atalhos <kbd className="sb-kbd">Ctrl K</kbd>
          </button>
          <div className="sb-menu-divider" />
          <button role="menuitem" className="danger" onClick={() => menu.setOpen(false)} data-testid="sb-user-logout"><LogOut size={13} /> Sair</button>
        </div>
      )}
    </div>
  );
}
