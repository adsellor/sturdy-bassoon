import { useCallback, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HelloAnimation, HelloAnimationHandle } from '@/components/hello-animation';
import { useReduceMotionPreference } from '@/hooks/use-reduce-motion';

export default function HomeScreen() {
  const animationRef = useRef<HelloAnimationHandle>(null);
  const { prefersReducedMotion, isReady } = useReduceMotionPreference();
  const hasAutoPlayedRef = useRef(false);

  useEffect(() => {
    if (!isReady || prefersReducedMotion || hasAutoPlayedRef.current) {
      return;
    }

    animationRef.current?.play();
    hasAutoPlayedRef.current = true;
  }, [isReady, prefersReducedMotion]);

  const handleReplay = useCallback(() => {
    if (prefersReducedMotion) {
      return;
    }

    animationRef.current?.play();
  }, [prefersReducedMotion]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HelloAnimation ref={animationRef} reduceMotionEnabled={prefersReducedMotion} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Replay animation"
          onPress={handleReplay}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Replay</Text>
        </Pressable>
        {prefersReducedMotion && (
          <Text
            accessibilityRole="text"
            style={styles.helperText}>
            Reduce Motion is enabled on this device. Animation is paused.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 32,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: '#111827',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  helperText: {
    color: '#4B5563',
    textAlign: 'center',
    fontSize: 16,
  },
});
