import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

import HomeScreen from '@/app/(tabs)/index';
import { getRandomLanguageCycle, type LanguageVariant } from '@/constants/languages';
import type { ReduceMotionPreference } from '@/hooks/use-reduce-motion';

const mockPlay = jest.fn();
const mockUseReduceMotionPreference = jest.fn<ReduceMotionPreference, []>();

jest.mock('@/components/hello-animation', () => {
  const React = require('react');
  const { Text } = require('react-native');

  return {
    __esModule: true,
    HelloAnimation: React.forwardRef((props: any, ref) => {
      React.useImperativeHandle(
        ref,
        () => ({
          play: (preset: unknown) => mockPlay(preset),
        }),
        [],
      );
      return (
        <Text accessibilityRole="text" accessibilityLabel="Animated greeting">
          {props.text}
        </Text>
      );
    }),
  };
});

jest.mock('@/hooks/use-reduce-motion', () => ({
  useReduceMotionPreference: () => mockUseReduceMotionPreference(),
}));

jest.mock('@/constants/languages', () => ({
  getRandomLanguageCycle: jest.fn(),
}));

const mockedLanguages: LanguageVariant[] = [
  {
    id: 'en',
    label: 'Hello',
    color: '#2563EB',
    preset: { type: 'bounce', durationMs: 600, intensity: 0.1 },
  },
  {
    id: 'es',
    label: 'Hola',
    color: '#EA580C',
    preset: { type: 'pop', durationMs: 800, intensity: 0.12 },
  },
];

const alternateLanguages: LanguageVariant[] = [
  {
    id: 'fr',
    label: 'Bonjour',
    color: '#10B981',
    preset: { type: 'flip', durationMs: 900, intensity: 0.07 },
  },
  {
    id: 'de',
    label: 'Hallo',
    color: '#7C3AED',
    preset: { type: 'wave', durationMs: 700, intensity: 0.09 },
  },
];

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    (getRandomLanguageCycle as jest.Mock).mockReset();
    (getRandomLanguageCycle as jest.Mock).mockReturnValue(mockedLanguages);
    mockUseReduceMotionPreference.mockReturnValue({
      prefersReducedMotion: false,
      isReady: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders first language and auto plays with its preset', async () => {
    const screen = render(<HomeScreen />);

    expect(screen.getByText('Hello')).toBeTruthy();
    expect(screen.getByLabelText('Replay animation')).toBeTruthy();

    await waitFor(() => expect(mockPlay).toHaveBeenCalledWith(mockedLanguages[0].preset));
  });

  it('cycles through the randomized language queue', () => {
    const screen = render(<HomeScreen />);

    act(() => {
      jest.advanceTimersByTime((mockedLanguages[0].preset.durationMs ?? 0) + 400);
    });

    expect(screen.getByText('Hola')).toBeTruthy();
  });

  it('re-randomizes languages when replay is pressed', async () => {
    const languageMock = getRandomLanguageCycle as jest.Mock;
    languageMock.mockReset();
    languageMock.mockReturnValueOnce(mockedLanguages);
    languageMock.mockReturnValue(alternateLanguages);

    const screen = render(<HomeScreen />);

    fireEvent.press(screen.getByText('Replay'));

    await waitFor(() => expect(screen.getByText('Bonjour')).toBeTruthy());
    await waitFor(() => expect(mockPlay).toHaveBeenLastCalledWith(alternateLanguages[0].preset));
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

