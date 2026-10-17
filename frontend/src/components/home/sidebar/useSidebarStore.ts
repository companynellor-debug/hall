import { useCallback, useEffect, useState } from 'react';

export interface Chat {
  id: string;
  title: string;
  prompt: string;
  folderId: string | null;
  pinned: boolean;
  createdAt: number;
}

export interface Folder {
  id: string;
  name: string;
  open: boolean;
}

interface State {
  chats: Chat[];
  folders: Folder[];
}

const KEY = 'hall.sidebar.v1';
const uid = () => Math.random().toString(36).slice(2, 10);
const DAY = 86_400_000;

const SEED: State = {
  folders: [{ id: 'f-clientes', name: 'Clientes', open: true }],
  chats: [
    { id: 'c1', title: 'SaaS de gestão de clientes', prompt: 'Um SaaS para gerenciar meus clientes, com autenticação e painel moderno', folderId: 'f-clientes', pinned: false, createdAt: Date.now() - 2 * 3600_000 },
    { id: 'c2', title: 'Landing page da padaria', prompt: 'Landing page para uma padaria artesanal com cardápio e pedidos', folderId: null, pinned: true, createdAt: Date.now() - 5 * 3600_000 },
    { id: 'c3', title: 'API de pagamentos', prompt: 'Uma API REST de pagamentos com autenticação JWT e documentação', folderId: null, pinned: false, createdAt: Date.now() - 3 * DAY },
  ],
};

const load = (): State => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as State) : SEED;
  } catch {
    return SEED;
  }
};

export const titleFrom = (prompt: string) => {
  const t = prompt.replace(/^ex\.?:\s*/i, '').trim();
  return t.length > 38 ? `${t.slice(0, 38).trimEnd()}…` : t || 'Novo chat';
};

export function useSidebarStore() {
  const [state, setState] = useState<State>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const patchChat = useCallback((id: string, patch: Partial<Chat>) => {
    setState((s) => ({ ...s, chats: s.chats.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
  }, []);

  const patchFolder = useCallback((id: string, patch: Partial<Folder>) => {
    setState((s) => ({ ...s, folders: s.folders.map((f) => (f.id === id ? { ...f, ...patch } : f)) }));
  }, []);

  const addChat = useCallback((prompt: string) => {
    const chat: Chat = { id: uid(), title: titleFrom(prompt), prompt, folderId: null, pinned: false, createdAt: Date.now() };
    setState((s) => ({ ...s, chats: [chat, ...s.chats] }));
    return chat;
  }, []);

  const removeChat = useCallback((id: string) => {
    setState((s) => ({ ...s, chats: s.chats.filter((c) => c.id !== id) }));
  }, []);

  const addFolder = useCallback(() => {
    const folder: Folder = { id: uid(), name: 'Nova pasta', open: true };
    setState((s) => ({ ...s, folders: [...s.folders, folder] }));
    return folder.id;
  }, []);

  const removeFolder = useCallback((id: string) => {
    setState((s) => ({
      folders: s.folders.filter((f) => f.id !== id),
      chats: s.chats.map((c) => (c.folderId === id ? { ...c, folderId: null } : c)),
    }));
  }, []);

  return { ...state, patchChat, patchFolder, addChat, removeChat, addFolder, removeFolder };
}

export type SidebarStore = ReturnType<typeof useSidebarStore>;

export const isToday = (ts: number) => new Date(ts).toDateString() === new Date().toDateString();
