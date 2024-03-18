import { Link, useNavigate } from "react-router-dom";
import styles from "./AuthenticationRight.module.scss";
import Input from "./Input";

export default function AuthenticationRight({
  heading,
  description,
  handleSubmit, // A curry function that takes in a `useNavigate` function and returns a function that takes in the event object.
  inputPropArray,
  promptFragment,
  buttonText,
  footerText,
  footerActionText,
  footerActionLink,
}) {
  const navigate=useNavigate();
  return (
    <main id={styles.container}>
      <section id={styles.top}>
        <div id={styles.centered}>
          <h1 id={styles.heading}>{heading}</h1>
          <p id={styles.description}>{description}</p>
          <form id={styles.form} onSubmit={(e) => {
            e.preventDefault();
            const username=e.target.username.value;
            const password=e.target.password.value;
            //TODO: display buffering
            handleSubmit(username,password).then(user=>{
              console.log(user);
              if(user.password){//successful
                localStorage.setItem("username",username);
                localStorage.setItem("password",password);
                navigate("/profile")
              }
              else
                //TODO: display failure
                console.log("failed to login");
            })
          }}>
            {inputPropArray.map((inputProp, index) => (
              <Input key={index} {...inputProp} />
            ))}
            <p id={styles.prompt}>{promptFragment}</p>
            <button id={styles.submit} type="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </section>
      <section id={styles.bottom}>
        <p id={styles.footerText}>
          {footerText}{" "}
          <Link to={footerActionLink} id={styles.footerActionLink}>
            {footerActionText}
          </Link>
        </p>
      </section>
    </main>
  );
}
