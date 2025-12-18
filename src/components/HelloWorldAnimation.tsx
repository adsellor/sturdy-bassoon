import React, { useMemo, useState } from 'react';
import './helloWorldAnimation.css';

export type HelloWorldAnimationProps = {
  text?: string;
  /** Duration of each character's animation in ms */
  durationMs?: number;
  /** Stagger delay between characters in ms */
  staggerMs?: number;
  /** In-app toggle to disable motion regardless of system setting */
  disableMotion?: boolean;
  /** Semantic element for the text container */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
};

/**
 * HelloWorldAnimation
 * CSS-first, accessible fade-up stagger animation for text with a Replay button.
 */
export function HelloWorldAnimation({
  text = 'Hello, World!',
  durationMs = 800,
  staggerMs = 60,
  disableMotion = false,
  as: As = 'h1',
  className,
}: HelloWorldAnimationProps) {
  // Key used to force remount to retrigger the CSS animation on Replay.
  const [animKey, setAnimKey] = useState(0);

  // Split text into characters, preserving spaces as non-breaking spaces
  const chars = useMemo(
    () =>
      text.split('').map((ch, idx) => ({
        ch: ch === ' ' ? '\u00A0' : ch,
        key: `${ch}-${idx}`,
      })),
    [text],
  );

  const rootClass = ['hw-root', disableMotion ? 'no-motion' : undefined, className]
    .filter(Boolean)
    .join(' ');

  const styleVars = {
    // CSS custom properties, consumed by the stylesheet
    ['--duration' as any]: `${durationMs}ms`,
    ['--stagger' as any]: `${staggerMs}ms`,
  } as React.CSSProperties;

  const handleReplay = () => setAnimKey(k => k + 1);

  return (
    <div className={rootClass} style={styleVars}>
      <As className="hw-text" key={animKey}>
        {chars.map((c, i) => (
          <span
            className="hw-char"
            style={{ ['--i' as any]: i } as React.CSSProperties}
            aria-hidden="true"
            key={c.key}
          >
            {c.ch}
          </span>
        ))}
        <span className="sr-only" aria-live="polite">
          {text}
        </span>
      </As>

      <button
        type="button"
        className="hw-replayBtn"
        onClick={handleReplay}
        disabled={disableMotion}
        aria-label="Replay animation"
      >
        Replay
      </button>
    </div>
  );
}

export default HelloWorldAnimation;

