import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Notification } from '../../../config/constantType';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
dayjs.locale();
dayjs.extend(relativeTime);

export interface NotificationLayoutProps {
	item: Notification;
}

const NotificationLayout = ({ item: { date, from, message, type } }: NotificationLayoutProps) => {

	return (
		<View style={styles.content}>
			<View style={{justifyContent:"center"}}>
				<Image style={styles.avatar} source={{ uri: from }} />
			</View>
			<View style={{ justifyContent: 'space-between', flex: 1, marginLeft: 15 }}>
				<View>
                    <Text style={{ fontSize: 20 }}>{type}</Text>
                </View>
				<View>
					<Text style={{ textAlignVertical: 'center' }}>{message}</Text>
				</View>
				<View>
					<Text style={{ color: '#C0C0C0', textAlign: 'right' }}>{dayjs(date).fromNow()}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	content: {
		flexDirection: 'row',
		backgroundColor: 'white',
		padding : 5,
		height: 100,
		borderRadius: 12,
	},
	avatar: {
		width: 75,
		height: 75,
		borderRadius: 50,
	},
});

export default NotificationLayout;
