import { ScrollView, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/ui/Header';
import Navbar from '@/components/ui/Navbar';
import StreakCard from '@/components/ui/StreakCard';
import CalendarComponent from '@/components/ui/CalendarComponent';
import DailyReflectionCard from '@/components/ui/DailyReflectionCard';
import ModuleCard from '@/components/ui/ModuleCard';
import LogoutButton from '@/components/ui/LogoutButton';

// Datos de ejemplo - Estos vendrían de Supabase
const MOCK_MODULES = [
  {
    id: '1',
    title: 'Presupuesto Personal',
    icon: 'wallet',
    lessonsCompleted: 4,
    totalLessons: 6,
    isPremium: false,
  },
  {
    id: '2',
    title: 'Ahorro Inteligente',
    icon: 'piggy',
    lessonsCompleted: 2,
    totalLessons: 5,
    isPremium: false,
  },
  {
    id: '3',
    title: 'Inversiones Básicas',
    icon: 'trending',
    lessonsCompleted: 0,
    totalLessons: 7,
    isPremium: true,
  },
];

export default function HomeScreen() {
  const { user, profile } = useAuth();

  const handleNotification = () => {
    console.log('Abrir notificaciones');
  };

  const handleDailyReflection = () => {
    console.log('Abrir reflexión diaria');
  };

  const handleModulePress = (moduleId: string) => {
    console.log('Abrir módulo:', moduleId);
  };

  const handleDateSelect = (date: Date) => {
    console.log('Fecha seleccionada:', date);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header 
          planType="Plan básico"
          onNotificationPress={handleNotification}
          notificationCount={0}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.recomendation}>Recomendacion del dia:</Text>
            <Text style={styles.greeting}>
              {profile?.username || profile?.full_name || 'Usuario'}, hoy trabaja en tu balance financiero.
            </Text>
            <Text style={styles.subgreeting}>Racha: {profile?.current_streak || 0} días 🔥</Text>
          </View>

          {/* Calendar */}
          <CalendarComponent
            onDateSelect={handleDateSelect}
            currentStreak={profile?.current_streak || 0}
            weekView={true}
          />

          {/* Welcome Message */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Bienvenido.</Text>
            <Text style={styles.welcomeSubtitle}>Has completado 7 ✅</Text>
          </View>

          {/* Daily Reflection */}
          <DailyReflectionCard
            onPress={handleDailyReflection}
            title="Reflexión diaria"
            subtitle="Reflexiona sobre tus ganancias"
          />

          {/* Modules Section */}
          <View style={styles.modulesSection}>
            <View style={styles.modulesHeader}>
              <Text style={styles.modulesTitle}>Tus módulos</Text>
              <Text style={styles.seeAllLink}>Ver todos</Text>
            </View>

            {MOCK_MODULES.map((module) => (
              <ModuleCard
                key={module.id}
                {...module}
                onPress={() => handleModulePress(module.id)}
              />
            ))}
          </View>

          {/* Streak Card */}
          <StreakCard
            currentStreak={profile?.current_streak || 0}
            longestStreak={profile?.longest_streak || 0}
          />

          {/* Logout Button */}
          <LogoutButton />

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Navbar */}
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 12,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 44,
    paddingEnd: 50,
  },
    recomendation: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    marginVertical: 12,
  },
  subgreeting: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    marginVertical: 4,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  modulesSection: {
    marginVertical: 12,
  },
  modulesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  modulesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  seeAllLink: {
    fontSize: 14,
    color: '#52C41A',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});

