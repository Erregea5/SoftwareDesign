import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faCircleUser,
  // faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "../shared/AuthPageRight";
import AuthPage from "../shared/AuthPage";
import Button from "../shared/Button";
import Input from "../shared/Input";

import { attemptRegister } from "../../communication";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const username = e.target.username.value;
    // const email = e.target.email.value;
    const password = e.target.password.value;
    attemptRegister(username, password)
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          navigate("/profile");
        }
      })
      .then(() => setIsLoading(false));
  };
  const children = (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        containerClassName={styles.input}
        type="text"
        name="username"
        label="Username"
        minLength="2"
        maxLength="30"
        pattern="^[a-z0-9]{2,30}$"
        title="Must be lowercase, alphanumeric, and between 2-30 characters."
        icon={faCircleUser}
      />
      {/* <Input
        containerClassName={styles.input}
        type="email"
        name="email"
        label="Email"
        // minLength="2"
        // maxLength="60"
        // pattern="^[a-zA-Z]+$"
        // title="Alphabetic characters only"
        icon={faEnvelope}
      /> */}
      <Input
        containerClassName={styles.input}
        type="password"
        name="password"
        label="Password"
        minLength="6"
        maxLength="60"
        pattern="^.{6,60}$"
        title="Must be between 6-60 characters."
        icon={faLock}
      />
      <p id={styles.prompt}>
        By registering, you accept our{" "}
        <Link to="#" className={styles.link}>
          Terms of Use
        </Link>
        &nbsp;and&nbsp;
        <Link to="#" className={styles.link}>
          Privacy Policy
        </Link>
        .
      </p>
      <Button
        className={styles.submit}
        type="submit"
        text="Register"
        isLoading={isLoading}
      />
    </form>
  );
  return (
    <AuthPage
      heading="Client Registration"
      description="We make it quick and easy for corporations to get most competitive rates in the industry. Register below to get your quote in less than five minutes!"
      footerText="Already have an account?"
      footerActionText="Sign in"
      footerActionLink="/login"
      children={children}
    />
  );
}
