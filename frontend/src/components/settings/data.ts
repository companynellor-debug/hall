export type SectionId =
  | 'overview' | 'models' | 'github' | 'integrations' | 'security'
  | 'design' | 'deploy' | 'environment' | 'logs' | 'advanced';

export type AgentKey = 'coding' | 'design' | 'security' | 'review';

export interface AgentMeta {
  key: AgentKey;
  title: string;
  description: string;
}

/* Catálogo de agentes do produto (não é dado do projeto) */
export const AGENTS: AgentMeta[] = [
  { key: 'coding', title: 'Coding Agent', description: 'Implementação, refatoração e tarefas de engenharia.' },
  { key: 'design', title: 'Design Agent', description: 'UI/UX, prototipagem e design de interfaces.' },
  { key: 'security', title: 'Security Agent', description: 'Análise de vulnerabilidades e boas práticas.' },
  { key: 'review', title: 'Review Agent', description: 'Revisão de código, qualidade e documentação.' },
];

export interface SettingsForm {
  name: string;
  description: string;
  workspace: string;
  status: 'Ativo' | 'Pausado' | 'Arquivado';
  agents: Record<AgentKey, { model: string; active: boolean }>;
  security: { deps: boolean; env: boolean; deploy: boolean; confirm: boolean; scan: boolean };
  design: { theme: 'System' | 'Dark' | 'Light'; device: 'Desktop' | 'Tablet' | 'Mobile'; instructions: string };
  github: { repo: string; branch: string; autoSync: boolean };
  deploy: { provider: string; branch: string; url: string; autoDeploy: boolean };
}

/* Formulário inicial vazio — sem dados fictícios */
export function makeDefaultForm(projectName: string): SettingsForm {
  return {
    name: projectName,
    description: '',
    workspace: 'Pessoal',
    status: 'Ativo',
    agents: {
      coding: { model: '', active: false },
      design: { model: '', active: false },
      security: { model: '', active: false },
      review: { model: '', active: false },
    },
    security: { deps: false, env: false, deploy: false, confirm: false, scan: false },
    design: { theme: 'System', device: 'Desktop', instructions: '' },
    github: { repo: '', branch: 'main', autoSync: false },
    deploy: { provider: '', branch: '', url: '', autoDeploy: false },
  };
}

export const WORKSPACES = ['Pessoal'];
export const STATUSES: SettingsForm['status'][] = ['Ativo', 'Pausado', 'Arquivado'];

/* Catálogo de integrações disponíveis no produto */
export type IntegrationCategory =
  | 'ai-ml'
  | 'databases'
  | 'devops'
  | 'communication'
  | 'payments'
  | 'storage'
  | 'analytics'
  | 'auth'
  | 'email'
  | 'search'
  | 'monitoring'
  | 'automation'
  | 'cms'
  | 'ecommerce'
  | 'social';

export interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: IntegrationCategory;
  popular?: boolean;
  beta?: boolean;
}

export const INTEGRATION_CATEGORIES: { key: IntegrationCategory; label: string; description: string; icon: string }[] = [
  { key: 'ai-ml', label: 'AI & ML', description: 'Modelos, embeddings, LLMs e ferramentas de IA', icon: 'brain' },
  { key: 'databases', label: 'Databases', description: 'Bancos de dados SQL, NoSQL, vetoriais e cache', icon: 'database' },
  { key: 'devops', label: 'DevOps & Cloud', description: 'Deploy, CI/CD, containers e infraestrutura', icon: 'server' },
  { key: 'communication', label: 'Communication', description: 'Chat, vídeo, SMS, push e notificações', icon: 'message-square' },
  { key: 'payments', label: 'Payments', description: 'Processamento de pagamentos, assinaturas e faturamento', icon: 'credit-card' },
  { key: 'storage', label: 'Storage & Files', description: 'Armazenamento de objetos, CDN e gerenciamento de arquivos', icon: 'hard-drive' },
  { key: 'analytics', label: 'Analytics', description: 'Tracking, eventos, BI e product analytics', icon: 'bar-chart' },
  { key: 'auth', label: 'Auth & Identity', description: 'Autenticação, autorização e gerenciamento de usuários', icon: 'shield-check' },
  { key: 'email', label: 'Email', description: 'Email transacional, marketing e deliverability', icon: 'mail' },
  { key: 'search', label: 'Search', description: 'Busca full-text, vetorial e descoberta', icon: 'search' },
  { key: 'monitoring', label: 'Monitoring', description: 'Observabilidade, logs, tracing e alertas', icon: 'activity' },
  { key: 'automation', label: 'Automation', description: 'Workflows, webhooks e integrações sem código', icon: 'workflow' },
  { key: 'cms', label: 'CMS & Content', description: 'Headless CMS, conteúdo e gestão de assets', icon: 'file-text' },
  { key: 'ecommerce', label: 'E-commerce', description: 'Lojas, carrinho, inventário e pedidos', icon: 'shopping-cart' },
  { key: 'social', label: 'Social & Marketing', description: 'Redes sociais, ads, CRM e growth', icon: 'share-2' },
];

