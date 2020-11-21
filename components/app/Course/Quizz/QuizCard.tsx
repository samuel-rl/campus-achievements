import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QuizOption from './QuizOption';

export interface QuizzScreenProps {
    data: {question: string, cards:string};
    num: number;
    cardsAmount:number;
    respond: Function
}

const QuizCard = ({ data: { question, cards }, num, cardsAmount, respond }) => {
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState<null|boolean>(null);

  useEffect(() => {
      if(revealed){
          if(correct == true){
            respond(1, num)
          }else{
            respond(2, num)
          }
      }
  }, [correct])

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.95}>
      <View style={styles.labelContainer}>
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelText}>{`${num + 1}/${cardsAmount}`}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.mainText}>{question}</Text>
      </View>
      {cards.map((card) => (
        <QuizOption
          key={card.question}
          reveal={() => {
            setRevealed(true);
          }}
          revealed={revealed}
          card={card}
          valueResponse={(cor) => {
            setRevealed(true);
            setCorrect(cor)
          }}
        />
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        shadowColor: "#232323",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        marginHorizontal: 10,
        shadowRadius: 40,
        shadowOpacity: 0.08,
        borderWidth: 2,
        borderColor: "#f6f5f8",
        backgroundColor: "white",
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 16,
      },
      labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
      },
      labelTextContainer: {
        backgroundColor: "#f6f5f8",
        borderRadius: 16,
      },
      labelText: {
        fontSize: 12,
        lineHeight: 16,
        color: "#474747",
        paddingHorizontal: 8,
        paddingVertical: 4,
        letterSpacing: 0.8,
      },
      mainText: {
        fontSize: 20,
        lineHeight: 24,
        color: "black",
        paddingTop: 8,
        paddingBottom: 20,
      },
});

export default QuizCard;