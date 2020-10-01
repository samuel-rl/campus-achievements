import React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import Fire from "../../config/Fire";

const ParametersScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Button
                title="Changer mes informations de profil"
                onPress={() => {
					navigation.navigate("ChangeProfile");
				}}
            ></Button>
            <Button
                onPress={() => {
                    navigation.navigate("ChangePassword");
                }}
                title="Changer mon mot de passe"
            ></Button>
            <Button
                title="Changer mon adresse mail d'identifiant"
                onPress={() => {
                    navigation.navigate("ChangeEmail");
                }}
            ></Button>
            <Button
                onPress={() => {
                    Fire.shared.getPromos();
                }}
                title="getPromos"
            ></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        marginHorizontal: 40,
        marginVertical: 5,
    },
    action: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
    },
    text: {
        fontSize: 24,
    },
});

export default ParametersScreen;
