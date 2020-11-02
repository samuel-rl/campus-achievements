import React, { Component, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    ToastAndroid,
} from "react-native";

import Fire from "../../../config/Fire";
import Input from "../../../components/auth/Input";
import TextButton from "../../../components/auth/TextButton";
import { colors } from "../../../config/constants";

const ChangePassword = () => {
    const [currentPassword, setcurrentPassword] = useState("");
    const [password, setPassword] = useState("");


    return (
        <View style={styles.container}>
            <Text>Votre mot de passe courant :</Text>
            <Input
                style={styles.input}
                placeholder={"Mot de passe courant"}
                secureTextEntry
                value={currentPassword}
                onChangeText={setcurrentPassword}
            />

            <Text>Votre nouveau mot de passe :</Text>
            <Input
                style={styles.input}
                placeholder={"Nouveau mot de passe"}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TextButton
                title="Valider le mot de passe"
                onPress={() => {
                    Fire.shared.changePassword(currentPassword,password);
                }}
                style={{ backgroundColor: colors.lightGrey }}

            ></TextButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginHorizontal: 40,
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
    input: {
        marginVertical: 8,
    },
});

export default ChangePassword;
