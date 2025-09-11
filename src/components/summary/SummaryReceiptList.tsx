import { ReceiptItem } from '@/types/receipt';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SummaryReceiptListItem from './SummaryReceiptListItem';

interface Props {
  items: ReceiptItem[];
}

export default function SummaryReceiptList({ items }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Receipt Items</Text>
      {items?.length ? (
        <>
          {items.map((item: ReceiptItem, index: number) => (
            <SummaryReceiptListItem key={item.name + item.quantity.toString()} item={item} index={index} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
