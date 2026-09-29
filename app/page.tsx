"use client";

import { useRef } from "react";
import {
  HeroSection,
  TourOptionsSection,
  WelcomeSection,
  PackagesSection,
  DestinationsSection,
  SearchDialog,
} from "@/components/landing-page";
import { Footer } from "@/components/footer";

export default function Home() {
  const searchDialog = useRef<HTMLDialogElement>(null);

  const handleOpenSearch = () => {
    if (typeof window !== "undefined") {
      const scrollPos = window.scrollY;
      searchDialog.current?.showModal();
      window.scrollTo({ top: scrollPos, behavior: "instant" });
    } else {
      searchDialog.current?.showModal();
    }
  };

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
        <HeroSection onOpenSearch={handleOpenSearch} />
        <TourOptionsSection />
        <WelcomeSection />
        <PackagesSection />
        <DestinationsSection />
      </main>
      <Footer />
      <SearchDialog
        dialogRef={searchDialog}
        onSelectJourney={() => searchDialog.current?.close()}
      />
    </>
  );
}
