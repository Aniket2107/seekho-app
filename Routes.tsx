import React, { useState, useContext, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";

import { API } from "./backend";

import { NavigationContainer } from "@react-navigation/native";

import * as t from "./types/actionTypes";

import HomeNavigation from "./navigation/HomeNavigation";
import RootNavigation from "./navigation/RootNavigation";

import AuthGlobal from "./context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dataExists, setDataExists] = useState(false);
  const context = useContext(AuthGlobal);

  const preload = async () => {
    const data = await AsyncStorage.getItem("jwt");

    if (data) {
      setDataExists(true);
      const dt = JSON.parse(data);

      context.dispatch({
        type: t.SET_CURRENT_USER,
        payload: dt,
      });

      fetch(`${API}user/${dt.userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const pt = {
              knownLang: data.data.knownLang,
              learningLang: data.data.learningLang,
              currentLang: data.data.learningLang[0],
            };

            context.dispatch({
              type: t.SET_LANG_DATA,
              payload: pt,
            });
          }
        })
        .catch((err) => console.log(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    preload();
  }, []);

  if (dataExists && (loading || !context.state.currentLang)) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {context.state.isAuthenticated && context.state.currentLang ? (
        <HomeNavigation />
      ) : (
        <RootNavigation />
      )}
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </NavigationContainer>
  );
};

// #e7305b

export default Routes;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
