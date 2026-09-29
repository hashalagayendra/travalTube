"use client";

import { Icon } from "@/components/ui/Icon";
import { journeys } from "./data";

interface ContactSectionProps {
  travelStyle: string;
  setTravelStyle: (style: string) => void;
  tripReady: boolean;
  setTripReady: (ready: boolean) => void;
}

export function ContactSection({
  travelStyle,
  setTravelStyle,
  tripReady,
  setTripReady,
}: ContactSectionProps) {
  const selectedJourney =
    journeys.find((journey) => journey.style === travelStyle) || journeys[0];

  return (
    <>
      <style>{`
        .contact { width: min(1230px, 84%); margin: 0 auto; padding: 80px 0; display: grid; grid-template-columns: 1.1fr 1fr; gap: 90px; align-items: center; }
        .sectionEyebrow { font-size: 9px; letter-spacing: 2.2px; font-weight: 700; color: #678177; margin: 0 0 17px; }
        .contact h2 { font-family: Georgia, serif; font-weight: 400; font-size: clamp(33px, 3.3vw, 48px); line-height: 1.15; letter-spacing: -1px; margin: 0; }
        .contact h2 em { color: #a27834; font-weight: 400; }
        .contact > div > p:last-child { font-size: 13px; color: #6a746f; line-height: 1.8; }
        .tripForm { display: flex; flex-direction: column; gap: 13px; }
        .tripForm label { font-size: 12px; font-weight: 600; }
        .tripForm select { border: 1px solid #d5ddd3; background: white; padding: 15px; border-radius: 4px; color: #123f38; width: 100%; }
        .tripForm > button { border: 0; background: #073e36; color: white; padding: 15px 21px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; }
        .tripForm > button:hover { background: #0b574b; }
        .tripForm svg { width: 19px; height: 19px; }
        .tripResult { font-size: 12px; line-height: 1.8; margin: 0; padding: 15px; background: #e7eee5; border-radius: 4px; }

        @media (max-width: 1020px) {
          .contact { gap: 40px; }
        }
        @media (max-width: 700px) {
          .contact h2 { font-size: 36px; }
          .contact { padding: 55px 0; grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
      <section id="contact" className="contact">
        <div>
          <p className="sectionEyebrow">LET’S MAKE IT YOURS</p>
          <h2>
            Your Sri Lankan story
            <br />
            <em>starts here.</em>
          </h2>
          <p>Tell us what you love. Find a little inspiration for your trip.</p>
        </div>
        <form
          className="tripForm"
          onSubmit={(event) => {
            event.preventDefault();
            setTripReady(true);
          }}
        >
          <label htmlFor="travel-style">What kind of journey calls to you?</label>
          <select
            id="travel-style"
            value={travelStyle}
            onChange={(event) => {
              setTravelStyle(event.target.value);
              setTripReady(false);
            }}
          >
            {journeys.map((journey) => (
              <option key={journey.style} value={journey.style}>
                {journey.style}
              </option>
            ))}
          </select>
          <button type="submit">
            Find My Journey <Icon name="arrow" />
          </button>
          {tripReady && (
            <p className="tripResult" role="status">
              Start with <strong>{selectedJourney.name}</strong> — a{" "}
              {selectedJourney.days} itinerary to inspire your adventure. This is
              a trip suggestion; no booking has been made.
            </p>
          )}
        </form>
      </section>
    </>
  );
}
