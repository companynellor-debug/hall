import { motion, AnimatePresence } from 'framer-motion';

type HallMascotState = 
  | 'idle' 
  | 'listening' 
  | 'thinking' 
  | 'building' 
  | 'success' 
  | 'error' 
  | 'sleeping';

interface HallMascotProps {
  state: HallMascotState;
  size?: number | string;
  animated?: boolean;
  className?: string;
  decorative?: boolean;
}

const STATE_IMAGES: Record<HallMascotState, string> = {
  idle: '/assets/hall/hall-idle.png',
  listening: '/assets/hall/hall-listening.png',
  thinking: '/assets/hall/hall-thinking.png',
  building: '/assets/hall/hall-building.png',
  success: '/assets/hall/hall-success.png',
  error: '/assets/hall/hall-idle.png', // Fallback para idle se erro não fornecido
  sleeping: '/assets/hall/hall-sleeping.png',
};

export function HallMascot({ state, size = 100, animated = true, className = '', decorative = false }: HallMascotProps) {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldAnimate = animated && !isReducedMotion;

  return (
    <div className={`hall-mascot-container ${className}`} style={{ width: size, height: size }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={state}
          src={STATE_IMAGES[state] || STATE_IMAGES.idle}
          alt={decorative ? "" : `HALL mascot in ${state} state`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </AnimatePresence>
    </div>
  );
}
