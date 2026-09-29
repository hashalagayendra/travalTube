import Image from "next/image";
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
    <>
      <style>{`
        .packagesSection {
          padding: 35px 0 45px;
          background: linear-gradient(180deg, #edf5f5, #f5faf9 45%, #eaf4f5);
        }
        .packagesInner { width: min(1400px, 90%); margin: 0 auto; }
        .packagesHeader { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 17px; }
        .packagesHeading { display: flex; align-items: center; gap: 17px; }
        .packagesHeading h2 { margin: 0; font-family: Georgia, "Times New Roman", serif; font-size: 27px; color: #10465b; font-weight: 700; line-height: 1.2; letter-spacing: -.5px; }
        .packagesSubtitle { display: flex; align-items: center; gap: 13px; color: #566a73; font-size: 10px; line-height: 1.5; }
        .packagesSubtitle::before { content: ""; width: 27px; height: 2px; flex-shrink: 0; background: #f1a047; }
        .viewAllPackages { display: inline-flex; align-items: center; gap: 8px; color: #126764; font-size: 10px; font-weight: 600; white-space: nowrap; }
        .viewAllPackages:hover { text-decoration: underline; text-underline-offset: 4px; }
        .viewAllPackages svg { width: 16px; height: 16px; }
        .packageGrid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
        }
        .packageCard {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #e5eef0;
          border-radius: 16px;
          background: white;
          box-shadow: 0 6px 18px #16485b08;
          transition: border-color .2s, box-shadow .2s;
        }
        .packageCard:hover { border-color: #aeced0; box-shadow: 0 6px 16px #16485b14; }
        .packageImage { position: relative; aspect-ratio: 1.85; overflow: hidden; }
        .packageImage::after { content: ""; position: absolute; inset: 50% 0 0; background: linear-gradient(transparent, #123f3838); pointer-events: none; }
        .packageImage img { object-fit: cover; }
        .packageDuration { position: absolute; z-index: 1; bottom: 20px; left: 16px; padding: 5px 13px; border-radius: 20px; background: #f5fbed; color: #376352; font-family: Georgia, serif; font-size: 12px; font-style: italic; box-shadow: 0 2px 5px #123f3812; }
        .packageContent { position: relative; z-index: 1; display: flex; flex-direction: column; flex: 1; margin-top: -12px; border-radius: 15px 15px 0 0; background: white; padding: 16px 17px 15px; }
        .packageContent h3 { min-height: 1.3em; margin: 0 0 6px; color: #18465a; font-family: Georgia, serif; font-size: 18px; font-weight: 700; line-height: 1.3; }
        .packageTags { margin: 0 0 17px; color: #78858a; font-size: 12px; line-height: 1.5; }
        .packageType { display: inline-flex; align-items: center; gap: 5px; color: #647873; font-size: 11px; }
        .packageType svg { width: 17px; height: 17px; color: #eca529; }
        .packageFooter { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; }
        .packagePrice { margin-left: auto; color: #0d6c69; font-size: 12px; font-weight: 700; line-height: 1.3; }
        .packagePrice small { display: block; color: #809390; font-size: 9px; font-weight: 400; }
        .packageArrow { display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0; border: 1px solid #deeaed; border-radius: 50%; color: #1f5a62; }
        .packageArrow svg { width: 17px; height: 17px; }
        .packageCard:hover .packageArrow { color: white; background: #0d6c69; border-color: #0d6c69; }

        @media (max-width: 1200px) { .packageGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; } }
        @media (max-width: 850px) { .packageGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; } }
        @media (max-width: 560px) { .packageGrid { grid-template-columns: 1fr; } }
        @media (max-width: 1000px) {
          .packagesHeading { align-items: flex-start; flex-direction: column; gap: 9px; }
          .packagesHeader { align-items: flex-start; }
          .viewAllPackages { padding-top: 7px; }
        }
        @media (max-width: 700px) {
          .packagesSection { padding: 28px 0; }
          .packagesInner { width: 90%; }
          .packagesHeader { flex-wrap: wrap; gap: 13px; }
          .packagesHeading h2 { font-size: 26px; }
          .packagesSubtitle { font-size: 10px; gap: 9px; }
          .viewAllPackages { padding-top: 0; }
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
            <a
              className="viewAllPackages"
              href="https://traveltube.lk/tour-packages.php?id=2"
            >
              View All Packages <Icon name="arrow" />
            </a>
          </div>
          <div className="packageGrid">
            {tourPackages.map((tour) => (
              <a
                key={tour.id}
                className="packageCard"
                href={`https://traveltube.lk/view-tour.php?id=${tour.id}`}
              >
                <div className="packageImage">
                  <Image
                    src={`/images/package-${tour.id}.jpg`}
                    alt={tour.alt}
                    fill
                    sizes="(max-width: 560px) 90vw, (max-width: 850px) 44vw, (max-width: 1200px) 29vw, 23vw"
                  />
                  <span className="packageDuration">{tour.days}</span>
                </div>
                <div className="packageContent">
                  <h3>{tour.name}</h3>
                  <p className="packageTags">{tour.tags}</p>
                  <div className="packageFooter">
                    <span className="packageType">
                      <Icon name={tour.type === "Day tour" ? "palm" : "pin"} />
                      {tour.type}
                    </span>
                    <span className="packagePrice">
                      <small>Pricing</small>On request
                    </span>
                    <span className="packageArrow">
                      <Icon name="arrow" />
                    </span>
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
