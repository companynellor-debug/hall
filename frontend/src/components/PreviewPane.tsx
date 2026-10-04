type Device = 'desktop' | 'tablet' | 'mobile';

export function PreviewPane({ device }: { device: Device }) {
  return (
    <div className={`ws-preview-stage device-${device}`}>
      <div className="ws-preview-frame">
        <div className="ws-pv-empty light">
          <span className="ws-pv-empty-orb" />
          <h3>Seu preview aparecerá aqui</h3>
          <p>Envie um prompt no chat para o HALL gerar e renderizar seu app ao vivo nesta janela.</p>
        </div>
      </div>
    </div>
  );
}

export default PreviewPane;
