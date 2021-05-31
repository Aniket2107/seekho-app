import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import jwt_deocde from "jwt-decode";

import { API } from "../../backend";

import * as t from "../../types/actionTypes";
import { userLoginType, decodeType } from "../../types/auth";

export const loginUser = (
  user: userLoginType,
  dispatch: React.Dispatch<any>
) => {
  fetch(`${API}auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then(async (data) => {
      if (data.success) {
        // console.log("Data ===>>", data);
        const token = data.data;
        const decode: decodeType = await jwt_deocde(token);
        // console.log("Decode ====", decode);

        const pt = {
          token,
          userId: decode.userId,
        };

        AsyncStorage.setItem("jwt", JSON.stringify(pt));
        dispatch({
          type: t.SET_CURRENT_USER,
          payload: pt,
        });
      }
      // else {
      //   logoutUser(dispatch);
      // }
    })
    .catch((err) => {
      console.log(err);
      Alert.alert(
        err.response ? err.response.data.msg : "Something went wrong, Try again"
      );
      logoutUser(dispatch);
    });
};

export const logoutUser = (dispatch: React.Dispatch<any>) => {
  AsyncStorage.removeItem("jwt");
  dispatch({
    type: t.SET_CURRENT_USER,
    payload: null,
  });
};

// export const setCurrentUser =
//   (data: { token: string; userId: string } | null) =>
//   (dispatch: React.Dispatch<any>) => {
//     return {
//       type: t.SET_CURRENT_USER,
//       payload: data,
//     };
//   };

export const setCurrentLang = (data: string, dispatch: React.Dispatch<any>) => {
  return dispatch({
    type: t.SET_CURRENT_LANG,
    payload: { currentLang: data },
  });
};

export const setLangData = (
  data: {
    learningLang: string[];
    knownLang: string;
  },
  dispatch: React.Dispatch<any>
) => {
  return dispatch({
    type: t.SET_LANG_DATA,
    payload: data,
  });
};
