"use client";

import styles from "@/app/page.module.css";
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
    <section id="contact" className={styles.contact}>
      <div>
        <p className={styles.sectionEyebrow}>LET’S MAKE IT YOURS</p>
        <h2>
          Your Sri Lankan story
          <br />
          <em>starts here.</em>
        </h2>
        <p>Tell us what you love. Find a little inspiration for your trip.</p>
      </div>
      <form
        className={styles.tripForm}
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
          <p className={styles.tripResult} role="status">
            Start with <strong>{selectedJourney.name}</strong> — a{" "}
            {selectedJourney.days} itinerary to inspire your adventure. This is
            a trip suggestion; no booking has been made.
          </p>
        )}
      </form>
    </section>
  );
}
