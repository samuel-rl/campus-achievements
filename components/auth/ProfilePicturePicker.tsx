import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

const ProfilePicturePicker = ({onPress, avatarLink}: any) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.containerAvatar}>
			<Image
				style={styles.avatar}
				source={avatarLink != null ? {uri: avatarLink} : require('../../assets/avatars/avatar.png')}
			></Image>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
    avatar: {
        width: 75,
        height: 75,   
        borderRadius: 50,
    },
    containerAvatar: {
        marginBottom: 10,
        alignSelf: "center",
    }
});

export default ProfilePicturePicker;
