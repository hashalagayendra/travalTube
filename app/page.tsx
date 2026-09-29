"use client";

import { useRef, useState } from "react";
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
      <style>{`
        .skipLink { position: fixed; top: -80px; left: 20px; z-index: 20; padding: 12px 18px; background: white; border-radius: 6px; }
        .skipLink:focus { top: 12px; }
      `}</style>
      <a href="#main-content" className="skipLink">
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
