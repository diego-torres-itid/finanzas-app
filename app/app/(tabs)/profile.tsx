import React from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/ui/Header';
import Navbar from '@/components/ui/Navbar';
import LogoutButton from '@/components/ui/LogoutButton';

export default function ProfileScreen() {
  const { user, profile } = useAuth();

  const handleNotification = () => {
    console.log('Abrir notificaciones');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header 
          planType={profile?.full_name ? 'Plan básico' : 'Plan gratuito'}
          onNotificationPress={handleNotification}
          notificationCount={0}
        />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {profile?.avatar_url ? (
                <Text style={styles.avatarText}>👤</Text>
              ) : (
                <Text style={styles.avatarText}>👤</Text>
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>
                {profile?.username || profile?.full_name || 'Usuario'}
              </Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Racha Actual</Text>
              <Text style={styles.statValue}>{profile?.current_streak || 0}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Mejor Racha</Text>
              <Text style={styles.statValue}>{profile?.longest_streak || 0}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total XP</Text>
              <Text style={styles.statValue}>{profile?.total_xp || 0}</Text>
            </View>
          </View>

          {/* Settings Section */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Configuración</Text>
            
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Notificaciones</Text>
              <Text style={styles.settingValue}>Activadas</Text>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Privacidad</Text>
              <Text style={styles.settingValue}>Privado</Text>
            </View>

            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Idioma</Text>
              <Text style={styles.settingValue}>Español</Text>
            </View>
          </View>

          {/* Logout Button */}
          <LogoutButton variant="danger" />

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
    paddingTop: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 8,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  settingsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingLabel: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
    color: '#999999',
    fontWeight: '400',
  },
  bottomSpacing: {
    height: 20,
  },
});
