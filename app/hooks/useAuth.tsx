import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { supabase } from '@/lib/supabase';
import type { AuthContextType, AuthState, UserProfile } from '@/types/auth';
import { Session } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    initialized: false,
  });

  const router = useRouter();
  const segments = useSegments();

  // Cargar perfil del usuario desde Supabase
  const loadUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  };

  // Crear o actualizar perfil del usuario
  const upsertUserProfile = async (session: Session): Promise<UserProfile | null> => {
    try {
      const { user } = session;
      
      const profileData = {
        id: user.id,
        username: user.user_metadata?.username || user.email?.split('@')[0] || null,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, {
          onConflict: 'id',
        })
        .select()
        .single();

      if (error) {
        console.error('Error upserting profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error upserting profile:', error);
      return null;
    }
  };

  // Refrescar perfil del usuario
  const refreshProfile = async () => {
    if (!authState.user) return;
    
    const profile = await loadUserProfile(authState.user.id);
    setAuthState(prev => ({ ...prev, profile }));
  };

  // Cerrar sesión
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Listener de cambios de autenticación
  useEffect(() => {
    // Verificar sesión inicial
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      let profile: UserProfile | null = null;
      
      if (session?.user) {
        // Intentar cargar o crear el perfil
        profile = await loadUserProfile(session.user.id);
        if (!profile) {
          profile = await upsertUserProfile(session);
        }
      }

      setAuthState({
        user: session?.user ?? null,
        profile,
        session,
        loading: false,
        initialized: true,
      });
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);

        let profile: UserProfile | null = null;

        if (session?.user) {
          // Cargar o crear perfil cuando el usuario se autentica
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            profile = await loadUserProfile(session.user.id);
            if (!profile) {
              profile = await upsertUserProfile(session);
            }
          } else {
            profile = await loadUserProfile(session.user.id);
          }
        }

        setAuthState({
          user: session?.user ?? null,
          profile,
          session,
          loading: false,
          initialized: true,
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Protección de rutas y navegación automática
  useEffect(() => {
    if (!authState.initialized) return;

    const inAuthGroup = segments[0] === '(tabs)';
    const publicRoutes = ['welcome', 'onboarding', 'auth', '+not-found'];
    const currentRoute = segments[0];

    if (!authState.user && inAuthGroup) {
      // Usuario no autenticado intentando acceder a rutas protegidas
      router.replace('/auth');
    } else if (authState.user) {
      // Usuario autenticado
      if (publicRoutes.includes(currentRoute as string)) {
        // Está en ruta pública, redirigir a inicio
        router.replace('/(tabs)');
      }
    }
  }, [authState.user, authState.initialized, segments]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
