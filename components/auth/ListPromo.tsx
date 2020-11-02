import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';

import { Promo } from '../../screens/auth/PromosScreen';

import Fire from '../../config/Fire';
import Loading from '../common/Loading';

export interface ListPromoProps {
	promos: Promo[] | null;
}

const ListPromo = ({ promos }: ListPromoProps) => {
	const [list, setList] = useState<string[]>([]);
	const [annee, setAnnee] = useState<null | string>(null);
	const [prom, setProm] = useState<null | string>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		/*
		let test: string[] = [];
		promos?.map((promo) => {
			test.push(promo.name.toString());
		});
        setList(test);
        */
		Fire.shared
			.getPromos()
			.then((promos) => {
                console.log(promos);
                setLoading(false)
			})
			.then((error) => {
				console.log(error);
			});
	}, []);

	interface MaVueProps {
		titre: string;
	}

	const pressItem = (titre: string) => {
		let test: string[] = [];
		if (annee == null) {
			setAnnee(titre);
			promos?.map((x) => {
				if (x.name == titre) {
					x.items.map((res) => {
						test.push(res);
					});
				}
			});
		} else if (prom == null) {
			setProm(titre);
		}
		setList(test);
	};

	const MaVue = ({ titre }: MaVueProps) => {
		return (
			<TouchableOpacity onPress={() => pressItem(titre)} style={styles.item}>
				<Text>{titre}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<View>
					<FlatList
						data={list}
						keyExtractor={(item) => item.toString()}
						renderItem={({ item }) => <MaVue titre={item.toString()} />}
					/>
					<View style={styles.path}>
						{annee != null ? <Text>{annee}</Text> : null}
						{prom != null ? (
							<Text>
								{' '}
								{'>'} {prom}
							</Text>
						) : null}
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	path: {
		flexDirection: 'row',
	},
	item: {
		backgroundColor: 'grey',
	},
});

export default ListPromo;
