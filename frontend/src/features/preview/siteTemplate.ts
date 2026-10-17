const ACCENTS = ['#4e8a6b', '#c2483a', '#3b6fd8', '#8a55c9', '#d08a2c'];

const FEATURE_RULES: [RegExp, string, string][] = [
  [/auth|login|senha|conta/i, 'Autenticação segura', 'Login com e-mail e sessões protegidas desde o primeiro dia.'],
  [/pagament|stripe|checkout|pix|assinatura/i, 'Pagamentos integrados', 'Checkout rápido com cartão e Pix, recibos automáticos.'],
  [/dashboard|painel|admin|métrica|metrica/i, 'Painel em tempo real', 'Métricas, gráficos e exportação em um só lugar.'],
  [/chat|mensag|notifica/i, 'Mensagens ao vivo', 'Conversas em tempo real com notificações instantâneas.'],
  [/blog|seo|conteúdo|conteudo/i, 'Blog com SEO', 'Publique conteúdo otimizado para buscadores.'],
  [/api|rest|endpoint/i, 'API documentada', 'Endpoints claros, rate limiting e documentação viva.'],
  [/cliente|crm|venda/i, 'Gestão de clientes', 'Histórico, tags e funil de vendas organizados.'],
  [/loja|produto|carrinho|marketplace/i, 'Catálogo e carrinho', 'Vitrine responsiva com carrinho persistente.'],
];
const DEFAULTS: [string, string][] = [
  ['Design responsivo', 'Perfeito no celular, tablet e desktop.'],
  ['Rápido de verdade', 'Carregamento instantâneo e animações suaves.'],
  ['Pronto para crescer', 'Arquitetura simples de evoluir a cada pedido.'],
];

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function makeSiteHtml(projectName: string, prompt: string, version: number) {
  const accent = ACCENTS[(version - 1) % ACCENTS.length];
  const feats = FEATURE_RULES.filter(([re]) => re.test(prompt)).map(([, t, d]) => [t, d] as [string, string]);
  const features = [...feats, ...DEFAULTS].slice(0, 3);
  const name = esc(projectName || 'Meu App');
  const sub = esc(prompt.length > 140 ? `${prompt.slice(0, 140)}…` : prompt);

  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name}</title>
<style>
*{box-sizing:border-box;margin:0}body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;color:#141815;background:#fafaf7}
nav{display:flex;align-items:center;justify-content:space-between;padding:18px 6vw}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;letter-spacing:-.02em}
.logo i{width:26px;height:26px;border-radius:8px;background:${accent};display:block}
nav a{color:#555;text-decoration:none;font-size:14px;margin-left:22px}
.hero{padding:9vh 6vw 7vh;display:grid;gap:22px;max-width:980px}
.pill{display:inline-flex;width:max-content;gap:8px;align-items:center;font-size:12px;font-weight:600;padding:6px 12px;border-radius:999px;background:${accent}18;color:${accent}}
h1{font-size:clamp(34px,6vw,64px);line-height:1.02;letter-spacing:-.04em}
.hero p{font-size:clamp(15px,1.6vw,19px);color:#5b635d;max-width:640px;line-height:1.55}
.cta{display:flex;gap:10px;flex-wrap:wrap}.cta a{padding:13px 22px;border-radius:12px;font-weight:600;font-size:14px;text-decoration:none}
.p{background:#141815;color:#fff}.s{border:1px solid #d9dcd6;color:#141815}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;padding:0 6vw 9vh}
.card{background:#fff;border:1px solid #ebede8;border-radius:18px;padding:22px;animation:up .6s both}
.card:nth-child(2){animation-delay:.08s}.card:nth-child(3){animation-delay:.16s}
.card b{display:block;width:34px;height:34px;border-radius:10px;background:${accent};opacity:.9;margin-bottom:14px}
.card h3{font-size:16px;margin-bottom:6px}.card p{font-size:14px;color:#646b66;line-height:1.5}
footer{padding:26px 6vw;border-top:1px solid #ebede8;font-size:13px;color:#8a918b;display:flex;justify-content:space-between}
@keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
</style></head><body>
<nav><div class="logo"><i></i>${name}</div><div><a href="#">Recursos</a><a href="#">Preços</a><a href="#">Entrar</a></div></nav>
<section class="hero"><span class="pill">● Versão ${version} · gerado pelo HALL</span><h1>${name}</h1><p>${sub}</p>
<div class="cta"><a class="p" href="#">Começar agora</a><a class="s" href="#">Ver demonstração</a></div></section>
<section class="grid">${features.map(([t, d]) => `<div class="card"><b></b><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</section>
<footer><span>© ${new Date().getFullYear()} ${name}</span><span>Feito com HALL</span></footer>
</body></html>`;
}
