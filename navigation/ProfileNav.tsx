import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from "@react-navigation/native";

import Profile from "../screens/user/Profile";
import Ranking from "../screens/user/Ranking";
import QuizProgress from "../screens/user/QuizProgress";
import VocabProgress from "../screens/user/VocabProgress";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Ranking"
        component={Ranking}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VocabProgress"
        component={VocabProgress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QuizProgress"
        component={QuizProgress}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function ProfileNavigation({ navigation, route }: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Learn";

  const preload = async () => {
    if (
      routeName === "Ranking" ||
      routeName === "VocabProgress" ||
      routeName === "QuizProgress"
    ) {
      await navigation.setOptions({
        tabBarVisible: false,
      });
    } else {
      navigation.setOptions({
        tabBarVisible: true,
      });
    }
  };

  useFocusEffect(() => {
    preload();
  });

  return <MyStack />;
}
