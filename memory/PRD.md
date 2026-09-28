# HALL — PRD

## Origem
Repositório importado: https://github.com/companynellor-debug/hall.git (público)
Data de importação: 2026-06 (28/09 no histórico do repo)

## Stack
- Frontend: Vite 8 + React 19 + TypeScript 6 (CSS puro, ~1454 linhas em `src/index.css`; Tailwind listado mas não usado de fato)
- Bibliotecas: @monaco-editor/react, monaco-editor, lucide-react
- Backend: FastAPI mínimo (placeholder em `/app/backend/server.py`) — o projeto original é frontend-only
- DB: MongoDB disponível (não usado ainda)

## Estrutura (após adaptação ao ambiente Emergent)
- `/app/frontend/` — projeto Vite (movido da raiz do repo)
  - `start` script: `vite --host 0.0.0.0 --port 3000`
  - `vite.config.ts` configurado com host/porta/allowedHosts/HMR wss para o proxy de preview
- `/app/backend/` — FastAPI placeholder com `/api/` e `/api/health`

## O que é o app
UI estilo "builder de apps" (clone visual tipo Lovable/Emergent):
- Home: "What are you building today?" com composer de projeto e globo de círculos orbitando (provedores/modelos)
- Componentes de workspace: EditorPane (Monaco), FileTree, ChatPane, ConsolePane, PreviewPane, StatusBar, MenuBar, Sidebar, Resizer
- Home: HallHero, HomeHeader, HomeNavRail, RecentProjects, ProjectComposer, ImportGithub, Navbar

## Status atual (implementado)
- [2026-06] Repositório importado e adaptado ao ambiente; frontend rodando (Vite v8) na porta 3000, backend placeholder rodando na 8001. UI carrega corretamente.

## Backlog (a definir com o usuário)
- P1: Corrigir bugs (a especificar)
- P1: Adicionar novas funcionalidades (a especificar)
- P2: Ligar backend real / persistência se necessário
