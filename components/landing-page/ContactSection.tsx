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
        .contact {
          width: min(1360px, 92%);
          margin: 0 auto;
          padding: 85px 0 95px;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 90px;
          align-items: center;
        }

        .sectionEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 600;
          color: #556c75;
          margin: 0 0 16px;
        }

        .sectionEyebrow::before {
          content: "";
          display: inline-block;
          width: 32px;
          height: 2px;
          background: #e8a838;
        }

        .contact h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          font-size: clamp(34px, 3.5vw, 50px);
          line-height: 1.15;
          letter-spacing: -1px;
          color: #073e36;
          margin: 0 0 16px;
        }

        .contact h2 em {
          font-family: "Segoe Script", "Brush Script MT", cursive;
          color: #ffb11b;
          font-weight: 400;
          font-style: normal;
          letter-spacing: -2px;
        }

        .contact > div > p:last-child {
          font-size: 15px;
          color: #556c75;
          line-height: 1.7;
          margin: 0;
        }

        .tripForm {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #ffffff;
          padding: 32px;
          border-radius: 20px;
          border: 1px solid #e2ece9;
          box-shadow: 0 12px 36px rgba(7, 62, 54, 0.06);
        }

        .tripForm label {
          font-size: 13px;
          font-weight: 700;
          color: #073e36;
        }

        .tripForm select {
          border: 1px solid #cad8d3;
          background: #ffffff;
          padding: 14px 16px;
          border-radius: 10px;
          color: #073e36;
          font-size: 14px;
          font-weight: 500;
          width: 100%;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }

        .tripForm select:focus {
          border-color: #073e36;
          box-shadow: 0 0 0 3px rgba(7, 62, 54, 0.12);
        }

        .tripForm > button {
          border: 0;
          background: #003f3b;
          color: #ffffff;
          padding: 14px 26px;
          min-height: 46px;
          border-radius: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 24px rgba(7, 62, 54, 0.15);
          transition: background .2s ease, transform .2s ease;
        }

        .tripForm > button:hover {
          background: #086157;
          transform: translateY(-2px);
        }

        .tripForm svg {
          width: 18px;
          height: 18px;
        }

        .tripResult {
          font-size: 13px;
          line-height: 1.7;
          margin: 0;
          padding: 16px 18px;
          background: #edf6f2;
          border: 1px solid #cfe2d9;
          border-radius: 10px;
          color: #073e36;
        }

        .tripResult strong {
          color: #f0642b;
        }

        @media (max-width: 1020px) {
          .contact {
            gap: 40px;
            padding: 65px 0 75px;
          }
        }

        @media (max-width: 760px) {
          .contact {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .contact h2 {
            font-size: 34px;
          }
          .tripForm {
            padding: 24px 20px;
          }
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
