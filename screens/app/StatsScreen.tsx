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
                        <Text style={styles.ratioStyle}>{ratioPercentage}</Text>
                    </View>
                </View>
            </View>
        );
		};
		
		const [users, setusers] = useState<any>(null);
		const [NbUsers, setNbUsers] = useState(0);
		const [NbStudents, setNbStudents] = useState<any>(null);
		const [UsersCourses, setUsersCourses] = useState<any>(null);
		const [NbStudentsInMoreThan3Courses, setNbStudentsInMoreThan3Courses] = useState(0);
		const [StudentRatio, setStudentRatio] = useState(0);

		useEffect(() => {
			Fire.shared.getAllUsers().then((result)=>{
				setusers(result);
				// console.log(users);
				setNbUsers(countUsersNumber());
				setStudentRatio(studentRatio());
				setNbStudentsInMoreThan3Courses(nbStudentsInMoreThan3Courses());
			});
			// return () => {

			// }

		}, []);

		/**
		 * Compte le nombre d'utilisateurs et range le résultat dans un use state, que
		 * ce soit des étudiants ou professeurs.
		 */
		const countUsersNumber = () => {
			let res = 0;
			users.forEach(user => {
				res++;
			});
			console.log("countUsersNumber : " + res);
			return res;
		}

		/**
		 * Compte le nombre d'étudiants inscrits à au moins 3 cours.
		 */
		const nbStudentsInMoreThan3Courses = () => {
			let curNbStudents = 0;
			users.forEach(user => {
				if (user.etudiant == true) {
					console.log("user cours : "+user.cours);


					//calcul du nombre de cours par étudiant
					//================
					var coursSize = 0;
					if (typeof(user.cours) == "undefined") {
						coursSize = 0;
					}
					else {
						coursSize = Object.keys(user.cours).length;
					}
					console.log("Cours Size : "+coursSize);
					//================


					if (coursSize >= 3) {
						curNbStudents++;
					}
				}
			});
			console.log("nb Students + de 3 cours : " + curNbStudents);
			let ratioRes = Math.ceil(curNbStudents/NbUsers * 100);
			return ratioRes;
		}


		/**
		 * Compte la proportion d'étudiants par rapport aux professeurs
		 */
		const studentRatio = () => {
			let nbEtudiant = 0;
			users.forEach(user => {
				if (user.etudiant == true) {
					nbEtudiant++;
				}
			});
			let res = Math.ceil(nbEtudiant/NbUsers * 100);
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
				borderRadius:8,
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
		ratioStyle:{
		},
});

export default StatsScreen;
