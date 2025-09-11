import { Routes } from '@/types/router';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function PeopleScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Add People</Text>
      <Button title="Assign Items" onPress={() => router.push(Routes.ASSIGN)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
