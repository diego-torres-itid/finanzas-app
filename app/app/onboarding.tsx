import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/hooks/useAuth';

const slides = [
  {
    key: '1',
    title: 'Alcanza tus metas financieras',
    description: 'Establece objetivos, crea presupuestos y recibe orientación personalizada.',
  },
  {
    key: '2',
    title: 'Controla tus gastos',
    description: 'Organiza tus ingresos y egresos en un solo lugar.',
  },
  {
    key: '3',
    title: 'Mejora tus hábitos',
    description: 'Obtén reportes claros para tomar mejores decisiones.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const listRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  // Si hay sesión activa, ir a index
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user, router]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(x / width);
    if (newIndex !== index) setIndex(newIndex);
  };

  const handleNext = () => {
    if (index < slides.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/auth');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <FadeIn delay={0} style={styles.textBlock}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </FadeIn>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index ? styles.dotActive : styles.dotInactive]}
            />
          ))}
        </View>

        <Button
          title={index === slides.length - 1 ? 'Crear cuenta' : 'Continuar'}
          onPress={handleNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textBlock: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingBottom: 36,
    paddingTop: 12,
    gap: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: '#1A1A1A',
    width: 16,
  },
  dotInactive: {
    backgroundColor: '#D9D9D9',
  },
});
