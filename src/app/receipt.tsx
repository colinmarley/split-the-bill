import { Routes } from '@/types/router';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ReceiptScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Receipt Photo & OCR</Text>
      <Button title="Process Receipt" onPress={() => router.push(Routes.PEOPLE)} />
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
