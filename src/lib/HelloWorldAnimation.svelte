<script lang="ts">
  const phrase = 'Hello World';
  const letters = phrase.split('');
  const instanceId = `hw-${Math.random().toString(36).slice(2, 9)}`;
  const replayName = `${instanceId}-replay`;
  const toggleA = `${instanceId}-a`;
  const toggleB = `${instanceId}-b`;
  const lettersId = `${instanceId}-letters`;
  const srLabelId = `${instanceId}-sr`;

  const renderChar = (char: string) => (char === ' ' ? '\u00A0' : char);
</script>

<div class="hw-wrapper" aria-labelledby={srLabelId} role="group">
  <span class="hw-sr" id={srLabelId}>Hello World</span>

  <input class="hw-toggle" type="radio" name={replayName} id={toggleA} checked />
  <label class="hw-replay" for={toggleB}>
    <span aria-hidden="true">Replay</span>
  </label>

  <input class="hw-toggle" type="radio" name={replayName} id={toggleB} />
  <label class="hw-replay" for={toggleA}>
    <span aria-hidden="true">Replay</span>
  </label>

  <div class="hw-text" id={lettersId} aria-hidden="true">
    {#each letters as char, index}
      <span class="hw-letter" style={`--index:${index};`} data-char={char.trim() === '' ? 'space' : char}>
        {renderChar(char)}
      </span>
    {/each}
  </div>
</div>

<style>
  .hw-wrapper {
    --hw-duration: var(--hello-duration, 1800ms);
    --hw-letter-gap: var(--hello-letter-gap, 0.1em);
    --hw-letter-spacing: var(--hello-letter-spacing, 0.02em);
    --hw-color: var(--hello-color, #0f172a);
    --hw-font-size: var(--hello-font-size, clamp(2.5rem, 8vw, 4.5rem));
    --hw-font-weight: var(--hello-font-weight, 600);
    --hw-font-family: var(--hello-font-family, 'Space Grotesk', 'Segoe UI', system-ui, sans-serif);
    --hw-padding: var(--hello-padding, clamp(0.5rem, 2vw, 1rem));
    --hw-button-bg: var(--hello-button-bg, #0f172a);
    --hw-button-bg-hover: var(--hello-button-bg-hover, #4338ca);
    --hw-button-color: var(--hello-button-color, #f8fafc);
    --hw-button-focus: var(--hello-button-focus, rgba(129, 140, 248, 0.8));
    --hw-caret-color: var(--hello-caret-color, #4338ca);
    --hw-letter-count: 11;

    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    color: var(--hw-color);
    font-family: var(--hw-font-family);
    padding: var(--hw-padding);
    border-radius: 1.25rem;
    background: var(--hello-background, rgba(248, 250, 252, 0.6));
    border: 1px solid rgba(15, 23, 42, 0.12);
    position: relative;
    isolation: isolate;
  }

  .hw-sr {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .hw-text {
    display: inline-flex;
    gap: var(--hw-letter-gap);
    font-size: var(--hw-font-size);
    font-weight: var(--hw-font-weight);
    letter-spacing: var(--hw-letter-spacing);
    position: relative;
    line-height: 1.05;
    white-space: nowrap;
    min-height: 1em;
  }

  .hw-text::after {
    content: '';
    width: clamp(0.15em, 0.5vw, 0.2em);
    background: var(--hw-caret-color);
    margin-left: 0.15em;
    animation: hw-caret 1.2s steps(2, end) infinite;
    align-self: stretch;
  }

  .hw-letter {
    display: inline-block;
    opacity: 1;
    transform: translateY(0);
    animation-duration: 600ms;
    animation-fill-mode: both;
    animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
    animation-delay: calc(var(--index) * (var(--hw-duration) / var(--hw-letter-count)));
    will-change: transform, opacity;
  }

  /* Default animation assignment */
  .hw-letter {
    animation-name: hw-reveal-a;
  }

  /* Toggle-driven animation swap */
  .hw-toggle:first-of-type:checked ~ .hw-text .hw-letter {
    animation-name: hw-reveal-a;
  }

  .hw-toggle:last-of-type:checked ~ .hw-text .hw-letter {
    animation-name: hw-reveal-b;
  }

  .hw-toggle {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .hw-replay {
    display: none;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: var(--hw-button-bg);
    color: var(--hw-button-color);
    border-radius: 999px;
    padding: 0.6rem 1.5rem;
    cursor: pointer;
    border: none;
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
    transition: background 200ms ease, transform 200ms ease, box-shadow 200ms ease;
  }

  .hw-replay:hover {
    background: var(--hw-button-bg-hover);
    transform: translateY(-1px);
    box-shadow: 0 15px 35px rgba(15, 23, 42, 0.2);
  }

  .hw-replay:active {
    transform: translateY(0);
    box-shadow: 0 8px 16px rgba(15, 23, 42, 0.18);
  }

  .hw-toggle:checked + .hw-replay {
    display: inline-flex;
  }

  .hw-toggle:focus-visible + .hw-replay {
    outline: 3px solid var(--hw-button-focus);
    outline-offset: 4px;
  }

  @keyframes hw-reveal-a {
    0% {
      opacity: 0;
      transform: translateY(0.35em);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes hw-reveal-b {
    0% {
      opacity: 0;
      transform: translateY(0.35em);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes hw-caret {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hw-letter,
    .hw-text::after {
      animation: none !important;
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 600px) {
    .hw-wrapper {
      width: 100%;
    }

    .hw-text {
      font-size: clamp(2.1rem, 10vw, 3rem);
      white-space: normal;
      flex-wrap: wrap;
    }

    .hw-text::after {
      display: none;
    }
  }
</style>
