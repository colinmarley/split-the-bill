import { Person } from '@/types/receipt';
import React from 'react';
import { FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface SelectPeopleListProps {
	people: Person[];
	selectedPeople: Person[];
	onToggle: (person: Person, checked: boolean) => void;
  setShowAddModal: (showAddModal: boolean) => void;
}

export default function SelectPeopleList({
  people, selectedPeople, onToggle, setShowAddModal
}: SelectPeopleListProps) {
  const renderPersonListItem = ({ item }: { item: Person }) => {
    const checked = selectedPeople.some(p => p.id === item.id);
    return (
      <View style={styles.personRow}>
        <Text style={styles.personText}>{item.name}</Text>
        <Switch
          value={checked}
          onValueChange={newValue => onToggle(item, newValue)}
          style={{ marginLeft: 12 }}
        />
      </View>
    );
  }
	return (
		<View>
      <View style={styles.headerView}>
        <Text style={styles.title}>Select People for Receipt</Text>
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          style={styles.plusButton}
        >
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
      </View>
			<FlatList
				data={people}
				keyExtractor={item => item.id}
				renderItem={renderPersonListItem}
        ListEmptyComponent={<Text style={{ marginTop: 8 }}>No saved people found.</Text>}
        style={styles.peopleList}
      />
    </View>
	);
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
	peopleList: {
		maxHeight: 240,
		marginBottom: 8,
	},
	personRow: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	personText: {
		fontSize: 16,
	},
  plusButton: {
    backgroundColor: '#0a7ea4',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  plusIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
