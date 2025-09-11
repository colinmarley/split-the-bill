import { ReceiptItem } from '@/types/receipt';
import {
  getReceiptItemName,
  getReceiptItemPrice,
  getReceiptItemQuantity,
  getReceiptItemTotalPrice
} from '@/utils/summaryUtils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  item: ReceiptItem;
  index: number;
}

export default function SummaryReceiptListItem({ item, index }: Props) {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>{getReceiptItemName(item, index)}</Text>
      <Text>Qty: {getReceiptItemQuantity(item)}</Text>
      <Text>Price: ${getReceiptItemPrice(item)}</Text>
      <Text>Total: ${getReceiptItemTotalPrice(item)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontWeight: 'bold',
    flex: 1,
  },
});
