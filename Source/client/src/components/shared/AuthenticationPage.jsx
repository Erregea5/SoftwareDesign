import { Link, useNavigate } from "react-router-dom";

import Input from "./Input";

import "../../css/register/register.css";
import logo1x from "../../images/shared/logo@1x.svg";
import logo2x from "../../images/shared/logo@2x.svg";
import world from "../../images/shared/world.png";

export default function AuthenticationPage({
  heading,
  description,
  handleSubmit, // A curry function that takes in a `useNavigate` function and returns a function that takes in the event object.
  inputPropArray,
  promptFragment,
  buttonText,
  footerFragment,
}) {
  const navigate = useNavigate();
  return (
    <div className="container">
      <section id="left">
        <Link to="/">
          <picture>
            <source media="(max-width: 1600px)" srcset={logo1x} />
            <img id="logo" src={logo2x} alt="Logo" />
          </picture>
        </Link>
        <div id="mesh">{/* Mesh gradient will be added thru CSS. */}</div>
        <div id="world-container">
          <img src={world} alt="" />
        </div>
      </section>
      <section id="right">
        <main>
          <div className="centered">
            <h1>{heading}</h1>
            <p>{description}</p>
            <form onSubmit={handleSubmit(navigate)}>
              {inputPropArray.map((inputProp, index) => (
                <Input key={index} {...inputProp} />
              ))}
              <p id="prompt">{promptFragment}</p>
              <button type="submit">{buttonText}</button>
            </form>
          </div>
        </main>
        <footer>
          <p>{footerFragment}</p>
        </footer>
      </section>
    </div>
  );
}
