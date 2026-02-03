import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/ui/Navbar';
import PressableScale from '@/components/animations/PressableScale';
import EditIcon from '@/assets/images/edit.svg';
import SettingsIcon from '@/assets/images/settings.svg';
import CrownIcon from '@/assets/images/crown.svg';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const insets = useSafeAreaInsets();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [completedLessons, setCompletedLessons] = useState(0);

  // Cargar lecciones completadas
  useEffect(() => {
    const loadCompletedLessons = async () => {
      if (!user?.id) return;

      try {
        const { count, error } = await supabase
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('completed', true);

        if (error) {
          console.error('Error loading completed lessons:', error);
          return;
        }

        setCompletedLessons(count || 0);
      } catch (error) {
        console.error('Error loading completed lessons:', error);
      }
    };

    loadCompletedLessons();
  }, [user?.id]);

  const handleSettings = () => {
    console.log('Abrir configuración');
  };

  const handleUnlockContent = () => {
    console.log('Desbloquear contenido');
  };

  const handleNotifications = () => {
    console.log('Abrir notificaciones');
  };

  const handleConfiguration = () => {
    console.log('Abrir configuración');
  };

  const handleHelp = () => {
    console.log('Abrir ayuda y soporte');
  };

  const handleEditUsername = () => {
    setNewUsername(profile?.username || profile?.full_name || '');
    setUsernameError('');
    setIsEditingUsername(true);
  };

  const handleSaveUsername = async () => {
    const trimmedUsername = newUsername.trim();

    if (!trimmedUsername) {
      setUsernameError('El nombre de usuario no puede estar vacío');
      return;
    }

    if (profile?.username && trimmedUsername === profile.username) {
      setUsernameError('El nombre de usuario no puede ser el mismo');
      return;
    }

    const result = await updateProfile({ username: trimmedUsername });
    
    if (result.success) {
      Alert.alert('Éxito', 'Nombre de usuario actualizado correctamente');
      setUsernameError('');
      setIsEditingUsername(false);
    } else {
      if (result.code === '23505') {
        setUsernameError('Ese nombre de usuario ya está en uso');
      } else {
        setUsernameError('No se pudo actualizar el nombre de usuario');
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditingUsername(false);
    setNewUsername('');
    setUsernameError('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
          <Text style={styles.headerTitle}>Perfil</Text>
          <TouchableOpacity onPress={handleSettings} style={styles.settingsIcon}>
            <SettingsIcon width={20} height={20} strokeWidth={3} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>
                  {profile?.full_name || 'Usuario'}
                </Text>
                <TouchableOpacity onPress={handleEditUsername} style={styles.editButton}>
                  <EditIcon width={18} height={18} strokeWidth={3} color="#1A1A1A" />
                </TouchableOpacity>
              </View>
              {profile?.username && (
                <Text style={styles.username}>(Alias) {profile.username}</Text>
              )}
              <Text style={styles.email}>{user?.email}</Text>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{profile?.total_xp || 0}</Text>
              <Text style={styles.statLabel}>XP Total</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{profile?.current_streak || 0}</Text>
              <Text style={styles.statLabel}>Racha</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{completedLessons}</Text>
              <Text style={styles.statLabel}>Lecciones</Text>
            </View>
          </View>

          {/* Unlock Content Card */}
          <PressableScale onPress={handleUnlockContent}>
            <View style={styles.unlockCard}>
              <View style={styles.unlockContent}>
                <View style={styles.unlockIcon}>
                  <CrownIcon width={18} height={18} color={Colors.light.primary} strokeWidth={2} />
                </View>
                <Text style={styles.unlockText}>Desbloquea todo el contenido</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </PressableScale>

          {/* Menu Options */}
          <View style={styles.menuSection}>
            <PressableScale style={styles.menuItem} onPress={handleNotifications}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>🔔</Text>
                <Text style={styles.menuLabel}>Notificaciones</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </PressableScale>

            <PressableScale style={styles.menuItem} onPress={handleConfiguration}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>⚙️</Text>
                <Text style={styles.menuLabel}>Configuración</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </PressableScale>

            <PressableScale style={styles.menuItem} onPress={handleHelp}>
              <View style={styles.menuLeft}>
                <Text style={styles.menuIcon}>❓</Text>
                <Text style={styles.menuLabel}>Ayuda y soporte</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </PressableScale>
          </View>

          {/* Logout Button */}
          <PressableScale style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutIcon}>🔓</Text>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </PressableScale>

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Navbar */}
        <Navbar />

        {/* Modal para editar nombre de usuario */}
        <Modal
          visible={isEditingUsername}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCancelEdit}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalKeyboardContainer}
              >
                <TouchableWithoutFeedback>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Editar nombre de usuario</Text>
                    <TextInput
                      style={styles.input}
                      value={newUsername}
                      onChangeText={(text) => {
                        setNewUsername(text);
                        if (usernameError) setUsernameError('');
                      }}
                      placeholder="Nombre de usuario"
                      autoFocus
                    />
                    {usernameError ? (
                      <Text style={styles.inputErrorText}>{usernameError}</Text>
                    ) : null}
                    <View style={styles.modalButtons}>
                      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.saveButton} onPress={handleSaveUsername}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  settingsIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
  },
  username: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '400',
    marginBottom: 4,
  },
  email: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '400',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '400',
  },
  unlockCard: {
    backgroundColor: '#1A1A1A',
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unlockContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  unlockIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  unlockIconText: {
    fontSize: 16,
  },
  unlockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c5c5c5',
    flex: 1,
  },
  arrowIcon: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 24,
    color: '#CCCCCC',
    fontWeight: '300',
  },
  logoutButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF3B30',
  },
  bottomSpacing: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalKeyboardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    color: '#1A1A1A',
  },
  inputErrorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
