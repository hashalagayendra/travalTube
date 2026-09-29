import Image from "next/image";
import styles from "@/app/page.module.css";
import { Icon } from "@/components/ui/Icon";

export function WelcomeSection() {
  return (
    <section
      id="about"
      className={styles.welcomeSection}
      aria-labelledby="welcome-title"
    >
      <svg
        className={styles.welcomePalm}
        viewBox="0 0 200 330"
        aria-hidden="true"
      >
        <path
          d="M85 330C76 242 72 140 97 69"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path
          d="M96 73C48 21 14 32 0 62c40-12 61-1 96 11ZM96 73C34 57 5 80 0 113c37-26 61-30 96-40ZM96 73C32 88 16 121 23 158c15-43 38-65 73-85ZM96 73c7-53 37-65 70-54-37 11-53 26-70 54ZM96 73c49-44 86-26 104 7-43-13-69-17-104-7ZM96 73c59-9 88 23 94 58-34-36-55-49-94-58ZM96 73c42 20 53 54 46 92-14-41-25-66-46-92Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className={styles.welcomeLeaf}
        viewBox="0 0 180 340"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M21 335C39 236 103 149 142 16c52 57 48 137 8 199-33 47-72 65-113 71M142 16c-57 34-97 83-100 146-3 59 18 95 2 130M128 62l37 62M111 111l-61-7M94 154l64 22M76 196l-38-16M59 235l68 9"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <div className={styles.welcomeInner}>
        <div className={styles.welcomeCopy}>
          <p className={styles.welcomeEyebrow}>WELCOME TO</p>
          <h2 id="welcome-title">
            TRAVEL TUBE LANKA <span>(PVT) LTD</span>
          </h2>
          <p>
            Your trusted partner for all travel and tourism services. We are
            committed to making your travel experience smooth, comfortable, and
            memorable.
          </p>
          <p>
            Our company provides a wide range of travel solutions for both local
            and international travelers. With a professional and friendly team,
            we help our clients plan their journeys with confidence and
            convenience.
          </p>
          <a
            className={styles.welcomeReadMore}
            href="https://traveltube.lk/about-us.php"
          >
            READ MORE <Icon name="arrow" />
          </a>
          <div className={styles.welcomeSocial}>
            <p className={styles.socialHeading}>
              Visit Us On <span />
            </p>
            <div className={styles.socialLinks}>
              <a
                className={`${styles.socialLink} ${styles.twitterLink}`}
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
                <Icon name="arrow" />
              </a>
              <a
                className={`${styles.socialLink} ${styles.facebookLink}`}
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
                <Icon name="arrow" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.welcomeCollage}>
          <div className={styles.welcomeWildlife}>
            <Image
              src="/images/welcome-wildlife.jpg"
              alt="A leopard resting on a tree branch"
              fill
              sizes="(max-width: 900px) 90vw, 42vw"
            />
          </div>
          <div className={styles.welcomePhoto}>
            <Image
              src="/images/welcome-coast.jpg"
              alt="A traveler watching sea turtles in the shallow water at a Sri Lankan beach"
              fill
              sizes="(max-width: 900px) 44vw, 21vw"
            />
          </div>
          <div className={styles.welcomePhoto}>
            <Image
              src="/images/welcome-heritage.jpg"
              alt="An ancient brick stupa surrounded by trees in Sri Lanka"
              fill
              sizes="(max-width: 900px) 44vw, 21vw"
            />
          </div>
        </div>
      </div>
      <svg
        className={styles.welcomeWave}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 53C216 30 261 160 547 108S1031 104 1440 0v120H0Z"
          fill="#e6f0f1"
        />
        <path
          d="M0 93C321 46 449 157 794 115S1250 5 1440 80v40H0Z"
          fill="#edf5f5"
        />
      </svg>
    </section>
  );
}
