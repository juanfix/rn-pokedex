import React, { useState, createContext } from "react";

const AuthContext = createContext({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [auth, setAuth] = useState(undefined);

  const login = (userDate) => {
    setAuth(userDate);
  };

  const logout = () => {
    setAuth(undefined);
  };

  const valueContext = {
    auth,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
