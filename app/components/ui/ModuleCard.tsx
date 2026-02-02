import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

interface ModuleCardProps {
  id: string;
  title: string;
  icon: string;
  lessonsCompleted: number;
  totalLessons: number;
  isPremium?: boolean;
  onPress?: () => void;
  compact?: boolean;
}

const ICON_MAP: Record<string, keyof typeof FontAwesome.glyphMap> = {
  wallet: 'credit-card',
  piggy: 'save',
  chart: 'bar-chart',
  building: 'building',
  shield: 'shield',
  trending: 'line-chart',
  calculator: 'calculator',
  briefcase: 'briefcase',
  // Agregar más mapeos según sea necesario
};

export default function ModuleCard({
  id,
  title,
  icon,
  lessonsCompleted,
  totalLessons,
  isPremium = false,
  onPress,
  compact = false,
}: ModuleCardProps) {
  const progress = totalLessons > 0 ? lessonsCompleted / totalLessons : 0;
  const iconName = (ICON_MAP[icon] || 'book') as keyof typeof FontAwesome.glyphMap;

  if (compact) {
    return (
      <TouchableOpacity
        style={styles.compactContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.compactIconContainer}>
          <FontAwesome name={iconName} size={24} color="#007AFF" />
        </View>
        <Text style={styles.compactTitle}>{title}</Text>
        <Text style={styles.compactProgress}>
          {lessonsCompleted}/{totalLessons}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FontAwesome name={iconName} size={32} color="#007AFF" />
          {isPremium && (
            <View style={styles.premiumBadge}>
              <FontAwesome name="star" size={12} color="#FFD700" />
            </View>
          )}
        </View>

        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            {isPremium && (
              <View style={styles.premiumLabel}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>
          <Text style={styles.lessonsText}>
            {lessonsCompleted} de {totalLessons} lecciones
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={progress}
          width={Dimensions.get('window').width - 80}
          height={6}
          color="#52C41A"
          unfilledColor="#E8E8E8"
          borderRadius={3}
          borderWidth={0}
        />
        <Text style={styles.progressText}>
          {Math.round(progress * 100)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFE58F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  premiumLabel: {
    backgroundColor: '#FFE58F',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B87F0D',
  },
  lessonsText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '400',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#52C41A',
    minWidth: 35,
  },
  // Compact styles
  compactContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  compactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  compactTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 4,
  },
  compactProgress: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '500',
  },
});
