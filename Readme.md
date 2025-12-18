# Hello World Animation

A lightweight, CSS-first React component that reveals “Hello, World!” (or any text) with a staggered fade-up motion and a Replay button. Motion is entirely CSS-driven for smooth performance, and accessibility is baked in—screen-reader friendly text, focus-visible styles, and full support for reduced-motion preferences.

## Highlights
- GPU-friendly opacity/transform animation with per-character staggering.
- Replay button remounts the animated node to restart the sequence without timers.
- Honors both `prefers-reduced-motion` and an in-app `disableMotion` prop.
- Ships with Storybook stories so you can preview and tweak props quickly.

## Usage (Vite + React + TS)
1. Copy the component assets into your project:
   - `src/components/HelloWorldAnimation.tsx`
   - `src/components/helloWorldAnimation.css`
   - `src/components/HelloWorldAnimation.stories.tsx` (optional, for Storybook)
2. Import and render the component:
   ```tsx
   import { HelloWorldAnimation } from './components/HelloWorldAnimation';
   import './components/helloWorldAnimation.css';

   export function App() {
     return (
       <main>
         <HelloWorldAnimation text="Hello, World!" />
       </main>
     );
   }
   ```
3. (Optional) Wire up a global animation toggle:
   ```tsx
   const [animationsOff, setAnimationsOff] = useState(false);
   <label>
     <input
       type="checkbox"
       checked={animationsOff}
       onChange={e => setAnimationsOff(e.target.checked)}
     />
     Disable animations
   </label>
   <HelloWorldAnimation text="Hello, World!" disableMotion={animationsOff} />
   ```

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Hello, World!"` | Text string to animate, spaces are preserved. |
| `durationMs` | `number` | `800` | Duration of each character animation in milliseconds. |
| `staggerMs` | `number` | `60` | Delay between character animations. |
| `disableMotion` | `boolean` | `false` | Forces all motion off and hides the Replay button. |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'p' \| 'span' \| 'div'` | `'h1'` | Semantic wrapper element for the animated text. |
| `className` | `string` | — | Optional custom class(es) applied to the root. |

## Storybook
The included `HelloWorldAnimation.stories.tsx` file surfaces controls for `text`, `durationMs`, `staggerMs`, `disableMotion`, and the `as` element so you can experiment interactively. Drop the files into an existing Storybook setup and run `npm run storybook` (or your project’s equivalent) to explore the scenarios (`Default`, `SlowAndDramatic`, `MotionDisabled`).

