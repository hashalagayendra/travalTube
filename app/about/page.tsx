"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer";
import { SearchDialog } from "@/components/landing-page/SearchDialog";

export default function AboutPage() {
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
        .aboutPageWrapper {
          min-height: 100vh;
          background: #ffffff;
          color: #173832;
        }

        /* Top Header Bar */
        .aboutHeaderBar {
          background: #073e36;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Safari Golden-Hour Hero Banner */
        .aboutHeroBanner {
          position: relative;
          width: 100%;
          height: clamp(180px, 20vw, 270px);
          overflow: hidden;
          background: #0d211a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .aboutBannerImg {
          object-fit: cover;
          object-position: center;
        }

        .bannerContentOverlay {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 10px 24px;
        }

        .bannerMainTitle {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.6px;
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.7), 0 1px 4px rgba(0, 0, 0, 0.9);
        }

        .bannerTitleAccent {
          color: #ed8a28;
        }

        .bannerDividerLine {
          width: 36px;
          height: 2.5px;
          background: #e8a838;
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

        /* Main Section Content */
        .aboutMainContent {
          position: relative;
          padding: 70px 0 80px;
          background: #ffffff;
          overflow: hidden;
        }

        .aboutContainer {
          position: relative;
          z-index: 2;
          width: min(1320px, 92%);
          margin: 0 auto;
        }

        /* Two-Column Grid */
        .aboutTwoColGrid {
          display: grid;
          grid-template-columns: 1fr 1.08fr;
          align-items: center;
          gap: clamp(40px, 5.5vw, 75px);
        }

        /* Left Column */
        .aboutEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #ed8a28;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .aboutEyebrowLine {
          display: inline-block;
          width: 44px;
          height: 2px;
          background: #073e36;
          border-radius: 1px;
        }

        .aboutTitle {
          margin: 0 0 20px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 3.2vw, 46px);
          font-weight: 700;
          line-height: 1.16;
          letter-spacing: -0.6px;
        }

        .aboutTitle .titleAccent {
          color: #ed8a28;
          display: inline-block;
        }

        .aboutParagraph {
          margin: 0 0 16px;
          color: #556c75;
          font-size: 14.5px;
          line-height: 1.75;
        }

        .aboutParagraph strong {
          color: #1e3a34;
          font-weight: 600;
        }

        .aboutBtnRow {
          margin-top: 26px;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .discoverMoreBtn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 13px 30px;
          min-height: 46px;
          border-radius: 9999px;
          background: #003f3b;
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.4px;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .discoverMoreBtn:hover {
          background: #096359;
          transform: translateY(-2px);
        }

        .discoverMoreBtn .btnArrow {
          font-size: 17px;
          transition: transform 0.25s ease;
        }

        .discoverMoreBtn:hover .btnArrow {
          transform: translateX(4px);
        }

        .contactOutlineBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 26px;
          min-height: 46px;
          border-radius: 9999px;
          background: transparent;
          color: #073e36;
          font-size: 13.5px;
          font-weight: 700;
          border: 1.5px solid #bad5ce;
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .contactOutlineBtn:hover {
          border-color: #073e36;
          background: #f4faf8;
        }

        /* Right Column Collage */
        .aboutCollage {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .collageTopWide {
          position: relative;
          width: 100%;
          aspect-ratio: 2.85 / 1;
          border-radius: 16px;
          overflow: hidden;
          background: #eef3f1;
        }

        .collageBottomPair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .collageBottomItem {
          position: relative;
          width: 100%;
          aspect-ratio: 1.58 / 1;
          border-radius: 16px;
          overflow: hidden;
          background: #eef3f1;
        }

        .collagePhoto {
          object-fit: cover;
          object-position: center;
          transition: transform 0.45s ease;
        }

        .collageTopWide:hover .collagePhoto,
        .collageBottomItem:hover .collagePhoto {
          transform: scale(1.04);
        }

        /* Three Feature Cards Row */
        .aboutFeatureCardsRow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-top: 52px;
        }

        .featureCard {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 22px 24px;
          background: #ffffff;
          border: 1px solid #e7efec;
          border-radius: 18px;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }

        .featureCard:hover {
          border-color: #b5d7cf;
          transform: translateY(-3px);
        }

        .featureIconBadge {
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .badgeExperiences {
          background: #e3f2ef;
          color: #073e36;
        }

        .badgeExpertise {
          background: #fef0e7;
          color: #ed8a28;
        }

        .badgePersonalized {
          background: #e1f2f6;
          color: #085c6c;
        }

        .featureCardContent {
          flex: 1;
        }

        .featureCardTitle {
          margin: 0 0 6px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 16.5px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }

        .featureCardDesc {
          margin: 0;
          color: #556c75;
          font-size: 13px;
          line-height: 1.55;
        }

        /* Decorative Botanical Accents */
        .decorPalmLeft {
          position: absolute;
          left: -40px;
          top: 35px;
          width: 180px;
          height: 380px;
          color: #bad3cd;
          opacity: 0.45;
          pointer-events: none;
          z-index: 1;
        }

        .decorLeafRight {
          position: absolute;
          right: -25px;
          top: 25px;
          width: 160px;
          height: 360px;
          color: #bad3cd;
          opacity: 0.45;
          pointer-events: none;
          z-index: 1;
        }

        .decorDotGrid {
          position: absolute;
          right: 24px;
          top: 42%;
          transform: translateY(-20%);
          z-index: 1;
          pointer-events: none;
          opacity: 0.85;
        }

        .decorWaveLeft {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 240px;
          height: 120px;
          color: #ebf6f4;
          pointer-events: none;
          z-index: 0;
        }

        .decorWaveRight {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 260px;
          height: 130px;
          color: #ebf6f4;
          pointer-events: none;
          z-index: 0;
        }

        /* Mission & Vision Section */
        .storySection {
          background: #ffffff;
          padding: 50px 0 80px;
          border-top: 1px solid #eef4f2;
        }

        .storyGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .storyCard {
          padding: 34px 38px;
          border-radius: 20px;
          border: 1px solid #e5edea;
          background: #ffffff;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .storyCard:hover {
          border-color: #bad5ce;
          transform: translateY(-2px);
        }

        .storyCardTag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ed8a28;
          margin-bottom: 10px;
        }

        .storyCardTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 24px;
          font-weight: 700;
          color: #073e36;
          margin: 0 0 14px;
        }

        .storyCardText {
          color: #556c75;
          font-size: 14.5px;
          line-height: 1.75;
          margin: 0;
        }

        /* Stats Counter Bar */
        .statsBarSection {
          background: #073e36;
          color: #ffffff;
          padding: 44px 0;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          text-align: center;
        }

        .statItemNumber {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(32px, 3.5vw, 46px);
          font-weight: 700;
          color: #ffb321;
          margin: 0 0 6px;
        }

        .statItemLabel {
          font-size: 13px;
          color: #cbe0da;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-weight: 600;
        }

        /* CTA Section */
        .aboutCtaSection {
          background: #ffffff;
          padding: 70px 0 85px;
          text-align: center;
        }

        .aboutCtaInner {
          max-width: 780px;
          margin: 0 auto;
        }

        .aboutCtaTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 700;
          color: #073e36;
          margin: 0 0 16px;
        }

        .aboutCtaDesc {
          color: #556c75;
          font-size: 15px;
          line-height: 1.75;
          margin: 0 0 32px;
        }

        .aboutCtaBtns {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .ctaPrimaryBtn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 34px;
          min-height: 48px;
          border-radius: 9999px;
          background: #003f3b;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .ctaPrimaryBtn:hover {
          background: #086157;
          transform: translateY(-2px);
        }

        .ctaSecondaryBtn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 13px 30px;
          min-height: 48px;
          border-radius: 9999px;
          background: transparent;
          color: #073e36;
          font-size: 14px;
          font-weight: 700;
          border: 1.5px solid #073e36;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .ctaSecondaryBtn:hover {
          background: #f4faf8;
          transform: translateY(-2px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .aboutTwoColGrid {
            gap: 40px;
          }
          .aboutFeatureCardsRow {
            gap: 16px;
          }
          .featureCard {
            padding: 18px 20px;
            gap: 14px;
          }
          .decorPalmLeft, .decorLeafRight, .decorDotGrid {
            display: none;
          }
          .statsGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 900px) {
          .aboutMainContent {
            padding: 45px 0 55px;
          }
          .aboutTwoColGrid {
            grid-template-columns: 1fr;
            max-width: 640px;
            margin: 0 auto;
          }
          .aboutFeatureCardsRow {
            grid-template-columns: 1fr;
            max-width: 640px;
            margin: 36px auto 0;
            gap: 14px;
          }
          .storyGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .statsGrid {
            grid-template-columns: 1fr 1fr;
            gap: 22px;
          }
          .storyCard {
            padding: 24px;
          }
        }
      `}</style>

      <div className="aboutPageWrapper">
        {/* Header Navigation */}
        <div className="aboutHeaderBar">
          <Navbar
            activePage="about"
            onOpenSearch={handleOpenSearch}
          />
        </div>

        {/* Top Safari Golden Hour Banner with Clean Image & HTML/CSS Text Overlay */}
        <div className="aboutHeroBanner">
          <Image
            src="/images/about-top-banner-clean.jpg"
            alt="Scenic Safari Golden Hour Banner with Wildlife in Sri Lanka"
            fill
            priority
            sizes="100vw"
            className="aboutBannerImg"
          />

          <div className="bannerContentOverlay">
            <h1 className="bannerMainTitle">
              About <span className="bannerTitleAccent">Us</span>
            </h1>
            <div className="bannerDividerLine" aria-hidden="true" />
            <nav className="bannerBreadcrumbs" aria-label="Breadcrumb">
              <Link href="/" className="crumbLink">Home</Link>
              <span className="crumbSlash" aria-hidden="true">/</span>
              <span className="crumbActive">About Us</span>
            </nav>
          </div>
        </div>

        {/* Main Section Content */}
        <main className="aboutMainContent">
          {/* Subtle Decorative Botanical SVGs */}
          <svg
            className="decorPalmLeft"
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
            className="decorLeafRight"
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

          {/* Orange Dot Grid Accent */}
          <svg
            className="decorDotGrid"
            width="56"
            height="96"
            viewBox="0 0 56 96"
            fill="none"
            aria-hidden="true"
          >
            {[...Array(6)].map((_, row) =>
              [...Array(3)].map((_, col) => (
                <circle
                  key={`dot-${row}-${col}`}
                  cx={col * 19 + 6}
                  cy={row * 16 + 6}
                  r="2.5"
                  fill="#ea8a3a"
                />
              ))
            )}
          </svg>

          {/* Soft Bottom Waves */}
          <svg
            className="decorWaveLeft"
            viewBox="0 0 240 120"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 120V50c60 20 120-10 180 15 30 12 50 35 60 55H0z" />
          </svg>

          <svg
            className="decorWaveRight"
            viewBox="0 0 260 130"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M260 130V35c-70 15-130 50-180 40-40-8-65-35-80-75v130h260z" />
          </svg>

          <div className="aboutContainer">
            {/* Top Row: Two-Column Section */}
            <div className="aboutTwoColGrid">
              {/* Left Column: Text & CTA */}
              <div className="aboutCopyColumn">
                <div className="aboutEyebrow">
                  <span>WELCOME TO</span>
                  <span className="aboutEyebrowLine" aria-hidden="true" />
                </div>

                <h2 className="aboutTitle">
                  Travel Tube Lanka <br />
                  <span className="titleAccent">(Pvt) Ltd</span>
                </h2>

                <p className="aboutParagraph">
                  Welcome to <strong>TRAVEL TUBE LANKA (PVT) LTD</strong>, your trusted
                  partner for all travel and tourism services. We are committed to
                  making your travel experience smooth, comfortable, and memorable.
                </p>

                <p className="aboutParagraph">
                  Our company provides a wide range of travel solutions for both
                  local and international travelers. With a professional and friendly
                  team, we help our clients plan their journeys with confidence and
                  convenience.
                </p>

                <div className="aboutBtnRow">
                  <Link className="discoverMoreBtn" href="/#packages">
                    Discover More <span className="btnArrow">→</span>
                  </Link>
                  <Link className="contactOutlineBtn" href="/#contact">
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Right Column: 3-Photo Collage */}
              <div className="aboutCollage">
                <div className="collageTopWide">
                  <Image
                    src="/images/about-collage-leopard-hd.jpg"
                    alt="Sri Lankan leopard resting on a tree branch"
                    fill
                    sizes="(max-width: 900px) 92vw, 46vw"
                    className="collagePhoto"
                  />
                </div>
                <div className="collageBottomPair">
                  <div className="collageBottomItem">
                    <Image
                      src="/images/about-collage-turtle-hd.jpg"
                      alt="Traveler watching a sea turtle at Sri Lankan beach"
                      fill
                      sizes="(max-width: 900px) 46vw, 23vw"
                      className="collagePhoto"
                    />
                  </div>
                  <div className="collageBottomItem">
                    <Image
                      src="/images/about-collage-stupa-hd.jpg"
                      alt="Ruwanwelisaya ancient Buddhist stupa in Anuradhapura"
                      fill
                      sizes="(max-width: 900px) 46vw, 23vw"
                      className="collagePhoto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: 3 Feature Cards */}
            <div className="aboutFeatureCardsRow">
              {/* Feature Card 1 */}
              <div className="featureCard">
                <div className="featureIconBadge badgeExperiences" aria-hidden="true">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8.5" r="5.5" />
                    <polygon
                      points="12 6.2 13.05 8.2 14.8 8.4 13.5 9.7 13.8 11.5 12 10.4 10.2 11.5 10.5 9.7 9.2 8.4 10.95 8.2 12 6.2"
                      fill="currentColor"
                      stroke="none"
                    />
                    <path d="m8.2 13.8-2.2 7.2 6-3 6 3-2.2-7.2" />
                  </svg>
                </div>
                <div className="featureCardContent">
                  <h3 className="featureCardTitle">Trusted Experiences</h3>
                  <p className="featureCardDesc">
                    Years of experience delivering reliable and memorable travel
                    experiences across Sri Lanka.
                  </p>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="featureCard">
                <div className="featureIconBadge badgeExpertise" aria-hidden="true">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 5.8-8 12-8 12s-8-6.2-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3.2" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div className="featureCardContent">
                  <h3 className="featureCardTitle">Local Expertise</h3>
                  <p className="featureCardDesc">
                    In-depth knowledge of Sri Lanka’s hidden gems, culture, and
                    unique travel experiences.
                  </p>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="featureCard">
                <div className="featureIconBadge badgePersonalized" aria-hidden="true">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <div className="featureCardContent">
                  <h3 className="featureCardTitle">Personalized Service</h3>
                  <p className="featureCardDesc">
                    A professional and friendly team dedicated to creating
                    journeys that match your interests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Stats Counter Bar */}
        <section className="statsBarSection" aria-label="Key Achievements">
          <div className="aboutContainer">
            <div className="statsGrid">
              <div className="statItem">
                <div className="statItemNumber">10+</div>
                <div className="statItemLabel">Years of Experience</div>
              </div>
              <div className="statItem">
                <div className="statItemNumber">5,000+</div>
                <div className="statItemLabel">Happy Travelers</div>
              </div>
              <div className="statItem">
                <div className="statItemNumber">100%</div>
                <div className="statItemLabel">Tailor-Made Tours</div>
              </div>
              <div className="statItem">
                <div className="statItemNumber">24/7</div>
                <div className="statItemLabel">On-Trip Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="storySection" aria-label="Mission and Vision">
          <div className="aboutContainer">
            <div className="storyGrid">
              <div className="storyCard">
                <span className="storyCardTag">Our Purpose</span>
                <h2 className="storyCardTitle">Our Mission</h2>
                <p className="storyCardText">
                  To craft inspiring, seamless, and deeply authentic travel experiences
                  across Sri Lanka. We believe every journey should nurture genuine
                  connections between travelers, local communities, and the timeless
                  heritage of the island.
                </p>
              </div>

              <div className="storyCard">
                <span className="storyCardTag">Our Future</span>
                <h2 className="storyCardTitle">Our Vision</h2>
                <p className="storyCardText">
                  To be recognized as Sri Lanka’s most trusted and sustainable inbound
                  tour operator, setting the benchmark for customized hospitality,
                  environmental conservation, and memorable cultural discovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="aboutCtaSection" aria-label="Start Planning">
          <div className="aboutContainer">
            <div className="aboutCtaInner">
              <h2 className="aboutCtaTitle">Ready to Plan Your Sri Lankan Journey?</h2>
              <p className="aboutCtaDesc">
                Whether you want to witness leopards in Yala, relax on golden beaches, or
                explore ancient kingdoms, our friendly local specialists are here to design
                your perfect itinerary.
              </p>
              <div className="aboutCtaBtns">
                <Link className="ctaPrimaryBtn" href="/#contact">
                  Plan Your Tour →
                </Link>
                <Link className="ctaSecondaryBtn" href="/#packages">
                  View Tour Packages
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />

        {/* Search Dialog */}
        <SearchDialog
          dialogRef={searchDialog}
          onSelectJourney={() => searchDialog.current?.close()}
        />
      </div>
    </>
  );
}
