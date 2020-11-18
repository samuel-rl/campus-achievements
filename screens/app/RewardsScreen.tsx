import React, { useState, useEffect, createRef, useRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, Animated } from 'react-native';
import { colors } from '../../config/constants';
import { useHeaderHeight } from '@react-navigation/stack';
import { Reward } from '../../config/constantType';
import initialRewards from '../../config/rewards';
import Fire from '../../config/Fire';
import Toast from 'react-native-toast-message';
import CustomToast from '../../components/common/CustomToast';

const toastConfig = {
	any_custom_type: (internalState) => <CustomToast internalState={internalState}></CustomToast>,
};

interface p {
	animatedValue: Animated.Value;
	str: string;
}

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
					title="example toast"
					onPress={() => {
						toast.current.show({
							type: 'any_custom_type',
							position: 'bottom',
							visibilityTime: 4000,
							text1: 'Cheeeese !',
							text2: 'Bravo. Vous avez débloqué un nouveau succès',
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
			<Toast config={toastConfig} ref={toast} />
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
