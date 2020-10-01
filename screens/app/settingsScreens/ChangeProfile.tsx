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

const ChangeProfile = () => {
    const [prénom, setprénom] = useState("");
    const [nom, setnom] = useState("");

    return (
        <View style={styles.container}>
            <Text>Hello.</Text>

            <Input
                style={styles.input}
                placeholder={"Nouveau prénom"}
                value={prénom}
                onChangeText={setprénom}
            />

            <Button
                title="Changer le prénom"
                onPress={() => {
                    Fire.shared.changePrenom(prénom);
                }}
            ></Button>

            <Input
                style={styles.input}
                placeholder={"Nouveau nom"}
                value={nom}
                onChangeText={setnom}
            />
            <Button
                title="Changer le nom"
                onPress={()=>{
                    Fire.shared.changeNom(nom);
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

export default ChangeProfile;
