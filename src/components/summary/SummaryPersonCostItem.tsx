import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  person: any;
}

function SummaryPersonCostItem({ person }: Props) {
  return (
    <View style={styles.personCard}>
      <Text style={styles.personName}>{person.name}</Text>
      <Text>Items: {person.items.length}</Text>
      <Text>Subtotal: ${person.subtotal.toFixed(2)}</Text>
      <Text>Tax: ${person.tax.toFixed(2)}</Text>
      <Text>Tip: ${person.tip.toFixed(2)}</Text>
      <Text>Total: ${person.total.toFixed(2)}</Text>
      {/* Add send reminder or export button here if needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  personCard: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  personName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
});

export default SummaryPersonCostItem;
