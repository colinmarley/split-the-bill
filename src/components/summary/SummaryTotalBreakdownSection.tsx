import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface Props {
  itemsCount: number;
  taxPercent: number;
  tipPercent: number;
  grandTotal: number;
  onSave: () => void;
}

export default function SummaryTotalBreakdownSection({ itemsCount, taxPercent, tipPercent, grandTotal, onSave }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Total Breakdown</Text>
      <Text>Number of Total Items: {itemsCount}</Text>
      <Text>Tax Percentage: {taxPercent}%</Text>
      <Text>Tip Percentage: {tipPercent}%</Text>
      <Text>Grand Total: ${grandTotal.toFixed(2)}</Text>
      <Button title="Save" onPress={onSave} color="#0a7ea4" />
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
