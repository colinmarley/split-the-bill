import { Routes } from '@/types/router';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ResultsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Results</Text>
      <Button title="Back to Dashboard" onPress={() => router.push(Routes.DASHBOARD)} />
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
