import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';

interface LogoutButtonProps {
  variant?: 'default' | 'danger';
  showText?: boolean;
}

export default function LogoutButton({ 
  variant = 'danger', 
  showText = true 
}: LogoutButtonProps) {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          onPress: async () => {
            try {
              setLoading(true);
              await signOut();
              // La redirección se maneja automáticamente en _layout cuando user cambia a null
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión');
              console.error('Logout error:', error);
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (!showText) {
    return (
      <TouchableOpacity
        style={styles.iconButton}
        onPress={handleLogout}
        disabled={loading}
      >
        <FontAwesome 
          name="sign-out" 
          size={24} 
          color={variant === 'danger' ? '#FF6B6B' : '#007AFF'} 
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'danger' ? styles.buttonDanger : styles.buttonDefault,
        loading && styles.buttonDisabled,
      ]}
      onPress={handleLogout}
      disabled={loading}
      activeOpacity={0.7}
    >
      <FontAwesome 
        name="sign-out" 
        size={18} 
        color={variant === 'danger' ? '#FFFFFF' : '#007AFF'}
        style={styles.icon}
      />
      <Text
        style={[
          styles.buttonText,
          variant === 'danger' ? styles.buttonTextDanger : styles.buttonTextDefault,
        ]}
      >
        {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  buttonDefault: {
    backgroundColor: '#E8F4FF',
  },
  buttonDanger: {
    backgroundColor: '#FF6B6B',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonTextDefault: {
    color: '#007AFF',
  },
  buttonTextDanger: {
    color: '#FFFFFF',
  },
  icon: {
    marginRight: 4,
  },
  iconButton: {
    padding: 12,
  },
});
