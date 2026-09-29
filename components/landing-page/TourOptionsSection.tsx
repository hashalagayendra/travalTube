import Image from "next/image";
import { Icon, IconName } from "@/components/ui/Icon";

interface TourOptionItem {
  title: string;
  description: string;
  actionText: string;
  image: string;
  icon: IconName;
  href: string;
  accent: "green" | "orange";
}

const tourOptions: TourOptionItem[] = [
  {
    title: "One Day Tours",
    description:
      "Feel with the nature in Sri Lanka. Can you arrange a trip on a day? We give you amazing and adventure feeling. We have selected best places to you which can enjoy your day. Within one day cover the most attractive areas in Sri Lanka.",
    actionText: "Explore Tours",
    image: "/images/day-tours.jpg",
    icon: "palm",
    href: "https://traveltube.lk/tour-packages.php?id=1",
    accent: "green",
  },
  {
    title: "Round Tours",
    description:
      "In every country there some hidden places and stories. Explore the cultures, the legends and history of this areas. Find your way. Get a wonderful experience, add little to your memories. And Sri Lanka is the best destination to fulfill your travel diary. Travel and enjoy your life.",
    actionText: "Explore Journeys",
    image: "/images/sigiriya.jpg",
    icon: "pin",
    href: "https://traveltube.lk/tour-packages.php?id=2",
    accent: "orange",
  },
  {
    title: "Plan your Trip",
    description:
      "Planning a trip is the hardest part of traveling. No worries. Plan your trip more efficiently and effectively. We will help you to arrange your trip, schedule your valuable time and choose the best routes for your journey without any mistake. Enjoy your trip with a cost effective plan.",
    actionText: "Start Planning",
    image: "/images/package-13.jpg",
    icon: "calendar",
    href: "https://traveltube.lk/plan-tour.php",
    accent: "green",
  },
];

export function TourOptionsSection() {
  return (
    <>
      <style>{`
        .tourOptionsSection {
          position: relative;
          z-index: 5;
          width: 100%;
          margin-top: -140px;
          padding-bottom: 30px;
        }

        .decorativePalm {
          position: absolute;
          left: -20px;
          bottom: -20px;
          width: 180px;
          height: 300px;
          color: #d1dbd4;
          opacity: 0.55;
          pointer-events: none;
          z-index: 1;
          transform: rotate(-12deg);
        }

        .tourCardsGrid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          width: min(1360px, 92%);
          margin: 0 auto;
        }

        .tourCard {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 20px;
          padding: 14px 14px 22px 14px;
          border: 1px solid rgba(226, 234, 230, 0.9);
          text-decoration: none;
          transition: border-color .25s ease;
        }

        .tourCard:hover {
          border-color: #bad5ce;
        }

        .tourCard:hover .cardActionText {
          color: #f06c2f;
        }

        .tourCard:hover .cardArrow {
          background: #073e36;
          color: #ffffff;
        }

        .cardMedia {
          position: relative;
          width: 100%;
        }

        .cardImageWrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 8.2;
          border-radius: 14px;
          overflow: hidden;
        }

        .cardImage {
          object-fit: cover;
          object-position: center;
        }

        .cardBadge {
          position: absolute;
          bottom: -20px;
          left: 18px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 2px solid #ffffff;
          z-index: 3;
        }

        .cardBadge svg {
          width: 24px;
          height: 24px;
        }

        .badgeGreen {
          background: #e6f3e5;
          color: #073e36;
        }

        .badgeOrange {
          background: #fff0e8;
          color: #f0642b;
        }

        .cardContent {
          padding: 26px 6px 0 6px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .cardTitle {
          margin: 0 0 8px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.25;
        }

        .cardDescription {
          margin: 0 0 16px;
          color: #556c75;
          font-size: 13px;
          line-height: 1.6;
        }

        .cardFooter {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #edf3f1;
        }

        .cardActionText {
          font-size: 14.5px;
          font-weight: 700;
          color: #073e36;
          letter-spacing: -0.2px;
          transition: color .2s ease;
        }

        .cardArrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          transition: background .2s ease, color .2s ease;
        }

        .cardArrow svg {
          width: 17px;
          height: 17px;
        }

        .arrowGreen {
          background: #e6f3e5;
          color: #073e36;
        }

        .arrowOrange {
          background: #fff0e8;
          color: #f0642b;
        }

        @media (max-width: 1180px) {
          .tourCardsGrid {
            gap: 20px;
            width: 94%;
          }
          .cardTitle {
            font-size: 21px;
          }
          .cardDescription {
            font-size: 13px;
          }
        }

        @media (max-width: 900px) {
          .tourOptionsSection {
            margin-top: -100px;
          }
          .tourCardsGrid {
            grid-template-columns: 1fr;
            max-width: 520px;
            gap: 24px;
          }
        }

        @media (max-width: 560px) {
          .tourOptionsSection {
            margin-top: -60px;
          }
          .tourCard {
            padding: 12px 12px 20px 12px;
          }
          .cardTitle {
            font-size: 20px;
          }
        }
      `}</style>
      <section
        className="tourOptionsSection"
        aria-label="Explore our tour options"
      >
        <svg
          className="decorativePalm"
          viewBox="0 0 200 330"
          aria-hidden="true"
        >
          <path
            d="M85 330C76 242 72 140 97 69"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            d="M96 73C48 21 14 32 0 62c40-12 61-1 96 11ZM96 73C34 57 5 80 0 113c37-26 61-30 96-40ZM96 73C32 88 16 121 23 158c15-43 38-65 73-85ZM96 73c7-53 37-65 70-54-37 11-53 26-70 54ZM96 73c49-44 86-26 104 7-43-13-69-17-104-7ZM96 73c59-9 88 23 94 58-34-36-55-49-94-58ZM96 73c42 20 53 54 46 92-14-41-25-66-46-92Z"
            fill="currentColor"
          />
        </svg>

        <div className="tourCardsGrid">
          {tourOptions.map((option) => (
            <a
              key={option.title}
              href={option.href}
              className="tourCard"
            >
              <div className="cardMedia">
                <div className="cardImageWrapper">
                  <Image
                    src={option.image}
                    alt={option.title}
                    fill
                    sizes="(max-width: 900px) 90vw, (max-width: 1200px) 32vw, 420px"
                    className="cardImage"
                  />
                </div>
                <span
                  className={`cardBadge ${
                    option.accent === "orange" ? "badgeOrange" : "badgeGreen"
                  }`}
                >
                  <Icon name={option.icon} />
                </span>
              </div>
              <div className="cardContent">
                <h2 className="cardTitle">{option.title}</h2>
                <p className="cardDescription">{option.description}</p>
                <div className="cardFooter">
                  <span className="cardActionText">{option.actionText}</span>
                  <span
                    className={`cardArrow ${
                      option.accent === "orange" ? "arrowOrange" : "arrowGreen"
                    }`}
                  >
                    <Icon name="arrow" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
