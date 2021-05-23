import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Learn } from "../screens/learn";
import { FlashCard } from "../screens/learn";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Learn"
        component={Learn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FlashCard"
        component={FlashCard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function LearnNavigation() {
  return <MyStack />;
}
