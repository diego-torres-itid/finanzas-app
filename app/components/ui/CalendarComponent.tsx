import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PressableScale from '../animations/PressableScale';
import Colors from '@/constants/Colors';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  currentStreak?: number;
  compactView?: boolean;
  weekView?: boolean;
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isActive: boolean;
}

export default function CalendarComponent({
  onDateSelect,
  currentStreak = 0,
  compactView = false,
  weekView = false,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [weekDays, setWeekDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    generateCalendarDays();
    generateWeekDays();
  }, [currentDate]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const calendarDays: CalendarDay[] = [];

    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      calendarDays.push({
        date: date.getDate(),
        isCurrentMonth: false,
        isToday: false,
        isActive: false,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.getTime() === today.getTime();
      const isActive = isToday || date < today;

      calendarDays.push({
        date: i,
        isCurrentMonth: true,
        isToday,
        isActive,
      });
    }

    // Días del próximo mes
    const remainingDays = 42 - calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        isActive: false,
      });
    }

    setDays(calendarDays);
  };

  const generateWeekDays = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Obtener el primer día de la semana (lunes)
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const week: CalendarDay[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const isToday = date.getTime() === today.getTime();
      const isActive = date <= today;

      week.push({
        date: date.getDate(),
        isCurrentMonth: true,
        isToday,
        isActive,
      });
    }

    setWeekDays(week);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDayStyle = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return styles.dayInactive;
    if (day.isToday) return styles.dayToday;
    if (day.isActive) return styles.dayActive;
    return styles.dayDefault;
  };

  const getDayTextStyle = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return styles.dayTextInactive;
    if (day.isToday) return styles.dayTextToday;
    if (day.isActive) return styles.dayTextActive;
    return styles.dayTextDefault;
  };

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  if (weekView) {
    return (
      <View style={styles.weekContainer}>
        <View style={styles.weekGrid}>
          {weekDays.map((day, index) => (
            <PressableScale
              key={index}
              onPress={() => {
                if (onDateSelect) {
                  const selectedDate = new Date();
                  const dayOfWeekNum = selectedDate.getDay();
                  const diffDays = selectedDate.getDate() - dayOfWeekNum + (dayOfWeekNum === 0 ? -6 : 1);
                  selectedDate.setDate(diffDays + index);
                  onDateSelect(selectedDate);
                }
              }}
            >
              <View
                style={[
                  styles.weekDay,
                  day.isToday && styles.weekDayToday,
                  day.isActive && !day.isToday && styles.weekDayActive,
                ]}
              >
                <Text style={styles.weekDayLabel}>{daysOfWeek[index]}</Text>
                <Text
                  style={[
                    styles.weekDayNumber,
                    day.isToday && styles.weekDayNumberToday,
                    day.isActive && !day.isToday && styles.weekDayNumberActive,
                  ]}
                >
                  {day.date}
                </Text>
                {day.isActive && !day.isToday && <View style={styles.weekDayDot} />}
              </View>
            </PressableScale>
          ))}
        </View>
      </View>
    );
  }

  if (compactView) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactHeader}>
          <Text style={styles.compactTitle}>
            {currentDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}
          </Text>
          <Text style={styles.compactSubtitle}>Día {currentStreak}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth} style={styles.navigationButton}>
          <FontAwesome name="chevron-left" size={18} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.monthTitle}>{monthName}</Text>

        <TouchableOpacity onPress={nextMonth} style={styles.navigationButton}>
          <FontAwesome name="chevron-right" size={18} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysHeader}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.daysGrid}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayWrapper}
            onPress={() => {
              if (day.isCurrentMonth && onDateSelect) {
                const selectedDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day.date
                );
                onDateSelect(selectedDate);
              }
            }}
            disabled={!day.isCurrentMonth}
            activeOpacity={0.7}
          >
            <View style={[styles.day, getDayStyle(day)]}>
              <Text style={[styles.dayText, getDayTextStyle(day)]}>{day.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigationButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    textTransform: 'capitalize',
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
    width: '14.28%',
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayWrapper: {
    width: '14.28%',
    marginBottom: 8,
  },
  day: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayDefault: {
    backgroundColor: 'transparent',
  },
  dayActive: {
    backgroundColor: '#E8F4FF',
    borderRadius: 8,
  },
  dayToday: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  dayInactive: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dayTextDefault: {
    color: '#1A1A1A',
  },
  dayTextActive: {
    color: '#007AFF',
  },
  dayTextToday: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dayTextInactive: {
    color: '#CCCCCC',
  },
  // Week view styles
  weekContainer: {
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
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  weekDay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  weekDayToday: {
    backgroundColor: '#1A1A1A',
  },
  weekDayActive: {
    backgroundColor: 'transparent',
  },
  weekDayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 4,
  },
  weekDayNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.primary,
    marginBottom: 6,
  },
  weekDayNumberToday: {
    color: '#FFFFFF',
  },
  weekDayNumberActive: {
    color: Colors.light.primary,
  },
  weekDayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.light.primary,
  },
  // Compact styles
  compactContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    textTransform: 'capitalize',
  },
  compactSubtitle: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
});
