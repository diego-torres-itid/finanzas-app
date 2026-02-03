import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface NavbarItem {
  name: string;
  href: string;
  icon: keyof typeof FontAwesome.glyphMap;
  label: string;
}

const navItems: NavbarItem[] = [
  {
    name: 'inicio',
    href: '/(tabs)',
    icon: 'home',
    label: 'Inicio',
  },
  {
    name: 'calendario',
    href: '/(tabs)/two',
    icon: 'calendar',
    label: 'Calendario',
  },
  {
    name: 'perfil',
    href: '/(tabs)/profile',
    icon: 'user',
    label: 'Perfil',
  },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const isActive = (href: string) => {
    if (href === '/(tabs)' && (pathname === '/(tabs)' || pathname.endsWith('/'))) {
      return true;
    }
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.navBar}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.href}
            style={styles.navItem}
            onPress={() => router.replace(item.href as any)}
            activeOpacity={0.7}
          >
            <FontAwesome
              name={item.icon}
              size={24}
              color={isActive(item.href) ? '#007AFF' : '#999999'}
              style={styles.icon}
            />
            <Text
              style={[
                styles.label,
                { color: isActive(item.href) ? '#007AFF' : '#999999' },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  icon: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
});
