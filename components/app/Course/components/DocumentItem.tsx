import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Modal } from 'react-native';
import { Document } from '../../../../config/constantType';
import { FontAwesome } from '@expo/vector-icons';
import PDFReader from 'rn-pdf-reader-js';
import { Feather } from '@expo/vector-icons';

export interface DocumentItemProps {
	document: Document;
}

const DocumentItem = ({ document }: DocumentItemProps) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			{open ? (
				<Modal animationType={'slide'}>
					<View style={{ height: 50, backgroundColor: '#24292d' }}>
						<TouchableOpacity style={{padding: 8}} onPress={() => {
                            setOpen(false)
                        }}>
							<Feather name="arrow-left" size={34} color="#fff" />
						</TouchableOpacity>
					</View>
					<PDFReader
						source={{
							uri: document.url,
						}}
						withScroll={true}
					/>
				</Modal>
			) : (
				<TouchableOpacity
					style={styles.container}
					activeOpacity={1}
					onPress={() => {
						setOpen(true);
					}}
				>
					<View style={styles.content}>
						<FontAwesome name="file-pdf-o" size={24} color="black" />
						<Text style={styles.titre}>{document.titre}</Text>
					</View>
				</TouchableOpacity>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		height: 50,
		marginVertical: 10,
		borderRadius: 20,
		flexDirection: 'row',
		backgroundColor: '#fff',
	},
	content: {
		flexDirection: 'row',
		marginHorizontal: 20,
		alignSelf: 'center',
	},
	titre: {
		textAlignVertical: 'center',
		fontSize: 15,
		includeFontPadding: false,
		fontWeight: 'bold',
		marginHorizontal: 20,
	},
});

export default DocumentItem;
