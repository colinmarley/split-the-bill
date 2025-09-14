import { ReceiptItem } from '@/types/receipt';
import { navigate } from 'expo-router/build/global-state/routing';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SummaryReceiptListItem from './SummaryReceiptListItem';

interface Props {
  items: ReceiptItem[];
  receiptId: string;
}

export default function SummaryReceiptList({ items, receiptId }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Receipt Items</Text>
        <Button
          title="Edit Assignment"
          onPress={() => navigate({ pathname: '/assign_people', params: { receiptId: receiptId } })}
          color="#0a7ea4"
        />
      </View>
      {items?.length ? (
        <>
          {items.map((item: ReceiptItem, index: number) => (
            <SummaryReceiptListItem
              key={item.name + item.quantity.toString()}
              item={item}
              index={index}
            />
          ))}
        </>
      ) : (
        <Text>No items found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
