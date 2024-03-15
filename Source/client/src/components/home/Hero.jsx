import { Link } from "react-router-dom";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section>
      <h1 id={styles.heading}>
        <span id={styles.gradient}>PetroVexa</span> Industries
      </h1>
      <p id={styles.text}>
        We pride ourselves on being the unrivaled frontrunner in the industry,
        consistently delivering our clients the most competitive fuel rates
        available.
      </p>
      <div id={styles.buttonContainer}>
        <Link to="/quote">
          <button id={styles.primaryCta}>Get Fuel Quote</button>
        </Link>
        <Link to="#">
          <button id={styles.secondaryCta}>Contact Sales</button>
        </Link>
      </div>
    </section>
  );
}
