import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faUserCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import { styles } from "../shared/AuthPageRight";
import AuthPage from "../shared/AuthPage";
import Button from "../shared/Button";
import Input from "../shared/Input";

import AuthContext from "../authentication/AuthContext";
import { attemptLogin } from "../../communication";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const username = e.target.username.value;
    const password = e.target.password.value;
    attemptLogin(username, password)
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          login(username, password);
          navigate("/profile");
        }
      })
      .then(() => setIsLoading(false));
  };

  const form = (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        containerClassName={styles.input}
        type="text"
        name="username"
        label="Username"
        icon={faUserCircle}
      />
      <Input
        containerClassName={styles.input}
        type="password"
        name="password"
        label="Password"
        icon={faLock}
      />
      <p id={styles.prompt}>
        <Link to="#" className={styles.link}>
          Forgot password?
        </Link>
      </p>
      <Button
        className={styles.submit}
        type="submit"
        text="Login"
        isLoading={isLoading}
      />
    </form>
  );

  return (
    <AuthPage
      heading="Welcome Back"
      description="Sign in to view your personalized dashboard where you can view your quotes, manage preferences, and explore additional features tailored just for you."
      footerText="Don't have an account?"
      footerActionText="Sign up"
      footerActionLink="/register"
      children={form}
    />
  );
}
