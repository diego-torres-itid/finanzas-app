import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  compact?: boolean;
}

export default function StreakCard({
  currentStreak,
  longestStreak,
  compact = false,
}: StreakCardProps) {
  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactStreak}>
          <FontAwesome name="fire" size={20} color="#FF6B6B" />
          <Text style={styles.compactText}>{currentStreak}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Racha</Text>

      <View style={styles.streaksContainer}>
        <View style={styles.streakBox}>
          <View style={styles.iconContainer}>
            <FontAwesome name="fire" size={28} color="#FF6B6B" />
          </View>
          <Text style={styles.streakLabel}>Racha Actual</Text>
          <Text style={styles.streakValue}>{currentStreak}</Text>
          <Text style={styles.streakSubtext}>días seguidos</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.streakBox}>
          <View style={styles.iconContainer}>
            <FontAwesome name="trophy" size={28} color="#FFD700" />
          </View>
          <Text style={styles.streakLabel}>Mejor Racha</Text>
          <Text style={styles.streakValue}>{longestStreak}</Text>
          <Text style={styles.streakSubtext}>días máximos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  streaksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  streakBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  streakLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
    fontWeight: '500',
  },
  streakValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 32,
  },
  streakSubtext: {
    fontSize: 11,
    color: '#999999',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 8,
  },
  // Compact styles
  compactContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  compactStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  compactText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B6B',
  },
});
