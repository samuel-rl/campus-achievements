import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { BasicUserInfos, User } from "../../../config/constantType";
import SettingItem from "../../../components/app/Course/components/SettingItem";
import Fire from "../../../config/Fire";

export interface SettingsListProps {}

// const SettingsList = ({ user }: SettingsListProps) => {
const SettingsListDropdownView = ({ navigation, route }: any) => {
  const [course, setCourse] = useState(route.params.course);
  // const user = Fire.shared.etudiant();
  return (
    <View style={styles.container}>
      <View style={styles.scrollView}>
        {/*=== Bouton de suppression d'un cours ===*/}

        <TouchableOpacity
          onPress={() => {
            console.log("ceci est le premier param" + course.nom);
            Fire.shared.deleteCourse(course);
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.text}>Supprimer un cours</Text>
          </View>
        </TouchableOpacity>

        {/*=== Bouton de suppression d'un cours ===*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  scrollView: {
    height: 300,
    width: 300,
  },
  textContainer: {
    padding: 5,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },

  text: {
    fontSize: 18,
    alignSelf: "center",
  },
});

export default SettingsListDropdownView;
