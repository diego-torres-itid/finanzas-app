import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none', // Sin animación entre tabs
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen 
        name="two"
        options={{
          animation: 'none',
        }}
      />
      <Stack.Screen 
        name="profile"
        options={{
          animation: 'none',
        }}
      />
    </Stack>
  );
}
