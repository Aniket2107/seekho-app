import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from "@react-navigation/native";

import QuizList from "../screens/quiz/QuizList";
import Quiz from "../screens/quiz/Quiz";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QuizList"
        component={QuizList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function QuizNavigation({ navigation, route }: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Learn";

  const preload = async () => {
    if (routeName === "Quiz") {
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
