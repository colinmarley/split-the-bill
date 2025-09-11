
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
	store: any;
	itemsCount: number;
	subtotal: number;
}

export default function SummaryStoreSection({ store, itemsCount, subtotal }: Props) {
	return (
		<View style={styles.section}>
			<Text style={styles.title}>Store Info</Text>
			<Text>Name: {store?.name || 'N/A'}</Text>
			<Text>Category: {store?.category || 'N/A'}</Text>
			<Text>Number of Items: {itemsCount}</Text>
			<Text>Subtotal: ${subtotal.toFixed(2)}</Text>
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
