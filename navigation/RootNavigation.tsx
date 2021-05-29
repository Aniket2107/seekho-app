import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/auth/Login";
import RegisterScreen from "../screens/auth/Register";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function RootNavigation() {
  return <MyStack />;
}
