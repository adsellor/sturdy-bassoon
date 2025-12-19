<script lang="ts">
  import HelloWorldAnimation from './lib/HelloWorldAnimation.svelte';

  const usageSnippet = `<!-- src/App.svelte -->
<script>
  import HelloWorldAnimation from './lib/HelloWorldAnimation.svelte';
</scr${'ipt'}>

<HelloWorldAnimation class="hero-hello" />`;

  const themingSnippet = `:root {
  --hello-font-size: clamp(3rem, 8vw, 5rem);
  --hello-color: #0f172a;
  --hello-letter-gap: 0.2em;
  --hello-button-bg: #312e81;
  --hello-button-bg-hover: #4338ca;
  --hello-button-focus: rgba(129, 140, 248, 0.65);
}`;
</script>

<main>
  <section class="hero-copy">
    <p class="eyebrow">Svelte · CSS · Accessibility</p>
    <h1>“Hello World” letter-by-letter animation. Zero JavaScript timers.</h1>
    <p>
      A reusable, CSS-driven demo component that reveals “Hello World” one character at a time and
      exposes a keyboard-friendly Replay control—no scripts, no timers, just HTML and CSS.
    </p>
    <ul>
      <li>Animation + Replay implemented with pure CSS (two keyframes, toggled via radios).</li>
      <li>Single announcement for assistive tech via screen-reader-only text.</li>
      <li>CSS variables for typography, spacing, colors, and controls.</li>
    </ul>
  </section>

  <section class="demo-card">
    <div class="demo-heading">
      <h2>Live demo</h2>
      <p>The control below toggles between two CSS keyframes to restart the reveal instantly.</p>
    </div>
    <HelloWorldAnimation />
    <p class="hint">Animation starts on load. Activate “Replay” any time to restart.</p>
  </section>

  <section>
    <h2>Usage</h2>
    <p>Drop the component anywhere in your Svelte page. No additional scripts or stores required.</p>
    <pre><code>{usageSnippet}</code></pre>
    <ol class="steps">
      <li>Copy <code>src/lib/HelloWorldAnimation.svelte</code> into your project.</li>
      <li>Import and render it inside any page or layout.</li>
      <li>Optionally scope CSS variables (see below) to match your typography.</li>
    </ol>
  </section>

  <section>
    <h2>Theming hooks</h2>
    <p>Override the exposed CSS custom properties to align with your brand.</p>
    <div class="token-grid">
      <div>
        <span>Typography</span>
        <code>--hello-font-size</code>
        <code>--hello-font-family</code>
        <code>--hello-font-weight</code>
      </div>
      <div>
        <span>Color system</span>
        <code>--hello-color</code>
        <code>--hello-button-bg</code>
        <code>--hello-button-bg-hover</code>
        <code>--hello-button-color</code>
      </div>
      <div>
        <span>Spacing & motion</span>
        <code>--hello-letter-gap</code>
        <code>--hello-letter-spacing</code>
        <code>--hello-duration</code>
        <code>--hello-padding</code>
      </div>
    </div>
    <p>Example override:</p>
    <pre><code>{themingSnippet}</code></pre>
  </section>

  <section>
    <h2>Accessibility notes</h2>
    <ul>
      <li>Screen readers announce the static text once via an off-screen span.</li>
      <li>Replay control uses semantic labeling, focus styles, and no focus traps.</li>
      <li>
        Reduced-motion users skip the animation automatically thanks to the
        <code>prefers-reduced-motion</code> media query.
      </li>
    </ul>
  </section>
</main>
