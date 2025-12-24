import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import HomeScreen from '@/app/(tabs)/index';
import type { ReduceMotionPreference } from '@/hooks/use-reduce-motion';

const mockPlay = jest.fn();
const mockUseReduceMotionPreference = jest.fn<ReduceMotionPreference, []>();

jest.mock('@/components/hello-animation', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    __esModule: true,
    HelloAnimation: React.forwardRef((_props: any, ref) => {
      React.useImperativeHandle(
        ref,
        () => ({
          play: mockPlay,
        }),
        [],
      );
      return (
        <Text accessibilityRole="text" accessibilityLabel="Animated greeting">
          Hello
        </Text>
      );
    }),
    default: React.forwardRef((_props: any, ref) => {
      React.useImperativeHandle(
        ref,
        () => ({
          play: mockPlay,
        }),
        [],
      );
      return (
        <Text accessibilityRole="text" accessibilityLabel="Animated greeting">
          Hello
        </Text>
      );
    }),
  };
});

jest.mock('@/hooks/use-reduce-motion', () => ({
  useReduceMotionPreference: () => mockUseReduceMotionPreference(),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReduceMotionPreference.mockReturnValue({
      prefersReducedMotion: false,
      isReady: true,
    });
  });

  it('renders greeting text and replay control', () => {
    const screen = render(<HomeScreen />);

    expect(screen.getByLabelText('Animated greeting')).toBeTruthy();
    expect(screen.getByLabelText('Replay animation')).toBeTruthy();
  });

  it('auto plays once on mount and replays on tap when allowed', async () => {
    const screen = render(<HomeScreen />);

    await waitFor(() => expect(mockPlay).toHaveBeenCalledTimes(1));

    fireEvent.press(screen.getByText('Replay'));
    expect(mockPlay).toHaveBeenCalledTimes(2);
  });

  it('disables animation when reduce motion is enabled', () => {
    mockUseReduceMotionPreference.mockReturnValue({
      prefersReducedMotion: true,
      isReady: true,
    });

    const screen = render(<HomeScreen />);

    fireEvent.press(screen.getByText('Replay'));
    expect(mockPlay).not.toHaveBeenCalled();
    expect(
      screen.getByText('Reduce Motion is enabled on this device. Animation is paused.'),
    ).toBeTruthy();
  });
});

