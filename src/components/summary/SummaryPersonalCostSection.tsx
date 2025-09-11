import React from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';

interface Props {
  taxPercent: number;
  tipPercent: number;
  applyTipToAll: boolean;
  setTaxPercent: (v: number) => void;
  setTipPercent: (v: number) => void;
  setApplyTipToAll: (v: boolean) => void;
}

export default function SummaryPersonalCostSection({
  taxPercent,
  tipPercent,
  applyTipToAll,
  setTaxPercent,
  setTipPercent,
  setApplyTipToAll,
}: Props) {
  return (
    <>
      <Text style={styles.title}>Personal Cost Breakdown</Text>
      <View style={styles.row}>
        <Text>Tax %:</Text>
        <TextInput
          style={styles.input}
          value={taxPercent.toString()}
          onChangeText={v => setTaxPercent(Number(v) || 0)}
          keyboardType="numeric"
        />
        <Text>Tip %:</Text>
        <TextInput
          style={styles.input}
          value={tipPercent.toString()}
          onChangeText={v => setTipPercent(Number(v) || 0)}
          keyboardType="numeric"
        />
        <Text>Apply tip to all:</Text>
        <Switch value={applyTipToAll} onValueChange={setApplyTipToAll} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 4,
    width: 60,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
});
