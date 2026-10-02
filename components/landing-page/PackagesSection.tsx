"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./LandingSections.module.css";

interface TourPackage {
  id: number;
  name: string;
  days: string;
  locations: string;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  alt: string;
}

const defaultTourPackages: TourPackage[] = [
  {
    id: 14,
    name: "Classic Cultural Tour",
    days: "5 Days",
    locations: "Sigiriya / Kandy / Dambulla",
    description:
      "Explore ancient wonders, royal heritage and Sri Lanka’s rich cultural heart.",
    rating: 4.8,
    reviews: 120,
    image: "/images/sigiriya.jpg",
    alt: "Sigiriya rock fortress rising above lush green forest at sunset",
  },
  {
    id: 16,
    name: "Culture & Heritage Tour",
    days: "7 Days",
    locations: "Kandy / Cultural Triangle / Sigiriya",
    description:
      "Discover sacred temples, royal palaces and UNESCO world heritage treasures.",
    rating: 4.9,
    reviews: 98,
    image: "/images/package-16.jpg",
    alt: "The illuminated Temple of the Tooth in Kandy",
  },
  {
    id: 18,
    name: "Family Holidays Sri Lanka",
    days: "13 Days",
    locations: "Bentota / Yala / Ella / Kandy",
    description:
      "A joyful family journey combining wildlife safaris, scenic trains and sunny beaches.",
    rating: 4.9,
    reviews: 145,
    image: "/images/package-18.jpg",
    alt: "Buddhist statues and painted ceilings in a Sri Lankan cave temple",
  },
  {
    id: 19,
    name: "Honeymoon in Paradise",
    days: "11 Days",
    locations: "Mirissa / Nuwara Eliya / Ella",
    description:
      "Romantic getaways with tea-plantation retreats, coastal sunsets and private dining.",
    rating: 5.0,
    reviews: 84,
    image: "/images/package-19.jpg",
    alt: "Ancient stone architecture and a Buddha statue in Polonnaruwa",
  },
  {
    id: 20,
    name: "Beach Holiday Tour",
    days: "12 Days",
    locations: "Galle / Bentota / Mirissa",
    description:
      "Golden coastlines, turquoise waves, whale watching and tropical ocean breezes.",
    rating: 4.7,
    reviews: 110,
    image: "/images/package-20.jpg",
    alt: "Travelers relaxing under a blue umbrella on a Sri Lankan beach",
  },
  {
    id: 3,
    name: "Yala Safari Adventure",
    days: "1 Day",
    locations: "Yala National Park / Tissamaharama",
    description:
      "Thrilling leopard tracking, wild elephants and vibrant birdlife on a guided safari.",
    rating: 4.8,
    reviews: 215,
    image: "/images/package-3.jpg",
    alt: "Elephants crossing a road beside a safari jeep",
  },
  {
    id: 13,
    name: "Ella Scenic Highlands",
    days: "1 Day",
    locations: "Ella / Nine Arch Bridge / Little Adam’s Peak",
    description:
      "Iconic blue train journeys, mist-covered mountain peaks and roaring waterfalls.",
    rating: 4.9,
    reviews: 180,
    image: "/images/package-13.jpg",
    alt: "A blue train crossing the Nine Arch Bridge in Ella",
  },
];

export function PackagesSection() {
  const [packages, setPackages] = useState<TourPackage[]>(defaultTourPackages);
  const [showAll, setShowAll] = useState(false);
  const [scrollEdges, setScrollEdges] = useState({ start: true, end: false });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch("/api/packages");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPackages(json.data);
        }
      } catch (err) {
        console.error("Failed to load tour packages:", err);
      }
    }
    loadPackages();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || showAll) return;

    function updateScrollEdges() {
      if (!container) return;
      setScrollEdges({
        start: container.scrollLeft <= 1,
        end: container.scrollLeft + container.clientWidth >= container.scrollWidth - 1,
      });
    }

    const observer = new ResizeObserver(updateScrollEdges);
    observer.observe(container);
    container.addEventListener("scroll", updateScrollEdges, { passive: true });
    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", updateScrollEdges);
    };
  }, [packages.length, showAll]);

  function scroll(direction: "left" | "right") {
    const container = scrollContainerRef.current;
    const card = container?.firstElementChild;
    if (!container || !card) return;

    const gap = parseFloat(window.getComputedStyle(container).columnGap) || 0;
    const distance = card.getBoundingClientRect().width + gap;
    container.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      id="packages"
      className={styles.packagesSection}
      aria-labelledby="packages-title"
    >
      <div className={styles.packagesInner}>
        <div className={styles.packagesHeader}>
          <div className={styles.packagesHeading}>
            <h2 id="packages-title">Our Tour Packages</h2>
            <span className={styles.packagesSubtitle}>
              Handpicked experiences for every traveler
            </span>
          </div>

          <div className={styles.packagesActions}>
            {!showAll && (
              <div className={styles.scrollControls}>
                <button
                  type="button"
                  className={styles.scrollArrowBtn}
                  onClick={() => scroll("left")}
                  aria-label="Scroll tours left"
                  aria-controls="tour-packages-list"
                  disabled={scrollEdges.start}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={styles.scrollArrowBtn}
                  onClick={() => scroll("right")}
                  aria-label="Scroll tours right"
                  aria-controls="tour-packages-list"
                  disabled={scrollEdges.end}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            <button
              type="button"
              className={styles.viewAllButton}
              onClick={() => setShowAll((previous) => !previous)}
              aria-expanded={showAll}
              aria-controls="tour-packages-list"
            >
              <span>{showAll ? "Show Carousel" : "View All Packages"}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showAll ? (
                  <path d="M18 15l-6-6-6 6" />
                ) : (
                  <path d="M7 17 17 7M7 7h10v10" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          id="tour-packages-list"
          ref={scrollContainerRef}
          tabIndex={showAll ? undefined : 0}
          role="region"
          aria-labelledby="packages-title"
          className={
            showAll ? styles.packagesGridContainer : styles.packagesScrollContainer
          }
        >
          {packages.map((tour) => (
            <a
              key={tour.id}
              className={styles.packageCard}
              href={`https://traveltube.lk/view-tour.php?id=${tour.id}`}
            >
              <div className={styles.packageImageWrapper}>
                <Image
                  src={tour.image}
                  alt={tour.alt}
                  fill
                  unoptimized={Boolean(tour.image?.startsWith("data:") || tour.image?.startsWith("http"))}
                  sizes="(max-width: 600px) 84vw, (max-width: 1100px) 42vw, (max-width: 1478px) 29vw, 422px"
                  className={styles.packageImg}
                />
              </div>

              <div className={styles.packageBody}>
                <div className={styles.packageDurationPill}>{tour.days}</div>
                <h3 className={styles.packageTitle}>{tour.name}</h3>

                <div className={styles.packageLocation}>
                  <span>{tour.locations}</span>
                </div>

                <p className={styles.packageDescription}>{tour.description}</p>

                <div className={styles.packageFooterBar}>
                  <div className={styles.packageRating}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="#e8a838"
                      className={styles.ratingStar}
                      aria-hidden="true"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className={styles.ratingScore}>{tour.rating.toFixed(1)}</span>
                    <span className={styles.reviewsCount}>({tour.reviews})</span>
                  </div>

                  <div className={styles.packageExploreBtn}>
                    <span>Explore Tour</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.exploreArrowIcon}
                      aria-hidden="true"
                    >
                      <path d="M4 12h13M12 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
