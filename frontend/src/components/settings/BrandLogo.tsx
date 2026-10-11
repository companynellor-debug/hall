import {
  siGithub, siNvidia, siOpenrouter, siSupabase, siVercel, siStripe,
  siAnthropic, siGoogle, siMistralai, siHuggingface, siReplicate, siPerplexity, siElevenlabs, siDeepgram, siQdrant, siLangchain, siSuno,
  siPostgresql, siMysql, siNeon, siPlanetscale, siTurso, siMongodb, siRedis, siUpstash, siClickhouse, siFauna, siSurrealdb, siSqlite, siAirtable, siNotion,
  siGitlab, siBitbucket, siNetlify, siRailway, siRender, siGooglecloud, siCloudflare, siDocker, siKubernetes, siTerraform, siPulumi, siGithubactions, siCircleci, siJenkins, siArgo,
  siDiscord, siMailgun, siResend, siPusher, siFirebase,
  siPaddle, siLemonsqueezy, siMercadopago, siPaypal, siWise, siCoinbase,
  siCloudinary,
  siPosthog, siMixpanel, siGoogleanalytics, siPlausibleanalytics, siUmami,
  siClerk, siAuth0, siKeycloak, siOry, siLoops,
  siAlgolia, siMeilisearch, siElasticsearch, siOpensearch,
  siSentry, siDatadog, siNewrelic, siGrafana,
  siZapier, siMake, siN8n, siTemporal,
  siSanity, siContentful, siStrapi, siGhost, siWordpress, siPrismic, siDirectus, siStoryblok,
  siShopify, siMedusa, siBigcommerce,
  siX, siMeta, siTiktok, siYoutube, siHubspot, siIntercom, siZendesk,
} from 'simple-icons';

interface BrandLogoProps {
  name: string;
  size?: number;
  colored?: boolean;
}

/* Marcas cujo logo é escuro/preto — precisam de cor clara no fundo escuro */
const LIGHT_ON_DARK = new Set([
  'github', 'vercel', 'netlify', 'railway', 'render', 'aws', 'gcp', 'azure',
  'docker', 'kubernetes', 'terraform', 'pulumi', 'githubactions', 'circleci', 'jenkins',
  'slack', 'discord', 'twilio', 'sendgrid', 'mailgun', 'postmark',
  'pusher', 'ably', 'getstream', 'onesignal', 'firebase',
  'stripe', 'paddle', 'lemonsqueezy', 'mercadopago', 'paypal', 'wise', 'coinbase',
  'amazons3', 'cloudinary', 'mux',
  'posthog', 'mixpanel', 'amplitude', 'googleanalytics', 'plausible', 'umami', 'heap',
  'rudderstack', 'segment',
  'clerk', 'auth0', 'nextauth', 'kinde', 'stytch', 'keycloak', 'ory',
  'loops', 'customerio', 'convertkit',
  'algolia', 'meilisearch', 'typesense', 'elasticsearch', 'opensearch',
  'sentry', 'datadog', 'newrelic', 'grafana', 'axiom', 'honeycomb',
  'zapier', 'make', 'n8n', 'temporal', 'trigger', 'inngest', 'hookdeck', 'svix',
  'sanity', 'contentful', 'strapi', 'ghost', 'wordpress', 'prismic', 'directus', 'storyblok',
  'shopify', 'medusa', 'bigcommerce', 'snipcart',
  'x', 'linkedin', 'meta', 'tiktok', 'youtube', 'hubspot', 'pipedrive', 'attio',
  'intercom', 'zendesk', 'freshdesk', 'gorgias',
  'openai', 'cohere', 'together', 'groq', 'pinecone', 'weaviate', 'chroma', 'llamaindex', 'higgsfield', 'runway', 'pika', 'midjourney', 'assemblyai',
  'timescaledb', 'fly', 'pipedrive', 'freshdesk', 'gorgias',
]);

