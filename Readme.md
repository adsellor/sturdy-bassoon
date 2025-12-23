# React Hello World Animation (Framer Motion)

## What this is
- A small, reusable React component that animates "Hello World" with a slide-up + fade-in.
- Includes a Replay button.
- Respects reduced motion preferences (no animation if user prefers reduced motion).

## Install dependency
```bash
npm install framer-motion
```

Or with other package managers:
- yarn: `yarn add framer-motion`
- pnpm: `pnpm add framer-motion`
- bun: `bun add framer-motion`

## Usage (TypeScript)

```tsx
import HelloWorldAnimation from './HelloWorldAnimation';

export default function Example() {
  return (
    <HelloWorldAnimation text="Hello World" />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `"Hello World"` | Text to display |
| `className` | `string` | `undefined` | Optional class on the wrapper div |
| `delay` | `number` | `0` | Delay before starting the animation in seconds |
| `duration` | `number` | `0.6` | Animation duration in seconds |
| `initialY` | `number` | `16` | Pixels to slide up from |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Notes
- The Replay button re-mounts the animated element to restart the animation.
- For users who prefer reduced motion, the component renders without motion.
- You can style the heading via wrapper styles/class or by wrapping the component.
