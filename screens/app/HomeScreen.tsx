import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import Fire from '../../config/Fire';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../config/constants';
import { useHeaderHeight } from '@react-navigation/stack';
import { Course } from '../../config/constantType';
import CoursesItem from '../../components/app/Home/CoursesItem';
import { ActivityIndicator } from 'react-native-paper';
import { getDataCourse, storeDataCourse } from '../../config/localDatabase'

export interface HomeScreenProps {}

const HomeScreen = ({ navigation }: any) => {
	const headerHeight = useHeaderHeight();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
            if(Fire.shared.connectedToInternet == true){
                Fire.shared.getIsStudent();
                Fire.shared.getMyInfos().then(async (res: any) => {
                    var temp: string[] = [];
    
                    if (Fire.shared.student == true) {
                        if (res.cours != undefined) {
                            res.cours.map((x: any) => temp.push(x.uid));
                        }
                    } else {
                        if (res.coursEnseignant != undefined) {
                            res.coursEnseignant.map((x: any) => temp.push(x.uid));
                        }
                    }
                    Fire.shared.getMyCoursesInformationsByUID(temp).then((x: Course[]) => {
                        setCourses(x);
                        setLoading(false)
                        storeDataCourse(x)
                    });
                });
            }else{
                ToastAndroid.show("aucune connexion", 1000);
                getDataCourse().then((cours) => {
                    setCourses(cours)
                    setLoading(false)
                })
            }
		});
		return unsubscribe;
	}, [navigation]);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={styles.headerRight}
					onPress={() => {
                        Fire.shared.connectedToInternet ? navigation.navigate('JoinCourses') : ToastAndroid.show("aucune connexion", 1000);
					}}
				>
					<Ionicons name="md-add-circle-outline" size={30} color="black" />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<View style={{ marginTop: headerHeight }}>
                {loading ? <ActivityIndicator /> : null}
				{courses.length == 0 && !loading ? (
					<Text style={styles.warningTextEmpty}>Vous êtes dans aucun cours</Text>
				) : (
					<FlatList
						extraData={courses}
						data={courses}
						renderItem={(item) => <CoursesItem item={item.item} navigation={navigation} />}
						keyExtractor={(item, index) => index.toString()}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	headerRight: {
		marginRight: 20,
	},
	warningTextEmpty: {
		alignSelf: 'center',
		marginTop: 200,
	},
});

export default HomeScreen;
