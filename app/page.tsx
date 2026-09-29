"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";
import {
  HeroSection,
  TourOptionsSection,
  WelcomeSection,
  PackagesSection,
  ExperiencesSection,
  ContactSection,
  SearchDialog,
  journeys,
} from "@/components/landing-page";
import { Footer } from "@/components/footer";

export default function Home() {
  const [travelStyle, setTravelStyle] = useState(journeys[0].style);
  const [tripReady, setTripReady] = useState(false);
  const searchDialog = useRef<HTMLDialogElement>(null);

  function chooseJourney(style: string) {
    setTravelStyle(style);
    setTripReady(false);
    searchDialog.current?.close();
  }

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Skip to content
      </a>
      <main id="main-content">
        <HeroSection onOpenSearch={() => searchDialog.current?.showModal()} />
        <TourOptionsSection />
        <WelcomeSection />
        <PackagesSection />
        <ExperiencesSection />
        <ContactSection
          travelStyle={travelStyle}
          setTravelStyle={setTravelStyle}
          tripReady={tripReady}
          setTripReady={setTripReady}
        />
      </main>
      <Footer />
      <SearchDialog
        dialogRef={searchDialog}
        onSelectJourney={chooseJourney}
      />
    </>
  );
}
