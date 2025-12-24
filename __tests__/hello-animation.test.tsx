import { act, render } from '@testing-library/react-native';
import React, { createRef } from 'react';
import * as Reanimated from 'react-native-reanimated';

import { HelloAnimation, HelloAnimationHandle } from '@/components/hello-animation';

describe('HelloAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders custom text and color', () => {
    const screen = render(<HelloAnimation text="Howdy" color="#123456" />);

    const text = screen.getByText('Howdy');
    const flattenedStyle = Array.isArray(text.props.style)
      ? Object.assign({}, ...text.props.style)
      : text.props.style;

    expect(flattenedStyle.color).toBe('#123456');
  });

  it('plays bounce sequence when reduce motion is disabled', () => {
    const ref = createRef<HelloAnimationHandle>();

    render(<HelloAnimation ref={ref} reduceMotionEnabled={false} />);

    act(() => ref.current?.play());

    expect(Reanimated.withSequence).toHaveBeenCalled();
  });

  it('cancels animation when reduce motion is enabled', () => {
    const ref = createRef<HelloAnimationHandle>();

    render(<HelloAnimation ref={ref} reduceMotionEnabled />);

    act(() => ref.current?.play());

    expect(Reanimated.cancelAnimation).toHaveBeenCalled();
    expect(Reanimated.withSequence).not.toHaveBeenCalled();
  });

  it('stops any running animation when reduce motion toggles on', () => {
    const { rerender } = render(<HelloAnimation reduceMotionEnabled={false} />);

    rerender(<HelloAnimation reduceMotionEnabled />);

    expect(Reanimated.cancelAnimation).toHaveBeenCalled();
  });

  it('honors animation preset overrides', () => {
    const ref = createRef<HelloAnimationHandle>();

    render(<HelloAnimation ref={ref} reduceMotionEnabled={false} />);

    act(() =>
      ref.current?.play({
        type: 'flip',
        durationMs: 1200,
        intensity: 0.05,
      }),
    );

    expect(Reanimated.withTiming).toHaveBeenCalled();

    act(() =>
      ref.current?.play({
        type: 'pop',
        durationMs: 600,
        intensity: 0.2,
      }),
    );

    expect(Reanimated.withSequence).toHaveBeenCalled();
  });
});

