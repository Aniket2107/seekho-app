import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/auth/Login";
import RegisterScreen from "../screens/auth/Register";
import Welcome from "../screens/auth/welcome";
import How from "../screens/auth/How";
import Goal from "../screens/auth/Goal";
import Why from "../screens/auth/Why";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="How"
        component={How}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Why"
        component={Why}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Goal"
        component={Goal}
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
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
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
