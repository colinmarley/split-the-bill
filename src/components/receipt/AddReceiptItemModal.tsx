import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type ReceiptItemInput = {
  name: string;
  price: string;
  quantity: string;
  assignedTo: any[];
};

type AddReceiptItemModalProps = {
  visible: boolean;
  newItem: ReceiptItemInput;
  setNewItem: (item: ReceiptItemInput) => void;
  onAdd: () => void;
  onCancel: () => void;
};

const AddReceiptItemModal: React.FC<AddReceiptItemModalProps> = ({ visible, newItem, setNewItem, onAdd, onCancel }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add Receipt Item</Text>
        <TextInput
          placeholder="Name"
          value={newItem.name}
          onChangeText={name => setNewItem({ ...newItem, name })}
          style={styles.input}
        />
        <TextInput
          placeholder="Price"
          value={newItem.price}
          onChangeText={price => setNewItem({ ...newItem, price })}
          keyboardType="decimal-pad"
          style={styles.input}
        />
        <TextInput
          placeholder="Quantity"
          value={newItem.quantity}
          onChangeText={quantity => setNewItem({ ...newItem, quantity })}
          keyboardType="number-pad"
          style={styles.input}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onAdd} style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: 300,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  cancelBtn: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#333',
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: '#0a7ea4',
    padding: 10,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddReceiptItemModal;
