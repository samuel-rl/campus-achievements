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

const ChangeProfile = () => {
    const [prénom, setprénom] = useState("");
    const [nom, setnom] = useState("");

    return (
        <View style={styles.container}>
            <Input
                style={styles.input}
                placeholder={"Nouveau prénom"}
                value={prénom}
                onChangeText={setprénom}
            />
            <TextButton
                onPress={() => {
                    Fire.shared.changePrenom(prénom);
                }}
                title="Changer le prénom"
                style={{ backgroundColor: colors.lightGrey }}
            ></TextButton>

            <Input
                style={styles.input}
                placeholder={"Nouveau nom"}
                value={nom}
                onChangeText={setnom}
            />
            <TextButton
                title="Changer le nom"
                onPress={() => {
                    Fire.shared.changeNom(nom);
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
    input: {
        marginVertical: 8,
    },
});

export default ChangeProfile;
