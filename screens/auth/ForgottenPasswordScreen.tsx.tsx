import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import FilledButton from "../../components/auth/FilledButton";
import Heading from "../../components/auth/Heading";
import Input from "../../components/auth/Input";
import { colors } from "../../config/constants";
import Fire from "../../config/Fire";

const ForgottenPasswordScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState('');

  const sendMailWithNewPassword = async(mail) => {
    console.log("valider id mdp oublié " + mail);
    setLoading(true);
    try {
      await Fire.shared.passwordReset(mail);
      setLoading(false);
      alert("Le mail de mot de passe a été envoyé.");
      navigation.navigate('Login');
      
    } catch (error) {
      setLoading(false);
      alert("Cela n'a pas fonctionné, êtes-vous sûr d'avoir indiqué le bon identifiant ?");
    }
  };

  return (
    <View style={styles.container}>
      <Heading style={styles.title}>Mot de passe oublié</Heading>
      <Text style={styles.greyText}>
        Indiquez votre adresse e-mail d'identifiant et vous recevrez un nouveau
        mot de passe par mail.
      </Text>
      <Input
        style={styles.input}
        placeholder={"Mail"}
        keyboardType={"email-address"}
        value={mail}
        onChangeText={setMail}
      />
      <FilledButton
        title={"Envoyer nouveau mot de passe"}
        style={styles.loginButton}
        onPress={() => {
          sendMailWithNewPassword(mail);
        }}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  title: {
    marginBottom: 50,
  },
  input: {
    marginVertical: 8,
  },
  greyText: {
    color: colors.darkLilac,
  },
  loginButton: {
    marginVertical: 32,
  },
});

export default ForgottenPasswordScreen;
