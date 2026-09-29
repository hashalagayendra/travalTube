import Image from "next/image";
import styles from "@/app/page.module.css";
import { Icon } from "@/components/ui/Icon";

interface TourPackage {
  id: number;
  name: string;
  days: string;
  tags: string;
  type: string;
  alt: string;
}

const tourPackages: TourPackage[] = [
  {
    id: 14,
    name: "Classic Mini Tour",
    days: "5 Days",
    tags: "Sigiriya · Dambulla · Kandy",
    type: "Round tour",
    alt: "An elephant beside a safari jeep in Sri Lanka",
  },
  {
    id: 16,
    name: "Culture & Heritage Tour",
    days: "7 Days",
    tags: "Kandy · Cultural Triangle",
    type: "Round tour",
    alt: "The illuminated Temple of the Tooth in Kandy",
  },
  {
    id: 18,
    name: "Family Holidays Sri Lanka",
    days: "13 Days",
    tags: "Beaches · Nature · Family",
    type: "Round tour",
    alt: "Buddhist statues and painted ceilings in a Sri Lankan cave temple",
  },
  {
    id: 19,
    name: "Honeymoon in Paradise",
    days: "11 Days",
    tags: "Romance · Beaches · Discovery",
    type: "Round tour",
    alt: "Ancient stone architecture and a Buddha statue in Polonnaruwa",
  },
  {
    id: 20,
    name: "Beach Holiday Tour",
    days: "12 Days",
    tags: "South Coast · Relaxation",
    type: "Round tour",
    alt: "Travelers relaxing under a blue umbrella on a Sri Lankan beach",
  },
  {
    id: 3,
    name: "Yala Safari",
    days: "1 Day",
    tags: "Wildlife · Nature · Adventure",
    type: "Day tour",
    alt: "Elephants crossing a road beside a safari jeep",
  },
  {
    id: 13,
    name: "Ella Tour",
    days: "1 Day",
    tags: "Scenic Train · Mountains",
    type: "Day tour",
    alt: "A blue train crossing the Nine Arch Bridge in Ella",
  },
];

export function PackagesSection() {
  return (
    <section
      id="packages"
      className={styles.packagesSection}
      aria-labelledby="packages-title"
    >
      <div className={styles.packagesInner}>
        <div id="destinations" className={styles.packagesHeader}>
          <div className={styles.packagesHeading}>
            <h2 id="packages-title">Our Tour Packages</h2>
            <span className={styles.packagesSubtitle}>
              Handpicked experiences for every traveler
            </span>
          </div>
          <a
            className={styles.viewAllPackages}
            href="https://traveltube.lk/tour-packages.php?id=2"
          >
            View All Packages <Icon name="arrow" />
          </a>
        </div>
        <div className={styles.packageGrid}>
          {tourPackages.map((tour) => (
            <a
              key={tour.id}
              className={styles.packageCard}
              href={`https://traveltube.lk/view-tour.php?id=${tour.id}`}
            >
              <div className={styles.packageImage}>
                <Image
                  src={`/images/package-${tour.id}.jpg`}
                  alt={tour.alt}
                  fill
                  sizes="(max-width: 560px) 90vw, (max-width: 850px) 44vw, (max-width: 1200px) 29vw, 23vw"
                />
                <span className={styles.packageDuration}>{tour.days}</span>
              </div>
              <div className={styles.packageContent}>
                <h3>{tour.name}</h3>
                <p className={styles.packageTags}>{tour.tags}</p>
                <div className={styles.packageFooter}>
                  <span className={styles.packageType}>
                    <Icon name={tour.type === "Day tour" ? "palm" : "pin"} />
                    {tour.type}
                  </span>
                  <span className={styles.packagePrice}>
                    <small>Pricing</small>On request
                  </span>
                  <span className={styles.packageArrow}>
                    <Icon name="arrow" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
