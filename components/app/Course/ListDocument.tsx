import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Document } from '../../../config/constantType'
import DocumentItem from './components/DocumentItem';

export interface ListDocumentProps {
    documents: Document[]
}

const ListDocument = ({documents}:ListDocumentProps) => {

  return (
<View style={styles.container}>
			{documents.length == 0 ? (
				<Text style={styles.warningText}>Aucun document disponible</Text>
			) : (
				documents.map((document: Document, index: number) => {
					return <DocumentItem key={index.toString()} document={document}/>;
				})
			)}
		</View>
  );
};

const styles = StyleSheet.create({
    container: {
    },
	warningText: {
        color: 'red',
        marginTop: 30,
        alignSelf: "center",
        fontSize: 18
	},
});

export default ListDocument;