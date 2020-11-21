import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const QuizOption = ({ reveal, revealed, card: { number, question, value }, valueResponse }) => {
  const [picked, setPicked] = useState(false);
  const [paddingVertical, setPaddingVertical] = useState(0);
  const calcPaddings = (event) => {
    const { height } = event.nativeEvent.layout;
    const circleRadius = 40;
    const padding = height > circleRadius ? height / 2.5 : 0;
    setPaddingVertical(padding);
  };

  const renderValue = () => {
    if (value) {
      return <Image style={{width:20, height:20}} source={require('../../../../assets/icons/check.png')} />;
    }

    return <Image style={{width:20, height:20}} source={require('../../../../assets/icons/cancel.png')} />;
  };

  if (revealed) {
    let backgroundColor = 'white';
    let color = 'black';
    if (picked) color = 'white';
    if (picked && value){
        backgroundColor = "#1da75d";
        //valueResponse(number, picked, value);
    }
    if (picked && !value){
        backgroundColor = "#ff5e6b";
        //valueResponse(0);
    }
    if (picked){
        if (picked && !value){
            valueResponse(false)
        }else{
            valueResponse(true)
        }
    }

    return (
      <View style={[styles.container, { backgroundColor }]}>
        <View style={[styles.letterContainer, { paddingVertical }]}>{renderValue()}</View>
        <View
          onLayout={(event) => {
            calcPaddings(event);
          }}
          style={styles.textContainer}>
          <Text style={[styles.text, { color }]}>{question}</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        reveal();
        setPicked(true);
      }}
      style={styles.container}>
      <View style={[styles.letterContainer, { paddingVertical }]}>
        <Text style={styles.letter}>{number}</Text>
      </View>
      <View
        onLayout={(event) => {
          calcPaddings(event);
        }}
        style={styles.textContainer}>
        <Text style={styles.text}>{question}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: 48,
        borderRadius: 24,
        backgroundColor: "#f6f5f8",
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4,
      },
      letter: {
        color: "black",
      },
      letterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 36,
        width: 36,
        borderRadius: 17.5,
        backgroundColor: "white",
        margin: 6,
      },
      textContainer: {
        width: '80%',
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 7,
        paddingVertical: 5,
      },
      text: {
        fontSize: 16,
        lineHeight: 24,
        color: "black",
      },
})


export default QuizOption;