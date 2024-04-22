import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import NavBar from "../shared/NavBar";

// This component is used to protect routes that require authentication.
// If the user is not logged in, they will be redirected to the login page.
export default function ProtectedRoute({ children }) {
  const { isUserLoading, isUserLoggedIn } = useContext(AuthContext);
  return isUserLoading ? (
    <div>Loading...</div>
  ) : isUserLoggedIn ? (
    <>
      <NavBar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
}
