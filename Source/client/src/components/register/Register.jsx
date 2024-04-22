import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  faCircleUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "../shared/AuthPageRight";
import AuthPage from "../shared/AuthPage";
import Button from "../shared/Button";
import Input, { VALIDATORS } from "../shared/Input";

import { attemptRegister } from "../../communication";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const username = e.target.username.value;
    const password = e.target.password.value;
    attemptRegister(username, password)
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          alert("Registration successful. Please sign in to continue.")
          navigate("/login");
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
        icon={faCircleUser}
        {...VALIDATORS.USERNAME}
      />
      <Input
        containerClassName={styles.input}
        type="password"
        name="password"
        label="Password"
        icon={faLock}
        {...VALIDATORS.PASSWORD}
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
