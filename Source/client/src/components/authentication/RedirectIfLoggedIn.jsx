import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

// This component is used to redirect users if they are logged in.
// If the user is logged in, they will be redirected to their dashboard.
export default function RedirectIfLoggedIn({ children }) {
  const { isUserLoading, isUserLoggedIn } = useContext(AuthContext);
  return isUserLoading ? (
    <div>Loading...</div>
  ) : isUserLoggedIn ? (
    <Navigate to="/history" />
  ) : (
    children
  );
}
