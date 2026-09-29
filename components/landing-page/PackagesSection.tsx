"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface TourPackage {
  id: number;
  name: string;
  days: string;
  locations: string;
  description: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  alt: string;
}

const tourPackages: TourPackage[] = [
  {
    id: 14,
    name: "Classic Cultural Tour",
    days: "5 Days",
    locations: "Sigiriya / Kandy / Dambulla",
    description:
      "Explore ancient wonders, royal heritage and Sri Lanka’s rich cultural heart.",
    rating: 4.8,
    reviews: 120,
    price: "US$ 420",
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
    price: "US$ 580",
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
    price: "US$ 980",
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
    price: "US$ 890",
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
    price: "US$ 750",
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
    price: "US$ 140",
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
    price: "US$ 130",
    image: "/images/package-13.jpg",
    alt: "A blue train crossing the Nine Arch Bridge in Ella",
  },
];

export function PackagesSection() {
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -410 : 410;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }

  return (
    <>
      <style>{`
        .packagesSection {
          padding: 60px 0 75px;
          background: linear-gradient(180deg, #edf5f5 0%, #f6faf9 40%, #eaf4f5 100%);
          overflow: hidden;
        }

        .packagesInner {
          width: min(1360px, 92%);
          margin: 0 auto;
        }

        .packagesHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }

        .packagesHeading {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .packagesHeading h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 32px;
          color: #073e36;
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -.5px;
        }

        .packagesSubtitle {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #556c75;
          font-size: 11px;
          line-height: 1.5;
        }

        .packagesSubtitle::before {
          content: "";
          width: 27px;
          height: 2px;
          flex-shrink: 0;
          background: #e8a838;
        }

        .packagesActions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .scrollControls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .scrollArrowBtn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #d4e3e0;
          background: #ffffff;
          color: #073e36;
          display: grid;
          place-items: center;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(7, 62, 54, 0.06);
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
        }

        .scrollArrowBtn:hover {
          background: #e6f3e5;
          border-color: #bad5ce;
          color: #073e36;
          transform: scale(1.05);
        }

        .scrollArrowBtn svg {
          width: 16px;
          height: 16px;
        }

        .viewAllButton {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #d4e3e0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #073e36;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 16px;
          border-radius: 24px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(7, 62, 54, 0.05);
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }

        .viewAllButton:hover {
          color: #f06c2f;
          border-color: #f06c2f;
          background: #ffffff;
        }

        .viewAllButton svg {
          width: 15px;
          height: 15px;
          transition: transform 0.25s ease;
        }

        /* Horizontal Scroll Mode */
        .packagesScrollContainer {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 8px 4px 24px 4px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .packagesScrollContainer::-webkit-scrollbar {
          display: none;
        }

        .packagesScrollContainer .packageCard {
          flex: 0 0 380px;
          width: 380px;
          scroll-snap-align: start;
        }

        /* Grid View Mode */
        .packagesGridContainer {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 26px;
          padding: 8px 0 10px 0;
          animation: enter .35s ease both;
        }

        .packageCard {
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid #e5eef0;
          border-radius: 20px;
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(10, 48, 56, 0.07), 0 2px 8px rgba(0, 0, 0, 0.02);
          text-decoration: none;
          color: inherit;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }

        .packageCard:hover {
          transform: translateY(-5px);
          border-color: #c4dce0;
          box-shadow: 0 18px 42px rgba(10, 48, 56, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .packageImageWrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 8.2;
          overflow: hidden;
          background: #e2ecec;
        }

        .packageImg {
          object-fit: cover;
          object-position: center 60%;
          transition: transform .45s ease;
        }

        .packageCard:hover .packageImg {
          transform: scale(1.04);
        }

        .packageDurationPill {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border-radius: 999px;
          padding: 5px 13px;
          font-size: 12px;
          font-weight: 700;
          color: #073e36;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .pillCalendarIcon {
          width: 15px;
          height: 15px;
          color: #073e36;
        }

        .packageBody {
          padding: 20px 22px 18px 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .packageTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          font-weight: 700;
          color: #073e36;
          margin: 0 0 8px 0;
          line-height: 1.25;
        }

        .packageLocation {
          display: flex;
          align-items: center;
          gap: 7px;
          margin: 0 0 11px 0;
          color: #556c75;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.35;
        }

        .locationPinIcon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .packageDescription {
          font-size: 12.5px;
          line-height: 1.55;
          color: #556c75;
          margin: 0 0 20px 0;
        }

        .packageFooterBar {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding-top: 4px;
        }

        .packageRating {
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .ratingStar {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .ratingScore {
          font-size: 13.5px;
          font-weight: 700;
          color: #073e36;
        }

        .reviewsCount {
          color: #7b8e96;
          font-size: 12px;
        }

        .footerDivider {
          width: 1px;
          height: 28px;
          background: #e2ebed;
          flex-shrink: 0;
        }

        .packagePriceBox {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
          white-space: nowrap;
        }

        .priceLabel {
          font-size: 10px;
          color: #556c75;
          font-weight: 600;
        }

        .priceValue {
          font-size: 18px;
          font-weight: 800;
          color: #f0642b;
          margin-top: 2px;
          letter-spacing: -0.3px;
        }

        .packageExploreBtn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: #073e36;
          white-space: nowrap;
          transition: color .2s ease;
        }

        .packageCard:hover .packageExploreBtn {
          color: #f06c2f;
        }

        .exploreArrowIcon {
          width: 15px;
          height: 15px;
          transition: transform .2s ease;
        }

        .packageCard:hover .exploreArrowIcon {
          transform: translateX(3px);
        }

        @keyframes enter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1100px) {
          .packagesGridContainer {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
          }
        }

        @media (max-width: 800px) {
          .packagesHeader {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .packagesActions {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 720px) {
          .packagesScrollContainer .packageCard {
            flex: 0 0 86vw;
            width: 86vw;
            max-width: 380px;
          }
          .packagesGridContainer {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin: 0 auto;
          }
          .packagesSection {
            padding: 40px 0;
          }
          .packagesHeading h2 {
            font-size: 26px;
          }
        }
      `}</style>
      <section
        id="packages"
        className="packagesSection"
        aria-labelledby="packages-title"
      >
        <div className="packagesInner">
          <div id="destinations" className="packagesHeader">
            <div className="packagesHeading">
              <h2 id="packages-title">Our Tour Packages</h2>
              <span className="packagesSubtitle">
                Handpicked experiences for every traveler
              </span>
            </div>

            <div className="packagesActions">
              {!showAll && (
                <div className="scrollControls">
                  <button
                    type="button"
                    className="scrollArrowBtn"
                    onClick={() => scroll("left")}
                    aria-label="Scroll tours left"
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
                    className="scrollArrowBtn"
                    onClick={() => scroll("right")}
                    aria-label="Scroll tours right"
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
                className="viewAllButton"
                onClick={() => setShowAll(!showAll)}
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
                    <path d="M6 9l6 6 6-6" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className={
              showAll ? "packagesGridContainer" : "packagesScrollContainer"
            }
          >
            {tourPackages.map((tour) => (
              <a
                key={tour.id}
                className="packageCard"
                href={`https://traveltube.lk/view-tour.php?id=${tour.id}`}
              >
                <div className="packageImageWrapper">
                  <Image
                    src={tour.image}
                    alt={tour.alt}
                    fill
                    sizes="(max-width: 720px) 86vw, (max-width: 1100px) 46vw, 380px"
                    className="packageImg"
                  />
                  <div className="packageDurationPill">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="pillCalendarIcon"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="3" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <span>{tour.days}</span>
                  </div>
                </div>

                <div className="packageBody">
                  <h3 className="packageTitle">{tour.name}</h3>

                  <div className="packageLocation">
                    <svg
                      viewBox="0 0 24 24"
                      className="locationPinIcon"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
                        fill="#f0642b"
                      />
                      <circle cx="12" cy="9" r="2.6" fill="#ffffff" />
                    </svg>
                    <span>{tour.locations}</span>
                  </div>

                  <p className="packageDescription">{tour.description}</p>

                  <div className="packageFooterBar">
                    <div className="packageRating">
                      <svg
                        viewBox="0 0 24 24"
                        fill="#e8a838"
                        className="ratingStar"
                        aria-hidden="true"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="ratingScore">{tour.rating.toFixed(1)}</span>
                      <span className="reviewsCount">({tour.reviews})</span>
                    </div>

                    <span className="footerDivider" />

                    <div className="packagePriceBox">
                      <span className="priceLabel">From</span>
                      <span className="priceValue">{tour.price}</span>
                    </div>

                    <span className="footerDivider" />

                    <div className="packageExploreBtn">
                      <span>Explore Tour</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="exploreArrowIcon"
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
    </>
  );
}
