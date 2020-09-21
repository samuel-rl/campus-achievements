import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';


const HeaderAvatar = ({navigation}:any) => {


	return (
		<TouchableOpacity
			style={styles.avatarContainer}
			onPress={() => {
				navigation.openDrawer()
			}}
		>
			<Image style={styles.avatar} source={require("../../assets/avatars/5.png")} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	avatar: {
		width: '100%',
		height: '100%',
        borderRadius: 50,
	},
	avatarContainer: {
		width: 40,
		height: 40,
		justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
	},
});

export default HeaderAvatar;
