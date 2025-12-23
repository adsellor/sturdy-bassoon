import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type HelloWorldAnimationProps = {
  text?: string;
  className?: string; // applies to the wrapper
  delay?: number; // seconds
  duration?: number; // seconds
  initialY?: number; // px to slide up from
};

/**
 * HelloWorldAnimation — slides up and fades in the text, with a Replay control.
 * - Uses Framer Motion
 * - Respects reduced motion preferences
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

  const initial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: initialY };
  const animate = { opacity: 1, y: 0 };
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className={className}>
      <motion.h1
        key={runId}
        initial={initial}
        animate={animate}
        transition={transition}
        style={{ margin: 0 }}
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
        }}
      >
        Replay
      </button>
    </div>
  );
}

export default HelloWorldAnimation;
