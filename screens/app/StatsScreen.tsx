import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const StatsScreen = () => {

  return (
    <View style={styles.container}>
        <Text>Stats here</Text>
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

export default StatsScreen;