import styles from "@/app/page.module.css";
import { Brand } from "@/components/ui/Brand";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Brand />
      <p>Explore. Experience. Sri Lanka.</p>
      <small>
        Photo:{" "}
        <a
          href="https://commons.wikimedia.org/wiki/File:Sigiriya_lion_rock_Luftbild_(29781058870).jpg"
          target="_blank"
          rel="noreferrer"
        >
          dronepicr
        </a>{" "}
        ·{" "}
        <a
          href="https://creativecommons.org/licenses/by/2.0/"
          target="_blank"
          rel="noreferrer"
        >
          CC BY 2.0
        </a>{" "}
        · cropped for display
      </small>
    </footer>
  );
}
