import React, { createContext, useContext, useEffect, useState } from 'react';
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
    let mounted = true;

    // Verificar sesión inicial
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session:', session?.user?.id);

        if (mounted) {
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
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setAuthState(prev => ({
            ...prev,
            loading: false,
            initialized: true,
          }));
        }
      }
    };

    initializeAuth();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, 'User:', session?.user?.id);

        if (!mounted) return;

        // Manejar logout
        if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            profile: null,
            session: null,
            loading: false,
            initialized: true,
          });
          return;
        }

        // Para SIGNED_IN y otros eventos, cargar el perfil ANTES de actualizar el estado
        if (session?.user) {
          try {
            let profile: UserProfile | null = null;
            
            // Intentar cargar perfil primero
            profile = await loadUserProfile(session.user.id);
            
            // Si no existe, crear uno
            if (!profile) {
              profile = await upsertUserProfile(session);
            }
            
            // Actualizar estado CON EL PERFIL CARGADO
            if (mounted) {
              setAuthState({
                user: session.user ?? null,
                profile,
                session,
                loading: false,
                initialized: true,
              });
            }
          } catch (profileError) {
            console.warn('Error loading/creating profile:', profileError);
            // En caso de error, actualizar solo el usuario
            if (mounted) {
              setAuthState(prev => ({
                ...prev,
                user: session.user ?? null,
                session,
                loading: false,
                initialized: true,
              }));
            }
          }
        } else {
          // Sin sesión, actualizar estado sin perfil
          setAuthState(prev => ({
            ...prev,
            user: null,
            profile: null,
            session: null,
            loading: false,
            initialized: true,
          }));
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
