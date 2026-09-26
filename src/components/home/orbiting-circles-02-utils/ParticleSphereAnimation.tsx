import { useEffect, useRef } from 'react';

export function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 150;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) / 2 - 10;

    // Resize canvas
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * maxRadius;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      particles.push({
        x: centerX + radius * Math.sin(phi) * Math.cos(theta),
        y: centerY + radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.5 ? '#FF3333' : '#FF6666',
      });
    }

    let animationId: number;

    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentCenterX = canvas.width / 2;
      const currentCenterY = canvas.height / 2;

      particles.forEach(p => {
        // Simple orbital motion
        const dx = p.x - currentCenterX;
        const dy = p.y - currentCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
          const force = 0.0005 * maxRadius / dist;
          p.vx -= dx * force;
          p.vy -= dy * force;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Boundary check
        const distFromCenter = Math.sqrt(
          (p.x - currentCenterX) ** 2 + (p.y - currentCenterY) ** 2
        );
        if (distFromCenter > maxRadius) {
          const angle = Math.atan2(p.y - currentCenterY, p.x - currentCenterX);
          p.x = currentCenterX + Math.cos(angle) * maxRadius * 0.95;
          p.y = currentCenterY + Math.sin(angle) * maxRadius * 0.95;
          p.vx *= -0.5;
          p.vy *= -0.5;
        }

        // Draw particle
        const alpha = p.opacity * (1 - distFromCenter / maxRadius);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
        // Simple color handling
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-sphere-canvas"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
}

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  color: string;
}