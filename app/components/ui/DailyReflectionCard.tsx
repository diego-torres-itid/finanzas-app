import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ArrowIcon from '@/assets/images/arrow.svg';
import Colors from '@/constants/Colors';
import PressableScale from '@/components/animations/PressableScale';

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
    <PressableScale onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <View style={styles.headerRow}>
              <View style={styles.iconContainer}>
                <FontAwesome 
                  name="lightbulb-o" 
                  size={15} 
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.label}>REFLEXIÓN DEL DÍA</Text>
            </View>
            <View style={styles.textSection}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>

          <View style={styles.rightIcon}>
            <ArrowIcon 
              width={20} 
              height={20} 
              color="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'column',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  textSection: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999999',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '400',
  },
  rightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
