import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from "@react-navigation/native";

import Collection from "../screens/collection/Collection";
import VocabDetail from "../screens/collection/VocabDetail";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Collection"
        component={Collection}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VocabDetail"
        component={VocabDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function CollectionNavigation({ navigation, route }: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Learn";

  const preload = async () => {
    if (routeName === "VocabDetail") {
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
