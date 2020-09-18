import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export interface ParametersScreenProps {
}

const ParametersScreen = () => {

  return (
    <View style={styles.container}>
        <Text>paramètres</Text>
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

export default ParametersScreen;