# Svelte Hello World Animation (CSS Only)

A small Vite + Svelte demo that renders the phrase “Hello World” letter-by-letter using only HTML and CSS.
The Replay control swaps between two CSS keyframes (no JavaScript) and remains keyboard-accessible.

## Getting started

```bash
npm install
npm run dev
```

- `npm run dev` – start the Vite dev server.
- `npm run build` – create a production build in `dist/`.
- `npm run preview` – preview the production build.
- `npm run check` – run `svelte-check` for type + accessibility hints.

## Component usage

`src/lib/HelloWorldAnimation.svelte` exposes the animated text block. Import and drop it in any Svelte file:

```svelte
<script>
  import HelloWorldAnimation from './lib/HelloWorldAnimation.svelte';
</script>

<HelloWorldAnimation class="hero-hello" />
```

### Theming hooks

Override any of the following CSS custom properties on the host element (or globally) to update the look without touching component logic:

- `--hello-font-size`
- `--hello-font-family`
- `--hello-font-weight`
- `--hello-color`
- `--hello-letter-gap`
- `--hello-letter-spacing`
- `--hello-duration`
- `--hello-padding`
- `--hello-button-bg`
- `--hello-button-bg-hover`
- `--hello-button-color`
- `--hello-button-focus`

Example:

```css
:root {
  --hello-font-size: clamp(3rem, 7vw, 5rem);
  --hello-color: #0f172a;
  --hello-button-bg: #312e81;
}
```

## Accessibility

- Screen readers announce the phrase once through an off-screen span (`aria-hidden="true"` covers the animated letters).
- Focus remains on standard radio inputs, and the associated label mirrors the focus ring so keyboard users always see where they are.
- A `prefers-reduced-motion` media query skips the animation while keeping the copy visible.

## Replay implementation (CSS-only)

Two hidden radio inputs share a name. Only the label following the currently checked radio is displayed; clicking it switches to the other radio, which swaps animation names and restarts the sequence without JavaScript.
