"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer";
import { SearchDialog } from "@/components/landing-page/SearchDialog";
import { LucideIcon } from "@/components/ui/LucideIcon";

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "AIR TICKETING",
    description: "Domestic and international flight reservations at competitive prices.",
    icon: "Plane",
  },
  {
    id: 2,
    title: "PLAN YOUR TRIP",
    description: "Personalized travel planning according to your budget and preferences.",
    icon: "Map",
  },
  {
    id: 3,
    title: "ONE DAY TOURS",
    description: "Carefully designed day trips to popular attractions across Sri Lanka.",
    icon: "Calendar",
  },
  {
    id: 4,
    title: "VISA ASSISTANCE",
    description: "Guidance and support for visa applications and documentation.",
    icon: "FileText",
  },
  {
    id: 5,
    title: "ROUND TOURS",
    description: "Complete tour packages for individuals, families, and groups.",
    icon: "Globe",
  },
  {
    id: 6,
    title: "ACTIVITIES & DESTINATIONS",
    description: "Exciting activities and carefully selected destinations for unforgettable experiences.",
    icon: "Mountain",
  },
  {
    id: 7,
    title: "INBOUND & OUTBOUND TOURS",
    description: "Travel services for visitors coming into the country and travelers going abroad.",
    icon: "ArrowLeftRight",
  },
  {
    id: 8,
    title: "TRAVELLER'S CHEQUES",
    description: "Safe and convenient travel money services for your security.",
    icon: "CreditCard",
  },
  {
    id: 9,
    title: "AIRPORT TRANSFERS",
    description: "Comfortable and reliable airport pick-up and drop-off services.",
    icon: "Car",
  },
];

