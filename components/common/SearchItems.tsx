import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';

export interface SearchItemsProps {
	search: string;
	onChangeSearch: Function;
}

const SearchItems = ({ search, onChangeSearch }: SearchItemsProps) => {
	return <TextInput style={styles.input} placeholder="Rechercher..." placeholderTextColor="#000" onChangeText={(res) => onChangeSearch(res)} value={search} />;
};

const styles = StyleSheet.create({
    input: {
		marginTop: 0,
        marginHorizontal: 20,
		height: 50,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#000',
        paddingLeft: 20,
        color: "#000"
	},
});

export default SearchItems;
