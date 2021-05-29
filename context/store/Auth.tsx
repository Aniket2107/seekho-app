import React, { useReducer } from "react";

import authReducer, { initialState } from "../reducers/authReducer";
import AuthGlobal from "./AuthGlobal";

const Auth: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthGlobal.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthGlobal.Provider>
  );
};

export default Auth;
