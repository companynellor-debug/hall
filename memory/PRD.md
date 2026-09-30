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
- [2026-06] Ajustes de UI na home:
  - Grain (textura áspera) confinado ao fundo via máscara radial no canvas (`Background.tsx`) — não aparece mais atrás do campo de chat, do elemento 3D, do título nem da órbita.
  - Botão de import agora exibe o ícone do GitHub (`ImportGithub.tsx`); corrigido bug de padding herdado que colapsava o SVG para 0px de largura.
  - Adicionado botão "+" (liquid glass) antes do botão de 3 pontinhos no composer (`HallHero.tsx`).
  - Ícones do menu lateral maiores (22px) com brilho de destaque vermelho em liquid glass no hover.
- [2026-06] Rodada 2 de UI:
  - Logo: adicionada a imagem do coelhinho pixel (`assets/hall-logo.png`, fundo branco removido para transparente); topo agora mostra só a logo (removidos ícone de raio + texto "HALL").
  - Ícone do GitHub trocado pela logo oficial (octocat preenchido) em `Icon.tsx`.
  - Efeito "resina/liquid glass" adicionado a todos os botões `.fluid-glass` via reflexo especular (`::before`).
  - Modal de importar repositório redesenhado estilo Emergent (glass, backdrop blur, badge do GitHub, input glassy maior).
  - Ícone de configurações (engrenagem) corrigido — path estava quebrado.
  - Placeholder do composer suavizado (opacity 0.45, cor muted, peso 400) para não parecer digitação real.
  - Campo do chat redimensionado estilo Lovable (max-width 768px, min-height 120px) mantendo o formato.

## Backlog (a definir com o usuário)
- P1: Corrigir bugs (a especificar)
- P1: Adicionar novas funcionalidades (a especificar)
- P2: Ligar backend real / persistência se necessário
