import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface DailyReflectionCardProps {
  onPress?: () => void;
  completed?: boolean;
  title?: string;
  subtitle?: string;
}

export default function DailyReflectionCard({
  onPress,
  completed = false,
  title = 'Reflexión diaria',
  subtitle = 'Reflexiona sobre tus ganancias',
}: DailyReflectionCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        completed && styles.containerCompleted,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FontAwesome 
            name={completed ? 'check' : 'leaf'} 
            size={24} 
            color={completed ? '#4CAF50' : '#52C41A'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>

      <View style={styles.arrow}>
        <FontAwesome name="chevron-right" size={18} color="#999999" />
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
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#52C41A',
  },
  containerCompleted: {
    borderLeftColor: '#4CAF50',
    backgroundColor: '#F6FFED',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F6FFED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '400',
  },
  arrow: {
    marginLeft: 12,
    opacity: 0.5,
  },
});
