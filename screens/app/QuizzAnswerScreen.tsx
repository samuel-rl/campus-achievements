import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import QuizzAnswer from "../../components/common/QuizzAnswer";

const QuizzAnswerScreen = ({ navigation }: any) => {
    return (
        <ScrollView style={styles.container}>
            <QuizzAnswer question={"Ceci est la question"}></QuizzAnswer>
            <QuizzAnswer></QuizzAnswer>
            <QuizzAnswer></QuizzAnswer>
            <QuizzAnswer></QuizzAnswer>
            <QuizzAnswer></QuizzAnswer>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
});

export default QuizzAnswerScreen;
