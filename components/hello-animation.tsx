import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export interface HelloAnimationHandle {
  play: (presetOverride?: AnimationPreset) => void;
}

export interface HelloAnimationProps {
  text?: string;
  color?: string;
  reduceMotionEnabled?: boolean;
  preset?: AnimationPreset;
}

export type AnimationType = 'bounce' | 'pop' | 'flip' | 'wave';

export interface AnimationPreset {
  type: AnimationType;
  durationMs?: number;
  intensity?: number;
}

const DEFAULT_TEXT = 'Hello';
const DEFAULT_COLOR = '#2563EB';
const DEFAULT_PRESET: AnimationPreset = {
  type: 'bounce',
  durationMs: 900,
  intensity: 0.08,
};

export const HelloAnimation = forwardRef<HelloAnimationHandle, HelloAnimationProps>(
  (
    { text = DEFAULT_TEXT, color = DEFAULT_COLOR, reduceMotionEnabled = false, preset },
    ref,
  ) => {
    const scale = useSharedValue(1);
    const rotate = useSharedValue(0);

    const resetValues = useCallback(() => {
      cancelAnimation(scale);
      cancelAnimation(rotate);
      scale.value = 1;
      rotate.value = 0;
    }, [rotate, scale]);

    const play = useCallback(
      (presetOverride?: AnimationPreset) => {
        if (reduceMotionEnabled) {
          resetValues();
          return;
        }

        const resolvedPreset = presetOverride ?? preset ?? DEFAULT_PRESET;
        const durationMs = resolvedPreset.durationMs ?? DEFAULT_PRESET.durationMs!;
        const intensity = resolvedPreset.intensity ?? DEFAULT_PRESET.intensity!;

        cancelAnimation(scale);
        cancelAnimation(rotate);

        switch (resolvedPreset.type) {
          case 'pop':
            scale.value = withSequence(
              withTiming(1 + intensity * 1.5, { duration: durationMs * 0.4 }),
              withTiming(1, {
                duration: durationMs * 0.6,
                easing: Easing.out(Easing.quad),
              }),
            );
            rotate.value = withTiming(0, { duration: durationMs });
            break;
          case 'flip':
            rotate.value = withSequence(
              withTiming(180, {
                duration: durationMs * 0.5,
                easing: Easing.inOut(Easing.quad),
              }),
              withTiming(360, {
                duration: durationMs * 0.5,
                easing: Easing.inOut(Easing.quad),
              }),
            );
            scale.value = withTiming(1, { duration: durationMs });
            break;
          case 'wave':
            scale.value = withSequence(
              withTiming(1 - intensity, { duration: durationMs * 0.25 }),
              withTiming(1 + intensity, { duration: durationMs * 0.25 }),
              withTiming(1 - intensity / 1.5, { duration: durationMs * 0.25 }),
              withTiming(1, { duration: durationMs * 0.25 }),
            );
            rotate.value = withSequence(
              withTiming(-6, { duration: durationMs * 0.5 }),
              withTiming(6, { duration: durationMs * 0.5 }),
            );
            break;
          case 'bounce':
          default:
            scale.value = withSequence(
              withSpring(1 - intensity, { damping: 20, stiffness: 200 }),
              withSpring(1 + intensity * 2, { damping: 14, stiffness: 260 }),
              withSpring(1, { damping: 18, stiffness: 180 }),
            );
            rotate.value = withTiming(0, { duration: durationMs });
            break;
        }
      },
      [preset, reduceMotionEnabled, resetValues, rotate, scale],
    );

    useImperativeHandle(ref, () => ({ play }), [play]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
    }));

    useEffect(() => {
      if (reduceMotionEnabled) {
        resetValues();
      }
    }, [reduceMotionEnabled, resetValues]);

    return (
      <Animated.Text
        accessible
        accessibilityRole="text"
        style={[styles.text, { color }, animatedStyle]}>
        {text}
      </Animated.Text>
    );
  },
);

HelloAnimation.displayName = 'HelloAnimation';
export default HelloAnimation;

const styles = StyleSheet.create({
  text: {
    fontSize: 64,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
});

