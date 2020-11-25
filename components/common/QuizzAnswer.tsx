import React, { Component } from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../../config/constants";


const QuizzAnswer = () => {
    // question, answer1, answer2,answer3, answer4, isGoodAnswer1,isGoodAnswer2,isGoodAnswer3,isGoodAnswer4, isPickedAnswer1,isPickedAnswer2,isPickedAnswer3,isPickedAnswer4
    return (
        <View style={styles.mainContainer}>

            <Text style={styles.question}>Il s'agit de la question ?</Text>
            <View style={styles.answerContainer}>
                <Text style={[styles.answerLetter, {backgroundColor:colors.foam,}]}>A</Text><Text style={styles.answer}>Première réponse</Text>
            </View>
            <View style={styles.answerContainer}>

                <Text style={styles.answerLetter}>B</Text><Text style={styles.answer}>Deuxième réponse réponse</Text>
            </View>
            <View style={styles.answerContainer}>

                <Text style={[styles.answerLetter,{backgroundColor:colors.shrimp}]}>C</Text><Text style={styles.answer}>Troisième réponse elle est plus longue, genre vraiment longue,  </Text>
            </View>
            <View style={styles.answerContainer}>
                <Text style={styles.answerLetter}>D</Text><Text style={styles.answer}>Quatrième réponse</Text>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{


        backgroundColor: colors.lightLilac,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        marginHorizontal:20,
        marginVertical:5,
        paddingVertical:5,
        paddingHorizontal:10,
        height:250,
    },
    question:{
        fontStyle:"italic",
        marginBottom:5,
        textAlign:"center",
    },
    answerContainer:{
        flex:1,
        flexDirection:"row",
        alignItems:"center",
    },
    answerLetter:{
        flex:1,
        backgroundColor:colors.almostWhite,
        textAlign:"center",
        borderRadius:100,
    },
    answer:{
        borderColor : colors.darkLilac,
        borderWidth:1,
        borderRadius:10,
        flex:7,
        paddingHorizontal:5,
        paddingVertical:2,
        marginLeft:3,
    },
});

export default QuizzAnswer;
