import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import Fire from '../../config/Fire';


const HeaderAvatar = ({navigation}:any) => {
    const [avatar, setAvatar] = useState<null | string>(null)

    useEffect(() => {
        console.log("_____")
        console.log(Fire.shared.displayName)
        console.log("_____")
        setAvatar(Fire.shared.photoURL || null)
    }, [])

	return (
		<TouchableOpacity
			style={styles.avatarContainer}
			onPress={() => {
				navigation.openDrawer()
			}}
		>
			<Image style={styles.avatar} source={ avatar ? {uri: Fire.shared.photoURL} : require('../../assets/avatars/1.png')} />
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
