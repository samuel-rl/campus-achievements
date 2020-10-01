import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Feather } from "@expo/vector-icons";

import Fire from "../../config/Fire";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, statusbar } from "../../config/constants";

const ParametersScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            {/* <Button
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
            ></Button> */}

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
                <Text style={styles.buttonText}>
                    GetPromos (test)
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        marginHorizontal: 40,
        marginTop: statusbar.height,
    },
    touchable: {
        backgroundColor: colors.lilac,
        // width:"80%",
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
