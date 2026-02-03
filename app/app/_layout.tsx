// app/_layout.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import "../global.css";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Redirect, useSegments, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const colorScheme = useColorScheme();
  const { initialized, loading, user } = useAuth();

  // Esperar a que la navegación esté lista
  if (!navigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Mostrar splash screen mientras se inicializa la autenticación
  if (!initialized || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Determinar si estamos en área protegida
  const inProtectedGroup = segments[0] === '(tabs)';

  // Redirigir usando el componente Redirect
  if (!user && inProtectedGroup) {
    return <Redirect href="/welcome" />;
  }

  if (user && !inProtectedGroup) {
    return <Redirect href="/(tabs)" />;
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
            <Stack.Screen 
              name="auth/callback" 
              options={{ gestureEnabled: false }} 
            />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}