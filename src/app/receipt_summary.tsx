import SummaryPersonalCostSection from '@/components/summary/SummaryPersonalCostSection';
import SummaryPersonList from '@/components/summary/SummaryPersonList';
import SummaryReceiptList from '@/components/summary/SummaryReceiptList';
import SummaryStoreSection from '@/components/summary/SummaryStoreSection';
import SummaryTotalBreakdownSection from '@/components/summary/SummaryTotalBreakdownSection';
import { getReceiptById, updateReceipt } from '@/services/FirebaseService';
import { useSetCurrentReceipt, useSetCurrentReceiptId } from '@/store/receipt';
import { ReceiptItem, SavedReceipt } from '@/types/receipt';
import { Routes } from '@/types/router';
import { calculateGrandTotal } from '@/utils/summaryUtils';
import { useLocalSearchParams } from 'expo-router';
import { navigate } from 'expo-router/build/global-state/routing';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function ReceiptSummaryScreen() {
  const { receiptId } = useLocalSearchParams();
  const setCurrentReceiptId = useSetCurrentReceiptId();
  const setCurrentReceipt = useSetCurrentReceipt();
  const [receipt, setReceipt] = useState<SavedReceipt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [taxPercent, setTaxPercent] = useState<number>(8.5);
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [applyTipToAll, setApplyTipToAll] = useState<boolean>(true);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const receiptData: SavedReceipt =
          await getReceiptById(receiptId as string);
        console.log(receiptData)
        setReceipt(receiptData);
        setCurrentReceipt(receiptData);
        setCurrentReceiptId(receiptData.id);
      } catch (err: any) {
        setError(err.message || 'Error fetching receipt');
      } finally {
        setLoading(false);
      }
    };
    fetchReceipt();
  }, [receiptId]);

  useEffect(() => {
    if (!receipt || !receipt.items.length) {
      return;
    }
    setTaxPercent(receipt.taxPercent || 8.5);
    setTipPercent(receipt.tipPercent || 15);
    setApplyTipToAll(receipt.applyTipToAll || true);
    setSubtotal(receipt.items.reduce(
      (sum: number, item: ReceiptItem) =>
        sum + (parseFloat(item.price) * item.quantity),
        0
      )
    );
  }, [receipt]);

  if (loading) return <ActivityIndicator style={{ marginTop: 32 }} size="large" color="#0a7ea4" />;
  if (error) return <Text style={{ color: 'red', marginTop: 32 }}>{error}</Text>;
  if (!receipt) return <Text style={{ marginTop: 32 }}>Receipt not found.</Text>;

  // Helper: Calculate per-person breakdown
  const personBreakdown = (receipt.people || []).map((person: any) => {
    // Find all items assigned to this person
    const assignedItems = (receipt.items || []).filter((item: any) =>
      item.assignedTo?.some((a: any) => a.personId === person.id)
    );
    // Calculate total for this person
    let personSubtotal = 0;
    assignedItems.forEach((item: any) => {
      const assignment = item.assignedTo.find(
        (a: any) => a.personId === person.id
      );
      if (assignment) {
        personSubtotal += (item.price * (assignment.quantity || 1));
      }
    });
    // Apply tax and tip
    const tax = personSubtotal * (taxPercent / 100);
    const tip = applyTipToAll ? personSubtotal * (tipPercent / 100) : 0;
    return {
      ...person,
      items: assignedItems,
      subtotal: personSubtotal,
      tax,
      tip,
      total: personSubtotal + tax + tip,
    };
  });

  const handleSaveReceipt = async () => {
    if (!receipt) return;
    try {
      await updateReceipt({
        ...receipt,
        taxPercent,
        tipPercent,
        applyTipToAll,
        total: calculateGrandTotal(
          subtotal,
          taxPercent,
          tipPercent,
          applyTipToAll
        ).toFixed(2),
      }, receipt.id);
      alert('Receipt info saved!');
      navigate(Routes.DASHBOARD);
    } catch (err: any) {
      alert('Error saving receipt: ' + err.message);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginBottom: 16 }}>
        <Button
          title="Edit Assignment"
          onPress={() => {
            navigate({ pathname: Routes.ASSIGN_PEOPLE, params: { receiptId: receipt.id } });
          }}
          color="#0a7ea4"
        />
      </View>
      {/* Store Info */}
      <SummaryStoreSection
        store={receipt.store}
        itemsCount={receipt.items?.length || 0}
        subtotal={subtotal}
      />
      <SummaryReceiptList items={receipt.items} receiptId={receipt.id} />
      {/* Personal Cost Breakdown */}
      <View style={styles.section}>
        <SummaryPersonalCostSection
          taxPercent={taxPercent}
          tipPercent={tipPercent}
          applyTipToAll={applyTipToAll}
          setTaxPercent={setTaxPercent}
          setTipPercent={setTipPercent}
          setApplyTipToAll={setApplyTipToAll}
        />
        <SummaryPersonList people={personBreakdown} />
      </View>

      {/* Total Breakdown */}
      <SummaryTotalBreakdownSection
        itemsCount={receipt.items?.length || 0}
        taxPercent={taxPercent}
        tipPercent={tipPercent}
        grandTotal={
          calculateGrandTotal(subtotal, taxPercent, tipPercent, applyTipToAll)
        }
        onSave={handleSaveReceipt}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
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
