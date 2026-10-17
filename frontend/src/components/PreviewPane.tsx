import { HallMascot } from './HallMascot';

type Device = 'desktop' | 'tablet' | 'mobile';

interface Props {
  device: Device;
  html: string | null;
  building: boolean;
  reloading: boolean;
  frameKey: number;
}

export function PreviewPane({ device, html, building, reloading, frameKey }: Props) {
  return (
    <div className={`ws-preview-stage pv2-stage device-${device}`}>
      <div className={`ws-preview-frame pv2-frame device-${device}`} data-testid="preview-frame">
        {(building || reloading) && <div className="pv2-progress" data-testid="preview-loading" />}
        {html ? (
          <iframe key={frameKey} title="Preview do app" className="pv2-iframe" srcDoc={html} sandbox="allow-scripts" data-testid="preview-iframe" />
        ) : (
          <div className="ws-pv-empty light" data-testid="preview-empty">
            {building ? <HallMascot state="building" size={96} /> : <span className="ws-pv-empty-orb" />}
            <h3>{building ? 'Construindo seu app…' : 'Seu preview aparecerá aqui'}</h3>
            <p>{building ? 'O HALL está editando os arquivos. O preview abre assim que o build passar.' : 'Envie um prompt no chat para o HALL gerar e renderizar seu app ao vivo nesta janela.'}</p>
          </div>
        )}
        {html && building && (
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
