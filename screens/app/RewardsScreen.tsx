import React, { useState, useEffect, createRef, useRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, Animated } from 'react-native';
import { colors } from '../../config/constants';
import { useHeaderHeight } from '@react-navigation/stack';
import { Reward } from '../../config/constantType';
import initialRewards from '../../config/rewards';
import Fire from '../../config/Fire';
import Toast from 'react-native-toast-message';
import CustomToast from '../../components/common/CustomToast';
import { getDataRewards, storeDataRewards } from '../../config/localDatabase';

const toastConfig = {
	any_custom_type: (internalState) => <CustomToast internalState={internalState}></CustomToast>,
};

const RewardsScreen = ({navigation}) => {
	const headerHeight = useHeaderHeight();
	const toast = createRef<any>();

	const [rewards, setRewards] = useState<Reward[]>(initialRewards);

	useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(Fire.shared.connectedToInternet == true){
                Fire.shared.getMyRewards().then((myRewards: Reward[]) => {
                    setRewards(myRewards);
                    storeDataRewards(myRewards);
                });
            }else{
                getDataRewards().then((rewards) => {
                    setRewards(rewards)
                })
            }
		});
		return unsubscribe;
    }, [navigation]);
    
    //Photo
    //rentrer dans un cours
    //reussir un quizz
    //avoir tout dans un cours
    //ouvrir un pdf

	return (
		<View style={styles.container}>
			<ScrollView style={{ marginTop: headerHeight }}>
				<View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent:"center" }}>
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
