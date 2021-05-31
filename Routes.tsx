import React, { useState, useEffect, useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { API } from "./backend";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import * as t from "./types/actionTypes";

import HomeNavigation from "./navigation/HomeNavigation";
import RootNavigation from "./navigation/RootNavigation";

import AuthGlobal from "./context/store/AuthGlobal";

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthGlobal);

  const preload = async () => {
    const data = await AsyncStorage.getItem("jwt");

    if (data) {
      const dt = JSON.parse(data);

      await context.dispatch({
        type: t.SET_CURRENT_USER,
        payload: dt,
      });

      fetch(`${API}user/${dt.userId}`)
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success) {
            const pt = {
              knownLang: data.data.knownLang,
              learningLang: data.data.learningLang,
              currentLang: data.data.learningLang[0],
            };

            await context.dispatch({
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

  if (loading) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {context.state.isAuthenticated ? <HomeNavigation /> : <RootNavigation />}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
