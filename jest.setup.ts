import type { ComponentType } from 'react';
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const ReactNative = require('react-native');

  const sharedValue = (value: unknown) => ({ value });
  const withSequence = jest.fn((...args: unknown[]) => args[args.length - 1]);
  const withSpring = jest.fn((value: unknown) => value);
  const cancelAnimation = jest.fn();

  const Animated = new Proxy(
    {},
    {
      get: (_target, key: keyof typeof ReactNative) => {
        const Component = (ReactNative as any)[key];
        return Component ?? ReactNative.View;
      },
    },
  );

  return {
    __esModule: true,
    default: Animated,
    ...Animated,
    useSharedValue: sharedValue,
    useAnimatedStyle: (fn: () => Record<string, unknown>) => fn(),
    useAnimatedProps: (fn: () => Record<string, unknown>) => fn(),
    withSequence,
    withSpring,
    cancelAnimation,
    Easing: {
      linear: () => {},
    },
    runOnJS: (fn: (...args: unknown[]) => unknown) => fn,
    runOnUI: (fn: (...args: unknown[]) => unknown) => fn,
    createAnimatedComponent: (Component: ComponentType) => Component,
  };
});
