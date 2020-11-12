import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Fire from '../../config/Fire';
import { Ionicons } from '@expo/vector-icons'; 


export interface HomeScreenProps {}

const HomeScreen = ({ navigation }: any) => {
	useEffect(() => {
		Fire.shared.getIsStudent();
	}, []);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
                    style={styles.headerRight}
					onPress={() => {
						Fire.shared.student == true ? navigation.navigate("AddCourseStudent") : navigation.navigate("AddCourse")
					}}
				>
					<Ionicons name="md-add-circle-outline" size={30} color="black" />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
            <Text>Home</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
    },
    headerRight: {
        marginRight: 20,
    }
});

export default HomeScreen;
