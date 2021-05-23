import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LearnNavigation from "./LearnNav";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Learn"
      tabBarOptions={{
        activeTintColor: "#e91e63",
        keyboardHidesTabBar: true,
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="learn"
        component={LearnNavigation}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="Learn"
                style={{
                  position: "relative",
                  color: color,
                }}
                size={30}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
