import { useState } from 'react';

interface IntegrationLogoProps {
  domain: string;
  name: string;
  size?: number;
}

/*
 * Slugs do Simple Icons (https://simpleicons.org / cdn.simpleicons.org)
 * para domínios cujo slug diverge do nome do domínio.
 * Todos validados contra o CDN.
 * Marcas removidas do Simple Icons (OpenAI, Slack, Twilio etc.)
 * caem automaticamente no fallback do Google Favicon.
 */
const SLUG_OVERRIDES: Record<string, string> = {
  // Google products — logo específico, não o "G" genérico
  'google.com': 'googlegemini',        // Google AI (Gemini)
  'cloud.google.com': 'googlecloud',
  'analytics.google.com': 'googleanalytics',
  'firebase.google.com': 'firebase',

  // Slugs divergentes
  'mistral.ai': 'mistralai',
  'neon.tech': 'neon',
  'fly.io': 'flydotio',
  'argoproj.io': 'argo',
  'plausible.io': 'plausibleanalytics',
  'convertkit.com': 'kit',
  'datadoghq.com': 'datadog',
  'medusajs.com': 'medusa',
  'bunny.net': 'bunnydotnet',
  'huggingface.co': 'huggingface',
  'qdrant.tech': 'qdrant',
  'elastic.co': 'elastic',
  'ory.sh': 'ory',
  'x.com': 'x',
};

function slugFromDomain(domain: string): string {
  // Domínios com subdomínio (ex.: azure.microsoft.com) não têm slug
  // derivável simples — força fallback direto para o favicon.
  if (domain.split('.').length > 2) return '';
  return domain.split('.')[0].toLowerCase();
}

export function IntegrationLogo({ domain, name, size = 32 }: IntegrationLogoProps) {
  const [stage, setStage] = useState<'brand' | 'favicon' | 'letter'>('brand');

  const radius = Math.max(6, size * 0.22);

  if (stage === 'letter') {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#a1a1aa',
          fontSize: size * 0.42,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  const slug = SLUG_OVERRIDES[domain] ?? slugFromDomain(domain);
  const useBrand = stage === 'brand' && slug !== '';
  const src = useBrand
    ? `https://cdn.simpleicons.org/${slug}`
    : `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      onError={() => setStage(stage === 'brand' ? 'favicon' : 'letter')}
      style={{
        borderRadius: radius,
        objectFit: 'contain',
        padding: useBrand ? size * 0.12 : size * 0.06,
        flexShrink: 0,
      }}
    />
  );
}
