"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./LandingSections.module.css";
import { Icon, IconName } from "@/components/ui/Icon";

interface TourOptionItem {
  id?: number;
  title: string;
  badge?: string;
  description: string;
  actionText: string;
  image: string;
  icon: IconName;
  href: string;
  accent: "green" | "orange";
}

const defaultTourOptions: TourOptionItem[] = [
  {
    id: 1,
    title: "One Day Tours",
    badge: "Day Trips",
    description:
      "Feel with the nature in Sri Lanka. Can you arrange a trip on a day? We give you amazing and adventure feeling. We have selected best places to you which can enjoy your day. Within one day cover the most attractive areas in Sri Lanka.",
    actionText: "Explore Tours",
    image: "/images/day-tours.jpg",
    icon: "palm",
    href: "https://traveltube.lk/tour-packages.php?id=1",
    accent: "green",
  },
  {
    id: 2,
    title: "Round Tours",
    badge: "Multi-Day",
    description:
      "In every country there some hidden places and stories. Explore the cultures, the legends and history of this areas. Find your way. Get a wonderful experience, add little to your memories. And Sri Lanka is the best destination to fulfill your travel diary. Travel and enjoy your life.",
    actionText: "Explore Journeys",
    image: "/images/sigiriya.jpg",
    icon: "pin",
    href: "https://traveltube.lk/tour-packages.php?id=2",
    accent: "orange",
  },
  {
    id: 3,
    title: "Plan your Trip",
    badge: "Tailor-Made",
    description:
      "Planning a trip is the hardest part of traveling. No worries. Plan your trip more efficiently and effectively. We will help you to arrange your trip, schedule your valuable time and choose the best routes for your journey without any mistake. Enjoy your trip with a cost effective plan.",
    actionText: "Start Planning",
    image: "/images/package-13.jpg",
    icon: "calendar",
    href: "https://traveltube.lk/plan-tour.php",
    accent: "green",
  },
];

function getCategoryIcon(title: string, index: number): IconName {
  const t = title.toLowerCase();
  if (t.includes("day")) return "palm";
  if (t.includes("round")) return "pin";
  if (t.includes("plan")) return "calendar";
  return index === 1 ? "pin" : index === 2 ? "calendar" : "palm";
}

function getCategoryHref(id?: number, index?: number): string {
  if (id === 1 || index === 0) return "https://traveltube.lk/tour-packages.php?id=1";
  if (id === 2 || index === 1) return "https://traveltube.lk/tour-packages.php?id=2";
  return "https://traveltube.lk/plan-tour.php";
}

export function TourOptionsSection() {
  const [options, setOptions] = useState<TourOptionItem[]>(defaultTourOptions);

  useEffect(() => {
    async function loadDynamicCategories() {
      try {
        const res = await fetch("/api/homepage/categories");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setOptions(
            json.data.map(
              (
                cat: {
                  id: number;
                  title?: string;
                  badge?: string;
                  description?: string;
                  actionText?: string;
                  image?: string;
                },
                idx: number
              ) => {
                const fallback = defaultTourOptions[idx] || defaultTourOptions[0];
                return {
                  id: cat.id,
                  title: cat.title || fallback.title,
                  badge: cat.badge || fallback.badge,
                  description: cat.description || fallback.description,
                  actionText: cat.actionText || fallback.actionText,
                  image: cat.image || fallback.image,
                  icon: getCategoryIcon(cat.title || fallback.title, idx),
                  href: getCategoryHref(cat.id, idx),
                  accent: idx === 1 ? ("orange" as const) : ("green" as const),
                };
              }
            )
          );
        }
      } catch {
        // Fall back gracefully to initial defaultTourOptions
      }
    }
    loadDynamicCategories();
  }, []);
  return (
    <section className={styles.tourOptionsSection} aria-label="Explore our tour options">
      <div className={styles.tourCardsGrid}>
        {options.map((option, index) => (
          <a key={option.id || option.title} href={option.href} className={styles.tourCard}>
            <div className={styles.cardMedia}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  sizes={index === 0
                    ? "(max-width: 900px) 92vw, (max-width: 1478px) 43vw, 617px"
                    : "(max-width: 600px) 92vw, (max-width: 900px) 44vw, (max-width: 1478px) 24vw, 350px"}
                  className={styles.cardImage}
                  unoptimized={Boolean(option.image && option.image.startsWith("data:"))}
                />
              </div>
            </div>
            <div className={styles.cardContent}>
              {option.badge && <span className={styles.cardPillBadge}>{option.badge}</span>}
              <h2 className={styles.cardTitle}>{option.title}</h2>
              <p className={styles.cardDescription}>{option.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardActionText}>{option.actionText}</span>
                <span className={styles.cardArrow}><Icon name="arrow" /></span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
