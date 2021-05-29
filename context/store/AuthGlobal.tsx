import React from "react";

import { initialStateType } from "../../types/auth";
import { initialState } from "../reducers/authReducer";

export default React.createContext<{
  state: initialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
