import * as t from "../../types/actionTypes";

import { initialStateType } from "../../types/auth";

export const initialState = {
  isAuthenticated: false,
  userId: "",
  knownLang: "",
  learningLang: [],
  currentLang: "",
  token: "",
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type UserPayload = {
  [t.SET_CURRENT_USER]: {
    userId: string;
    token: string;
  };
  [t.SET_LANG_DATA]: {
    knownLang: string;
    learningLang: string[];
    currentLang: string;
  };
  [t.SET_CURRENT_LANG]: {
    currentLang: string;
  };
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

export default function (state: initialStateType, action: UserActions) {
  console.log("auth reducer called============");

  switch (action.type) {
    case t.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated:
          action.payload.userId !== "" && action.payload.token !== "",
        userId: action.payload.userId,
        token: action.payload.token,
      };
    case t.SET_LANG_DATA:
      return {
        ...state,
        knownLang: action.payload.knownLang,
        learningLang: action.payload.learningLang,
        currentLang: action.payload.currentLang,
      };
    case t.SET_CURRENT_LANG:
      return {
        ...state,
        currentLang: action.payload.currentLang,
      };
    default:
      return state;
  }
}
