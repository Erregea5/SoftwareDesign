import { Link } from "react-router-dom";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import AuthenticationPage from "../shared/AuthenticationPage";

const props = {
  heading: "Welcome Back",
  description:
    "Sign in to view your personalized dashboard where you can view your quotes, manage preferences, and explore additional features tailored just for you.",
  handleSubmit: (navigate) => {
    return (e) => {
      e.preventDefault();
      console.log(e.target.username.value);
      console.log(e.target.password.value);
      navigate("/profile");
    };
  },
  inputPropArray: [
    {
      type: "text",
      name: "username",
      label: "Username",
      icon: faUser,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      icon: faLock,
    },
  ],
  promptFragment: (
    <span
      style={{ fontWeight: 600, cursor: "pointer" }}
      onClick={() => alert("This hasn't been implemented yet.")}
    >
      Forgot password?
    </span>
  ),
  buttonText: "Login",
  footerFragment: (
    <>
      Don't have an account? <Link to="/register">Sign up</Link>
    </>
  ),
};

export default function Login() {
  return <AuthenticationPage {...props} />;
}
