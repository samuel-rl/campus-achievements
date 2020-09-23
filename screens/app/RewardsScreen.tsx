import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Fire from '../../config/Fire';
import { colors } from '../../config/constants';


const RewardsScreen = () => {

  const Reward = ({name, done }:any) => {
    return (
        <TouchableOpacity style={[styles.rewardButton, { backgroundColor : done ? colors.lightBlue : colors.shrimp}]}> 
            <Text>{name} {done.toString()}</Text>
        </TouchableOpacity>
    )
  }
 
  const [rewards, setRewards] = useState<any>(null);


  useEffect(() => {
    const res =Fire.shared.getAllReward().then((result) => {
      setRewards(result);
      console.log("done!!!");
    })

  }, [])

  return (
    <View style={styles.container}>
        {rewards != null ? rewards.map((res:any, index: any) => {
            return (<Reward name={res.nom} key={index} done={index==2 ? true : false}></Reward>)
        })  : null}

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex :1,
        justifyContent: "center",
        alignItems: "center"
    },
    rewardButton:{
        marginVertical:20,
        color:"#000",
        width:"80%",
        borderRadius:6,
        height: 30,
        justifyContent:"center",
        alignItems:"center",
    },
});

export default RewardsScreen;