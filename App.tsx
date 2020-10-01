import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStackNavigator from "./navigators/AuthStackNavigator";
import SplashScreen from "./screens/splash/SplashScreen";

import DrawerNavigator from "./navigators/drawer/DrawerNavigator";

//Stack contenant toute l'application
const RootStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Splash"
            >
                <RootStack.Screen name={"Splash"} component={SplashScreen} />
                <RootStack.Screen
                    name={"AppStack"}
                    component={DrawerNavigator}
                />
                <RootStack.Screen
                    name={"AuthStack"}
                    component={AuthStackNavigator}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
