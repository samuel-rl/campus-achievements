import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const RewardsScreen = () => {

  return (
    <View style={styles.container}>
        <Text>Rewards here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex :1,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default RewardsScreen;