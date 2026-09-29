import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

interface DestinationItem {
  id: string;
  title: string;
  badge: string;
  location: string;
  image: string;
  description: string;
  href: string;
}

const destinations: DestinationItem[] = [
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
  return (
    <>
      <style>{`
        .destinationsSection {
          padding: 30px 0 80px;
          background: #ffffff;
          position: relative;
        }

        .destinationsInner {
          width: min(1360px, 92%);
          margin: 0 auto;
        }

        .destinationsHeader {
          text-align: center;
          margin-bottom: 45px;
        }

        .destinationsEyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 600;
          color: #556c75;
          margin: 0 0 14px;
        }

        .destinationsEyebrow::before,
        .destinationsEyebrow::after {
          content: "";
          display: inline-block;
          width: 28px;
          height: 2px;
          background: #e8a838;
        }

        .destinationsHeader h2 {
          margin: 0 0 10px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 3.1vw, 42px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.5px;
          color: #073e36;
        }

        .destinationsHeader h2 span {
          color: #f0642b;
          white-space: nowrap;
        }

        .destinationsSubtitle {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          font-size: 15px;
          color: #556c75;
          letter-spacing: 0.2px;
        }

        .destinationsGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 26px;
        }

        .destinationCard {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 20px;
          background: #ffffff;
          border: 1px solid #e5edeb;
          border-radius: 18px;
          padding: 16px;
          text-decoration: none;
          color: inherit;
          transition: border-color .25s ease;
        }

        .destinationCard:hover {
          border-color: #bad5ce;
        }

        .destinationMedia {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3.4;
          border-radius: 13px;
          overflow: hidden;
          background: #e6eee9;
        }

        .destinationImg {
          object-fit: cover;
          object-position: center;
          transition: transform .45s ease;
        }

        .destinationCard:hover .destinationImg {
          transform: scale(1.05);
        }

        .destinationBadge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          background: rgba(255, 255, 255, 0.94);
          color: #073e36;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 6px;
          border: 1px solid rgba(7, 62, 54, 0.08);
        }

        .destinationBody {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 4px 6px 4px 0;
        }

        .destinationTitle {
          margin: 0 0 6px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.3px;
          color: #073e36;
          text-transform: uppercase;
          transition: color .2s ease;
        }

        .destinationCard:hover .destinationTitle {
          color: #086157;
        }

        .destinationLocation {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #556c75;
          margin-bottom: 10px;
        }

        .destinationLocation svg {
          width: 14px;
          height: 14px;
          color: #f0642b;
          flex-shrink: 0;
        }

        .destinationDescription {
          margin: 0 0 14px;
          font-size: 13px;
          line-height: 1.62;
          color: #556c75;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .destinationAction {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #073e36;
          margin-top: auto;
          transition: color .2s ease;
        }

        .destinationAction svg {
          width: 14px;
          height: 14px;
          transition: transform .25s ease, color .2s ease;
        }

        .destinationCard:hover .destinationAction {
          color: #f06c2f;
        }

        .destinationCard:hover .destinationAction svg {
          transform: translateX(4px);
          color: #f06c2f;
        }

        @media (max-width: 1100px) {
          .destinationCard {
            grid-template-columns: 180px 1fr;
            gap: 16px;
          }
          .destinationTitle {
            font-size: 18px;
          }
        }

        @media (max-width: 820px) {
          .destinationsGrid {
            grid-template-columns: 1fr;
            max-width: 580px;
            margin: 0 auto;
          }
          .destinationCard {
            grid-template-columns: 170px 1fr;
          }
        }

        @media (max-width: 540px) {
          .destinationCard {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .destinationMedia {
            aspect-ratio: 16 / 9;
          }
          .destinationBody {
            padding: 0;
          }
          .destinationsSection {
            padding: 30px 0 55px;
          }
        }
      `}</style>

      <section
        id="destinations"
        className="destinationsSection"
        aria-labelledby="destinations-title"
      >
        <div className="destinationsInner">
          <div className="destinationsHeader">
            <p className="destinationsEyebrow">ICONIC ATTRACTIONS</p>
            <h2 id="destinations-title">
              TOP DESTINATION <span>IN SRI LANKA</span>
            </h2>
            <p className="destinationsSubtitle">
              Most Beautiful and amazing Places To See In Sri Lanka
            </p>
          </div>

          <div className="destinationsGrid">
            {destinations.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="destinationCard"
                target="_blank"
                rel="noreferrer"
                aria-label={`Explore ${item.title} destination in Sri Lanka`}
              >
                <div className="destinationMedia">
                  <Image
                    src={item.image}
                    alt={`${item.title} - Sri Lanka travel destination`}
                    fill
                    sizes="(max-width: 820px) 100vw, (max-width: 1100px) 180px, 210px"
                    className="destinationImg"
                  />
                  <span className="destinationBadge">{item.badge}</span>
                </div>

                <div className="destinationBody">
                  <div>
                    <h3 className="destinationTitle">{item.title}</h3>
                    <div className="destinationLocation">
                      <Icon name="pin" />
                      <span>{item.location}</span>
                    </div>
                    <p className="destinationDescription">{item.description}</p>
                  </div>

                  <span className="destinationAction">
                    Explore Destination <Icon name="arrow" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
