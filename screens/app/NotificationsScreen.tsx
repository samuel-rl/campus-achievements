import { useHeaderHeight } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { Notification, TypeNotification } from '../../config/constantType';
import { MaterialIcons } from '@expo/vector-icons'; 
import faker from 'faker';

import { FlatList } from 'react-native-gesture-handler';

import NotificationItem from '../../components/app/Notification/NotificationItem';

import Fire from '../../config/Fire';

const NotificationsScreen = ({ navigation }: any) => {
	const headerHeight = useHeaderHeight();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    
    React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{marginRight:10}} onPress={() => {

                }}>
					<MaterialIcons name="delete-sweep" size={33} color="black" />
				</TouchableOpacity>
			),	
		});
	}, [navigation]);

	useEffect(() => {
		Fire.shared.getMyNotifications().then((notifs: Notification[]) => {
           notifs.sort(function(a, b) {
                var c:any = new Date(a.date);
                var d:any = new Date(b.date);
                return d-c;
            });
			setNotifications(notifs);
		});
	}, []);

	return (
		<View style={[styles.container, { marginTop: headerHeight }]}>
			<FlatList
                data={notifications}
                keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<NotificationItem
						onSwipe={() => {
							console.log("swipe")
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
	},
	input: {
		height: 100,
		width: 200,
		backgroundColor: 'grey',
	},
});

export default NotificationsScreen;
