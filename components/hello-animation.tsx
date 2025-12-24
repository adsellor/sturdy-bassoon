import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

export interface HelloAnimationHandle {
  play: () => void;
}

export interface HelloAnimationProps {
  text?: string;
  color?: string;
  reduceMotionEnabled?: boolean;
}

const DEFAULT_TEXT = 'Hello';
const DEFAULT_COLOR = '#2563EB';

export const HelloAnimation = forwardRef<HelloAnimationHandle, HelloAnimationProps>(
  ({ text = DEFAULT_TEXT, color = DEFAULT_COLOR, reduceMotionEnabled = false }, ref) => {
    const scale = useSharedValue(1);
    const sequenceConfig = useMemo(
      () => ({
        first: { damping: 20, stiffness: 200 },
        second: { damping: 16, stiffness: 240 },
        settle: { damping: 18, stiffness: 180 },
      }),
      [],
    );

    const play = useCallback(() => {
      if (reduceMotionEnabled) {
        cancelAnimation(scale);
        scale.value = 1;
        return;
      }

      scale.value = withSequence(
        withSpring(0.94, sequenceConfig.first),
        withSpring(1.08, sequenceConfig.second),
        withSpring(1, sequenceConfig.settle),
      );
    }, [reduceMotionEnabled, scale, sequenceConfig]);

    useImperativeHandle(ref, () => ({ play }), [play]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
      if (reduceMotionEnabled) {
        cancelAnimation(scale);
        scale.value = 1;
      }
    }, [reduceMotionEnabled, scale]);

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

