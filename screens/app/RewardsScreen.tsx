import React, { useState, useEffect, createRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button } from 'react-native';
import { colors } from '../../config/constants';
import { useHeaderHeight } from '@react-navigation/stack';
import { Reward } from '../../config/constantType';
import initialRewards from '../../config/rewards';
import Fire from '../../config/Fire';
import Toast from 'react-native-toast-message';

const RewardsScreen = () => {
	const headerHeight = useHeaderHeight();
	const toast = createRef<any>();

	const [rewards, setRewards] = useState<Reward[]>(initialRewards);

	useEffect(() => {
		Fire.shared.getMyRewards().then((myRewards: Reward[]) => {
			setRewards(myRewards);
		});
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView style={{ marginTop: headerHeight }}>
				<Button
					title="press"
					onPress={() => {
						toast.current.show({
                            position: 'bottom',
                            visibilityTime: 2000,
                            text1: 'Bravo',
                            text2: 'Nouveau succes débloqué',
                        });
					}}
				></Button>
				<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
					{rewards.map((item: Reward, index: any) => {
						return (
							<View
								key={index}
								style={{ width: 100, marginHorizontal: 10, marginVertical: 30, alignItems: 'center' }}
							>
								<Image
									style={[
										{ width: 70, height: 70 },
										item.done ? null : { tintColor: 'gray', opacity: 0.1 },
									]}
									source={item.src}
								/>
								<Text>{item.done ? item.name : '???'}</Text>
							</View>
						);
					})}
				</View>
			</ScrollView>
			<Toast ref={toast} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
});

export default RewardsScreen;
