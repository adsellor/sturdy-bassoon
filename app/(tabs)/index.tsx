import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  HelloAnimation,
  HelloAnimationHandle,
  AnimationPreset,
} from '@/components/hello-animation';
import { getRandomLanguageCycle, LanguageVariant } from '@/constants/languages';
import { useReduceMotionPreference } from '@/hooks/use-reduce-motion';

export default function HomeScreen() {
  const animationRef = useRef<HelloAnimationHandle>(null);
  const cycleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { prefersReducedMotion, isReady } = useReduceMotionPreference();
  const [languageQueue, setLanguageQueue] = useState<LanguageVariant[]>(() =>
    getRandomLanguageCycle(),
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLanguage = languageQueue[currentIndex];

  useEffect(() => {
    return () => {
      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
      }
    };
  }, []);

  const scheduleNextLanguage = useCallback(
    (preset?: AnimationPreset) => {
      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
      }

      if (!preset) {
        return;
      }

      const duration = (preset.durationMs ?? 900) + 300;
      cycleTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % languageQueue.length);
      }, duration);
    },
    [languageQueue.length],
  );

  const triggerAnimation = useCallback(
    (variant?: LanguageVariant) => {
      if (!variant || prefersReducedMotion) {
        return;
      }

      animationRef.current?.play(variant.preset);
      scheduleNextLanguage(variant.preset);
    },
    [prefersReducedMotion, scheduleNextLanguage],
  );

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (prefersReducedMotion) {
      if (cycleTimeoutRef.current) {
        clearTimeout(cycleTimeoutRef.current);
      }
      return;
    }

    triggerAnimation(currentLanguage);
  }, [currentLanguage, isReady, prefersReducedMotion, triggerAnimation]);

  const handleReplay = useCallback(() => {
    const refreshedQueue = getRandomLanguageCycle();
    setLanguageQueue(refreshedQueue);
    setCurrentIndex(0);

    if (cycleTimeoutRef.current) {
      clearTimeout(cycleTimeoutRef.current);
    }
  }, []);

  const infoText = useMemo(() => {
    if (prefersReducedMotion) {
      return 'Reduce Motion is enabled on this device. Animation is paused.';
    }

    if (!currentLanguage) {
      return 'Preparing greetings...';
    }

    return `Cycling through greetings. Currently showing: ${currentLanguage.label}`;
  }, [currentLanguage, prefersReducedMotion]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HelloAnimation
          ref={animationRef}
          reduceMotionEnabled={prefersReducedMotion}
          text={currentLanguage?.label}
          color={currentLanguage?.color}
          preset={currentLanguage?.preset}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Replay animation"
          onPress={handleReplay}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Replay</Text>
        </Pressable>
        <Text accessibilityRole="text" style={styles.helperText}>
          {infoText}
        </Text>
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
    lineHeight: 22,
  },
});
