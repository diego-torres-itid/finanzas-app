import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import Logo from '@/assets/images/logo.svg';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/hooks/useAuth';

export default function WelcomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Si hay sesión activa, ir a index
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user, router]);

  const handleContinue = async () => {
    // Guardar que ya vio la pantalla de bienvenida
    const AsyncStorage = await import('@react-native-async-storage/async-storage').then(m => m.default);
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    router.replace('/onboarding');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FadeIn delay={0} scale={0.5}>
          <Logo 
            width={120}
            height={120}
            style={styles.logo}
          />
        </FadeIn>
        <FadeIn delay={180} style={styles.textBlock}>
          <Text style={styles.appName}>Kerdos</Text>
          <Text style={styles.description}>
            Gestiona tus finanzas de manera simple y efectiva
          </Text>
        </FadeIn>
      </View>

      <FadeIn delay={360}>
        <View style={styles.buttonContainer}>
          <Button 
            title="Comenzar" 
            onPress={handleContinue}
          />
        </View>
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    color: '#666666',
    marginBottom: 8,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  textBlock: {
    alignItems: 'center',
  },
  buttonContainer: {
    paddingBottom: 48,
  },
});
