import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LearnNavigation from "./LearnNav";
import Quiz from "../screens/quiz/Quiz";
import Ranking from "../screens/ranking/Ranking";
import Profile from "../screens/user/Profile";

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Learn"
      tabBarOptions={{
        activeTintColor: "#25A5F7",
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          backgroundColor: "#eee",
        },
      }}
    >
      <Tab.Screen
        name="learn"
        component={LearnNavigation}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="swatchbook"
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

      <Tab.Screen
        name="quiz"
        component={Quiz}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Icon
                name="user-graduate"
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

      <Tab.Screen
        name="ranking"
        component={Ranking}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <MaterialIcons
                name="leaderboard"
                size={31}
                style={{
                  position: "relative",
                  color: color,
                }}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <FontAwesome
                name="user"
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

export default HomeNavigation;
