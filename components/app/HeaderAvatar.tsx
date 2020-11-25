import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import Fire from '../../config/Fire';


const HeaderAvatar = ({navigation}:any) => {
	return (
		<TouchableOpacity
			style={styles.avatarContainer}
			onPress={() => {
				navigation.openDrawer()
			}}
		>
			<Image style={styles.avatar} source={{uri: Fire.shared.photoURL || undefined}} />
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