export default function ServicesPage() {
  const searchDialog = useRef<HTMLDialogElement>(null);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setServices(json.data);
        }
      } catch (err) {
        console.error("Failed to load services from API:", err);
      }
    }
    loadServices();
  }, []);


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
        .servicesPageWrapper {
          min-height: 100vh;
          background: #ffffff;
          color: #173832;
        }

        /* Top Header Bar */
        .servicesHeaderBar {
          background: #073e36;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Hero Banner with Golden Hour Colombo View */
        .servicesHeroBanner {
          position: relative;
          width: 100%;
          height: clamp(180px, 22vw, 280px);
          overflow: hidden;
          background: #0d211a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .servicesBannerImg {
          object-fit: cover;
          object-position: center 38%;
        }

        .bannerOverlayGradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(7, 30, 25, 0.45) 0%,
            rgba(7, 30, 25, 0.68) 100%
          );
          z-index: 2;
        }

        .servicesBannerContent {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 10px 24px;
        }

        .bannerTitle {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.7), 0 1px 4px rgba(0, 0, 0, 0.9);
        }

        .bannerDivider {
          width: 36px;
          height: 2.5px;
          background: #ed8a28;
          margin: 10px auto 12px;
          border-radius: 2px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        .bannerBreadcrumbs {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: clamp(12px, 1.2vw, 14px);
          letter-spacing: 0.5px;
        }

        .bannerBreadcrumbs .crumbLink {
          color: #ffffff;
          font-weight: 500;
          text-decoration: none;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
          transition: color 0.2s ease;
        }

        .bannerBreadcrumbs .crumbLink:hover {
          color: #ffb11b;
          text-decoration: underline;
        }

        .bannerBreadcrumbs .crumbSlash {
          color: rgba(255, 255, 255, 0.65);
          font-weight: 400;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
        }

        .bannerBreadcrumbs .crumbActive {
          color: #ed8a28;
          font-weight: 600;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        /* Main Services Content Area */
        .servicesMainSection {
          position: relative;
          padding: 65px 0 85px;
          background: #ffffff;
          overflow: hidden;
        }

        .servicesContainer {
          position: relative;
          z-index: 5;
          width: min(1280px, 92%);
          margin: 0 auto;
        }

        /* Section Heading */
        .servicesHeadingWrapper {
          text-align: center;
          max-width: 740px;
          margin: 0 auto 52px;
        }

        .servicesSectionTitle {
          margin: 0 0 14px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 3.4vw, 44px);
          font-weight: 700;
          letter-spacing: 1.5px;
          line-height: 1.2;
        }

        .titleWordOur {
          color: #073e36;
        }

        .titleWordServices {
          color: #ed8a28;
          margin-left: 10px;
        }

        .servicesSectionDesc {
          margin: 0;
          color: #556c75;
          font-size: clamp(14px, 1.2vw, 15.5px);
          line-height: 1.65;
          font-style: italic;
        }

        /* 3x3 Service Cards Grid */
        .servicesCardsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .serviceCard {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e7efec;
          border-radius: 20px;
          padding: 38px 28px 34px;
          box-shadow: 0 4px 18px rgba(7, 62, 54, 0.03);
          transition: border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease;
          position: relative;
        }

        .serviceCard:hover {
          border-color: #ed8a28;
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(237, 138, 40, 0.12), 0 4px 12px rgba(7, 62, 54, 0.04);
        }

        .serviceCardIconWrapper {
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          margin-bottom: 20px;
          color: #ed8a28;
          transition: transform 0.28s ease, color 0.28s ease;
        }

        .serviceCard:hover .serviceCardIconWrapper {
          transform: scale(1.1);
        }

        .serviceCardIcon {
          width: 42px;
          height: 42px;
        }

        .serviceCardTitle {
          margin: 0 0 12px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17.5px;
          font-weight: 700;
          letter-spacing: 0.6px;
          line-height: 1.35;
          text-transform: uppercase;
        }

        .serviceCardDesc {
          margin: 0;
          color: #556c75;
          font-size: 13.5px;
          line-height: 1.65;
        }

        /* Background Botanical Vector Accents */
        .decorPalmTreeLeft {
          position: absolute;
          left: -45px;
          top: 40px;
          width: 220px;
          height: 460px;
          color: #bad3cd;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        .decorLeafBranchRight {
          position: absolute;
          right: -30px;
          top: 35px;
          width: 200px;
          height: 440px;
          color: #bad3cd;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        .decorSigiriyaSilhouette {
          position: absolute;
          right: 10px;
          bottom: 40px;
          width: 240px;
          height: 190px;
          color: #c4ded8;
          opacity: 0.35;
          pointer-events: none;
          z-index: 1;
        }

        .decorDotGridLeft {
          position: absolute;
          left: 45px;
          top: 52%;
          transform: translateY(-50%);
          z-index: 2;
          pointer-events: none;
          opacity: 0.85;
        }

        .decorDotGridRight {
          position: absolute;
          right: 45px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          pointer-events: none;
          opacity: 0.85;
        }

        .decorWaveCornerLeft {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 280px;
          height: 140px;
          color: #ebf6f4;
          pointer-events: none;
          z-index: 0;
        }

        .decorWaveCornerRight {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 290px;
          height: 150px;
          color: #ebf6f4;
          pointer-events: none;
          z-index: 0;
        }

        /* Call To Action Banner */
        .servicesCtaSection {
          background: #073e36;
          color: #ffffff;
          padding: 60px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .servicesCtaInner {
          width: min(840px, 92%);
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .servicesCtaTag {
          display: inline-block;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #ffb11b;
          margin-bottom: 12px;
        }

        .servicesCtaTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 14px;
          line-height: 1.25;
        }

        .servicesCtaDesc {
          color: #cbe0da;
          font-size: 15px;
          line-height: 1.7;
          margin: 0 auto 30px;
          max-width: 660px;
        }

        .servicesCtaBtnRow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ctaOrangeBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 32px;
          min-height: 48px;
          border-radius: 9999px;
          background: #ed8a28;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
          box-shadow: 0 4px 16px rgba(237, 138, 40, 0.35);
        }

        .ctaOrangeBtn:hover {
          background: #d87618;
          transform: translateY(-2px);
        }

        .ctaOutlineBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          min-height: 48px;
          border-radius: 9999px;
          background: transparent;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .ctaOutlineBtn:hover {
          border-color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1060px) {
          .servicesCardsGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 22px;
          }
          .decorPalmTreeLeft, .decorLeafBranchRight, .decorSigiriyaSilhouette,
          .decorDotGridLeft, .decorDotGridRight {
            display: none;
          }
        }

        @media (max-width: 680px) {
          .servicesMainSection {
            padding: 45px 0 65px;
          }
          .servicesHeadingWrapper {
            margin-bottom: 36px;
          }
          .servicesCardsGrid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
            gap: 16px;
          }
          .serviceCard {
            padding: 28px 22px 26px;
          }
          .servicesCtaSection {
            padding: 45px 0;
          }
        }
      `}</style>

      <div className="servicesPageWrapper">
        {/* Header Navigation */}
        <div className="servicesHeaderBar">
          <Navbar
            activePage="services"
            onOpenSearch={handleOpenSearch}
          />
        </div>

        {/* Top Scenic Colombo Lake & Buddhist Temple Banner */}
        <div className="servicesHeroBanner">
          <Image
            src="/images/services-hero-banner.jpg"
            alt="Scenic Colombo Beira Lake, Buddhist Temple & Skyline in Sri Lanka"
            fill
            priority
            sizes="100vw"
            className="servicesBannerImg"
          />
          <div className="bannerOverlayGradient" aria-hidden="true" />

          <div className="servicesBannerContent">
            <h1 className="bannerTitle">Services</h1>
            <div className="bannerDivider" aria-hidden="true" />
            <nav className="bannerBreadcrumbs" aria-label="Breadcrumb">
              <Link href="/" className="crumbLink">Home</Link>
              <span className="crumbSlash" aria-hidden="true">/</span>
              <span className="crumbActive">Services</span>
            </nav>
          </div>
        </div>

        {/* Main Services Section */}
        <main className="servicesMainSection">
          {/* Subtle Decorative Botanical SVGs on Left & Right */}
          <svg
            className="decorPalmTreeLeft"
            viewBox="0 0 200 360"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M70 360C62 260 58 145 88 65"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M87 69C45 22 14 33 2 60c36-11 55-1 85 9M87 69C32 54 6 75 2 105c33-24 55-27 85-36M87 69C30 83 15 113 22 146c13-39 34-59 65-77M87 69c6-48 33-59 63-49-33 10-48 24-63 49M87 69c44-40 77-24 94 6-39-12-62-15-94-6M87 69c53-8 79 21 85 52-31-32-50-44-85-52M87 69c38 18 48 49 41 83-13-37-23-59-41-83Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>

          <svg
            className="decorLeafBranchRight"
            viewBox="0 0 180 360"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M25 350C42 245 106 150 144 14c52 57 48 138 8 200-33 47-72 65-113 71M144 14c-57 34-97 83-100 146-3 59 18 95 2 130M130 60l37 62M113 109l-61-7M96 152l64 22M78 194l-38-16M61 233l68 9"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          {/* Sigiriya Rock Silhouette Sketch on the right */}
          <svg
            className="decorSigiriyaSilhouette"
            viewBox="0 0 240 160"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 140c10-2 25-10 40-12 18-3 30-18 45-25 15-7 25-25 40-28 12-3 28-2 40 4 15 8 25 25 35 38 10 12 15 20 20 23"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
            <path
              d="M60 128c15-30 40-45 70-45s55 12 70 45"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>

          {/* Left Orange Dot Grid (3x3) */}
          <svg
            className="decorDotGridLeft"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <circle
                  key={`dot-left-${r}-${c}`}
                  cx={c * 14 + 6}
                  cy={r * 14 + 6}
                  r="2"
                  fill="#ed8a28"
                />
              ))
            )}
          </svg>

          {/* Right Orange Dot Grid (3x3) */}
          <svg
            className="decorDotGridRight"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <circle
                  key={`dot-right-${r}-${c}`}
                  cx={c * 14 + 6}
                  cy={r * 14 + 6}
                  r="2"
                  fill="#ed8a28"
                />
              ))
            )}
          </svg>

          {/* Soft Bottom Wave Accents */}
          <svg
            className="decorWaveCornerLeft"
            viewBox="0 0 280 140"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 140V60c70 22 140-10 210 18 35 14 55 40 70 62H0z" />
          </svg>

          <svg
            className="decorWaveCornerRight"
            viewBox="0 0 290 150"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M290 150V40c-80 18-150 60-200 48-45-10-75-40-90-88v150h290z" />
          </svg>

          <div className="servicesContainer">
            {/* Header: OUR SERVICES */}
            <div className="servicesHeadingWrapper">
              <h2 className="servicesSectionTitle">
                <span className="titleWordOur">OUR</span>
                <span className="titleWordServices">SERVICES</span>
              </h2>
              <p className="servicesSectionDesc">
                We offer a variety of travel-related services designed to make your journey smooth and memorable.
              </p>
            </div>

            {/* 3x3 Service Cards Grid */}
            <div className="servicesCardsGrid">
              {services.map((service) => (
                <div key={service.id} className="serviceCard">
                  <div className="serviceCardIconWrapper">
                    <LucideIcon name={service.icon} className="serviceCardIcon" size={38} strokeWidth={1.8} />
                  </div>
                  <h3 className="serviceCardTitle">{service.title}</h3>
                  <p className="serviceCardDesc">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Customized Travel Support Call To Action */}
        <section className="servicesCtaSection" aria-label="Customized Travel Support">
          <div className="servicesCtaInner">
            <span className="servicesCtaTag">TAILORED SOLUTIONS</span>
            <h2 className="servicesCtaTitle">Need a Customized Travel Service?</h2>
            <p className="servicesCtaDesc">
              From corporate retreats and private chauffeur bookings to specialized tour itineraries,
              our Sri Lankan travel specialists are available 24/7 to turn your travel vision into reality.
            </p>
            <div className="servicesCtaBtnRow">
              <Link className="ctaOrangeBtn" href="/#contact">
                Contact Our Specialists →
              </Link>
              <Link className="ctaOutlineBtn" href="/#packages">
                Explore Tour Packages
              </Link>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />

        {/* Global Search Dialog */}
        <SearchDialog
          dialogRef={searchDialog}
          onSelectJourney={() => searchDialog.current?.close()}
        />
      </div>
    </>
  );
}
