import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Feather } from '@expo/vector-icons'; 

const ProfilePicturePicker = ({ onPress, avatarLink, randomAvatar }: any) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.containerAvatar}>
			<Image
				style={styles.avatar}
				source={
					avatarLink != null
						? { uri: avatarLink }
						: randomAvatar == 1
						? require('../../assets/avatars/1.png')
                        : randomAvatar == 2
                        ? require('../../assets/avatars/2.png')
                        : randomAvatar == 3
                        ? require('../../assets/avatars/3.png')
                        : randomAvatar == 4
                        ? require('../../assets/avatars/4.png')
                        : randomAvatar == 5
                        ? require('../../assets/avatars/5.png')
                        : randomAvatar == 6
                        ? require('../../assets/avatars/6.png')
                        : randomAvatar == 7
                        ? require('../../assets/avatars/7.png')
                        : randomAvatar == 8
                        ? require('../../assets/avatars/8.png')
                        :  require('../../assets/avatars/9.png')
				}
			></Image>
            {avatarLink != null ? null : <Feather style={styles.change} name="camera" size={18} color="black" />}
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
		alignSelf: 'center',
    },
    change: {
        position: "absolute",
        right: 0,
        bottom: 0
    }
});

export default ProfilePicturePicker;
