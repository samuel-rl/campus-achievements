import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../config/constants";

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

    return (
        <View style={styles.container}>
            <Stat
                name="Nombre de personnes ayant fait quelque chose :"
                ratio={50}
            ></Stat>
            <Stat
                name="Nombre de personnes ayant fait quelque chose :"
                ratio={70}
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
