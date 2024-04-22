import { RouterProvider, createHashRouter } from "react-router-dom";

import "./components/shared/_reset.scss";

import AuthProvider from "./components/authentication/AuthProvider";
import ProtectedRoute from "./components/authentication/ProtectedRoute";
import RedirectIfLoggedIn from "./components/authentication/RedirectIfLoggedIn";

import History from "./components/history";
import Home from "./components/home";
import Login from "./components/login";
import Profile from "./components/profile";
import Quote from "./components/quote";
import Register from "./components/register";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/history",
    element: <ProtectedRoute children={<History />} />,
  },
  {
    path: "/login",
    element: <RedirectIfLoggedIn children={<Login />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute children={<Profile />} />,
  },
  {
    path: "/quote",
    element: <ProtectedRoute children={<Quote />} />,
  },
  {
    path: "/register",
    element: <RedirectIfLoggedIn children={<Register />} />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
