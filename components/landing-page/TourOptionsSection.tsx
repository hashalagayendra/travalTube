import Image from "next/image";
import styles from "@/app/page.module.css";
import { Icon, IconName } from "@/components/ui/Icon";

interface TourOptionItem {
  title: string;
  description: string;
  details: string;
  image: string;
  icon: IconName;
  href: string;
  accent: string;
}

const tourOptions: TourOptionItem[] = [
  {
    title: "One Day Tours",
    description: "Explore Sri Lanka’s highlights in a single day",
    details:
      "Feel with the nature in Sri Lanka. Can you arrange a trip on a day? We give you amazing and adventure feeling. We have selected best places to you which can enjoy your day. Within one day cover the most attractive areas in Sri Lanka.",
    image: "/images/day-tours.jpg",
    icon: "palm",
    href: "https://traveltube.lk/tour-packages.php?id=1",
    accent: "green",
  },
  {
    title: "Round Tours",
    description: "Multi-day journeys across stunning destinations",
    details:
      "In every country there some hidden places and stories. Explore the cultures, the legends and history of this areas. Find your way. Get a wonderful experience, add little to your memories. And Sri Lanka is the best destination to fulfill your travel diary. Travel and enjoy your life.",
    image: "/images/sigiriya.jpg",
    icon: "pin",
    href: "https://traveltube.lk/tour-packages.php?id=2",
    accent: "orange",
  },
  {
    title: "Plan Your Trip",
    description: "Let us create your perfect Sri Lanka itinerary",
    details:
      "Planning a trip is the hardest part of traveling. No worries. Plan your trip more efficiently and effectively. We will help you to arrange your trip, schedule your valuable time and choose the best routes for your journey without any mistake. Enjoy your trip with a cost effective plan.",
    image: "/images/plan-trip.jpg",
    icon: "calendar",
    href: "https://traveltube.lk/plan-tour.php",
    accent: "green",
  },
];

export function TourOptionsSection() {
  return (
    <section
      className={styles.tourOptions}
      aria-label="Explore our tour options"
    >
      {tourOptions.map((option) => (
        <a
          key={option.title}
          href={option.href}
          className={styles.tourOption}
        >
          <div className={styles.tourOptionImage}>
            <Image
              src={option.image}
              alt=""
              fill
              sizes="(max-width: 900px) 120px, (max-width: 1150px) 90px, 130px"
            />
          </div>
          <span
            className={`${styles.tourOptionIcon} ${
              option.accent === "orange" ? styles.orangeIcon : styles.greenIcon
            }`}
          >
            <Icon name={option.icon} />
          </span>
          <div className={styles.tourOptionCopy}>
            <h2>{option.title}</h2>
            <p>{option.description}</p>
          </div>
          <span className={styles.tourOptionArrow}>
            <Icon name="arrow" />
          </span>
          <p className={styles.tourOptionDescription}>{option.details}</p>
        </a>
      ))}
    </section>
  );
}