export const INTEGRATIONS: IntegrationItem[] = [
  // AI & ML
  { id: 'openai', name: 'OpenAI', description: 'GPT-4, embeddings, DALL·E, Whisper e fine-tuning.', icon: 'openai', category: 'ai-ml', popular: true },
  { id: 'anthropic', name: 'Anthropic', description: 'Claude 3.5 Sonnet, Haiku, Opus para raciocínio avançado.', icon: 'anthropic', category: 'ai-ml', popular: true },
  { id: 'google-ai', name: 'Google AI (Gemini)', description: 'Gemini 1.5 Pro/Flash, Vertex AI e modelos multimodais.', icon: 'google', category: 'ai-ml', popular: true },
  { id: 'mistral', name: 'Mistral AI', description: 'Modelos open-weight de alta performance (Mixtral, Codestral).', icon: 'mistral', category: 'ai-ml' },
  { id: 'cohere', name: 'Cohere', description: 'Embeddings, rerank e modelos de linguagem enterprise.', icon: 'cohere', category: 'ai-ml' },
  { id: 'huggingface', name: 'Hugging Face', description: 'Hub de modelos, Inference API, Spaces e datasets.', icon: 'huggingface', category: 'ai-ml', popular: true },
  { id: 'replicate', name: 'Replicate', description: 'Run models via API: Stable Diffusion, Llama, Whisper e mais.', icon: 'replicate', category: 'ai-ml' },
  { id: 'together', name: 'Together AI', description: 'Inferência rápida de modelos open-source (Llama, Mixtral).', icon: 'together', category: 'ai-ml' },
  { id: 'groq', name: 'Groq', description: 'Inferência ultra-rápida LPU para Llama, Mixtral, Gemma.', icon: 'groq', category: 'ai-ml', popular: true },
  { id: 'perplexity', name: 'Perplexity', description: 'Sonar API para busca com IA e citações em tempo real.', icon: 'perplexity', category: 'ai-ml' },
  { id: 'elevenlabs', name: 'ElevenLabs', description: 'TTS de alta qualidade, clonagem de voz e dubbing.', icon: 'elevenlabs', category: 'ai-ml', popular: true },
  { id: 'deepgram', name: 'Deepgram', description: 'STT/TTS em tempo real, diarização e modelos médicos.', icon: 'deepgram', category: 'ai-ml' },
  { id: 'assemblyai', name: 'AssemblyAI', description: 'Transcrição, sumarização, detecção de tópicos e PII.', icon: 'assemblyai', category: 'ai-ml' },
  { id: 'pinecone', name: 'Pinecone', description: 'Vector database serverless para RAG e busca semântica.', icon: 'pinecone', category: 'ai-ml', popular: true },
  { id: 'weaviate', name: 'Weaviate', description: 'Vector DB open-source com GraphQL e módulos de ML.', icon: 'weaviate', category: 'ai-ml' },
  { id: 'chromadb', name: 'Chroma', description: 'Vector database leve para aplicações LLM locais.', icon: 'chromadb', category: 'ai-ml' },
  { id: 'qdrant', name: 'Qdrant', description: 'Vector search engine com filtros payload e quantização.', icon: 'qdrant', category: 'ai-ml' },
  { id: 'langchain', name: 'LangChain', description: 'Framework para aplicações LLM: chains, agents, memory.', icon: 'langchain', category: 'ai-ml' },
  { id: 'llamaindex', name: 'LlamaIndex', description: 'Framework de dados para RAG e agentes baseados em contexto.', icon: 'llamaindex', category: 'ai-ml' },
  { id: 'higgsfield', name: 'Higgsfield', description: 'Geração de vídeo com IA para conteúdo e marketing.', icon: 'higgsfield', category: 'ai-ml', beta: true },
  { id: 'runway', name: 'Runway', description: 'Gen-3 Alpha, ferramentas de vídeo generativo e edição.', icon: 'runway', category: 'ai-ml' },
  { id: 'pika', name: 'Pika Labs', description: 'Geração de vídeo a partir de texto/imagem.', icon: 'pika', category: 'ai-ml', beta: true },
  { id: 'suno', name: 'Suno', description: 'Geração de música e áudio com IA.', icon: 'suno', category: 'ai-ml', beta: true },
  { id: 'midjourney', name: 'Midjourney', description: 'Geração de imagens artísticas via API (não oficial).', icon: 'midjourney', category: 'ai-ml' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', description: 'Banco relacional avançado, extensível e ACID.', icon: 'postgresql', category: 'databases', popular: true },
  { id: 'mysql', name: 'MySQL', description: 'Banco relacional popular, amplamente suportado.', icon: 'mysql', category: 'databases' },
  { id: 'supabase', name: 'Supabase', description: 'PostgreSQL + Auth + Realtime + Storage + Edge Functions.', icon: 'supabase', category: 'databases', popular: true },
  { id: 'neon', name: 'Neon', description: 'PostgreSQL serverless com branching e autoscaling.', icon: 'neon', category: 'databases', popular: true },
  { id: 'planetscale', name: 'PlanetScale', description: 'MySQL serverless com schema branching e deployments.', icon: 'planetscale', category: 'databases' },
  { id: 'turso', name: 'Turso (libSQL)', description: 'SQLite distribuído, edge-ready, multi-tenant.', icon: 'turso', category: 'databases' },
  { id: 'mongodb', name: 'MongoDB Atlas', description: 'Document database flexível, sharding nativo.', icon: 'mongodb', category: 'databases' },
  { id: 'redis', name: 'Redis', description: 'Cache, pub/sub, streams, vectores e rate limiting.', icon: 'redis', category: 'databases', popular: true },
  { id: 'upstash', name: 'Upstash', description: 'Redis & Kafka serverless, pay-per-request.', icon: 'upstash', category: 'databases' },
  { id: 'clickhouse', name: 'ClickHouse', description: 'OLAP columnar para analytics em tempo real.', icon: 'clickhouse', category: 'databases' },
  { id: 'timescaledb', name: 'TimescaleDB', description: 'PostgreSQL para time-series, IoT e analytics.', icon: 'timescaledb', category: 'databases' },
  { id: 'fauna', name: 'Fauna', description: 'Document-relacional serverless com GraphQL nativo.', icon: 'fauna', category: 'databases' },
  { id: 'surreal', name: 'SurrealDB', description: 'Multi-model: document, graph, vector, time-series.', icon: 'surrealdb', category: 'databases', beta: true },
  { id: 'sqlite', name: 'SQLite / Turso', description: 'Leve, embutido, ideal para edge e apps locais.', icon: 'sqlite', category: 'databases' },
  { id: 'airtable', name: 'Airtable', description: 'Spreadsheet-database híbrido com API e automações.', icon: 'airtable', category: 'databases' },
  { id: 'notion', name: 'Notion API', description: 'Banco de dados colaborativo, blocos e páginas.', icon: 'notion', category: 'databases' },

  // DevOps & Cloud
  { id: 'github', name: 'GitHub', description: 'Repositórios, Actions, Packages, Codespaces, Copilot.', icon: 'github', category: 'devops', popular: true },
  { id: 'gitlab', name: 'GitLab', description: 'DevSecOps completo: CI/CD, registry, security, wiki.', icon: 'gitlab', category: 'devops' },
  { id: 'bitbucket', name: 'Bitbucket', description: 'Git hosting com pipelines e integração Jira.', icon: 'bitbucket', category: 'devops' },
  { id: 'vercel', name: 'Vercel', description: 'Deploy frontend/serverless, Edge Functions, Analytics.', icon: 'vercel', category: 'devops', popular: true },
  { id: 'netlify', name: 'Netlify', description: 'Deploy, Edge Functions, Forms, Identity, Functions.', icon: 'netlify', category: 'devops' },
  { id: 'railway', name: 'Railway', description: 'Deploy containers, databases, cron jobs, observability.', icon: 'railway', category: 'devops', popular: true },
  { id: 'render', name: 'Render', description: 'Web services, databases, cron, static sites, private networking.', icon: 'render', category: 'devops' },
  { id: 'fly', name: 'Fly.io', description: 'VMs globais, Anycast, Machine API, volumes persistentes.', icon: 'fly', category: 'devops' },
  { id: 'aws', name: 'AWS', description: 'EC2, Lambda, RDS, S3, ECS, Bedrock, 200+ serviços.', icon: 'aws', category: 'devops' },
  { id: 'gcp', name: 'Google Cloud', description: 'Cloud Run, Cloud SQL, Vertex AI, Firestore, BigQuery.', icon: 'googlecloud', category: 'devops' },
  { id: 'azure', name: 'Microsoft Azure', description: 'App Service, Functions, Cosmos DB, AKS, OpenAI Service.', icon: 'azure', category: 'devops' },
  { id: 'cloudflare', name: 'Cloudflare', description: 'Workers, Pages, R2, D1, Vectorize, AI Gateway.', icon: 'cloudflare', category: 'devops', popular: true },
  { id: 'docker', name: 'Docker Hub', description: 'Registry de imagens, buildx, scout, subscriptions.', icon: 'docker', category: 'devops' },
  { id: 'kubernetes', name: 'Kubernetes', description: 'Orquestração de containers, Helm, Operators, CNI.', icon: 'kubernetes', category: 'devops' },
  { id: 'terraform', name: 'Terraform Cloud', description: 'IaC, workspaces, policy, drift detection, modules.', icon: 'terraform', category: 'devops' },
  { id: 'pulumi', name: 'Pulumi', description: 'IaC com linguagens reais (TS, Python, Go, C#).', icon: 'pulumi', category: 'devops' },
  { id: 'github-actions', name: 'GitHub Actions', description: 'CI/CD nativo, matrix, reusable workflows, OIDC.', icon: 'githubactions', category: 'devops' },
  { id: 'circleci', name: 'CircleCI', description: 'Pipelines rápidos, orbs, resource classes, insights.', icon: 'circleci', category: 'devops' },
  { id: 'jenkins', name: 'Jenkins', description: 'Automação extensível, pipelines declarativos, plugins.', icon: 'jenkins', category: 'devops' },
  { id: 'argo', name: 'Argo CD', description: 'GitOps continuous delivery para Kubernetes.', icon: 'argo', category: 'devops' },

  // Communication
  { id: 'slack', name: 'Slack', description: 'Canais, bots, workflows, Block Kit, huddles.', icon: 'slack', category: 'communication', popular: true },
  { id: 'discord', name: 'Discord', description: 'Bots, slash commands, webhooks, voice, threads.', icon: 'discord', category: 'communication', popular: true },
  { id: 'teams', name: 'Microsoft Teams', description: 'Bots, tabs, connectors, Graph API, meetings.', icon: 'microsoftteams', category: 'communication' },
  { id: 'twilio', name: 'Twilio', description: 'SMS, WhatsApp, Voice, Video, Verify, Conversations.', icon: 'twilio', category: 'communication', popular: true },
  { id: 'sendgrid', name: 'SendGrid (Twilio)', description: 'Email API, marketing, templates, deliverability.', icon: 'sendgrid', category: 'email' },
  { id: 'mailgun', name: 'Mailgun', description: 'Email transacional, validação, suppression lists.', icon: 'mailgun', category: 'email' },
  { id: 'postmark', name: 'Postmark', description: 'Email transacional rápido, templates, webhooks.', icon: 'postmark', category: 'email' },
  { id: 'resend', name: 'Resend', description: 'Email moderno para desenvolvedores, React Email, SDK.', icon: 'resend', category: 'email', popular: true },
  { id: 'pusher', name: 'Pusher', description: 'WebSockets gerenciados, presence, canais privados.', icon: 'pusher', category: 'communication' },
  { id: 'ably', name: 'Ably', description: 'Pub/sub em tempo real, presença, history, push.', icon: 'ably', category: 'communication' },
  { id: 'stream', name: 'Stream (GetStream)', description: 'Chat, feeds, video, moderation, React SDKs.', icon: 'getstream', category: 'communication' },
  { id: 'onesignal', name: 'OneSignal', description: 'Push mobile/web, email, SMS, in-app messaging.', icon: 'onesignal', category: 'communication' },
  { id: 'firebase-messaging', name: 'Firebase Cloud Messaging', description: 'Push gratuito para Android, iOS, Web.', icon: 'firebase', category: 'communication' },

  // Payments
  { id: 'stripe', name: 'Stripe', description: 'Pagamentos, Billing, Connect, Radar, Tax, Financial Connections.', icon: 'stripe', category: 'payments', popular: true },
  { id: 'paddle', name: 'Paddle', description: 'Merchant of Record, subscriptions, tax compliance global.', icon: 'paddle', category: 'payments' },
  { id: 'lemonsqueezy', name: 'Lemon Squeezy', description: 'MoR para SaaS digital, afiliados, license keys.', icon: 'lemonsqueezy', category: 'payments' },
  { id: 'asaas', name: 'Asaas', description: 'Pix, boleto, cartão, cobrança recorrente, split.', icon: 'asaas', category: 'payments', popular: true },
  { id: 'mercadopago', name: 'Mercado Pago', description: 'Checkout, Pix, parcelamento, split, point of sale.', icon: 'mercadopago', category: 'payments' },
  { id: 'paypal', name: 'PayPal / Braintree', description: 'PayPal, Venmo, cartões, crédito, Braintree gateway.', icon: 'paypal', category: 'payments' },
  { id: 'wise', name: 'Wise Platform', description: 'Transferências internacionais, multi-moeda, API banking.', icon: 'wise', category: 'payments' },
  { id: 'coinbase', name: 'Coinbase Commerce', description: 'Pagamentos crypto: USDC, BTC, ETH, Polygon, Base.', icon: 'coinbase', category: 'payments' },

  // Storage & Files
  { id: 'aws-s3', name: 'AWS S3', description: 'Object storage durável, versioning, lifecycle, CloudFront.', icon: 'amazons3', category: 'storage', popular: true },
  { id: 'cloudflare-r2', name: 'Cloudflare R2', description: 'S3-compatible, zero egress fees, Workers integration.', icon: 'cloudflare', category: 'storage', popular: true },
  { id: 'supabase-storage', name: 'Supabase Storage', description: 'S3-compatível, CDN, transformações de imagem, signed URLs.', icon: 'supabase', category: 'storage' },
  { id: 'vercel-blob', name: 'Vercel Blob', description: 'Storage serverless para Next.js, CDN global, SDK simples.', icon: 'vercel', category: 'storage' },
  { id: 'uploadthing', name: 'UploadThing', description: 'File uploads fáceis, ACL, callbacks, React hooks.', icon: 'uploadthing', category: 'storage' },
  { id: 'cloudinary', name: 'Cloudinary', description: 'Image/video management, transformações, AI, CDN.', icon: 'cloudinary', category: 'storage', popular: true },
  { id: 'imgix', name: 'imgix', description: 'Real-time image processing, CDN, auto-formats.', icon: 'imgix', category: 'storage' },
  { id: 'mux', name: 'Mux', description: 'Video API: upload, encoding, streaming, analytics.', icon: 'mux', category: 'storage' },
  { id: 'bunny', name: 'Bunny.net', description: 'CDN, storage, video streaming, edge rules, otimização.', icon: 'bunny', category: 'storage' },

  // Analytics
  { id: 'posthog', name: 'PostHog', description: 'Product analytics, feature flags, session replay, surveys.', icon: 'posthog', category: 'analytics', popular: true },
  { id: 'mixpanel', name: 'Mixpanel', description: 'Event analytics, funnels, retention, group analytics.', icon: 'mixpanel', category: 'analytics' },
  { id: 'amplitude', name: 'Amplitude', description: 'Product analytics, experimentation, session replay.', icon: 'amplitude', category: 'analytics' },
  { id: 'ga', name: 'Google Analytics 4', description: 'Web/app analytics, eventos, audiences, BigQuery export.', icon: 'googleanalytics', category: 'analytics' },
  { id: 'plausible', name: 'Plausible', description: 'Analytics privativo, leve, GDPR-friendly, open-source.', icon: 'plausibleanalytics', category: 'analytics' },
  { id: 'umami', name: 'Umami', description: 'Web analytics simples, auto-hospedado, privativo.', icon: 'umami', category: 'analytics' },
  { id: 'heap', name: 'Heap', description: 'Autocapture, retroactive analytics, data science layer.', icon: 'heap', category: 'analytics' },
  { id: 'rudderstack', name: 'RudderStack', description: 'Customer data pipeline, warehouse-first, event streaming.', icon: 'rudderstack', category: 'analytics' },
  { id: 'segment', name: 'Segment (Twilio)', description: 'CDP, connections, protocols, personas, warehouses.', icon: 'segment', category: 'analytics' },

  // Auth & Identity
  { id: 'clerk', name: 'Clerk', description: 'Auth completo: sign-in, MFA, orgs, user management, React.', icon: 'clerk', category: 'auth', popular: true },
  { id: 'auth0', name: 'Auth0 (Okta)', description: 'Enterprise identity, MFA, SSO, rules, organizations.', icon: 'auth0', category: 'auth' },
  { id: 'supabase-auth', name: 'Supabase Auth', description: 'Email/social/phone, MFA, RLS, Row Level Security.', icon: 'supabase', category: 'auth' },
  { id: 'firebase-auth', name: 'Firebase Auth', description: 'Email, social, phone, anon, custom claims, MFA.', icon: 'firebase', category: 'auth' },
  { id: 'nextauth', name: 'NextAuth.js (Auth.js)', description: 'Auth para Next.js, 80+ providers, edge, callbacks.', icon: 'nextauth', category: 'auth' },
  { id: 'kinde', name: 'Kinde', description: 'Auth moderno, feature flags, user management, free tier.', icon: 'kinde', category: 'auth' },
  { id: 'stytch', name: 'Stytch', description: 'Passwordless, MFA, SSO, device fingerprint, b2b.', icon: 'stytch', category: 'auth' },
  { id: 'keycloak', name: 'Keycloak', description: 'IAM open-source, SSO, LDAP, Kerberos, fine-grained auth.', icon: 'keycloak', category: 'auth' },
  { id: 'orbos', name: 'Ory (Kratos/Hydra)', description: 'Identity & OAuth2/OIDC serverless, zero-trust.', icon: 'ory', category: 'auth' },

  // Email
  { id: 'resend', name: 'Resend', description: 'Email API para devs, React Email, broadcasting, webhooks.', icon: 'resend', category: 'email', popular: true },
  { id: 'sendgrid', name: 'SendGrid', description: 'Email API enterprise, marketing, dedicated IPs.', icon: 'sendgrid', category: 'email' },
  { id: 'mailgun', name: 'Mailgun', description: 'Email transacional, validação, routing, suppression.', icon: 'mailgun', category: 'email' },
  { id: 'postmark', name: 'Postmark', description: 'Email transacional focado em deliverability.', icon: 'postmark', category: 'email' },
  { id: 'loops', name: 'Loops', description: 'Email marketing para SaaS, onboarding, newsletters.', icon: 'loops', category: 'email' },
  { id: 'customerio', name: 'Customer.io', description: 'Messaging automation: email, push, SMS, in-app.', icon: 'customerio', category: 'email' },
  { id: 'convertkit', name: 'ConvertKit', description: 'Email marketing para creators, automações, tags.', icon: 'convertkit', category: 'email' },

  // Search
  { id: 'algolia', name: 'Algolia', description: 'Search-as-a-service, typo-tolerance, instantsearch, AI.', icon: 'algolia', category: 'search', popular: true },
  { id: 'meilisearch', name: 'Meilisearch', description: 'Open-source, typo-tolerance, filters, faceted search.', icon: 'meilisearch', category: 'search' },
  { id: 'typesense', name: 'Typesense', description: 'Search engine open-source, fast, typo-tolerant.', icon: 'typesense', category: 'search' },
  { id: 'elasticsearch', name: 'Elasticsearch', description: 'Full-text, vector, logs, APM, SIEM, Kibana.', icon: 'elasticsearch', category: 'search' },
  { id: 'opensearch', name: 'OpenSearch', description: 'Fork open-source do Elasticsearch, dashboards.', icon: 'opensearch', category: 'search' },

  // Monitoring
  { id: 'sentry', name: 'Sentry', description: 'Error tracking, performance, profiling, session replay.', icon: 'sentry', category: 'monitoring', popular: true },
  { id: 'datadog', name: 'Datadog', description: 'APM, logs, metrics, RUM, security, synthetics.', icon: 'datadog', category: 'monitoring' },
  { id: 'newrelic', name: 'New Relic', description: 'Observability full-stack, NRQL, AI anomalies.', icon: 'newrelic', category: 'monitoring' },
  { id: 'grafana', name: 'Grafana Cloud', description: 'Logs, metrics, traces, dashboards, alerting, Loki/Tempo.', icon: 'grafana', category: 'monitoring' },
  { id: 'logtail', name: 'Logtail (Better Stack)', description: 'Log management, uptime, incident, SQL queries.', icon: 'betterstack', category: 'monitoring' },
  { id: 'axiom', name: 'Axiom', description: 'Log analytics serverless, query SQL, dashboards.', icon: 'axiom', category: 'monitoring' },
  { id: 'honeycomb', name: 'Honeycomb', description: 'Observability 2.0, wide events, SLOs, BubbleUp.', icon: 'honeycomb', category: 'monitoring' },
  { id: 'highlight', name: 'Highlight.io', description: 'Session replay, errors, logs, tracing open-source.', icon: 'highlight', category: 'monitoring' },

  // Automation
  { id: 'zapier', name: 'Zapier', description: '7000+ apps, zaps, paths, formatter, webhooks.', icon: 'zapier', category: 'automation' },
  { id: 'make', name: 'Make (Integromat)', description: 'Visual workflows, routers, iterators, data stores.', icon: 'make', category: 'automation' },
  { id: 'n8n', name: 'n8n', description: 'Workflow automation self-hosted, 400+ nodes, code node.', icon: 'n8n', category: 'automation', popular: true },
  { id: 'temporal', name: 'Temporal', description: 'Durable execution, workflows, retries, saga, TypeScript.', icon: 'temporal', category: 'automation' },
  { id: 'trigger', name: 'Trigger.dev', description: 'Background jobs, durable functions, React, scheduling.', icon: 'trigger', category: 'automation' },
  { id: 'inngest', name: 'Inngest', description: 'Serverless functions, event-driven, step functions.', icon: 'inngest', category: 'automation' },
  { id: 'hookdeck', name: 'Hookdeck', description: 'Webhook gateway, retry, transform, verify, dashboard.', icon: 'hookdeck', category: 'automation' },
  { id: 'svix', name: 'Svix', description: 'Webhooks as a service, verify, retry, dashboard.', icon: 'svix', category: 'automation' },

  // CMS & Content
  { id: 'sanity', name: 'Sanity', description: 'Headless CMS, real-time, customizable studio, GROQ.', icon: 'sanity', category: 'cms', popular: true },
  { id: 'contentful', name: 'Contentful', description: 'Headless CMS, GraphQL/REST, locales, webhooks.', icon: 'contentful', category: 'cms' },
  { id: 'strapi', name: 'Strapi', description: 'Open-source headless CMS, self-hosted, plugins.', icon: 'strapi', category: 'cms' },
  { id: 'ghost', name: 'Ghost', description: 'CMS para publishing, newsletters, memberships.', icon: 'ghost', category: 'cms' },
  { id: 'wordpress', name: 'WordPress (Headless)', description: 'Gutenberg, REST/GraphQL, WPGraphQL, multisite.', icon: 'wordpress', category: 'cms' },
  { id: 'prismic', name: 'Prismic', description: 'Headless CMS, slices, preview, i18n, migration.', icon: 'prismic', category: 'cms' },
  { id: 'directus', name: 'Directus', description: 'Headless CMS + API para qualquer SQL, no-code.', icon: 'directus', category: 'cms' },
  { id: 'storyblok', name: 'Storyblok', description: 'Visual editor, components, i18n, CDN global.', icon: 'storyblok', category: 'cms' },

  // E-commerce
  { id: 'shopify', name: 'Shopify', description: 'E-commerce completo, Storefront API, Hydrogen, POS.', icon: 'shopify', category: 'ecommerce', popular: true },
  { id: 'medusa', name: 'Medusa', description: 'Headless commerce open-source, modules, customizable.', icon: 'medusa', category: 'ecommerce' },
  { id: 'bigcommerce', name: 'BigCommerce', description: 'Headless, B2B, multi-storefront, GraphQL.', icon: 'bigcommerce', category: 'ecommerce' },
  { id: 'snipcart', name: 'Snipcart', description: 'Carrinho embeddável, HTML/JS, webhooks, inventory.', icon: 'snipcart', category: 'ecommerce' },
  { id: 'stripe-checkout', name: 'Stripe Checkout', description: 'Checkout hospedado, subscriptions, payment links.', icon: 'stripe', category: 'ecommerce' },

  // Social & Marketing
  { id: 'twitter', name: 'X (Twitter) API', description: 'Posts, DMs, spaces, ads, analytics, webhooks.', icon: 'x', category: 'social' },
  { id: 'linkedin', name: 'LinkedIn API', description: 'Posts, profile, company pages, ads, leads.', icon: 'linkedin', category: 'social' },
  { id: 'facebook', name: 'Meta (Facebook/Instagram)', description: 'Graph API, Marketing, Messenger, WhatsApp Business.', icon: 'meta', category: 'social' },
  { id: 'tiktok', name: 'TikTok for Business', description: 'Ads, creator marketplace, commerce, login.', icon: 'tiktok', category: 'social' },
  { id: 'youtube', name: 'YouTube Data API', description: 'Videos, playlists, analytics, live streaming.', icon: 'youtube', category: 'social' },
  { id: 'hubspot', name: 'HubSpot', description: 'CRM, marketing, sales, service, CMS, operations.', icon: 'hubspot', category: 'social' },
  { id: 'pipedrive', name: 'Pipedrive', description: 'Sales CRM, pipelines, activities, automation.', icon: 'pipedrive', category: 'social' },
  { id: 'attio', name: 'Attio', description: 'CRM flexível, lists, enrichment, automation, API.', icon: 'attio', category: 'social', beta: true },
  { id: 'intercom', name: 'Intercom', description: 'Messenger, help desk, bots, product tours, emails.', icon: 'intercom', category: 'social' },
  { id: 'zendesk', name: 'Zendesk', description: 'Support, chat, help center, AI agents, sunshine.', icon: 'zendesk', category: 'social' },
  { id: 'freshdesk', name: 'Freshdesk', description: 'Helpdesk, ticketing, automation, knowledge base.', icon: 'freshdesk', category: 'social' },
  { id: 'gorgias', name: 'Gorgias', description: 'Helpdesk para e-commerce, macros, rules, revenue.', icon: 'gorgias', category: 'social' },
];

/* Catálogo de provedores de modelo disponíveis no produto */
export interface ProviderItem {
  id: string;
  name: string;
  description: string;
  icon: 'nvidia' | 'openrouter';
}

export const PROVIDERS: ProviderItem[] = [
  { id: 'nvidia', name: 'NVIDIA', description: 'Modelos Nemotron, infraestrutura GPU.', icon: 'nvidia' },
  { id: 'openrouter', name: 'OpenRouter', description: 'Acesso a múltiplos modelos (DeepSeek, Qwen, GLM, Claude).', icon: 'openrouter' },
];

export type LogLevel = 'INFO' | 'WARNING' | 'ERROR';
export interface LogRow { id: string; level: LogLevel; message: string; source: string; time: string }