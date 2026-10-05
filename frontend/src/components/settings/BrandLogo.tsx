import {
  siGithub, siNvidia, siOpenrouter, siSupabase, siVercel, siStripe,
} from 'simple-icons';

interface BrandLogoProps {
  name: string;
  size?: number;
  colored?: boolean;
}

const BRANDS: Record<string, { path: string; hex: string; title: string }> = {
  github: siGithub,
  nvidia: siNvidia,
  openrouter: siOpenrouter,
  supabase: siSupabase,
  vercel: siVercel,
  stripe: siStripe,
};

/* Marcas cujo logo é escuro/preto — precisam de cor clara no fundo escuro */
const LIGHT_ON_DARK = new Set(['github', 'vercel']);

/* Asaas — logo oficial (não disponível no simple-icons) */
const ASAAS = {
  hex: '0073E6',
  title: 'Asaas',
  path: 'M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5zm3.94 9.03c-.24 0-.44.18-.44.42v2.4c0 1.05-.6 1.62-1.5 1.62h-.36v-4.02c0-.24-.2-.42-.44-.42s-.43.18-.43.42v4.02h-1.2c-.9 0-1.5-.57-1.5-1.62v-2.4c0-.24-.2-.42-.44-.42s-.43.18-.43.42v2.4c0 1.47.9 2.34 2.37 2.34h3.4c.24 0 .43-.18.43-.42v-4.32c0-.24-.2-.42-.43-.42zM9.66 6.42c-.24 0-.43.18-.43.42v4.29c0 .24.19.42.43.42s.44-.18.44-.42V6.84c0-.24-.2-.42-.44-.42z',
};

export function BrandLogo({ name, size = 22, colored = true }: BrandLogoProps) {
  const brand = name === 'asaas' ? ASAAS : BRANDS[name];
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
