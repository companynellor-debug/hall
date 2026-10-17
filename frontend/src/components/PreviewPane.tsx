import { HallMascot } from './HallMascot';
import { IPhoneMockup } from './ui/iphone-mockup';

type Device = 'desktop' | 'tablet' | 'mobile';

interface Props {
  device: Device;
  html: string | null;
  building: boolean;
  reloading: boolean;
  frameKey: number;
}

const MOBILE_WALLPAPER = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
const TABLET_WALLPAPER = 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
const DESKTOP_WALLPAPER = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

export function PreviewPane({ device, html, building, reloading, frameKey }: Props) {
  const src = html ?? undefined;

  return (
    <div className={`ws-preview-stage pv2-stage device-${device}`}>
      <div className={`ws-preview-frame pv2-frame device-${device}`} data-testid="preview-frame">
        {(building || reloading) && <div className="pv2-progress" data-testid="preview-loading" />}
        {src ? (
          device === 'mobile' ? (
            <IPhoneMockup
              model="15-pro"
              color="space-black"
              orientation="portrait"
              scale={0.75}
              wallpaper={MOBILE_WALLPAPER}
              wallpaperFit="cover"
              shadow={true}
              showHomeIndicator={true}
              innerShadow={true}
              frameStyle={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
            >
              <iframe key={frameKey} title="Preview do app" className="pv2-iframe" srcDoc={src} sandbox="allow-scripts" data-testid="preview-iframe" style={{ width: '100%', height: '100%', border: 'none' }} />
            </IPhoneMockup>
          ) : device === 'tablet' ? (
            <div className="tablet-frame" style={{
              width: '768px',
              height: '1024px',
              borderRadius: '24px',
              background: '#000',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              padding: '24px',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '20px', overflow: 'hidden', background: '#000' }}>
                <img src={TABLET_WALLPAPER} alt="Tablet wallpaper" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
                <iframe key={frameKey} title="Preview do app" className="pv2-iframe" srcDoc={src} sandbox="allow-scripts" data-testid="preview-iframe" style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }} />
              </div>
            </div>
          ) : (
            <div className="desktop-frame" style={{
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              padding: '32px',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '48px',
                background: '#2d2d2d',
                borderBottom: '1px solid #3d3d3d',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                gap: '8px'
              }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
              </div>
              <img src={DESKTOP_WALLPAPER} alt="Desktop wallpaper" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, pointerEvents: 'none' }} />
              <iframe key={frameKey} title="Preview do app" className="pv2-iframe" srcDoc={src} sandbox="allow-scripts" data-testid="preview-iframe" style={{ width: '100%', height: '100%', border: 'none', position: 'relative', zIndex: 1 }} />
            </div>
          )
        ) : (
          <div className="ws-pv-empty light" data-testid="preview-empty">
            {building ? <HallMascot state="building" size={96} /> : <span className="ws-pv-empty-orb" />}
            <h3>{building ? 'Construindo seu app…' : 'Seu preview aparecerá aqui'}</h3>
            <p>{building ? 'O HALL está editando os arquivos. O preview abre assim que o build passar.' : 'Envie um prompt no chat para o HALL gerar e renderizar seu app ao vivo nesta janela.'}</p>
          </div>
        )}
        {src && building && (
          <div className="pv2-overlay" data-testid="preview-rebuilding">
            <HallMascot state="building" size={56} />
            <span>Aplicando alterações…</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviewPane;
