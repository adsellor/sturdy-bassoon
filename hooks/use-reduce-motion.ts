import { AccessibilityInfo, NativeEventSubscription } from 'react-native';
import { useEffect, useState } from 'react';

export interface ReduceMotionPreference {
  prefersReducedMotion: boolean;
  isReady: boolean;
}

export function useReduceMotionPreference(): ReduceMotionPreference {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let subscription: NativeEventSubscription | undefined;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (!isMounted) {
          return;
        }
        setPrefersReducedMotion(enabled);
        setIsReady(true);
      })
      .catch(() => {
        if (isMounted) {
          setIsReady(true);
        }
      });

    subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      setPrefersReducedMotion(enabled);
      setIsReady(true);
    });

    return () => {
      isMounted = false;
      subscription?.remove();
    };
  }, []);

  return { prefersReducedMotion, isReady };
}

