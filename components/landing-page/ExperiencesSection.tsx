import styles from "@/app/page.module.css";

export function ExperiencesSection() {
  return (
    <section id="experiences" className={styles.experiences}>
      <p className={styles.sectionEyebrow}>MORE THAN A PLACE. A FEELING.</p>
      <h2>
        Make room for <em>the unexpected.</em>
      </h2>
      <div>
        <span>A sunrise above the clouds</span>
        <span>A home-cooked Sri Lankan meal</span>
        <span>A road that leads to the ocean</span>
      </div>
    </section>
  );
}
