export type FileEdit = { path: string; add: number; del: number };

const FILE_RULES: [RegExp, string][] = [
  [/auth|login|senha/i, 'src/features/auth/LoginForm.tsx'],
  [/pagament|stripe|checkout|pix/i, 'src/features/billing/Checkout.tsx'],
  [/dashboard|painel|admin/i, 'src/pages/Dashboard.tsx'],
  [/chat|mensag/i, 'src/features/chat/ChatRoom.tsx'],
  [/api|rest|endpoint/i, 'server/routes/api.ts'],
  [/blog|seo/i, 'src/pages/Blog.tsx'],
];

const rnd = (min: number, max: number) => min + Math.round(Math.random() * (max - min));

export function filesFor(prompt: string): FileEdit[] {
  const extra = FILE_RULES.filter(([re]) => re.test(prompt)).map(([, p]) => p);
  return ['src/App.tsx', ...extra.slice(0, 2), 'src/components/Hero.tsx', 'src/index.css'].map((path) => ({
    path, add: rnd(8, 120), del: rnd(0, 18),
  }));
}

export function planFor(prompt: string): string[] {
  const files = filesFor(prompt);
  return [
    'Entender o objetivo e o público do app',
    `Criar a estrutura de páginas (${files.length} arquivos)`,
    /auth|login/i.test(prompt) ? 'Adicionar login e proteção de rotas' : 'Montar seções principais e navegação',
    'Aplicar visual responsivo e micro-animações',
    'Rodar o build e atualizar o preview',
  ];
}

export const SUGGESTIONS = [
  'Crie uma landing page moderna com hero, recursos e preços',
  'Adicione login com e-mail e senha',
  'Monte um painel com gráficos e tabela de clientes',
  'Deixe o visual escuro com acento vermelho',
];

export const MODELS = ['Auto', 'Claude Sonnet 4.5', 'GPT-5.2', 'Gemini 3 Pro'];
