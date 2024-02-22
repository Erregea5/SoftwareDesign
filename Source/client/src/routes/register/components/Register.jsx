import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

import Input from "./Input";

import "../css/register.css";
import logo from "../images/logo.png";
import world from "../images/world.png";

export default function Register() {
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(e.target.username.value);
    console.log(e.target.email.value);
    console.log(e.target.password.value);
  };

  return (
    <div className="container">
      <section id="left">
        <img
          id="logo"
          src={logo}
          alt="Logo"
          onClick={() => (window.location.href = "/")}
        />
        <div id="mesh">{/* Mesh gradient will be added thru CSS. */}</div>
        <div id="world-container">
          <img src={world} alt="" />
        </div>
      </section>
      <section id="right">
        <main>
          <div className="centered">
            <h1>Register With Stark Industries</h1>
            <p>
              We make it quick and easy for corporations to get most competitive
              rates in the industry. Register below to get your quote in less
              than five minutes!
            </p>
            <form onSubmit={handleRegistration}>
              <Input
                type="text"
                name="username"
                label="Username"
                icon={faUser}
              />
              <Input
                type="email"
                name="email"
                label="Email"
                icon={faEnvelope}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                icon={faLock}
              />
              <p id="agreement">
                By registering, you accept our{" "}
                <span className="link">Terms of Use</span> and{" "}
                <span className="link">Privacy Policy</span>.
              </p>
              <button type="submit">Register</button>
            </form>
          </div>
        </main>
        <footer>
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </footer>
      </section>
    </div>
  );
}
