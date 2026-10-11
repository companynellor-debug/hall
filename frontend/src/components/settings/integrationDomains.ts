export interface IntegrationDomain {
  id: string;
  name: string;
  description: string;
  domain: string;
  category: string;
  popular?: boolean;
  beta?: boolean;
}

export const INTEGRATION_DOMAINS: IntegrationDomain[] = [
  // AI & ML
  { id: 'openai', name: 'OpenAI', description: 'GPT-4, embeddings, DALL·E, Whisper e fine-tuning.', domain: 'openai.com', category: 'ai-ml', popular: true },
  { id: 'anthropic', name: 'Anthropic', description: 'Claude 3.5 Sonnet, Haiku, Opus para raciocínio avançado.', domain: 'anthropic.com', category: 'ai-ml', popular: true },
  { id: 'google-ai', name: 'Google AI (Gemini)', description: 'Gemini 1.5 Pro/Flash, Vertex AI e modelos multimodais.', domain: 'google.com', category: 'ai-ml', popular: true },
  { id: 'mistral', name: 'Mistral AI', description: 'Modelos open-weight de alta performance (Mixtral, Codestral).', domain: 'mistral.ai', category: 'ai-ml' },
  { id: 'cohere', name: 'Cohere', description: 'Embeddings, rerank e modelos de linguagem enterprise.', domain: 'cohere.com', category: 'ai-ml' },
  { id: 'huggingface', name: 'Hugging Face', description: 'Hub de modelos, Inference API, Spaces e datasets.', domain: 'huggingface.co', category: 'ai-ml', popular: true },
  { id: 'replicate', name: 'Replicate', description: 'Run models via API: Stable Diffusion, Llama, Whisper e mais.', domain: 'replicate.com', category: 'ai-ml' },
  { id: 'together', name: 'Together AI', description: 'Inferência rápida de modelos open-source (Llama, Mixtral).', domain: 'together.ai', category: 'ai-ml' },
  { id: 'groq', name: 'Groq', description: 'Inferência ultra-rápida LPU para Llama, Mixtral, Gemma.', domain: 'groq.com', category: 'ai-ml', popular: true },
  { id: 'perplexity', name: 'Perplexity', description: 'Sonar API para busca com IA e citações em tempo real.', domain: 'perplexity.ai', category: 'ai-ml' },
  { id: 'elevenlabs', name: 'ElevenLabs', description: 'TTS de alta qualidade, clonagem de voz e dubbing.', domain: 'elevenlabs.io', category: 'ai-ml', popular: true },
  { id: 'deepgram', name: 'Deepgram', description: 'STT/TTS em tempo real, diarização e modelos médicos.', domain: 'deepgram.com', category: 'ai-ml' },
  { id: 'assemblyai', name: 'AssemblyAI', description: 'Transcrição, sumarização, detecção de tópicos e PII.', domain: 'assemblyai.com', category: 'ai-ml' },
  { id: 'pinecone', name: 'Pinecone', description: 'Vector database serverless para RAG e busca semântica.', domain: 'pinecone.io', category: 'ai-ml', popular: true },
  { id: 'weaviate', name: 'Weaviate', description: 'Vector DB open-source com GraphQL e módulos de ML.', domain: 'weaviate.io', category: 'ai-ml' },
  { id: 'chromadb', name: 'Chroma', description: 'Vector database leve para aplicações LLM locais.', domain: 'trychroma.com', category: 'ai-ml' },
  { id: 'qdrant', name: 'Qdrant', description: 'Vector search engine com filtros payload e quantização.', domain: 'qdrant.tech', category: 'ai-ml' },
  { id: 'langchain', name: 'LangChain', description: 'Framework para aplicações LLM: chains, agents, memory.', domain: 'langchain.com', category: 'ai-ml' },
  { id: 'llamaindex', name: 'LlamaIndex', description: 'Framework de dados para RAG e agentes baseados em contexto.', domain: 'llamaindex.ai', category: 'ai-ml' },
  { id: 'higgsfield', name: 'Higgsfield', description: 'Geração de vídeo com IA para conteúdo e marketing.', domain: 'higgsfield.ai', category: 'ai-ml', beta: true },
  { id: 'runway', name: 'Runway', description: 'Gen-3 Alpha, ferramentas de vídeo generativo e edição.', domain: 'runwayml.com', category: 'ai-ml' },
  { id: 'pika', name: 'Pika Labs', description: 'Geração de vídeo a partir de texto/imagem.', domain: 'pika.art', category: 'ai-ml', beta: true },
  { id: 'suno', name: 'Suno', description: 'Geração de música e áudio com IA.', domain: 'suno.ai', category: 'ai-ml', beta: true },
  { id: 'midjourney', name: 'Midjourney', description: 'Geração de imagens artísticas via API (não oficial).', domain: 'midjourney.com', category: 'ai-ml' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', description: 'Banco relacional avançado, extensível e ACID.', domain: 'postgresql.org', category: 'databases', popular: true },
  { id: 'mysql', name: 'MySQL', description: 'Banco relacional popular, amplamente suportado.', domain: 'mysql.com', category: 'databases' },
  { id: 'supabase', name: 'Supabase', description: 'PostgreSQL + Auth + Realtime + Storage + Edge Functions.', domain: 'supabase.com', category: 'databases', popular: true },
  { id: 'neon', name: 'Neon', description: 'PostgreSQL serverless com branching e autoscaling.', domain: 'neon.tech', category: 'databases', popular: true },
  { id: 'planetscale', name: 'PlanetScale', description: 'MySQL serverless com schema branching e deployments.', domain: 'planetscale.com', category: 'databases' },
  { id: 'turso', name: 'Turso (libSQL)', description: 'SQLite distribuído, edge-ready, multi-tenant.', domain: 'turso.tech', category: 'databases' },
  { id: 'mongodb', name: 'MongoDB Atlas', description: 'Document database flexível, sharding nativo.', domain: 'mongodb.com', category: 'databases' },
  { id: 'redis', name: 'Redis', description: 'Cache, pub/sub, streams, vectores e rate limiting.', domain: 'redis.io', category: 'databases', popular: true },
  { id: 'upstash', name: 'Upstash', description: 'Redis & Kafka serverless, pay-per-request.', domain: 'upstash.com', category: 'databases' },
  { id: 'clickhouse', name: 'ClickHouse', description: 'OLAP columnar para analytics em tempo real.', domain: 'clickhouse.com', category: 'databases' },
  { id: 'timescaledb', name: 'TimescaleDB', description: 'PostgreSQL para time-series, IoT e analytics.', domain: 'timescale.com', category: 'databases' },
  { id: 'fauna', name: 'Fauna', description: 'Document-relacional serverless com GraphQL nativo.', domain: 'fauna.com', category: 'databases' },
  { id: 'surreal', name: 'SurrealDB', description: 'Multi-model: document, graph, vector, time-series.', domain: 'surrealdb.com', category: 'databases', beta: true },
  { id: 'sqlite', name: 'SQLite / Turso', description: 'Leve, embutido, ideal para edge e apps locais.', domain: 'sqlite.org', category: 'databases' },
  { id: 'airtable', name: 'Airtable', description: 'Spreadsheet-database híbrido com API e automações.', domain: 'airtable.com', category: 'databases' },
  { id: 'notion', name: 'Notion API', description: 'Banco de dados colaborativo, blocos e páginas.', domain: 'notion.so', category: 'databases' },

  // DevOps & Cloud
  { id: 'github', name: 'GitHub', description: 'Repositórios, Actions, Packages, Codespaces, Copilot.', domain: 'github.com', category: 'devops', popular: true },
  { id: 'gitlab', name: 'GitLab', description: 'DevSecOps completo: CI/CD, registry, security, wiki.', domain: 'gitlab.com', category: 'devops' },
  { id: 'bitbucket', name: 'Bitbucket', description: 'Git hosting com pipelines e integração Jira.', domain: 'bitbucket.org', category: 'devops' },
  { id: 'vercel', name: 'Vercel', description: 'Deploy frontend/serverless, Edge Functions, Analytics.', domain: 'vercel.com', category: 'devops', popular: true },
  { id: 'netlify', name: 'Netlify', description: 'Deploy, Edge Functions, Forms, Identity, Functions.', domain: 'netlify.com', category: 'devops' },
  { id: 'railway', name: 'Railway', description: 'Deploy containers, databases, cron jobs, observability.', domain: 'railway.app', category: 'devops', popular: true },
  { id: 'render', name: 'Render', description: 'Web services, databases, cron, static sites, private networking.', domain: 'render.com', category: 'devops' },
  { id: 'fly', name: 'Fly.io', description: 'VMs globais, Anycast, Machine API, volumes persistentes.', domain: 'fly.io', category: 'devops' },
  { id: 'aws', name: 'AWS', description: 'EC2, Lambda, RDS, S3, ECS, Bedrock, 200+ serviços.', domain: 'aws.amazon.com', category: 'devops' },
  { id: 'gcp', name: 'Google Cloud', description: 'Cloud Run, Cloud SQL, Vertex AI, Firestore, BigQuery.', domain: 'cloud.google.com', category: 'devops' },
  { id: 'azure', name: 'Microsoft Azure', description: 'App Service, Functions, Cosmos DB, AKS, OpenAI Service.', domain: 'azure.microsoft.com', category: 'devops' },
  { id: 'cloudflare', name: 'Cloudflare', description: 'Workers, Pages, R2, D1, Vectorize, AI Gateway.', domain: 'cloudflare.com', category: 'devops', popular: true },
  { id: 'docker', name: 'Docker Hub', description: 'Registry de imagens, buildx, scout, subscriptions.', domain: 'docker.com', category: 'devops' },
  { id: 'kubernetes', name: 'Kubernetes', description: 'Orquestração de containers, Helm, Operators, CNI.', domain: 'kubernetes.io', category: 'devops' },
  { id: 'terraform', name: 'Terraform Cloud', description: 'IaC, workspaces, policy, drift detection, modules.', domain: 'terraform.io', category: 'devops' },
  { id: 'pulumi', name: 'Pulumi', description: 'IaC com linguagens reais (TS, Python, Go, C#).', domain: 'pulumi.com', category: 'devops' },
  { id: 'github-actions', name: 'GitHub Actions', description: 'CI/CD nativo, matrix, reusable workflows, OIDC.', domain: 'github.com', category: 'devops' },
  { id: 'circleci', name: 'CircleCI', description: 'Pipelines rápidos, orbs, resource classes, insights.', domain: 'circleci.com', category: 'devops' },
  { id: 'jenkins', name: 'Jenkins', description: 'Automação extensível, pipelines declarativos, plugins.', domain: 'jenkins.io', category: 'devops' },
  { id: 'argo', name: 'Argo CD', description: 'GitOps continuous delivery para Kubernetes.', domain: 'argoproj.io', category: 'devops' },

  // Communication
  { id: 'slack', name: 'Slack', description: 'Canais, bots, workflows, Block Kit, huddles.', domain: 'slack.com', category: 'communication', popular: true },
  { id: 'discord', name: 'Discord', description: 'Bots, slash commands, webhooks, voice, threads.', domain: 'discord.com', category: 'communication', popular: true },
  { id: 'teams', name: 'Microsoft Teams', description: 'Bots, tabs, connectors, Graph API, meetings.', domain: 'microsoft.com', category: 'communication' },
  { id: 'twilio', name: 'Twilio', description: 'SMS, WhatsApp, Voice, Video, Verify, Conversations.', domain: 'twilio.com', category: 'communication', popular: true },
  { id: 'sendgrid', name: 'SendGrid', description: 'Email API, marketing, templates, deliverability.', domain: 'sendgrid.com', category: 'email' },
  { id: 'mailgun', name: 'Mailgun', description: 'Email transacional, validação, suppression lists.', domain: 'mailgun.com', category: 'email' },
  { id: 'postmark', name: 'Postmark', description: 'Email transacional rápido, templates, webhooks.', domain: 'postmarkapp.com', category: 'email' },
  { id: 'resend', name: 'Resend', description: 'Email moderno para desenvolvedores, React Email, SDK.', domain: 'resend.com', category: 'email', popular: true },
  { id: 'pusher', name: 'Pusher', description: 'WebSockets gerenciados, presence, canais privados.', domain: 'pusher.com', category: 'communication' },
  { id: 'ably', name: 'Ably', description: 'Pub/sub em tempo real, presença, history, push.', domain: 'ably.com', category: 'communication' },
  { id: 'stream', name: 'Stream (GetStream)', description: 'Chat, feeds, video, moderation, React SDKs.', domain: 'getstream.io', category: 'communication' },
  { id: 'onesignal', name: 'OneSignal', description: 'Push mobile/web, email, SMS, in-app messaging.', domain: 'onesignal.com', category: 'communication' },
  { id: 'firebase-messaging', name: 'Firebase Cloud Messaging', description: 'Push gratuito para Android, iOS, Web.', domain: 'firebase.google.com', category: 'communication' },

  // Payments
  { id: 'stripe', name: 'Stripe', description: 'Pagamentos, Billing, Connect, Radar, Tax, Financial Connections.', domain: 'stripe.com', category: 'payments', popular: true },
  { id: 'paddle', name: 'Paddle', description: 'Merchant of Record, subscriptions, tax compliance global.', domain: 'paddle.com', category: 'payments' },
  { id: 'lemonsqueezy', name: 'Lemon Squeezy', description: 'MoR para SaaS digital, afiliados, license keys.', domain: 'lemonsqueezy.com', category: 'payments' },
  { id: 'asaas', name: 'Asaas', description: 'Pix, boleto, cartão, cobrança recorrente, split.', domain: 'asaas.com', category: 'payments', popular: true },
  { id: 'mercadopago', name: 'Mercado Pago', description: 'Checkout, Pix, parcelamento, split, point of sale.', domain: 'mercadopago.com', category: 'payments' },
  { id: 'paypal', name: 'PayPal / Braintree', description: 'PayPal, Venmo, cartões, crédito, Braintree gateway.', domain: 'paypal.com', category: 'payments' },
  { id: 'wise', name: 'Wise Platform', description: 'Transferências internacionais, multi-moeda, API banking.', domain: 'wise.com', category: 'payments' },
  { id: 'coinbase', name: 'Coinbase Commerce', description: 'Pagamentos crypto: USDC, BTC, ETH, Polygon, Base.', domain: 'coinbase.com', category: 'payments' },

  // Storage & Files
  { id: 'aws-s3', name: 'AWS S3', description: 'Object storage durável, versioning, lifecycle, CloudFront.', domain: 'aws.amazon.com', category: 'storage', popular: true },
  { id: 'cloudflare-r2', name: 'Cloudflare R2', description: 'S3-compatible, zero egress fees, Workers integration.', domain: 'cloudflare.com', category: 'storage', popular: true },
  { id: 'supabase-storage', name: 'Supabase Storage', description: 'S3-compatível, CDN, transformações de imagem, signed URLs.', domain: 'supabase.com', category: 'storage' },
  { id: 'vercel-blob', name: 'Vercel Blob', description: 'Storage serverless para Next.js, CDN global, SDK simples.', domain: 'vercel.com', category: 'storage' },
  { id: 'uploadthing', name: 'UploadThing', description: 'File uploads fáceis, ACL, callbacks, React hooks.', domain: 'uploadthing.com', category: 'storage' },
  { id: 'cloudinary', name: 'Cloudinary', description: 'Image/video management, transformações, AI, CDN.', domain: 'cloudinary.com', category: 'storage', popular: true },
  { id: 'imgix', name: 'imgix', description: 'Real-time image processing, CDN, auto-formats.', domain: 'imgix.com', category: 'storage' },
  { id: 'mux', name: 'Mux', description: 'Video API: upload, encoding, streaming, analytics.', domain: 'mux.com', category: 'storage' },
  { id: 'bunny', name: 'Bunny.net', description: 'CDN, storage, video streaming, edge rules, otimização.', domain: 'bunny.net', category: 'storage' },

  // Analytics
  { id: 'posthog', name: 'PostHog', description: 'Product analytics, feature flags, session replay, surveys.', domain: 'posthog.com', category: 'analytics', popular: true },
  { id: 'mixpanel', name: 'Mixpanel', description: 'Event analytics, funnels, retention, group analytics.', domain: 'mixpanel.com', category: 'analytics' },
  { id: 'amplitude', name: 'Amplitude', description: 'Product analytics, experimentation, session replay.', domain: 'amplitude.com', category: 'analytics' },
  { id: 'ga', name: 'Google Analytics 4', description: 'Web/app analytics, eventos, audiences, BigQuery export.', domain: 'analytics.google.com', category: 'analytics' },
  { id: 'plausible', name: 'Plausible', description: 'Analytics privativo, leve, GDPR-friendly, open-source.', domain: 'plausible.io', category: 'analytics' },
  { id: 'umami', name: 'Umami', description: 'Web analytics simples, auto-hospedado, privativo.', domain: 'umami.is', category: 'analytics' },
  { id: 'heap', name: 'Heap', description: 'Autocapture, retroactive analytics, data science layer.', domain: 'heap.io', category: 'analytics' },
  { id: 'rudderstack', name: 'RudderStack', description: 'Customer data pipeline, warehouse-first, event streaming.', domain: 'rudderstack.com', category: 'analytics' },
  { id: 'segment', name: 'Segment (Twilio)', description: 'CDP, connections, protocols, personas, warehouses.', domain: 'segment.com', category: 'analytics' },

  // Auth & Identity
  { id: 'clerk', name: 'Clerk', description: 'Auth completo: sign-in, MFA, orgs, user management, React.', domain: 'clerk.com', category: 'auth', popular: true },
  { id: 'auth0', name: 'Auth0 (Okta)', description: 'Enterprise identity, MFA, SSO, rules, organizations.', domain: 'auth0.com', category: 'auth' },
  { id: 'supabase-auth', name: 'Supabase Auth', description: 'Email/social/phone, MFA, RLS, Row Level Security.', domain: 'supabase.com', category: 'auth' },
  { id: 'firebase-auth', name: 'Firebase Auth', description: 'Email, social, phone, anon, custom claims, MFA.', domain: 'firebase.google.com', category: 'auth' },
  { id: 'nextauth', name: 'NextAuth.js (Auth.js)', description: 'Auth para Next.js, 80+ providers, edge, callbacks.', domain: 'next-auth.js.org', category: 'auth' },
  { id: 'kinde', name: 'Kinde', description: 'Auth moderno, feature flags, user management, free tier.', domain: 'kinde.com', category: 'auth' },
  { id: 'stytch', name: 'Stytch', description: 'Passwordless, MFA, SSO, device fingerprint, b2b.', domain: 'stytch.com', category: 'auth' },
  { id: 'keycloak', name: 'Keycloak', description: 'IAM open-source, SSO, LDAP, Kerberos, fine-grained auth.', domain: 'keycloak.org', category: 'auth' },
  { id: 'orbos', name: 'Ory (Kratos/Hydra)', description: 'Identity & OAuth2/OIDC serverless, zero-trust.', domain: 'ory.sh', category: 'auth' },

  // Email
  { id: 'resend', name: 'Resend', description: 'Email API para devs, React Email, broadcasting, webhooks.', domain: 'resend.com', category: 'email', popular: true },
  { id: 'sendgrid', name: 'SendGrid', description: 'Email API enterprise, marketing, dedicated IPs.', domain: 'sendgrid.com', category: 'email' },
  { id: 'mailgun', name: 'Mailgun', description: 'Email transacional, validação, routing, suppression.', domain: 'mailgun.com', category: 'email' },
  { id: 'postmark', name: 'Postmark', description: 'Email transacional focado em deliverability.', domain: 'postmarkapp.com', category: 'email' },
  { id: 'loops', name: 'Loops', description: 'Email marketing para SaaS, onboarding, newsletters.', domain: 'loops.so', category: 'email' },
  { id: 'customerio', name: 'Customer.io', description: 'Messaging automation: email, push, SMS, in-app.', domain: 'customer.io', category: 'email' },
  { id: 'convertkit', name: 'ConvertKit', description: 'Email marketing para creators, automações, tags.', domain: 'convertkit.com', category: 'email' },

  // Search
  { id: 'algolia', name: 'Algolia', description: 'Search-as-a-service, typo-tolerance, instantsearch, AI.', domain: 'algolia.com', category: 'search', popular: true },
  { id: 'meilisearch', name: 'Meilisearch', description: 'Open-source, typo-tolerance, filters, faceted search.', domain: 'meilisearch.com', category: 'search' },
  { id: 'typesense', name: 'Typesense', description: 'Search engine open-source, fast, typo-tolerant.', domain: 'typesense.org', category: 'search' },
  { id: 'elasticsearch', name: 'Elasticsearch', description: 'Full-text, vector, logs, APM, SIEM, Kibana.', domain: 'elastic.co', category: 'search' },
  { id: 'opensearch', name: 'OpenSearch', description: 'Fork open-source do Elasticsearch, dashboards.', domain: 'opensearch.org', category: 'search' },

  // Monitoring
  { id: 'sentry', name: 'Sentry', description: 'Error tracking, performance, profiling, session replay.', domain: 'sentry.io', category: 'monitoring', popular: true },
  { id: 'datadog', name: 'Datadog', description: 'APM, logs, metrics, RUM, security, synthetics.', domain: 'datadoghq.com', category: 'monitoring' },
  { id: 'newrelic', name: 'New Relic', description: 'Observability full-stack, NRQL, AI anomalies.', domain: 'newrelic.com', category: 'monitoring' },
  { id: 'grafana', name: 'Grafana Cloud', description: 'Logs, metrics, traces, dashboards, alerting, Loki/Tempo.', domain: 'grafana.com', category: 'monitoring' },
  { id: 'logtail', name: 'Logtail (Better Stack)', description: 'Log management, uptime, incident, SQL queries.', domain: 'betterstack.com', category: 'monitoring' },
  { id: 'axiom', name: 'Axiom', description: 'Log analytics serverless, query SQL, dashboards.', domain: 'axiom.co', category: 'monitoring' },
  { id: 'honeycomb', name: 'Honeycomb', description: 'Observability 2.0, wide events, SLOs, BubbleUp.', domain: 'honeycomb.io', category: 'monitoring' },
  { id: 'highlight', name: 'Highlight.io', description: 'Session replay, errors, logs, tracing open-source.', domain: 'highlight.io', category: 'monitoring' },

  // Automation
  { id: 'zapier', name: 'Zapier', description: '7000+ apps, zaps, paths, formatter, webhooks.', domain: 'zapier.com', category: 'automation' },
  { id: 'make', name: 'Make (Integromat)', description: 'Visual workflows, routers, iterators, data stores.', domain: 'make.com', category: 'automation' },
  { id: 'n8n', name: 'n8n', description: 'Workflow automation self-hosted, 400+ nodes, code node.', domain: 'n8n.io', category: 'automation', popular: true },
  { id: 'temporal', name: 'Temporal', description: 'Durable execution, workflows, retries, saga, TypeScript.', domain: 'temporal.io', category: 'automation' },
  { id: 'trigger', name: 'Trigger.dev', description: 'Background jobs, durable functions, React, scheduling.', domain: 'trigger.dev', category: 'automation' },
  { id: 'inngest', name: 'Inngest', description: 'Serverless functions, event-driven, step functions.', domain: 'inngest.com', category: 'automation' },
  { id: 'hookdeck', name: 'Hookdeck', description: 'Webhook gateway, retry, transform, verify, dashboard.', domain: 'hookdeck.com', category: 'automation' },
  { id: 'svix', name: 'Svix', description: 'Webhooks as a service, verify, retry, dashboard.', domain: 'svix.com', category: 'automation' },

  // CMS & Content
  { id: 'sanity', name: 'Sanity', description: 'Headless CMS, real-time, customizable studio, GROQ.', domain: 'sanity.io', category: 'cms', popular: true },
  { id: 'contentful', name: 'Contentful', description: 'Headless CMS, GraphQL/REST, locales, webhooks.', domain: 'contentful.com', category: 'cms' },
  { id: 'strapi', name: 'Strapi', description: 'Open-source headless CMS, self-hosted, plugins.', domain: 'strapi.io', category: 'cms' },
  { id: 'ghost', name: 'Ghost', description: 'CMS para publishing, newsletters, memberships.', domain: 'ghost.org', category: 'cms' },
  { id: 'wordpress', name: 'WordPress (Headless)', description: 'Gutenberg, REST/GraphQL, WPGraphQL, multisite.', domain: 'wordpress.org', category: 'cms' },
  { id: 'prismic', name: 'Prismic', description: 'Headless CMS, slices, preview, i18n, migration.', domain: 'prismic.io', category: 'cms' },
  { id: 'directus', name: 'Directus', description: 'Headless CMS + API para qualquer SQL, no-code.', domain: 'directus.io', category: 'cms' },
  { id: 'storyblok', name: 'Storyblok', description: 'Visual editor, components, i18n, CDN global.', domain: 'storyblok.com', category: 'cms' },

  // E-commerce
  { id: 'shopify', name: 'Shopify', description: 'E-commerce completo, Storefront API, Hydrogen, POS.', domain: 'shopify.com', category: 'ecommerce', popular: true },
  { id: 'medusa', name: 'Medusa', description: 'Headless commerce open-source, modules, customizable.', domain: 'medusajs.com', category: 'ecommerce' },
  { id: 'bigcommerce', name: 'BigCommerce', description: 'Headless, B2B, multi-storefront, GraphQL.', domain: 'bigcommerce.com', category: 'ecommerce' },
  { id: 'snipcart', name: 'Snipcart', description: 'Carrinho embeddável, HTML/JS, webhooks, inventory.', domain: 'snipcart.com', category: 'ecommerce' },
  { id: 'stripe-checkout', name: 'Stripe Checkout', description: 'Checkout hospedado, subscriptions, payment links.', domain: 'stripe.com', category: 'ecommerce' },

  // Social & Marketing
  { id: 'twitter', name: 'X (Twitter) API', description: 'Posts, DMs, spaces, ads, analytics, webhooks.', domain: 'x.com', category: 'social' },
  { id: 'linkedin', name: 'LinkedIn API', description: 'Posts, profile, company pages, ads, leads.', domain: 'linkedin.com', category: 'social' },
  { id: 'facebook', name: 'Meta (Facebook/Instagram)', description: 'Graph API, Marketing, Messenger, WhatsApp Business.', domain: 'meta.com', category: 'social' },
  { id: 'tiktok', name: 'TikTok for Business', description: 'Ads, creator marketplace, commerce, login.', domain: 'tiktok.com', category: 'social' },
  { id: 'youtube', name: 'YouTube Data API', description: 'Videos, playlists, analytics, live streaming.', domain: 'youtube.com', category: 'social' },
  { id: 'hubspot', name: 'HubSpot', description: 'CRM, marketing, sales, service, CMS, operations.', domain: 'hubspot.com', category: 'social' },
  { id: 'pipedrive', name: 'Pipedrive', description: 'Sales CRM, pipelines, activities, automation.', domain: 'pipedrive.com', category: 'social' },
  { id: 'attio', name: 'Attio', description: 'CRM flexível, lists, enrichment, automation, API.', domain: 'attio.com', category: 'social', beta: true },
  { id: 'intercom', name: 'Intercom', description: 'Messenger, help desk, bots, product tours, emails.', domain: 'intercom.com', category: 'social' },
  { id: 'zendesk', name: 'Zendesk', description: 'Support, chat, help center, AI agents, sunshine.', domain: 'zendesk.com', category: 'social' },
  { id: 'freshdesk', name: 'Freshdesk', description: 'Helpdesk, ticketing, automation, knowledge base.', domain: 'freshdesk.com', category: 'social' },
  { id: 'gorgias', name: 'Gorgias', description: 'Helpdesk para e-commerce, macros, rules, revenue.', domain: 'gorgias.com', category: 'social' },
];

export const INTEGRATION_CATEGORIES_DOMAIN = [
  { key: 'ai-ml', label: 'AI & ML', description: 'Modelos, embeddings, LLMs e ferramentas de IA' },
  { key: 'databases', label: 'Databases', description: 'Bancos de dados SQL, NoSQL, vetoriais e cache' },
  { key: 'devops', label: 'DevOps & Cloud', description: 'Deploy, CI/CD, containers e infraestrutura' },
  { key: 'communication', label: 'Communication', description: 'Chat, vídeo, SMS, push e notificações' },
  { key: 'payments', label: 'Payments', description: 'Processamento de pagamentos, assinaturas e faturamento' },
  { key: 'storage', label: 'Storage & Files', description: 'Armazenamento de objetos, CDN e gerenciamento de arquivos' },
  { key: 'analytics', label: 'Analytics', description: 'Tracking, eventos, BI e product analytics' },
  { key: 'auth', label: 'Auth & Identity', description: 'Autenticação, autorização e gerenciamento de usuários' },
  { key: 'email', label: 'Email', description: 'Email transacional, marketing e deliverability' },
  { key: 'search', label: 'Search', description: 'Busca full-text, vetorial e descoberta' },
  { key: 'monitoring', label: 'Monitoring', description: 'Observabilidade, logs, tracing e alertas' },
  { key: 'automation', label: 'Automation', description: 'Workflows, webhooks e integrações sem código' },
  { key: 'cms', label: 'CMS & Content', description: 'Headless CMS, conteúdo e gestão de assets' },
  { key: 'ecommerce', label: 'E-commerce', description: 'Lojas, carrinho, inventário e pedidos' },
  { key: 'social', label: 'Social & Marketing', description: 'Redes sociais, ads, CRM e growth' },
];