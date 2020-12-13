import { useHeaderHeight } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Notification } from '../../config/constantType';
import { MaterialIcons } from '@expo/vector-icons';

import { FlatList } from 'react-native-gesture-handler';

import NotificationItem from '../../components/app/Notification/NotificationItem';

import Fire from '../../config/Fire';
import { ActivityIndicator } from 'react-native-paper';

const NotificationsScreen = ({ navigation }: any) => {
	const headerHeight = useHeaderHeight();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
                    setLoading(true)
                    Fire.shared.deleteAllNotifications().then(() => {
                        setNotifications([]);
                        setLoading(false)
                    })
                }}>
					{loading ? <ActivityIndicator /> : <MaterialIcons name="delete-sweep" size={33} color="black" />}
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	useEffect(() => {
		Fire.shared.getMyNotifications().then((notifs: Notification[]) => {
			notifs.sort(function (a, b) {
				var c: any = new Date(a.date);
				var d: any = new Date(b.date);
				return d - c;
			});
			setNotifications(notifs);
		});
	}, []);

	return (
		<View style={[styles.container, { marginTop: headerHeight }]}>
            {notifications.length == 0 ? <Text style={{textAlign:"center", marginTop: 100}}>Vous avez aucune notifications</Text>: null}
			<FlatList
				data={notifications}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<NotificationItem
						onSwipe={() => {
                            console.log(index);
                            //TODO delete
						}}
						{...{ item }}
					/>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});

export default NotificationsScreen;
