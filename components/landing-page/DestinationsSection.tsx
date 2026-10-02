"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./LandingSections.module.css";
import { Icon } from "@/components/ui/Icon";

interface DestinationItem {
  id: string | number;
  slug?: string;
  title: string;
  badge: string;
  location: string;
  image: string;
  description: string;
  href?: string;
}

const defaultDestinations: DestinationItem[] = [
  {
    id: "galle-fort",
    title: "GALLE FORT",
    badge: "Heritage",
    location: "Southern Province",
    image: "/images/dest-galle-fort.jpg",
    description:
      "Galle Fort is one of the heart touched places of tourists in Sri Lanka. It is a place with historical, archeological and architectural heritage in Sri Lanka. It was constructed by Portuguese in 1588. Galle Fort is designated as a world cultural heritage by UNESCO.",
    href: "https://traveltube.lk/destination.php",
  },
  {
    id: "hikkaduwa",
    title: "HIKKADUWA",
    badge: "Beach & Surf",
    location: "98km from Colombo",
    image: "/images/dest-hikkaduwa.jpg",
    description:
      "Hikkaduwa is an amazing small town in the Southern Province of Sri Lanka which is located 98km away from Colombo. Hikkaduwa city keeps its popularity by strong surf and beaches with restaurants and bars. Most of the tourists visit for vibrant coral sanctuaries.",
    href: "https://traveltube.lk/destination.php",
  },
  {
    id: "jungle-beach",
    title: "JUNGLE BEACH",
    badge: "Hidden Gem",
    location: "Near Unawatuna",
    image: "/images/dest-jungle-beach.jpg",
    description:
      "Among the marvelous beach sides in Sri Lanka, Jungle Beach is a beautiful beach in the jungle a few kilometers from Unawatuna. In the past, it was a secret hidden beach. A peaceful cove surrounded by dense green forest with crystal-clear turquoise waters.",
    href: "https://traveltube.lk/destination.php",
  },
  {
    id: "yatagala-temple",
    title: "YATAGALA TEMPLE",
    badge: "Sacred Temple",
    location: "Inland Unawatuna",
    image: "/images/dest-yatagala-temple.jpg",
    description:
      "Yatagala Temple is one of the most important places inland Unawatuna of Galle district for temple lovers. It is built around and within giant boulder-like rock formations. People believe that Yatagala Temple has a relationship with ancient Buddhist royalty dating back 2,300 years.",
    href: "https://traveltube.lk/destination.php",
  },
  {
    id: "ambalangoda",
    title: "AMBALANGODA",
    badge: "Masks & Culture",
    location: "Galle District, 107km from Colombo",
    image: "/images/dest-ambalangoda.jpg",
    description:
      "Ambalangoda is an amazing town which is located in Galle District, Southern Province of Sri Lanka. It is situated approximately 107 kilometers away from Colombo and sits on an elevation of 13 meters above the sea level. Lots of tourists are attracted to this town for marvelous colorful wooden devil masks and puppet traditions.",
    href: "https://traveltube.lk/destination.php",
  },
  {
    id: "moonstone-mine",
    title: "MOONSTONE MINE",
    badge: "Gem Mining",
    location: "Meetiyagoda, 10km from Hikkaduwa",
    image: "/images/dest-moonstone-mine.jpg",
    description:
      "Meetiyagoda is one place to famous in Moonstone mines. It is situated about 10km away from Hikkaduwa town and 4km from the ocean. The jewelry market is the main of this. But you will be not the invitees to the showrooms only. You can get a wonderful experience with a guided tour at the main mine.",
    href: "https://traveltube.lk/destination.php",
  },
];

export function DestinationsSection() {
  const [items, setItems] = useState<DestinationItem[]>(defaultDestinations);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const res = await fetch("/api/destinations?homepage=true");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setItems(
            json.data.map((d: DestinationItem) => ({
              id: d.slug || d.id,
              title: d.title,
              badge: d.badge,
              location: d.location,
              image: d.image,
              description: d.description,
              href: `/destination#${d.slug || ""}`,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load destinations:", err);
      }
    }
    loadDestinations();
  }, []);
  return (
    <section
      id="destinations"
      className={styles.destinationsSection}
      aria-labelledby="destinations-title"
    >
      <div className={styles.destinationsInner}>
        <div className={styles.destinationsHeader}>
          <p className={styles.destinationsEyebrow}>ICONIC ATTRACTIONS</p>
          <h2 id="destinations-title">
            TOP DESTINATION <span>IN SRI LANKA</span>
          </h2>
          <p className={styles.destinationsSubtitle}>
            Most Beautiful and amazing Places To See In Sri Lanka
          </p>
        </div>

        <div className={styles.destinationsGrid}>
          {items.map((item) => (
            <a
              key={item.id}
              href={item.href || "/destination"}
              className={styles.destinationCard}
              aria-label={`Explore ${item.title} destination in Sri Lanka`}
            >
              <div className={styles.destinationMedia}>
                <Image
                  src={item.image}
                  alt={`${item.title} - Sri Lanka travel destination`}
                  fill
                  unoptimized={Boolean(item.image?.startsWith("data:") || item.image?.startsWith("http"))}
                  sizes="(max-width: 600px) 90vw, (max-width: 900px) 44vw, (max-width: 1478px) 30vw, 440px"
                  className={styles.destinationImg}
                />
                <span className={styles.destinationBadge}>{item.badge}</span>
              </div>

              <div className={styles.destinationBody}>
                <div>
                  <h3 className={styles.destinationTitle}>{item.title}</h3>
                  <div className={styles.destinationLocation}>
                    <Icon name="pin" />
                    <span>{item.location}</span>
                  </div>
                  <p className={styles.destinationDescription}>{item.description}</p>
                </div>

                <span className={styles.destinationAction}>
                  Explore Destination <Icon name="arrow" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
