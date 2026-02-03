import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Linking from 'expo-linking';
import FadeIn from '@/components/animations/FadeIn';
import Logo from '@/assets/images/logo.svg';
import GoogleIcon from '@/assets/images/google.svg';
import FacebookIcon from '@/assets/images/facebook.svg';
import AppleIcon from '@/assets/images/apple.svg';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user, router]);

  // Escuchar deep links para el callback de OAuth
  useEffect(() => {
    let processing = false;
    
    const handleDeepLink = async (event: { url: string }) => {
      console.log('🔗 Deep link recibido:', event.url);
      
      // Evitar procesar múltiples veces
      if (processing) {
        console.log('⏭️ Ya procesando un deep link, ignorando...');
        return;
      }
      
      // Verificar si es un callback de autenticación
      if (event.url.includes('auth/callback')) {
        processing = true;
        
        try {
          // Extraer el fragmento de la URL (después del #)
          const url = event.url;
          const hashIndex = url.indexOf('#');
          
          if (hashIndex !== -1) {
            const fragment = url.substring(hashIndex + 1);
            const params = new URLSearchParams(fragment);
            
            const access_token = params.get('access_token');
            const refresh_token = params.get('refresh_token');
            
            console.log('🎫 Access token encontrado:', access_token ? 'Sí' : 'No');
            console.log('🔄 Refresh token encontrado:', refresh_token ? 'Sí' : 'No');
            
            if (access_token && refresh_token) {
              console.log('⏳ Estableciendo sesión...');
              
              // Establecer la sesión con los tokens
              const { data, error } = await supabase.auth.setSession({
                access_token,
                refresh_token,
              });
              
              if (error) {
                console.error('❌ Error estableciendo sesión:', error);
                Alert.alert('Error', 'No se pudo completar el inicio de sesión');
                processing = false;
              } else {
                console.log('✅ Sesión establecida exitosamente');
                console.log('👤 Usuario:', data.session?.user.email);
                // El hook useAuth detectará el cambio y redirigirá automáticamente
                // No resetear processing aquí para que no se procese de nuevo
              }
            } else {
              processing = false;
            }
          } else {
            processing = false;
          }
        } catch (err) {
          console.error('❌ Error procesando deep link:', err);
          processing = false;
        }
      }
    };

    // Suscribirse a eventos de URL
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Limpiar el listener al desmontar
    return () => {
      subscription.remove();
    };
  }, [router]);

  const handleGoogleAuth = async () => {
    try {
      // AuthSession.makeRedirectUri detecta automáticamente:
      // - exp:// en Expo Go
      // - kerdos:// en development build
      const redirectTo = AuthSession.makeRedirectUri({
        path: 'auth/callback',
      });
      console.log('Redirect URI:', redirectTo);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        throw error;
      }

      if (data?.url) {
        console.log('Opening browser with URL:', data.url);
        await WebBrowser.openBrowserAsync(data.url);
      }
    } catch (e) {
      console.error('Auth error:', e);
      Alert.alert('Error', (e as Error).message || 'No se pudo iniciar sesión con Google');
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
          <GoogleIcon width={24} height={24} style={styles.authIcon} />
          <Text style={styles.authButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.authButton, styles.facebookButton]}
          onPress={handleFacebookAuth}
          activeOpacity={0.7}
        >
          <FacebookIcon width={24} height={24} style={styles.authIconWhite} />
          <Text style={[styles.authButtonText, styles.authButtonTextWhite]}>Continuar con Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.authButton, styles.appleButton]}
          onPress={handleAppleAuth}
          activeOpacity={0.7}
        >
          <AppleIcon width={24} height={24} style={styles.authIconWhite} />
          <Text style={[styles.authButtonText, styles.authButtonTextWhite]}>Continuar con Apple</Text>
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
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1.5,
    borderColor: '#DADCE0',
    borderRadius: 30,
    marginBottom: 16,
    marginHorizontal: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  authIcon: {
    marginRight: 12,
  },
  authIconWhite: {
    marginRight: 12,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3C4043',
  },
  authButtonTextWhite: {
    color: '#FFFFFF',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  appleButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
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
