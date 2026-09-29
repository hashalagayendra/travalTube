import Image from "next/image";
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
    <>
      <style>{`
        .tourOptions {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          width: min(1400px, 94%);
          margin: -24px auto 0;
        }
        .tourOption {
          display: grid;
          grid-template-columns: 28% 42px minmax(0, 1fr) 26px;
          align-items: center;
          align-content: start;
          gap: 13px;
          min-height: 106px;
          padding: 8px 12px 8px 8px;
          border: 1px solid #e9edef;
          border-radius: 13px;
          background: #fff;
          box-shadow: 0 8px 28px #123f380d;
          transition: box-shadow .2s, border-color .2s;
        }
        .tourOption:hover {
          border-color: #c7d8cf;
          box-shadow: 0 10px 30px #123f381c;
        }
        .tourOptionImage {
          position: relative;
          align-self: stretch;
          min-height: 88px;
          overflow: hidden;
          border-radius: 7px;
        }
        .tourOptionImage img { object-fit: cover; object-position: center 65%; }
        .tourOptionIcon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }
        .tourOptionIcon svg { width: 23px; height: 23px; }
        .greenIcon { background: #edf4df; color: #2b791b; }
        .orangeIcon { background: #fff0df; color: #fc751c; }
        .tourOptionCopy h2 {
          margin: 0 0 5px;
          color: #143e52;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.2;
        }
        .tourOptionCopy p { margin: 0; color: #6b7888; font-size: 11px; line-height: 1.5; }
        .tourOptionDescription {
          grid-column: 1 / -1;
          align-self: start;
          margin: 0;
          padding: 15px 9px 12px;
          border-top: 1px solid #edf0f1;
          color: #6b7888;
          font-size: 13px;
          line-height: 1.75;
        }
        .tourOptionArrow {
          display: grid;
          place-items: center;
          width: 26px;
          height: 26px;
          border: 1px solid #dbe2e5;
          border-radius: 50%;
          color: #173f4d;
        }
        .tourOptionArrow svg { width: 14px; height: 14px; }

        @media (max-width: 1150px) {
          .tourOption { grid-template-columns: 27% 34px minmax(0, 1fr) 22px; gap: 9px; padding-right: 9px; min-height: 94px; }
          .tourOptionImage { min-height: 76px; }
          .tourOptionIcon { width: 34px; height: 34px; }
          .tourOptionIcon svg { width: 20px; height: 20px; }
          .tourOptionCopy h2 { font-size: 16px; }
          .tourOptionCopy p { font-size: 10px; }
          .tourOptionArrow { width: 22px; height: 22px; }
        }
        @media (max-width: 900px) {
          .tourOptions { grid-template-columns: 1fr; width: min(620px, 90%); gap: 10px; }
          .tourOption { grid-template-columns: 110px 38px minmax(0, 1fr) 26px; min-height: 100px; gap: 13px; }
          .tourOptionCopy h2 { font-size: 19px; }
          .tourOptionCopy p { font-size: 12px; }
          .tourOptionIcon { width: 38px; height: 38px; }
          .tourOptionArrow { width: 26px; height: 26px; }
        }
        @media (max-width: 430px) {
          .tourOption { grid-template-columns: 76px 32px minmax(0, 1fr) 22px; gap: 9px; min-height: 90px; }
          .tourOptionImage { min-height: 72px; }
          .tourOptionIcon { width: 32px; height: 32px; }
          .tourOptionCopy h2 { font-size: 16px; }
          .tourOptionCopy p { font-size: 10px; }
          .tourOptionArrow { width: 22px; height: 22px; }
        }
      `}</style>
      <section
        className="tourOptions"
        aria-label="Explore our tour options"
      >
        {tourOptions.map((option) => (
          <a
            key={option.title}
            href={option.href}
            className="tourOption"
          >
            <div className="tourOptionImage">
              <Image
                src={option.image}
                alt=""
                fill
                sizes="(max-width: 900px) 120px, (max-width: 1150px) 90px, 130px"
              />
            </div>
            <span
              className={`tourOptionIcon ${
                option.accent === "orange" ? "orangeIcon" : "greenIcon"
              }`}
            >
              <Icon name={option.icon} />
            </span>
            <div className="tourOptionCopy">
              <h2>{option.title}</h2>
              <p>{option.description}</p>
            </div>
            <span className="tourOptionArrow">
              <Icon name="arrow" />
            </span>
            <p className="tourOptionDescription">{option.details}</p>
          </a>
        ))}
      </section>
    </>
  );
}
