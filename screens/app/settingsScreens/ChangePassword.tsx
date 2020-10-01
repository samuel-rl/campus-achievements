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

const ChangePassword = () => {
    const [currentPassword, setcurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPaswword, setconfirmPaswword] = useState("");
    const [mail, setMail] = useState("");

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

            <Button
                title="Valider le mot de passe"
                onPress={() => {
                    Fire.shared.changePassword(currentPassword,password);
                }}
            ></Button>
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
