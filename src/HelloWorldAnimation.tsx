import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type HelloWorldAnimationProps = {
  text?: string;
  className?: string; // applies to the wrapper
  delay?: number; // seconds
  duration?: number; // seconds
  initialY?: number; // px to slide up from
};

// Confetti colors
const CONFETTI_COLORS = [
  '#FF6B6B', // red
  '#4ECDC4', // teal
  '#FFE66D', // yellow
  '#95E1D3', // mint
  '#F38181', // coral
  '#AA96DA', // purple
  '#74B9FF', // blue
  '#FF9FF3', // pink
];

type ConfettiPiece = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  shape: 'rect' | 'circle';
  size: number;
  delay: number;
  duration: number;
  endX: number;
  endY: number;
  endRotation: number;
};

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.random() * Math.PI * 2);
    const velocity = 80 + Math.random() * 120;
    const endX = Math.cos(angle) * velocity;
    const endY = Math.sin(angle) * velocity - 50 + Math.random() * 200; // gravity effect
    
    return {
      id: i,
      x: 0,
      y: 0,
      rotation: Math.random() * 360,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      size: 6 + Math.random() * 8,
      delay: Math.random() * 0.2,
      duration: 0.8 + Math.random() * 0.6,
      endX,
      endY,
      endRotation: Math.random() * 720 - 360,
    };
  });
}

function ConfettiSVG({ 
  pieces, 
  prefersReducedMotion 
}: { 
  pieces: ConfettiPiece[]; 
  prefersReducedMotion: boolean | null;
}) {
  if (prefersReducedMotion) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 400,
        height: 400,
        marginLeft: -200,
        marginTop: -200,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      {pieces.map((piece) => (
        <motion.g
          key={piece.id}
          initial={{
            x: 200,
            y: 200,
            opacity: 1,
            rotate: piece.rotation,
          }}
          animate={{
            x: 200 + piece.endX,
            y: 200 + piece.endY,
            opacity: 0,
            rotate: piece.rotation + piece.endRotation,
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {piece.shape === 'rect' ? (
            <rect
              x={-piece.size / 2}
              y={-piece.size / 2}
              width={piece.size}
              height={piece.size * 0.6}
              fill={piece.color}
              rx={2}
            />
          ) : (
            <circle
              cx={0}
              cy={0}
              r={piece.size / 2}
              fill={piece.color}
            />
          )}
        </motion.g>
      ))}
    </svg>
  );
}

/**
 * HelloWorldAnimation — slides up and fades in the text, with a Replay control.
 * - Uses Framer Motion
 * - Respects reduced motion preferences
 * - Includes SVG confetti animation
 */
export function HelloWorldAnimation({
  text = 'Hello World',
  className,
  delay = 0,
  duration = 0.6,
  initialY = 16,
}: HelloWorldAnimationProps) {
  const prefersReducedMotion = useReducedMotion();
  const [runId, setRunId] = useState(0);

  // Generate new confetti pieces on each replay
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const confettiPieces = useMemo(() => generateConfetti(30), [runId]);

  const initial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: initialY };
  const animate = { opacity: 1, y: 0 };
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className={className} style={{ position: 'relative' }}>
      <ConfettiSVG key={runId} pieces={confettiPieces} prefersReducedMotion={prefersReducedMotion} />
      
      <motion.h1
        key={`text-${runId}`}
        initial={initial}
        animate={animate}
        transition={transition}
        style={{ margin: 0, position: 'relative', zIndex: 1 }}
      >
        {text}
      </motion.h1>

      <button
        type="button"
        onClick={() => setRunId((v) => v + 1)}
        aria-label="Replay animation"
        style={{
          marginTop: 8,
          border: '1px solid #ccc',
          background: '#fff',
          borderRadius: 6,
          padding: '6px 10px',
          cursor: 'pointer',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Replay
      </button>
    </div>
  );
}

export default HelloWorldAnimation;
