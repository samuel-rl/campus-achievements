import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../config/constants";
import Fire from "../../config/Fire";

const StatsScreen = () => {
    const headerHeight = useHeaderHeight();

    const Stat = ({ name, ratio }: any) => {
        var ratioPercentage = ratio.toString() + "%";

        return (
            <View style={styles.statContainer}>
                <Text>{name}</Text>
                <View style={styles.behindCompletionContainer}>
                    <View
                        style={[
                            styles.completionContainer,
                            {
																width: ratioPercentage,
                            },
                        ]}
                    >
                        <Text>{ratioPercentage}</Text>
                    </View>
                </View>
            </View>
        );
		};
		
		const [users, setusers] = useState<any>(null);
		const [NbStudents, setNbStudents] = useState<any>(null);
		const [UsersCourses, setUsersCourses] = useState<any>(null);
		const [NbStudentsInMoreThan3Courses, setNbStudentsInMoreThan3Courses] = useState(0);
		const [StudentRatio, setStudentRatio] = useState(0);

		useEffect(() => {
			Fire.shared.getAllUsers().then((result)=>{
				setusers(result);
				// console.log(users);
				// setNbStudents(nbStudentsInMoreThan3Courses());
				// setNbStudents(studentRatio());
				setStudentRatio(studentRatio());
				setNbStudentsInMoreThan3Courses(nbStudentsInMoreThan3Courses());
			});

			// Fire.shared.getAllStudentsCourses().then((result)=>{
			// 	setUsersCourses(result);
			// 	console.log("UsersCourses : " + UsersCourses);
			// 	// var nbStudents = () => {}
			// 	// setNbStudentsInMoreThan3Courses(nbStudents);
			// });

			// Fire.shared.getNbStudents().then((result)=>{
			// 	setNbStudents(result);

			// });

		}, []);

		/**
		 * Compte le nombre d'étudiants inscrits à au moins 3 cours.
		 */
		const nbStudentsInMoreThan3Courses = () => {
			let res = 40;
			users.forEach(user => {
				if (user.etudiant == true) {
					console.log("user cours : "+user.cours);
				}
			});
			console.log("nb Students + de 3 cours : " + res);
			return res;
		}

		/**
		 * Compte la proportion d'étudiants par rapport aux professeurs
		 */
		const studentRatio = () => {
			let nbEtudiant = 0;
			let nbAll = 0;
			users.forEach(user => {
				if (user.etudiant == true) {
					nbEtudiant++;
					nbAll++;
				}
				else{
					nbAll++;
				}
			});
			let res = Math.ceil(nbEtudiant/nbAll * 100);
			// console.log("%etu : " + res);
			return res;
		}

    return (
        <View style={styles.container}>
            <Stat
                name="Nombre de personnes inscrites à au moins 3 cours : "
                ratio={NbStudentsInMoreThan3Courses}
            ></Stat>
            <Stat
                name="Part des étudiants parmis les utilisateurs :"
                ratio={StudentRatio}
            ></Stat>
            <Stat
                name="Nombre de personnes ayant fait quelque chose :"
                ratio={20}
            ></Stat>
            <Stat
                name="Nombre de personnes ayant fait quelque chose :"
                ratio={100}
            ></Stat>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
		},
		statContainer:{
			display:"flex",
			justifyContent: "space-between",
			alignItems:"flex-start",
			height:60,
			paddingTop:10,
			marginVertical:20,
			backgroundColor: colors.lightGrey,
			flexDirection:"column",
			marginHorizontal:20,
		},
    completionContainer: {
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: colors.foam,
        // width: "80%",
        //   borderBottomEndRadius:8,
				borderBottomStartRadius: 8,
				borderTopStartRadius:8,
        paddingLeft: 5,
        // flexWrap: "nowrap",
        // overflow: "hidden",
    },
    behindCompletionContainer: {
        position: "relative",
        backgroundColor: colors.lightLilac,
        width: "100%",
        // borderBottomEndRadius: 8,
				// borderBottomStartRadius: 8,
				borderRadius: 8,
    },
});

export default StatsScreen;
