import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import FadeIn from '@/components/animations/FadeIn';
import Logo from '@/assets/images/logo.svg';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      const redirectTo = AuthSession.makeRedirectUri({ scheme: 'kerdos' });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error || !data?.url) {
        throw error || new Error('No se pudo iniciar el login con Google');
      }

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectTo
      );

      if (result.type !== 'success' || !result.url) {
        return;
      }

      const hash = result.url.split('#')[1];
      const query = hash || result.url.split('?')[1] || '';
      const params = new URLSearchParams(query);
      const access_token = params.get('access_token') ?? undefined;
      const refresh_token = params.get('refresh_token') ?? undefined;

      if (!access_token || !refresh_token) {
        throw new Error('Tokens inválidos');
      }

      // Establecer sesión - el hook useAuth detectará automáticamente el cambio
      // y manejará la navegación, creación de perfil, etc.
      await supabase.auth.setSession({ access_token, refresh_token });
      
      // La navegación se maneja automáticamente en useAuth
    } catch (e) {
      console.error('Auth error:', e);
      Alert.alert('Error', 'No se pudo iniciar sesión con Google');
    }
  };

  const handleFacebookAuth = () => {
    // TODO: Implementar Facebook OAuth
    console.log('Facebook Auth');
  };

  const handleAppleAuth = () => {
    // TODO: Implementar Apple OAuth
    console.log('Apple Auth');
  };

  return (
    <View style={styles.container}>
      <FadeIn delay={0} style={styles.content}>
        <Logo 
          width={100}
          height={100}
          style={styles.logo}
        />
        <Text style={styles.title}>Crea tu cuenta en Kerdos</Text>
        
        <Text style={styles.description}>
          Regístrate para comenzar tu aprendizaje financiero.
        </Text>
      </FadeIn>

      <FadeIn delay={120} style={styles.buttonsContainer}>
        <Text style={styles.label}>Regístrate con</Text>

        <TouchableOpacity 
          style={styles.authButton}
          onPress={handleGoogleAuth}
          activeOpacity={0.7}
        >
          <Text style={styles.googleIcon}>🔵</Text>
          <Text style={styles.authButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.authButton}
          onPress={handleFacebookAuth}
          activeOpacity={0.7}
        >
          <Text style={styles.facebookIcon}>f</Text>
          <Text style={styles.authButtonText}>Continuar con Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.authButton}
          onPress={handleAppleAuth}
          activeOpacity={0.7}
        >
          <Text style={styles.appleIcon}>🍎</Text>
          <Text style={styles.authButtonText}>Continuar con Apple</Text>
        </TouchableOpacity>
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    paddingVertical: 32,
  },
  content: {
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  logo: {
    marginBottom: 24,
  },
  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#1A1A1A',
    paddingEnd: 64,
  },

  description: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'left',
    paddingEnd: 64,
    paddingVertical: 20,
  },
  buttonsContainer: {
    paddingTop: 8,
  },

  label: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
    paddingVertical: 12,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 20,
    marginBottom: 18,
    marginHorizontal: 24,
    backgroundColor: '#fff',
  },
  googleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  facebookIcon: {
    fontSize: 20,
    marginRight: 12,
    color: '#1877F2',
    fontWeight: 'bold',
  },
  appleIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  footer: {
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});
