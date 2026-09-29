"use client";

import Image from "next/image";
import styles from "@/app/page.module.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Icon, IconName } from "@/components/ui/Icon";

interface HeroSectionProps {
  onOpenSearch: () => void;
}

const benefits: { icon: IconName; title: string; subtitle: string }[] = [
  { icon: "leaf", title: "Authentic", subtitle: "Experiences" },
  { icon: "people", title: "Expert Local", subtitle: "Team" },
  { icon: "shield", title: "Safe & Reliable", subtitle: "Travel" },
  { icon: "heart", title: "Personalized", subtitle: "Itineraries" },
];

const hero = {
  first: "Discover the",
  second: "Real",
  script: "Sri Lanka",
  description:
    "Unforgettable journeys, authentic experiences and memories that last a lifetime.",
  label: "Sigiriya",
  caption: "A timeless wonder",
};

export function HeroSection({ onOpenSearch }: HeroSectionProps) {
  return (
    <section
      id="home"
      className={styles.hero}
      aria-label="Welcome to Sri Lanka"
    >
      <div id="gallery" className={styles.heroImage}>
        <Image
          src="/images/sigiriya.jpg"
          alt="Sigiriya rock fortress rising above the green forests of Sri Lanka"
          fill
          sizes="100vw"
          preload
        />
      </div>
      <div className={styles.heroShade} />

      <Navbar onOpenSearch={onOpenSearch} />

      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>YOUR TRUSTED TRAVEL PARTNER</p>
        <h1>
          {hero.first}
          <br />
          {hero.second} <em>{hero.script}</em>
        </h1>
        <p className={styles.heroDescription}>{hero.description}</p>
        <div className={styles.benefits} id="services">
          {benefits.map((benefit) => (
            <div key={benefit.title} className={styles.benefit}>
              <Icon name={benefit.icon} />
              <span>
                {benefit.title}
                <br />
                {benefit.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.heroBottom}>
        <p className={styles.location}>
          <Icon name="pin" />
          <span>
            {hero.label}
            <small>{hero.caption}</small>
          </span>
        </p>
      </div>
    </section>
  );
}
