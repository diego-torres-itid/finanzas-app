import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  translateY?: number;
  scale?: number;
  style?: StyleProp<ViewStyle>;
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 450,
  translateY = 12,
  scale = 1,
  style,
}: FadeInProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(translateY)).current;
  const scaleValue = useRef(new Animated.Value(scale === 1 ? 1 : 0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, duration, opacity, scaleValue, translate]);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY: translate }, { scale: scaleValue }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
