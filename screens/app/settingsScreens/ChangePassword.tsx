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
    const [password, setPassword] = useState("");
    const [confirmPaswword, setconfirmPaswword] = useState("");
    const [mail, setMail] = useState("");

    return (
        <View style={styles.container}>
            <Text>Changer votre mail d'identifiant</Text>
            <Input
                style={styles.input}
                placeholder={"Mail"}
                keyboardType={"email-address"}
                value={mail}
                onChangeText={setMail}
            />
            <Button
                title="Valider le nouvel identifiant"
                onPress={() => {
                    Fire.shared
                        .updateMail(mail)
                        .then(() =>
                            ToastAndroid.show(
                                "vous avez bien changé votre mail de connexion",
                                5
                            )
                        );
                }}
            ></Button>
            <Text>Changer votre mot de passe</Text>
            <Input
                style={styles.input}
                placeholder={"Mot de Passe"}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Text>Confirmer votre mot de passe</Text>
            <Input
                style={styles.input}
                placeholder={"Confirmer Mot de Passe"}
                secureTextEntry
                value={confirmPaswword}
                onChangeText={setconfirmPaswword}
            />
            <Button
                title="Valider le nouveau mot de passe"
                onPress={() => {}}
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
