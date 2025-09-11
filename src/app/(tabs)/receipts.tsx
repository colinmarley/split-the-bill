import { getReceipts } from '@/services/FirebaseService';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ReceiptsScreen() {
  const router = useRouter();
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const data = await getReceipts();
        setReceipts(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching receipts');
      } finally {
        setLoading(false);
      }
    };
    fetchReceipts();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 32 }} size="large" color="#0a7ea4" />;
  if (error) return <Text style={{ color: 'red', marginTop: 32 }}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Receipts</Text>
      <FlatList
        data={receipts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.receiptRow}
            onPress={() => router.push({ pathname: '/receipt_summary', params: { receiptId: item.id } })}
          >
            <Text style={styles.receiptText}>{item.store?.name || 'No Store'}</Text>
            <Text style={styles.receiptText}>Items: {item.items?.length || 0}</Text>
            <Text style={styles.receiptText}>Date: {item.createdAt?.toDate?.() ? item.createdAt.toDate().toLocaleString() : String(item.createdAt)}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 32 }}>No receipts found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  receiptRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  receiptText: {
    fontSize: 16,
  },
});

