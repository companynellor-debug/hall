import { useEffect, useRef } from 'react';
import { ParticleSphereAnimation } from './orbiting-circles-02-utils/ParticleSphereAnimation';

interface OrbitIcon {
  src: string;
  alt: string;
  angle: number;
}

interface Orbit {
  size: { width: number; height: number };
  duration: number;
  icons: OrbitIcon[];
}

const orbits: Orbit[] = [
  {
    size: { width: 300, height: 300 },
    duration: 18,
    icons: [
      { src: 'https://cdn.21st.dev/assets/mirror/27/279f60ffd95d6d6e982c0d9544f465b21ba7895d2a7ba9dc2ea798f0aad31074.svg', alt: 'Supabase', angle: -60 },
      { src: 'https://cdn.21st.dev/assets/mirror/fd/fd242636f2a6c8ce90ddf51d45234a7add1a7262d0d517ef551a290d99fdb620.svg', alt: 'Gemini', angle: 0 },
      { src: 'https://cdn.21st.dev/assets/mirror/d2/d27b280b7858bb5b89008eb325b9d4bdbd93ee1df92f8210247da4abc8a9c1ce.svg', alt: 'Make', angle: 60 },
    ],
  },
  {
    size: { width: 420, height: 420 },
    duration: 24,
    icons: [
      { src: 'https://cdn.21st.dev/assets/mirror/cd/cdf9d8e18269a990e7854c0255d64513e5f8b6052b8580dd8f24480a85ec130a.svg', alt: 'Figma', angle: -90 },
      { src: 'https://cdn.21st.dev/assets/mirror/83/83a5f27a428146febbe4672046c78bfa796a7931aebab5705655cab4fffb5794.svg', alt: 'Slack', angle: 90 },
    ],
  },
  {
    size: { width: 560, height: 560 },
    duration: 30,
    icons: [
      { src: 'https://cdn.21st.dev/assets/mirror/b5/b58af96de173670c64254e6d93ca4e4daf57b2637cc4fb90529f3232ea1bdf3f.svg', alt: 'Claude', angle: -60 },
      { src: 'https://cdn.21st.dev/assets/mirror/a2/a21f0f00193ad70e39d2d82b6437464853f77bf6569adeb1ecc6d1f7bc0f5226.svg', alt: 'React', angle: 0 },
      { src: 'https://cdn.21st.dev/assets/mirror/96/96c6123c466766d6714874ae77ba88be923c98313f09bbd72c9860ff26797d53.svg', alt: 'Python', angle: 60 },
    ],
  },
];

const orbitRingStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%) translateY(50%)',
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.08)',
};

const iconArmStyle = (orbitAnim: string, duration: number): React.CSSProperties => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  height: '50%',
  marginLeft: '-24px',
  transformOrigin: 'bottom center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  animation: `${orbitAnim} ${duration}s linear infinite`,
});

const iconContainerStyle = (counterAnim: string, duration: number): React.CSSProperties => ({
  padding: '8px 12px',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '50%',
  background: '#0D0F14',
  marginTop: '-24px',
  position: 'relative',
  zIndex: 10,
  animation: `${counterAnim} ${duration}s linear infinite`,
});

const particleGlobeStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%) translateY(50%)',
  aspectRatio: '1 / 1',
  pointerEvents: 'none',
  width: '120px',
  maxWidth: '200px',
  zIndex: 10,
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  maxWidth: '720px',
  height: '300px',
  overflow: 'visible',
  display: 'flex',
  justifyContent: 'center',
  margin: '8px auto 0',
};

export function OrbitingCirclesGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const styleId = 'orbiting-circles-keyframes';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes orbit-cw {
        from { transform: rotate(var(--start-angle)); }
        to { transform: rotate(calc(var(--start-angle) + 360deg)); }
      }
      @keyframes orbit-ccw {
        from { transform: rotate(var(--start-angle)); }
        to { transform: rotate(calc(var(--start-angle) - 360deg)); }
      }
      @keyframes counter-cw {
        from { transform: rotate(var(--counter-offset, 0deg)); }
        to { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)); }
      }
      @keyframes counter-ccw {
        from { transform: rotate(var(--counter-offset, 0deg)); }
        to { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('orbiting-circles-keyframes');
      if (el) el.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={containerStyle}
    >
      {/* Center particle globe */}
      <div style={particleGlobeStyle}>
        <ParticleSphereAnimation />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? 'orbit-cw' : 'orbit-ccw';
        const counterAnim = isCW ? 'counter-ccw' : 'counter-cw';

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
            alt: `${ic.alt}-mirror`,
          })),
        ];

        return (
          <div
            key={index}
            style={{
              ...orbitRingStyle,
              width: orbit.size.width,
              height: orbit.size.height,
            }}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                style={{
                  ...iconArmStyle(orbitAnim, orbit.duration),
                  '--start-angle': `${iconData.angle}deg`,
                } as React.CSSProperties}
              >
                <div
                  style={{
                    ...iconContainerStyle(counterAnim, orbit.duration),
                    '--counter-offset': `${-iconData.angle}deg`,
                  } as React.CSSProperties}
                >
                  <img
                    src={iconData.src}
                    alt={iconData.alt}
                    width={32}
                    height={32}
                    style={{ width: 24, height: 24 }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}