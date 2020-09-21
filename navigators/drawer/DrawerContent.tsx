import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Feather, Entypo } from '@expo/vector-icons';
import Fire from '../../config/Fire';

const DrawerContent = ({ navigation }: any) => {
	return (
		<View style={styles.container}>
			<DrawerContentScrollView>
				<DrawerItem
					icon={({ color, size }) => <Feather name="home" color={color} size={size} />}
					label="Accueil"
					onPress={() => {
						navigation.navigate('Accueil');
					}}
				/>
				<DrawerItem
					icon={({ color, size }) => <Entypo name="notification" color={color} size={size} />}
					label="Notifications"
					onPress={() => {
						navigation.navigate('Notifications');
					}}
				/>
				<DrawerItem
					icon={({ color, size }) => <Feather name="settings" color={color} size={size} />}
					label="Paramètres"
					onPress={() => {
						navigation.navigate('Paramètres');
					}}
				/>
			</DrawerContentScrollView>
			<View>
				<DrawerItem
					icon={({ color, size }) => <Feather name="log-out" color={color} size={size} />}
					label={'Déconnexion'}
					onPress={() => {
						{
							Fire.shared.signOut();
						}
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
export default DrawerContent;
