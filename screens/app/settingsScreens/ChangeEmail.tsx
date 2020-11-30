import React, { Component, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    ToastAndroid,
    Alert,
} from "react-native";
import Input from "../../../components/auth/Input";
import TextButton from "../../../components/auth/TextButton";
import { colors } from "../../../config/constants";
import Fire from "../../../config/Fire";

const ChangeEmail = () => {
    const [currentPassword, setcurrentPassword] = useState("");
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
            <Input
                style={styles.input}
                placeholder={"Mail"}
                keyboardType={"email-address"}
                value={mail}
                onChangeText={setMail}
            />
            <TextButton title="Valider la nouvelle adresse mail"
            onPress={()=>{Fire.shared.changeEmail(currentPassword,mail).then(()=>{
                Alert.alert("Adresse mail modifiée");
            }).catch((err)=>{
                Alert.alert(err.message);
            })}}
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

export default ChangeEmail;
