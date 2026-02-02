// app/_layout.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import "../global.css";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider, useAuth } from '@/hooks/useAuth';

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
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const colorScheme = useColorScheme();
  const { initialized, loading, user } = useAuth();

  // Redirigir basado en el estado de autenticación
  useEffect(() => {
    if (!initialized || loading) return;

    const inAuthGroup = segments[0] === '(tabs)';

    if (!user && inAuthGroup) {
      // Usuario no autenticado en área protegida -> redirigir a welcome
      router.replace('/welcome');
    } else if (user && !inAuthGroup) {
      // Usuario autenticado en área pública -> redirigir a tabs
      router.replace('/(tabs)');
    }
  }, [initialized, loading, user, segments]);

  // Mostrar splash screen mientras se inicializa la autenticación
  if (!initialized || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Si no hay usuario, mostrar solo las pantallas de auth
  // Si hay usuario, mostrar solo las pantallas autenticadas
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: false,
        }} 
        key={user ? 'auth' : 'guest'}
      >
        {user ? (
          // Usuario autenticado - solo mostrar tabs
          <Stack.Screen 
            name="(tabs)" 
            options={{ gestureEnabled: false }} 
          />
        ) : (
          // Usuario no autenticado - mostrar flujo de login
          <>
            <Stack.Screen 
              name="welcome" 
              options={{ gestureEnabled: false }} 
            />
            <Stack.Screen 
              name="onboarding" 
              options={{ gestureEnabled: false }} 
            />
            <Stack.Screen 
              name="auth" 
              options={{ gestureEnabled: false }} 
            />
          </>
        )}
        <Stack.Screen 
          name="modal" 
          options={{ presentation: 'modal' }} 
        />
      </Stack>
    </ThemeProvider>
  );
}