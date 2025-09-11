import { useUserStore } from '@/store';
import { getUser } from '@/store/user';
import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';

export const UserHeader = () => {
  const user = useUserStore(getUser);
  if (!user) return null;
  const display = user.displayName || user.email || '';
  const firstLetter = display.charAt(0).toUpperCase();
  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <View style={styles.headerContent}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
        <Text style={styles.emailText}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingRight: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 24,
    width: '100%',
  },
  spacer: {
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0a7ea4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  emailText: {
    fontSize: 16,
  },
});
