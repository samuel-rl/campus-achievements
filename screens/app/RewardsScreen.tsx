import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Fire from "../../config/Fire";
import { colors, statusbar } from "../../config/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ScrollView } from "react-native-gesture-handler";

const RewardsScreen = () => {

  /**
   * The layout for one reward
   */
  const Reward = ({ name, description, done }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.rewardButton,
          { backgroundColor: done ? colors.lightBlue : colors.lightGrey },
        ]}
      >
        <View style={styles.rewardTextContainer}>
          <Text style={styles.rewardName}>{name}</Text>
          <Text style={styles.rewardDescription}>{description}</Text>
        </View>
        <View style={styles.rewardIconContainer}>
          <MaterialCommunityIcons
            // style={styles.rewardIcon}
            // name="trophy-broken"
            name={done ? "trophy" : "trophy-broken"}
            size={24}
            // color={colors.darkLilac}
            color={done ? colors.goldenHour : colors.darkLilac}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const [rewards, setRewards] = useState<any>(null);

  useEffect(() => {
    //When the screen is launched, we get all rewards from our database
    const res = Fire.shared.getAllReward().then((result) => {
      setRewards(result);
      console.log("done!!!");
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}
      showsVerticalScrollIndicator={false}>
        {rewards != null
          ? rewards.map((res: any, index: any) => {
              return (
                <Reward
                  // style={styles.rewardContainer}
                  name={res.nom}
                  description={res.description}
                  key={index}
                  done={index == 2 ? true : false}
                ></Reward>
              );
            })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: statusbar.height,
  },
  scrollView: {
    // backgroundColor: colors.darkLilac,
    marginHorizontal: 20,
  },
  // rewardContainer:{
  //   flex:1,
  //   justifyContent:"space-between",
  //   alignItems:"center",
  //   flexDirection:"row",
  // },
  rewardButton:{
    flex:1,
    borderRadius:8,
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    height:90,

    marginVertical:15,
  },
  rewardTextContainer:{
    flex:6,
    alignItems:"center",
    flexDirection:"column",
  },
  rewardIconContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  rewardName:{
    fontSize:20,
    margin:10,
    marginTop:2,
    alignSelf:"flex-start",
    // height:45,
  },
  rewardDescription:{
    alignSelf:"flex-start",
    color:colors.darkLilac,
    fontStyle:"italic",
    marginHorizontal:10,
    textAlign:"justify",
    marginBottom:5,
    // height:45,
  },
  
});

export default RewardsScreen;
