import React, { useRef, useEffect } from 'react';

interface NoiseProps {
  patternAlpha?: number; // 0-255
}

const Noise: React.FC<NoiseProps> = ({ patternAlpha = 15 }) => {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const canvasSize = 512;

    const drawGrain = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    // Static grain: draw once (cheap, no per-frame CPU cost). Redraw on resize.
    drawGrain();
    window.addEventListener('resize', drawGrain);
    return () => window.removeEventListener('resize', drawGrain);
  }, [patternAlpha]);

  return (
    <canvas
      ref={grainRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        imageRendering: 'pixelated',
        // Keep the grain strictly on the outer background — fade it fully out
        // behind the central content (3D sphere, title, chat field, orbit).
        WebkitMaskImage:
          'radial-gradient(ellipse 56% 84% at 50% 46%, transparent 40%, #000 86%)',
        maskImage:
          'radial-gradient(ellipse 56% 84% at 50% 46%, transparent 40%, #000 86%)',
      }}
    />
  );
};

/** Global platform background: near-black base + red spotlight + subtle grid + grain. */
export default function Background() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Red radial spotlight (HALL accent) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle 620px at 50% 180px, rgba(229,57,53,0.20), transparent 70%)',
        }}
      />
      {/* Faint fading grid, masked toward the top */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '22px 26px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 55% at 50% 12%, #000 65%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 80% 55% at 50% 12%, #000 65%, transparent 100%)',
        }}
      />
      {/* Grain overlay */}
      <Noise patternAlpha={15} />
    </div>
  );
}
