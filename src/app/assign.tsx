import { Routes } from '@/types/router';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function AssignScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Assign Items</Text>
      <Button title="Show Results" onPress={() => router.push(Routes.RESULTS)} />
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
