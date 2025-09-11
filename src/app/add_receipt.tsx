import AddReceiptItemModal from '@/components/receipt/AddReceiptItemModal';
import { saveReceipt } from '@/services/FirebaseService';
import { useReceiptStore } from '@/store';
import { useAddReceiptItem, useSetCurrentReceiptId } from '@/store/receipt';
import { getCurrentReceipt } from '@/store/receipt/getters';
import { PersonAssignment } from '@/types/receipt';
import { Routes } from '@/types/router';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

type ReceiptItemInput = {
  name: string;
  price: string;
  quantity: string;
  assignedTo: PersonAssignment[];
}

const defaultItem: ReceiptItemInput = { name: '', price: '', quantity: '', assignedTo: [] };

export default function AddReceiptScreen() {
  const currentReceipt = useReceiptStore(getCurrentReceipt);
  const setCurrentReceiptId = useSetCurrentReceiptId();
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState<ReceiptItemInput>(defaultItem);
  const router = useRouter();
  const addItem = useAddReceiptItem();

  const handleAddItem = () => {
    const itemToAdd = {...newItem, quantity: parseInt(newItem.quantity) || 1 };
    addItem(itemToAdd);
    setNewItem(defaultItem);
    setModalVisible(false);
  };

  const handleSaveReceipt = async () => {
    try {
      const receiptId: string = await saveReceipt(currentReceipt);
      if (!receiptId) throw new Error('No receipt ID returned from saveReceipt');
      setCurrentReceiptId(receiptId);
      // alert('Receipt saved!');
      router.replace({ pathname: Routes.ASSIGN_PEOPLE });
    } catch (error: any) {
      alert('Error saving receipt: ' + (error.message || error));
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add Item" onPress={() => setModalVisible(true)} />
      <Button title="Save Receipt" onPress={handleSaveReceipt} color="#0a7ea4" />
      <FlatList
        data={currentReceipt.items}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>${item.price}</Text>
            <Text style={styles.itemText}>Qty: {item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 32 }}>No items yet.</Text>}
      />
      <AddReceiptItemModal
        visible={modalVisible}
        newItem={newItem}
        setNewItem={setNewItem}
        onAdd={handleAddItem}
        onCancel={() => setModalVisible(false)}
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
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
});
