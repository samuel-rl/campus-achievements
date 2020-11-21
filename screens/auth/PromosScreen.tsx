import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Animated } from 'react-native';

import Loading from '../../components/common/Loading';

import Fire from '../../config/Fire';

export interface Promo {
	name: string;
	items: string[];
}

export interface ListItemProps {
	titre: string;
	animatedValue: Animated.Value;
	onPress: Function;
}

const DURATION = 1000;

const PromosScreen = ({ navigation }: any) => {
	const animatedValue = React.useRef(new Animated.Value(0)).current;
	const animate = () =>
		Animated.timing(animatedValue, {
			toValue: 1,
			duration: DURATION,
			useNativeDriver: false,
		});

	const onPress = () => {
		animatedValue.setValue(0);
		animate().start();
	};

	const [promos, setPromos] = useState<Promo[] | null>(null);
	const [loading, setLoading] = useState(true);

	const [currentList, setCurrentList] = useState<string[]>([]);
	const [isStudent, setIsStudent] = useState<null | boolean>(null);
	const [annee, setAnnee] = useState<null | string>(null);
	const [filliere, setFilliere] = useState<null | string>(null);

	useEffect(() => {
		Fire.shared.getPromos().then((res: Promo[]) => {
			setPromos(res);
			setCurrentList(['Etudiant', 'Enseignant']);
			setLoading(false);
            animate().start();
            console.log(res)
		});
	}, []);

	useEffect(() => {
		if (filliere != null) {
			navigation.navigate('RegisterStackRegister', { isStudent: isStudent, annee: annee, filliere: filliere });
		}
    }, [filliere]);
    
    useEffect(() => {
		if ((isStudent != null) && (isStudent == false)) {
			navigation.navigate('RegisterStackRegister', { isStudent: isStudent, annee: annee, filliere: filliere });
		}
	}, [isStudent]);

	const onPressItem = (titre: string) => {
		if (isStudent == null) {
			if (titre == 'Etudiant') {
				setIsStudent(true);
				let temp: string[] = [];
				promos?.map((item) => {
					temp.push(item.name);
				});
				setCurrentList(temp);
			} else {
				setIsStudent(false);
			}
		} else {
			if (annee == null) {
				setAnnee(titre);
				promos?.map((item) => {
					if (item.name == titre) {
						setCurrentList(item.items);
					}
				});
			} else {
				if (filliere == null) {
					setFilliere(titre);
				}
			}
		}
	};

	const ListItem = ({ onPress, titre, animatedValue }: ListItemProps) => {
		return (
			<TouchableOpacity
				onPress={() => {
					onPressItem(titre);
					onPress();
				}}
				style={styles.ListItem}
			>
				<Animated.View
					style={[
						{
							opacity: animatedValue.interpolate({
								inputRange: [0, 0.5, 1],
								outputRange: [0, 0.2, 1],
                            })
                        },
                    {
                        transform: [
                            {
                                scale: animatedValue.interpolate({
                                    inputRange: [0, 0.5 , 1],
                                    outputRange: [0, 0.5 ,1],
                                }),
                            },
                        ],
                    }
					]}
				>
					<Text style={styles.item}>{titre}</Text>
				</Animated.View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
				<FlatList
					contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
					data={currentList}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<ListItem onPress={onPress} animatedValue={animatedValue} titre={item.toString()} />
					)}
				/>
			)}
			<View style={styles.path}>
				{annee != null ? <Text>{annee}</Text> : null}
				{filliere != null ? (
					<Text>
						{' '}
						{'>'} {filliere}
					</Text>
				) : null}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	ListItem: {
		marginVertical: 20,
	},
	item: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		paddingHorizontal: 15,
		paddingVertical: 10,
		alignSelf: 'center',
		fontSize: 20,
	},
	path: {
		flexDirection: 'row',
	},
});

export default PromosScreen;
