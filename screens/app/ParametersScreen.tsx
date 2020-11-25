import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Feather } from "@expo/vector-icons";

import Fire from "../../config/Fire";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, statusbar } from "../../config/constants";

const ParametersScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                    navigation.navigate("ChangeProfile");
                }}
            >
                <Text style={styles.buttonText}>
                    Changer mes informations de profil
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                    navigation.navigate("ChangePassword");
                }}
            >
                <Text style={styles.buttonText}>Changer mon mot de passe</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                    navigation.navigate("ChangeEmail");
                }}
            >
                <Text style={styles.buttonText}>
                    Changer mon adresse mail d'identifiant
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                    Fire.shared.getPromos();
                }}
            >
                <Text style={styles.buttonText}>GetPromos (test)</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        marginHorizontal: 2,
        marginTop: statusbar.height - 10,
    },
    touchable: {
        backgroundColor: colors.almostWhite,
        borderTopWidth:2,
        borderBottomWidth:2,
        paddingVertical: 20,
        borderRadius: 6,
    },
    buttonText: {
        color: colors.darkLilac,
        alignSelf: "center",
        textAlign: "center",
    },
});

export default ParametersScreen;
