import { getPeople, updateReceipt } from '@/services/FirebaseService';
import { useReceiptStore, useUserStore } from '@/store';
import { getCurrentReceipt, getCurrentReceiptId, getReceiptPeople } from '@/store/receipt/getters';
import { getUser } from '@/store/user';
import { Person, ReceiptItem } from '@/types/receipt';
import { addNewPerson } from '@/utils/assignmentUtils';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

export default function AssignPeopleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  console.log('params:', params);
  const currentReceiptId = useReceiptStore(getCurrentReceiptId);
  const people = useReceiptStore(getReceiptPeople);
  const user = useUserStore(getUser);
  const [savedPeople, setSavedPeople] = useState<Person[]>([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [loading, setLoading] = useState(false);
  const currentReceipt = useReceiptStore(getCurrentReceipt);

  // Fetch people on mount
  React.useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const data: Person[] = await getPeople();
        console.log('Fetched people:', data);
        setSavedPeople(data);
      } catch (err: any) {
        Alert.alert('Error', err.message || 'Could not fetch people');
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  // Add a person to Firestore
  const handleAddPerson = async () => {
    if (!newPersonName.trim()) return;
    setLoading(true);
    if (!user?.uid) {
      Alert.alert('Error', 'User not authenticated');
      setLoading(false);
      return;
    }
    const result = await addNewPerson(newPersonName.trim());
    if (result.error) {
      Alert.alert('Error', result.error);
    } else {
      setNewPersonName('');
    }
    setLoading(false);
  };

  // Assign all items to people (simple example: assign all items to all people)
  const handleAssignItems = async () => {
    if (savedPeople.length === 0) {
      Alert.alert('No people added', 'Please add at least one person.');
      return;
    }
    if (!currentReceiptId || !currentReceipt) {
      Alert.alert('Error', 'No current receipt to update.');
      return;
    }
    // Assign each item to all people
    const updatedItems: ReceiptItem[] = currentReceipt.items.map((item: ReceiptItem) => ({
      ...item,
      assignedTo: people.map((person: Person) => (
        { name: person.name, personId: person.id, quantity: item.quantity }
      ))
    }));
    // Save updated receipt
    try {
      await updateReceipt({ ...currentReceipt, items: updatedItems }, currentReceiptId);
      Alert.alert('Success', 'Items assigned and receipt saved!');
      router.replace('/dashboard');
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Could not save receipt');
    }
  };

  // Dropdown state for each item
  const [openDrawerIdx, setOpenDrawerIdx] = useState<number | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');
  const [assignQuantity, setAssignQuantity] = useState('1');

  // Assign person to item
  const handleAssignPerson = () => {
    if (selectedItemIdx === null || !selectedPersonId) return;
    const person = people.find(p => p.id === selectedPersonId);
    if (!person) return;
    const quantityNum = parseInt(assignQuantity) || 1;
    const item = currentReceipt.items[selectedItemIdx];
    // Prevent duplicate assignment
    if (item?.assignedTo?.some(a => a.personId === person.id)) {
      Alert.alert('Already assigned', `${person.name} is already assigned to this item.`);
      return;
    }
    // Validate total assigned quantity
    const totalAssigned = item?.assignedTo?.reduce((sum, a) => sum + (a.quantity || 0), 0) || 0;
    if (totalAssigned + quantityNum > item.quantity) {
      Alert.alert('Quantity exceeded', `Total assigned quantity exceeds item quantity (${item.quantity}).`);
      return;
    }
    useReceiptStore.getState().assignItem(selectedItemIdx, person.id, person.name, quantityNum);
    setShowAssignModal(false);
    setSelectedPersonId('');
    setAssignQuantity('1');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign People to Receipt</Text>

      {/* Saved People List for easy adding */}
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Saved People</Text>
      <FlatList
        data={savedPeople}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const checked = people?.some(p => p.id === item.id);
          return (
            <View style={styles.personRow}>
              <Text style={styles.personText}>{item.name}</Text>
              <Switch
                value={checked}
                onValueChange={(newValue) => {
                  if (newValue) {
                    useReceiptStore.getState().addPerson(item);
                  } else {
                    useReceiptStore.getState().removePerson(item.id);
                  }
                }}
                style={{ marginLeft: 12 }}
              />
            </View>
          );
        }}
        ListEmptyComponent={<Text style={{ marginTop: 8 }}>No saved people found.</Text>}
        style={styles.peopleList}
      />

      {/* People List at Top */}
      <Text style={{ fontWeight: 'bold', marginTop: 16 }}>People in Receipt</Text>
      <FlatList
        data={people}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.personRow}>
            <Text style={styles.personText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 32 }}>No people added yet.</Text>}
        style={styles.peopleList}
      />
      <TextInput
        placeholder="Person Name"
        value={newPersonName}
        onChangeText={setNewPersonName}
        style={styles.input}
      />
      <Button title="Add Person" onPress={handleAddPerson} disabled={loading} />
      {/* Receipt Items List at Bottom */}
      <Text style={styles.subtitle}>Receipt Items</Text>
      <FlatList
        data={currentReceipt?.items ?? []}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View>
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>${item.price}</Text>
              <Text style={styles.itemText}>Qty: {item.quantity}</Text>
              <Text
                style={styles.arrow}
                onPress={() => setOpenDrawerIdx(openDrawerIdx === index ? null : index)}
              >{openDrawerIdx === index ? '\u25B2' : '\u25BC'}</Text>
            </View>
            {openDrawerIdx === index && (
              <View style={styles.drawer}>
                <Text style={styles.drawerTitle}>Assigned People:</Text>
                {(item.assignedTo && item.assignedTo.length > 0) ? (
                  item.assignedTo.map((assigned, idx) => (
                    <View key={idx} style={styles.assignedRow}>
                      <Text style={styles.assignedText}>
                        {assigned.name} (Qty: {assigned.quantity ?? 1})
                      </Text>
                      <Button
                        title="Edit"
                        onPress={() => {
                          setSelectedItemIdx(index);
                          setSelectedPersonId(assigned.personId);
                          setAssignQuantity(assigned.quantity.toString());
                          setShowAssignModal(true);
                        }}
                        color="#0a7ea4"
                      />
                      <Button
                        title="Remove"
                        onPress={() => {
                          // Remove assignment
                          const items = [...currentReceipt.items];
                          items[index] = {
                            ...items[index],
                            assignedTo: items[index].assignedTo.filter(a => a.personId !== assigned.personId)
                          };
                          useReceiptStore.getState().setReceiptItems(items);
                        }}
                        color="#d9534f"
                      />
                    </View>
                  ))
                ) : (
                  <Text style={styles.assignedText}>No assignments yet.</Text>
                )}
                <Text style={styles.totalAssigned}>
                  Total Assigned: {item.assignedTo.reduce((sum, a) => sum + (a.quantity || 0), 0)} / {item.quantity}
                </Text>
                <Button
                  title="Add Assignment"
                  onPress={() => {
                    setSelectedItemIdx(index);
                    setSelectedPersonId('');
                    setAssignQuantity('1');
                    setShowAssignModal(true);
                  }}
                  color="#0a7ea4"
                />
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 16 }}>No items yet.</Text>}
        style={styles.itemsList}
      />
      {/* Assignment Modal */}
      {showAssignModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assign Person</Text>
            <Text style={{ marginBottom: 8 }}>Select Person:</Text>
            <FlatList
              data={people}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Button
                  title={item.name}
                  onPress={() => setSelectedPersonId(item.id)}
                  color={selectedPersonId === item.id ? '#0a7ea4' : undefined}
                />
              )}
              style={{ marginBottom: 12 }}
            />
            <TextInput
              placeholder="Quantity"
              value={assignQuantity}
              onChangeText={setAssignQuantity}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button title="Assign" onPress={handleAssignPerson} color="#0a7ea4" disabled={!selectedPersonId} />
            <Button title="Cancel" onPress={() => setShowAssignModal(false)} color="#aaa" />
          </View>
        </View>
      )}
      <Button title="Assign Items & Save" onPress={handleAssignItems} color="#0a7ea4" disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  assignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalAssigned: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: '#0a7ea4',
  },
  arrow: {
    fontSize: 22,
    paddingHorizontal: 8,
    color: '#0a7ea4',
    alignSelf: 'center',
  },
  drawer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  drawerTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  assignedText: {
    fontSize: 15,
    marginBottom: 4,
  },
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  peopleList: {
    maxHeight: 120,
    marginBottom: 8,
  },
  personRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  personText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  itemsList: {
    flexGrow: 1,
    marginBottom: 12,
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
