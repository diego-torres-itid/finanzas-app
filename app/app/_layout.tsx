// app/_layout.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import "../global.css";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'welcome',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('../assets/fonts/Inter.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // 🎁 AQUÍ ENVOLVEMOS con QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkWelcomeStatus() {
      try {
        const value = await AsyncStorage.getItem('hasSeenWelcome');
        setHasSeenWelcome(value === 'true');
      } catch (error) {
        console.error('Error checking welcome status:', error);
        setHasSeenWelcome(false);
      }
    }
    checkWelcomeStatus();
  }, []);

   useEffect(() => {
     if (hasSeenWelcome === null) return; // Esperar a que cargue

     const inWelcome = segments[0] === 'welcome';

     if (hasSeenWelcome && inWelcome) {
       // Ya vio el welcome, redirigir a tabs
       router.replace('/welcome');
     } else if (!hasSeenWelcome && !inWelcome) {
       // No ha visto el welcome, redirigir
       router.replace('/welcome');
     }
   }, [hasSeenWelcome, segments]);

  if (hasSeenWelcome === null) {
    return null; // Mostrar nada mientras carga
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}