"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./LandingSections.module.css";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function WelcomeSection() {
  const [data, setData] = useState({
    eyebrow: "WELCOME TO",
    titleMain: "TRAVEL TUBE LANKA",
    titleAccent: "(PVT) LTD",
    paragraph1:
      "Your trusted partner for all travel and tourism services. We are committed to making your travel experience smooth, comfortable, and memorable.",
    paragraph2:
      "Our company provides a wide range of travel solutions for both local and international travelers. With a professional and friendly team, we help our clients plan their journeys with confidence and convenience.",
    topImage: "/images/welcome-wildlife.jpg",
    bottomLeftImage: "/images/welcome-coast.jpg",
    bottomRightImage: "/images/welcome-heritage.jpg",
  });

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await fetch("/api/about");
        const json = await res.json();
        if (json.success && json.data) {
          setData((prev) => ({
            ...prev,
            eyebrow: json.data.eyebrow || prev.eyebrow,
            titleMain: json.data.titleMain || prev.titleMain,
            titleAccent: json.data.titleAccent || prev.titleAccent,
            paragraph1: json.data.paragraph1 || prev.paragraph1,
            paragraph2: json.data.paragraph2 || prev.paragraph2,
            topImage: json.data.topImage || prev.topImage,
            bottomLeftImage: json.data.bottomLeftImage || prev.bottomLeftImage,
            bottomRightImage: json.data.bottomRightImage || prev.bottomRightImage,
          }));
        }
      } catch (err) {
        console.error("Could not load about data:", err);
      }
    }
    loadAbout();
  }, []);

  return (
    <section
      id="about"
      className={styles.welcomeSection}
      aria-labelledby="welcome-title"
    >
      <div className={styles.welcomeInner}>
        <div className={styles.welcomeCopy}>
          <p className={styles.welcomeEyebrow}>{data.eyebrow}</p>
          <h2 id="welcome-title">
            {data.titleMain} <span>{data.titleAccent}</span>
          </h2>
          <p>{data.paragraph1}</p>
          <p>{data.paragraph2}</p>
          <Link
            className={styles.welcomeReadMore}
            href="/about"
          >
            READ MORE <Icon name="arrow" />
          </Link>
          <div className={styles.welcomeSocial}>
            <p className={styles.socialHeading}>
              Visit Us On <span />
            </p>
            <div className={styles.socialLinks}>
              <a
                className={styles.socialLink}
                href="https://x.com/search?q=TravelTube%20Lanka&src=typed_query"
                target="_blank"
                rel="noreferrer"
                aria-label="Find TravelTube Lanka on Twitter"
              >
                <span className={styles.socialIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M22.2 5.5a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8 11.9 11.9 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5 4.2 4.2 0 0 0 3.4 4.2 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.3a11.9 11.9 0 0 0 18.3-10 8.5 8.5 0 0 0 1.9-2.8Z" />
                  </svg>
                </span>
                <span>Twitter</span>
              </a>
              <a
                className={styles.socialLink}
                href="https://www.facebook.com/profile.php?id=61585560331201"
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.socialIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M14.2 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5a25 25 0 0 0-2.8-.2c-2.8 0-4.7 1.7-4.7 4.8v2.4H7.2V13h3.2v9Z" />
                  </svg>
                </span>
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.welcomeCollage}>
          <div className={styles.welcomeWildlife}>
            <Image
              src={data.topImage}
              alt="Showcase top collage photo"
              fill
              unoptimized
              sizes="(max-width: 600px) calc(100vw - 76px), (max-width: 900px) 84vw, (max-width: 1478px) 48vw, 690px"
            />
          </div>
          <div className={styles.welcomePhoto}>
            <Image
              src={data.bottomLeftImage}
              alt="Showcase bottom left photo"
              fill
              unoptimized
              sizes="(max-width: 900px) 40vw, (max-width: 1478px) 24vw, 337px"
            />
          </div>
          <div className={styles.welcomePhoto}>
            <Image
              src={data.bottomRightImage}
              alt="Showcase bottom right photo"
              fill
              unoptimized
              sizes="(max-width: 900px) 40vw, (max-width: 1478px) 24vw, 337px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
