import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { BasicUserInfos } from '../../../config/constantType';
import ItemEnseignants from './components/ItemEnseignants';

export interface EnseignantsListProps {
    enseignants: BasicUserInfos[];
}

const EnseignantsList = ({ enseignants }: EnseignantsListProps) => {
	return (
		<ScrollView>
			{enseignants.map((enseignant: BasicUserInfos, index: number) => {
				return <ItemEnseignants key={index.toString()} enseignant={enseignant} />;
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default EnseignantsList;
