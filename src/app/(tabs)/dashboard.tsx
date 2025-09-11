import { Routes } from '@/types/router';
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function DashboardScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Button title="Add Receipt" onPress={() => router.push({ pathname: Routes.ADD_RECEIPT })} />
      <Button title="Take Receipt Photo" onPress={() => router.push({ pathname: Routes.RECEIPT })} />
      <Button title="View Receipts" onPress={() => router.push('/receipts')} color="#0a7ea4" />
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
