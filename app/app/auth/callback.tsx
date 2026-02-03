import { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a auth - el procesamiento real se hace en auth.tsx
    const timer = setTimeout(() => {
      router.replace('/auth');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ marginTop: 20, fontSize: 16, color: '#666' }}>
        Completando inicio de sesión...
      </Text>
    </View>
  );
}
