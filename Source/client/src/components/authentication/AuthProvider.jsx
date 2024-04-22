import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [isUserLoading, setLoadingUser] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  useEffect(() => {
    const username = localStorage["username"];
    const password = localStorage["password"];
    setIsUserLoggedIn(!!(username && password));
    setLoadingUser(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setIsUserLoggedIn(false);
  };

  const login = (username, password) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    setIsUserLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{ isUserLoading, isUserLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
