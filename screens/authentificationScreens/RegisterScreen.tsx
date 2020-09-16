import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export interface RegisterScreenProps {
}

const RegisterScreen = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
        <Button title="Je me suis déjà inscrit" onPress={() => {navigation.navigate('Login')}}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex :1,
        justifyContent: "center"
    }
});

export default RegisterScreen;