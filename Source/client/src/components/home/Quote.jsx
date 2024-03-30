import styles from "./Quote.module.scss";

export default function Quote() {
  return (
    <section id={styles.container}>
      <blockquote id={styles.quote}>
        PetroVexa Industries has been our <span id={styles.blue}>go-to</span>{" "}
        fuel supplier for years now. Their rates are{" "}
        <span id={styles.pink}>unbeatable</span>, and their customer service is
        second to none
      </blockquote>
      <p id={styles.author}>Darren Woods, ExxonMobil CEO</p>
    </section>
  );
}
