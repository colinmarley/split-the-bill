import React from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

interface AddPersonModalProps {
  visible: boolean;
  value: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function AddPersonModal({ visible, value, onChangeText, onSave, onCancel }: AddPersonModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Person</Text>
          <TextInput
            placeholder="Person Name"
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
          />
          <Button title="Save" onPress={onSave} />
          <Button title="Cancel" onPress={onCancel} color="#aaa" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
});
