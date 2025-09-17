import AddPersonModal from '@/components/people/AddPersonModal';
import SelectPeopleList from '@/components/people/SelectPeopleList';
import { getPeople } from '@/services/FirebaseService';
import { useReceiptStore } from '@/store';
import { getCurrentReceiptId } from '@/store/receipt/getters';
import { useSetReceiptPeople } from '@/store/receipt/setters';
import { Person } from '@/types/receipt';
import { Routes } from '@/types/router';
import { addNewPerson } from '@/utils/assignmentUtils';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

export default function SelectPeopleScreen() {
  const router = useRouter();
  const currentReceiptId = useReceiptStore(getCurrentReceiptId);
  const setReceiptPeople = useSetReceiptPeople();
  const setPeople = useReceiptStore(state => state.setReceiptItems);
  const [savedPeople, setSavedPeople] = useState<Person[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const data: Person[] = await getPeople();
        setSavedPeople(data);
      } catch (err: any) {
        Alert.alert('Error', err.message || 'Could not fetch people');
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  const handleTogglePerson = (person: Person, checked: boolean) => {
    if (checked) {
      setSelectedPeople(prev => [...prev, person]);
    } else {
      setSelectedPeople(prev => prev.filter(p => p.id !== person.id));
    }
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setNewPersonName('');
  }

  const handleContinue = () => {
    setReceiptPeople(selectedPeople);
    router.replace({
      pathname: Routes.ASSIGN_PEOPLE,
      params: { receiptId: currentReceiptId }
    });
  };

  const handleSave = async () => {
    if (!newPersonName.trim()) return;
    const result = await addNewPerson(newPersonName.trim(), savedPeople);
    if (result && result.error) {
      Alert.alert('Error', result.error);
    } else {
      setSavedPeople(prev => [...prev, result]);
      setNewPersonName('');
      setShowAddModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <SelectPeopleList
        people={savedPeople}
        selectedPeople={selectedPeople}
        onToggle={handleTogglePerson}
        setShowAddModal={setShowAddModal}
      />
      <AddPersonModal
        visible={showAddModal}
        value={newPersonName}
        onChangeText={setNewPersonName}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={selectedPeople.length === 0}
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
});
