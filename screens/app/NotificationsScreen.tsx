import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


const NotificationsScreen = () => {

  return (
    <View style={styles.container}>
        <Text>All notifications</Text>
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

export default NotificationsScreen;