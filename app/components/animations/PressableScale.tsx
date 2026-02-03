import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps } from 'react-native';

interface PressableScaleProps extends PressableProps {
  children: React.ReactNode;
  scaleValue?: number; // Qué tan pequeño se hace (0.95 = 95% del tamaño original)
}

export default function PressableScale({ 
  children, 
  scaleValue = 0.95,
  onPressIn,
  onPressOut,
  ...props 
}: PressableScaleProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (event: any) => {
    Animated.spring(scaleAnim, {
      toValue: scaleValue,
      useNativeDriver: true,
      tension: 100,
      friction: 3,
    }).start();
    
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 3,
    }).start();
    
    onPressOut?.(event);
  };

  return (
    <Pressable 
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
