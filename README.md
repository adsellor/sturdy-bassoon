# React Native Hello Animation (Expo + Reanimated 2)

This Expo-managed React Native app showcases a springy “Hello” animation powered by Reanimated 2. The greeting auto-plays on load, provides a Replay button, and respects iOS Reduce Motion / accessibility guidance.

## Prerequisites

- Node.js 18+
- npm 9+
- Xcode + iOS Simulator (for local iOS testing)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Verify Reanimated 2 is configured:
   - `react-native-reanimated` comes preinstalled via `expo install`.
   - `babel.config.js` **must** list `'react-native-reanimated/plugin'` as the final Babel plugin (already configured here).
   - The root layout imports `'react-native-reanimated'` once (see `app/_layout.tsx`).

## Running the app (iOS focus)

Start Expo and launch the iOS simulator:

```bash
npx expo start --ios
```

The home screen centers the blue “Hello” text, auto-plays the bounce animation, and exposes a Replay button. When Reduce Motion is enabled on the simulator (Settings ▸ Accessibility ▸ Motion), the animation pauses automatically and replay taps become no-ops.

## Testing

Jest + Testing Library cover rendering, replay behavior, and Reduce Motion logic.

```bash
npm test
```

This command runs `jest --coverage` with the `jest-expo` preset, Reanimated mocks, and coverage gates (>70% lines/branches/functions/statements) for the Hello animation feature files.

## Project layout

- `components/hello-animation.tsx` – reusable animated text component with a `play()` handle.
- `hooks/use-reduce-motion.ts` – React hook that mirrors the iOS Reduce Motion preference.
- `app/(tabs)/index.tsx` – main screen integrating the animation, auto-play, Replay button, and accessibility messaging.
- `__tests__/` – unit tests for the animation component and integration behavior.

## Troubleshooting

- If you see “Reanimated plugin missing” warnings, double-check `babel.config.js` to confirm `'react-native-reanimated/plugin'` is the final plugin and restart Metro (`npx expo start -c`).
- Clear caches when switching branches or SDK versions:

  ```bash
  rm -rf .expo .expo-shared node_modules
  npm install
  npx expo start -c
  ```

Enjoy building! 🎉
