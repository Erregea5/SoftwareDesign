import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Authentication from "../shared/Authentication";
import { attemptRegister } from "../../communication";

const props = {
  heading: "Client Registration",
  description:
    "We make it quick and easy for corporations to get most competitive rates in the industry. Register below to get your quote in less than five minutes!",
  handleSubmit: attemptRegister,
  inputPropArray: [
    {
      type: "text",
      name: "username",
      label: "Username",
      minLength: 3,
      maxLength: 31, // 2^5 - 1
      pattern: "^[a-zA-Z0-9]{3,31}$",
      title:
        "Username must be between 3 and 31 characters long (inclusive) and can only contain letters and numbers.",
      icon: faUser,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      minLength: 5,
      maxLength: 63, // 2^6 - 1
      pattern: null, // Handled by HTML5
      title: "Please enter a valid email address.",
      icon: faEnvelope,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      minLength: 8,
      maxLength: 63, // 2^6 - 1
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,63}$",
      title:
        "Password must be between 8 and 63 characters long (inclusive) and must contain at least one lowercase letter, at least one uppercase letter, and at least one number.",
      icon: faLock,
    },
  ],
  promptFragment: (
    <>
      By registering, you accept our{" "}
      <span
        style={{ fontWeight: 600, cursor: "pointer" }}
        onClick={() => alert("This feature hasn't been implemented yet.")}
      >
        Terms of Use
      </span>
      &nbsp;and&nbsp;
      <span
        style={{ fontWeight: 600, cursor: "pointer" }}
        onClick={() => alert("This feature hasn't been implemented yet.")}
      >
        Privacy Policy
      </span>
      .
    </>
  ),
  buttonText: "Register",
  footerText: "Already have an account?",
  footerActionText: "Sign in",
  footerActionLink: "/login",
};

export default function Register() {
  return <Authentication {...props} />;
}
