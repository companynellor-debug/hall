import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import logoFull from '../../assets/hall-logo-full.png';

// Right eye position inside hall-logo-full.png (percent)
const EYE_ORIGIN = '19.8% 53%';
const EASE_ZOOM = [0.76, 0, 0.24, 1] as const;

export function IntroSplash({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'zoom'>('enter');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return onDone();
    const t = setTimeout(() => setPhase('zoom'), 1900);
    return () => clearTimeout(t);
  }, [onDone]);

  const zoom = phase === 'zoom';

  return (
    <motion.div
      className="intro-splash"
      data-testid="intro-splash"
      initial={{ backgroundColor: 'rgba(243,244,241,1)' }}
      animate={{ backgroundColor: zoom ? 'rgba(243,244,241,0)' : 'rgba(243,244,241,1)' }}
      transition={{ duration: 0.7, delay: zoom ? 0.45 : 0, ease: 'easeOut' }}
      onClick={() => setPhase('zoom')}
    >
      <motion.img
        src={logoFull}
        alt="HALL"
        className="intro-splash-logo"
        style={{ transformOrigin: EYE_ORIGIN }}
        initial={{ opacity: 0, scale: 0.55, rotateY: -28, rotateX: 14, z: -200, filter: 'blur(14px)' }}
        animate={
          zoom
            ? { opacity: [1, 1, 0], scale: 90, rotateY: 0, rotateX: 0, z: 0, filter: 'blur(0px)' }
            : { opacity: 1, scale: 1, rotateY: [-28, 6, 0], rotateX: [14, -3, 0], z: 0, filter: 'blur(0px)' }
        }
        transition={
          zoom
            ? { duration: 1.25, ease: EASE_ZOOM, opacity: { duration: 1.25, times: [0, 0.8, 1] } }
            : { duration: 1.3, ease: [0.16, 1, 0.3, 1] }
        }
        onAnimationComplete={() => zoom && onDone()}
      />
      <motion.span
        className="intro-splash-glow"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: zoom ? 0 : 0.5, scaleX: 1 }}
        transition={{ duration: zoom ? 0.3 : 1.2, delay: zoom ? 0 : 0.4 }}
      />
    </motion.div>
  );
}
