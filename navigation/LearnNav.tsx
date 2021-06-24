import React, { useContext } from "react";
import {
  getFocusedRouteNameFromRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";

import { useFonts } from "expo-font";

import { Learn, FlashCard } from "../screens/learn";
import Icon from "react-native-vector-icons/FontAwesome5";
import AuthGlobal from "../context/store/AuthGlobal";

const Stack = createStackNavigator();

const MyStack = () => {
  const context = useContext(AuthGlobal);

  let [fontsLoaded] = useFonts({
    PatrickHand_400Regular: require("../assets/PatrickHand-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Learn"
        component={Learn}
        options={{
          headerTitle: () => null,
          // headerStyle: {
          //   backgroundColor: "#e7305b",
          // },
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerRight: () => (
            <View style={styles.rightView}>
              <Icon name="crown" color={"orange"} size={20} />
              <Text style={styles.rightText}>10</Text>
            </View>
          ),
          headerLeft: () => (
            <Text style={styles.leftText}>
              {context.state.currentLang
                ? context.state.currentLang
                : "Welcome !"}
            </Text>
          ),
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

export default function LearnNavigation({ navigation, route }: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Learn";

  const preload = async () => {
    if (routeName === "FlashCard") {
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

const styles = StyleSheet.create({
  rightView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightText: {
    fontSize: 30,
    marginLeft: 2,
    color: "#000",
    fontFamily: "PatrickHand_400Regular",
  },
  leftText: {
    fontSize: 30,
    color: "#000",
    // fontWeight: "bold",
    fontFamily: "PatrickHand_400Regular",
  },
});

// ||
// route.state.routeNames[route.state.index] === "FlashCard"
//asdbjasd