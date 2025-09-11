import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { UserHeader } from '../components/header/UserHeader';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="landing" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            header: () => <UserHeader />,
            headerShown: true,
          }}
        />
        <Stack.Screen name="add_receipt" options={{ title: 'Add Receipt' }} />
        <Stack.Screen name="assign_people" options={{ title: 'Assign People' }} />
        <Stack.Screen name="receipt" options={{ title: 'Receipt Photo & OCR' }} />
        <Stack.Screen name="assign" options={{ title: 'Assign Items' }} />
        <Stack.Screen name="results" options={{ title: 'Results' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
