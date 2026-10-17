export interface ProviderMeta {
  id: string;
  name: string;
  description: string;
  domain: string;
  keyPlaceholder: string;
  docsUrl: string;
  models: string[];
  needsKey: boolean;
  needsBaseUrl: boolean;
  tag?: string;
}

export const PROVIDER_CATALOG: ProviderMeta[] = [
  { id: 'openai', name: 'OpenAI', description: 'GPT, raciocínio e geração de imagens.', domain: 'openai.com', keyPlaceholder: 'sk-proj-…', docsUrl: 'https://platform.openai.com/api-keys', models: ['GPT-5.2', 'GPT-5 mini', 'o4'], needsKey: true, needsBaseUrl: false, tag: 'Popular' },
  { id: 'anthropic', name: 'Anthropic', description: 'Família Claude para código e análise.', domain: 'anthropic.com', keyPlaceholder: 'sk-ant-…', docsUrl: 'https://console.anthropic.com/settings/keys', models: ['Claude Opus 4.5', 'Claude Sonnet 4.5', 'Claude Haiku 4.5'], needsKey: true, needsBaseUrl: false, tag: 'Popular' },
  { id: 'google', name: 'Google Gemini', description: 'Modelos multimodais com contexto longo.', domain: 'google.com', keyPlaceholder: 'AIza…', docsUrl: 'https://aistudio.google.com/apikey', models: ['Gemini 3 Pro', 'Gemini 3 Flash'], needsKey: true, needsBaseUrl: false },
  { id: 'openrouter', name: 'OpenRouter', description: 'Um único acesso a centenas de modelos.', domain: 'openrouter.ai', keyPlaceholder: 'sk-or-…', docsUrl: 'https://openrouter.ai/keys', models: ['DeepSeek', 'GLM-5', 'Qwen', 'Claude Sonnet', 'GPT-4'], needsKey: true, needsBaseUrl: false },
  { id: 'nvidia', name: 'NVIDIA', description: 'Modelos Nemotron em infraestrutura GPU.', domain: 'nvidia.com', keyPlaceholder: 'nvapi-…', docsUrl: 'https://build.nvidia.com', models: ['Nemotron'], needsKey: true, needsBaseUrl: false },
  { id: 'mistral', name: 'Mistral AI', description: 'Modelos europeus rápidos e Codestral.', domain: 'mistral.ai', keyPlaceholder: 'Sua chave Mistral', docsUrl: 'https://console.mistral.ai/api-keys', models: ['Mistral Large', 'Codestral'], needsKey: true, needsBaseUrl: false },
  { id: 'groq', name: 'Groq', description: 'Inferência ultrarrápida em LPU.', domain: 'groq.com', keyPlaceholder: 'gsk_…', docsUrl: 'https://console.groq.com/keys', models: ['Llama 3.3 70B', 'Kimi K2'], needsKey: true, needsBaseUrl: false },
  { id: 'deepseek', name: 'DeepSeek', description: 'Raciocínio e código com ótimo custo.', domain: 'deepseek.com', keyPlaceholder: 'sk-…', docsUrl: 'https://platform.deepseek.com/api_keys', models: ['DeepSeek V3.2', 'DeepSeek R1'], needsKey: true, needsBaseUrl: false },
  { id: 'xai', name: 'xAI', description: 'Modelos Grok com busca em tempo real.', domain: 'x.ai', keyPlaceholder: 'xai-…', docsUrl: 'https://console.x.ai', models: ['Grok 4', 'Grok Code'], needsKey: true, needsBaseUrl: false },
  { id: 'together', name: 'Together AI', description: 'Modelos open-source hospedados.', domain: 'together.ai', keyPlaceholder: 'Sua chave Together', docsUrl: 'https://api.together.ai/settings/api-keys', models: ['Qwen3 Coder', 'Llama 4 Maverick'], needsKey: true, needsBaseUrl: false },
  { id: 'perplexity', name: 'Perplexity', description: 'Respostas com busca e citações.', domain: 'perplexity.ai', keyPlaceholder: 'pplx-…', docsUrl: 'https://www.perplexity.ai/settings/api', models: ['Sonar Pro'], needsKey: true, needsBaseUrl: false },
  { id: 'ollama', name: 'Ollama (local)', description: 'Rode modelos na sua própria máquina.', domain: 'ollama.com', keyPlaceholder: '', docsUrl: 'https://ollama.com', models: ['Llama 3.1', 'Qwen2.5 Coder'], needsKey: false, needsBaseUrl: true, tag: 'Local' },
];

export const CUSTOM_PROVIDER_ID = 'custom';

export const getProviderMeta = (key: string) => PROVIDER_CATALOG.find((p) => p.id === key);

export const maskKey = (key: string) => (key.length <= 8 ? '••••' : `${key.slice(0, 4)}••••${key.slice(-4)}`);
