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
- [2026-06] Rodada 3 de UI:
  - Logo animada: coelhinho com micro-animação de "pulo/balanço" (`@keyframes hallHop`), pausa no hover.
  - Fluxo de import estilo Emergent (`ImportGithub.tsx`): passo 1 "Conectar conta do GitHub" → passo 2 lista de repositórios com busca, badge público/privado, linguagem, stars e data. Conexão e lista de repos são **MOCKADAS** (sem OAuth real do GitHub); inclui fallback de URL manual.
  - Header (lado direito) redesenhado: seletor de modelo virou pill de vidro e avatar com anel/gradiente premium.
  - Otimização responsiva: breakpoints tablet (≤1024), mobile (≤768), telefones pequenos (≤420) e landscape; footer do composer em linha única no mobile, `home-main` rolável, globo em órbita escalado; sem overflow horizontal (390=390).

## Backlog (a definir com o usuário)
- P1: Corrigir bugs (a especificar)
- P1: Adicionar novas funcionalidades (a especificar)
- P2: Ligar backend real / persistência se necessário

- [2026-06] Bug fix: elemento wireframe (esfera) do topo estava cortado em mobile/tablet (tamanho fixo s=50 num container que encolhe). Corrigido tornando o raio proporcional ao container em wireframe-forms.tsx (initSphere + rebuild no resize). Verificado pelo testing_agent (5 viewports, 100% sem corte). Também corrigido overflow horizontal de 64px (home-main tinha width:100% + margin-left:64px) -> width calc(100%-64px); overflow agora 0 em 1920/820/390.
## [2026-06] Project Settings screen (frontend-only)
- Nova view `settings` em `App.tsx` (routing por estado: home | workspace | settings), mantendo o contexto do projeto. Acessível via botão "Configurações" do workspace (`ws-settings-btn`); "Abrir projeto" retorna ao workspace.
- Página `components/settings/ProjectSettings.tsx`: header global HALL, breadcrumb (Projetos › Projeto › Configurações), heading (avatar/nome/badge/subtítulo/Abrir projeto/⋯), save bar (Descartar/Salvar com dirty-state via JSON compare), sidebar + conteúdo.
- Sidebar (`SettingsSidebar.tsx`) com 10 seções + indicador vermelho à esquerda no ativo (sem quadrado vermelho atrás do ícone). Ícones lucide-react + Icon github.
- Seções (`sections.tsx`): Overview (Project Overview 4 campos, Agent Responsibilities, Project Health, Connected Providers, Integrations), Models & Agents, GitHub, Integrations, Security, Design, Deploy, Environment, Logs, Advanced (Danger Zone com diálogo de confirmação). Tudo MOCK (sem backend/API/OAuth, conforme pedido).
- Primitivos reutilizáveis em `ui.tsx` (SettingsCard, StatusBadge, Field, Input, Textarea, Select, Toggle, Btn). CSS em `settings.css`.
- Verificado pelo testing_agent: 100% (13/13 critérios). tsc + oxlint sem erros.

## 2026-06 — Bug fix: Project Settings tela preta
- Corrigido erro de ordem de hooks em ProjectSettings.tsx (useCallback após early returns)
- Passado prop `settings` faltante para as seções (crash em `providers`)
- useProjectSettings: upsertEnvVar/deleteEnvVar agora usam wrappers corretos (ZodError) e `settings` expõe o draft
- Testado: iteration_3 (13/13 PASS) — dados ainda MOCKADOS (mockProjectSettingsRepository)

## 2026-06 — Troca de logos
- Home: logo completa "HALL — Build without limits" (`assets/hall-logo-full.png`, fundo transparente) acima da saudação.
- Menu lateral da home + topbar do workspace/configurações: mascote blob preto (`assets/hall-mascot.png`), texto "HALL" removido.
- `public/assets/hall/hall-idle.png` (faltava) criado com o novo mascote.

## 2026-06 — Intro animada
- `components/home/IntroSplash.tsx` (motion/react): logo grande entra em 3D (rotateX/Y + blur + scale), depois zoom no olho direito (transform-origin 19.8% 53%) que vira "portal" revelando a home; ~3s, clique pula para o zoom, respeita prefers-reduced-motion. Montado em `App.tsx` (estado showIntro).
- [2026-06] Logo da home com flutuação contínua sutil (CSS keyframes hlLogoFloat, 6s, só transform; desliga com prefers-reduced-motion).

## 2026-06 — Menu lateral da home funcional (frontend, localStorage)
- `components/home/sidebar/*`: HomeSidebar, ChatItem, FolderItem, UserMenu, InlineEdit, usePopover, useSidebarStore (localStorage `hall.sidebar.v1`, seed com 3 chats + pasta "Clientes").
- Recolher/expandir (rail de ícones, persistido), busca com Ctrl+K/limpar/Esc, Novo chat, pastas (criar/renomear inline/excluir/abrir-fechar animado, contador), chats agrupados Fixados/Hoje/Anteriores com menu ⋯ (renomear, fixar, mover para pasta, tirar da pasta, excluir), enviar prompt cria chat, clicar no chat abre o workspace, menu da conta (Configurações abre settings; Plano/Atalhos/Sair são visuais).
- Correções do testing_agent (iteration_4): chat criado pelo composer agora persiste; z-index do menu ⋯; menu dentro de pasta não corta; espaço no rename da pasta não fecha. Mobile (≤760px): botão de menu no topo abre o sidebar como gaveta com backdrop.

## 2026-06 — Settings providers + workspace funcional
- Providers: catálogo `features/project-settings/providerCatalog.ts` (12 provedores + Personalizado compatível OpenAI). `ProvidersPanel` + `AddProviderModal`: adicionar quantos quiser (busca, chave mascarada c/ mostrar/ocultar, URL base p/ Ollama/custom, modelos custom), trocar chave, testar conexão (simulado), remover, toast. Modelos aparecem nos agentes. MOCK (sem validação real de chave).
- Workspace: menu lateral recolhível (botão + barra/handle na borda, persistido `hall.ws.side`); prompt da home inicia o build automaticamente.
- Chat: sugestões, textarea auto-grow, anexos (chips), PLAN gera plano + "Executar plano", BUILD simula etapas, botão parar, copiar/gostei/não gostei/refazer, seletor de modelo, aba Tarefas com histórico.
- Preview: após build renderiza app gerado (iframe srcDoc, `features/preview/siteTemplate.ts`), versões com voltar/avançar, recarregar, abrir em nova aba (blob), dispositivos com moldura, aba Código mostra HTML com copiar. SIMULADO (sem LLM real).