/* Custom SVGs for brands not in simple-icons */
const CUSTOM_BRANDS: Record<string, { path: string; hex: string; title: string }> = {
  // AI & ML
  openai: { hex: '412991', title: 'OpenAI', path: 'M12 2.5C7.5 2.5 3.8 6.2 3.8 10.7c0 1.8.6 3.4 1.6 4.7-.4.6-.6 1.4-.6 2.2 0 2.3 1.8 4.2 4 4.2 1.2 0 2.3-.4 3.2-1.1v-3.3c-.8.3-1.5.6-2.3.6-1.8 0-3.2-1.2-3.2-2.8 0-1.6 1.1-2.7 2.6-2.7 1.3 0 2 .6 2.5 1.1l.5-2.5c-1-.6-2.3-1-3.5-1-2.8 0-5 2.2-5 5s2.2 5 5 5c2.5 0 4.3-1.8 4.8-4.2h3.2c-.4 2.5-2.6 4.5-5.5 4.5C7 21.5 2 16.5 2 10.7S7 0 12 0s10 5 10 10.7c0 2.2-.8 4.2-2.2 5.7.5.5.8 1.1.8 1.8 0 2.7-2.2 4.8-5 4.8-2.6 0-4.7-1.7-5.3-4h-3.2c.5 1.4 2 2.5 3.8 2.5 3.3 0 6-2.7 6-6s-2.7-6-6-6z' },
  cohere: { hex: '0078D4', title: 'Cohere', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  together: { hex: '000000', title: 'Together AI', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  groq: { hex: 'F55036', title: 'Groq', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7V11h4V7h2v4h4v2z' },
  pinecone: { hex: '0078D4', title: 'Pinecone', path: 'M12 2L2 7l10 5 10-5-10-5zm0 2.5L10.5 7 12 8.1 13.5 7 12 4.5zm0 5.5L10.5 12 12 13.1 13.5 12 12 10.5zm0 5.5L10.5 17 12 18.1 13.5 17 12 15.5z' },
  weaviate: { hex: '1A73E8', title: 'Weaviate', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
  chroma: { hex: '6600FF', title: 'Chroma', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  llamaindex: { hex: '1E88E5', title: 'LlamaIndex', path: 'M12 2L2 7l10 5 10-5-10-5zm0 2.18L10.38 6.5 12 7.62 13.62 6.5 12 4.18zm0 3.82L10.38 10.5 12 11.62 13.62 10.5 12 8.18zm0 3.82L10.38 14.5 12 15.62 13.62 14.5 12 12.18zm0 3.82L10.38 18.5 12 19.62 13.62 18.5 12 16.18z' },
  higgsfield: { hex: '8B5CF6', title: 'Higgsfield', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  runway: { hex: '000000', title: 'Runway', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  pika: { hex: 'FF6B6B', title: 'Pika Labs', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  midjourney: { hex: '000000', title: 'Midjourney', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  assemblyai: { hex: 'E61E25', title: 'AssemblyAI', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Databases
  timescaledb: { hex: '0078D4', title: 'TimescaleDB', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  chromadb: { hex: '6600FF', title: 'Chroma', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // DevOps
  microsoftteams: { hex: '6264A7', title: 'Microsoft Teams', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Storage
  uploadthing: { hex: '000000', title: 'UploadThing', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  imgix: { hex: '00B8D4', title: 'imgix', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  bunny: { hex: '00C896', title: 'Bunny.net', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Analytics
  amplitude: { hex: '00D4AA', title: 'Amplitude', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  betterstack: { hex: '00B8D4', title: 'Better Stack', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  highlight: { hex: 'FF6B6B', title: 'Highlight.io', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Auth
  nextauth: { hex: '000000', title: 'NextAuth.js', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  stytch: { hex: '000000', title: 'Stytch', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // E-commerce
  snipcart: { hex: 'F5A623', title: 'Snipcart', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // DevOps
  aws: { hex: 'FF9900', title: 'AWS', path: 'M12 2L2 7l10 5 10-5-10-5zm0 2.18L10.38 6.5 12 7.62 13.62 6.5 12 4.18zm0 3.82L10.38 10.5 12 11.62 13.62 10.5 12 8.18zm0 3.82L10.38 14.5 12 15.62 13.62 14.5 12 12.18zm0 3.82L10.38 18.5 12 19.62 13.62 18.5 12 16.18z' },
  azure: { hex: '0078D4', title: 'Microsoft Azure', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  fly: { hex: '000000', title: 'Fly.io', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Communication
  slack: { hex: '4A154B', title: 'Slack', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.5-1c1.38 0 2.5 1.12 2.5 2.5S18.88 6 17.5 6 15 4.88 15 3.5 16.12 1 17.5 1zM12 1c-1.38 0-2.5 1.12-2.5 2.5S10.62 6 12 6s2.5-1.12 2.5-2.5S13.38 1 12 1zM6.5 1c-1.38 0-2.5 1.12-2.5 2.5S5.12 6 6.5 6s2.5-1.12 2.5-2.5S7.88 1 6.5 1zm11 15c0 1.38-1.12 2.5-2.5 2.5S12.5 18 12.5 16.5s1.12-2.5 2.5-2.5S17.5 15.12 17.5 16.5zM6.5 16.5c0 1.38-1.12 2.5-2.5 2.5S1.5 18 1.5 16.5s1.12-2.5 2.5-2.5S6.5 15.12 6.5 16.5z' },
  twilio: { hex: 'F22F46', title: 'Twilio', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  sendgrid: { hex: '1A82E2', title: 'SendGrid', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  postmark: { hex: '2E7CE4', title: 'Postmark', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  ably: { hex: '347AF0', title: 'Ably', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  getstream: { hex: '35B8AB', title: 'GetStream', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  onesignal: { hex: 'FF6B00', title: 'OneSignal', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Storage
  amazons3: { hex: '569A31', title: 'Amazon S3', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  mux: { hex: 'E61E25', title: 'Mux', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Analytics
  heap: { hex: 'FF6F00', title: 'Heap', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  rudderstack: { hex: '00D4AA', title: 'RudderStack', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  segment: { hex: '006BFF', title: 'Segment', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Auth
  kinde: { hex: '000000', title: 'Kinde', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  axiom: { hex: '00E5A0', title: 'Axiom', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  honeycomb: { hex: 'FDB813', title: 'Honeycomb', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Automation
  trigger: { hex: '1A1A2E', title: 'Trigger.dev', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  inngest: { hex: '00D4AA', title: 'Inngest', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  hookdeck: { hex: '7C3AED', title: 'Hookdeck', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  svix: { hex: '000000', title: 'Svix', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Email
  customerio: { hex: '393381', title: 'Customer.io', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  convertkit: { hex: '2D3748', title: 'ConvertKit', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Search
  typesense: { hex: '000000', title: 'Typesense', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Social
  linkedin: { hex: '0A66C2', title: 'LinkedIn', path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.65 0-1.86.27-2.47 1.12v-1.62h-2.8v8.62h2.8v-4.8c0-.96.4-1.5 1.2-1.5h2.3v5.3h2.8zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m13.66 8.44H5.56V5.56h15v11.44z' },
  pipedrive: { hex: '00C075', title: 'Pipedrive', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  attio: { hex: '000000', title: 'Attio', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  freshdesk: { hex: '2D8AFF', title: 'Freshdesk', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  gorgias: { hex: '000000', title: 'Gorgias', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },

  // Asaas (existing)
  asaas: {
    hex: '0073E6',
    title: 'Asaas',
    path: 'M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zm3.94 9.03c-.24 0-.44.18-.44.42v2.4c0 1.05-.6 1.62-1.5 1.62h-.36v-4.02c0-.24-.2-.42-.44-.42s-.43.18-.43.42v4.02h-1.2c-.9 0-1.5-.57-1.5-1.62v-2.4c0-.24-.2-.42-.44-.42s-.43.18-.43.42v2.4c0 1.47.9 2.34 2.37 2.34h3.4c.24 0 .43-.18.43-.42v-4.32c0-.24-.2-.42-.43-.42zM9.66 6.42c-.24 0-.43.18-.43.42v4.29c0 .24.19.42.43.42s.44-.18.44-.42V6.84c0-.24-.2-.42-.44-.42z'
  },
};

/* Mapeamento de ícones (simple-icons) - apenas os que existem */
const BRANDS: Record<string, { path: string; hex: string; title: string }> = {
  // Original
  github: siGithub,
  nvidia: siNvidia,
  openrouter: siOpenrouter,
  supabase: siSupabase,
  vercel: siVercel,
  stripe: siStripe,

  // AI & ML
  anthropic: siAnthropic,
  google: siGoogle,
  mistral: siMistralai,
  huggingface: siHuggingface,
  replicate: siReplicate,
  perplexity: siPerplexity,
  elevenlabs: siElevenlabs,
  deepgram: siDeepgram,
  qdrant: siQdrant,
  langchain: siLangchain,
  suno: siSuno,

  // Databases
  postgresql: siPostgresql,
  mysql: siMysql,
  neon: siNeon,
  planetscale: siPlanetscale,
  turso: siTurso,
  mongodb: siMongodb,
  redis: siRedis,
  upstash: siUpstash,
  clickhouse: siClickhouse,
  fauna: siFauna,
  surrealdb: siSurrealdb,
  sqlite: siSqlite,
  airtable: siAirtable,
  notion: siNotion,

  // DevOps
  gitlab: siGitlab,
  bitbucket: siBitbucket,
  netlify: siNetlify,
  railway: siRailway,
  render: siRender,
  googlecloud: siGooglecloud,
  cloudflare: siCloudflare,
  docker: siDocker,
  kubernetes: siKubernetes,
  terraform: siTerraform,
  pulumi: siPulumi,
  githubactions: siGithubactions,
  circleci: siCircleci,
  jenkins: siJenkins,
  argo: siArgo,

  // Communication
  discord: siDiscord,
  mailgun: siMailgun,
  resend: siResend,
  pusher: siPusher,
  firebase: siFirebase,

  // Payments
  paddle: siPaddle,
  lemonsqueezy: siLemonsqueezy,
  mercadopago: siMercadopago,
  paypal: siPaypal,
  wise: siWise,
  coinbase: siCoinbase,

  // Storage
  cloudinary: siCloudinary,

  // Analytics
  posthog: siPosthog,
  mixpanel: siMixpanel,
  googleanalytics: siGoogleanalytics,
  plausibleanalytics: siPlausibleanalytics,
  umami: siUmami,

  // Auth
  clerk: siClerk,
  auth0: siAuth0,
  keycloak: siKeycloak,
  ory: siOry,
  loops: siLoops,

  // Search
  algolia: siAlgolia,
  meilisearch: siMeilisearch,
  elasticsearch: siElasticsearch,
  opensearch: siOpensearch,

  // Monitoring
  sentry: siSentry,
  datadog: siDatadog,
  newrelic: siNewrelic,
  grafana: siGrafana,

  // Automation
  zapier: siZapier,
  make: siMake,
  n8n: siN8n,
  temporal: siTemporal,

  // CMS
  sanity: siSanity,
  contentful: siContentful,
  strapi: siStrapi,
  ghost: siGhost,
  wordpress: siWordpress,
  prismic: siPrismic,
  directus: siDirectus,
  storyblok: siStoryblok,

  // E-commerce
  shopify: siShopify,
  medusa: siMedusa,
  bigcommerce: siBigcommerce,

  // Social
  x: siX,
  meta: siMeta,
  tiktok: siTiktok,
  youtube: siYoutube,
  hubspot: siHubspot,
  intercom: siIntercom,
  zendesk: siZendesk,
};

export function BrandLogo({ name, size = 22, colored = true }: BrandLogoProps) {
  let brand = BRANDS[name] || CUSTOM_BRANDS[name];
  if (!brand) return null;

  const fillColor = !colored
    ? 'currentColor'
    : LIGHT_ON_DARK.has(name)
      ? '#F5F5F5'
      : `#${brand.hex}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fillColor}
      role="img"
      aria-label={brand.title}
    >
      <title>{brand.title}</title>
      <path d={brand.path} />
    </svg>
  );
}