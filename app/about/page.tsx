"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer";
import { SearchDialog } from "@/components/landing-page/SearchDialog";

const pillarIcons = [
  {
    badgeClass: "badgeService",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="m15.477 12.89 1.523 9.11-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    badgeClass: "badgePackages",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    badgeClass: "badgePlanning",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    badgeClass: "badgeSupport",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  const searchDialog = useRef<HTMLDialogElement>(null);

  const [aboutData, setAboutData] = useState({
    eyebrow: "WELCOME TO",
    titleMain: "Travel Tube Lanka",
    titleAccent: "(Pvt) Ltd",
    paragraph1:
      "Welcome to TRAVEL TUBE LANKA (PVT) LTD, your trusted partner for all travel and tourism services. We are committed to making your travel experience smooth, comfortable, and memorable.",
    paragraph2:
      "Our company provides a wide range of travel solutions for both local and international travelers. With a professional and friendly team, we help our clients plan their journeys with confidence and convenience.",
    topImage: "/images/about-collage-leopard-hd.jpg",
    bottomLeftImage: "/images/about-collage-turtle-hd.jpg",
    bottomRightImage: "/images/about-collage-stupa-hd.jpg",
  });

  const [whyChoosePillars, setWhyChoosePillars] = useState([
    {
      id: 1,
      title: "Professional Service",
      description:
        "Professional and friendly service to ensure your comfort throughout the journey.",
    },
    {
      id: 2,
      title: "Competitive Packages",
      description:
        "Competitive travel packages tailored to your budget without compromising quality.",
    },
    {
      id: 3,
      title: "Personalized Planning",
      description:
        "Tailor-made itineraries designed to suit your personal schedule, budget, and travel style.",
    },
    {
      id: 4,
      title: "24/7 Dedicated Support",
      description:
        "Round-the-clock local support to give you complete peace of mind while exploring Sri Lanka.",
    },
  ]);

  useEffect(() => {
    async function loadAbout() {
      try {
        // 1. Fetch Welcome section
        const res = await fetch("/api/about");
        const json = await res.json();
        if (json.success && json.data) {
          setAboutData((prev) => ({
            ...prev,
            eyebrow: json.data.eyebrow || prev.eyebrow,
            titleMain: json.data.titleMain || prev.titleMain,
            titleAccent: json.data.titleAccent || prev.titleAccent,
            paragraph1: json.data.paragraph1 || prev.paragraph1,
            paragraph2: json.data.paragraph2 || prev.paragraph2,
            topImage: json.data.topImage || prev.topImage,
            bottomLeftImage: json.data.bottomLeftImage || prev.bottomLeftImage,
            bottomRightImage: json.data.bottomRightImage || prev.bottomRightImage,
          }));
        }

        // 2. Fetch Why Choose Us highlights
        const resWhy = await fetch("/api/about/why-choose");
        const jsonWhy = await resWhy.json();
        if (jsonWhy.success && Array.isArray(jsonWhy.data) && jsonWhy.data.length > 0) {
          setWhyChoosePillars(jsonWhy.data);
        }
      } catch (err) {
        console.error("Could not load about data:", err);
      }
    }
    loadAbout();
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

        /* Why Choose Us Section */
        .whyChooseUsSection {
          background: #fbfaf6;
          padding: 66px 0 78px;
        }

        .whyChooseUsHeader {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 42px;
        }

        .whyChooseUsEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #ed8a28;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.8px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .whyChooseUsEyebrow .eyebrowLine {
          display: inline-block;
          width: 25px;
          height: 1px;
          background: #ed8a28;
        }

        .whyChooseUsTitle {
          margin: 0 0 8px;
          color: #092a2a;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 3.6vw, 48px);
          font-weight: 700;
          letter-spacing: -1px;
          line-height: 1.12;
        }

        .whyChooseUsSubtitle {
          margin: 0;
          color: #667172;
          font-size: 15px;
          line-height: 1.65;
        }

        .whyChooseCardsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .whyChooseCard {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: 255px;
          padding: 26px 24px 28px;
          background: #ffffff;
          border: 1px solid #f0eee9;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(31, 46, 36, 0.025);
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }

        .whyChooseCard:hover {
          border-color: #dce8df;
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(7, 62, 54, 0.08);
        }

        .whyChooseIconBadge {
          display: grid;
          place-items: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-bottom: 23px;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .whyChooseCard:hover .whyChooseIconBadge {
          transform: scale(1.06);
        }

        .badgeService {
          background: #f1f5f0;
          color: #073e36;
        }

        .badgePackages {
          background: #f1f5f0;
          color: #073e36;
        }

        .badgePlanning {
          background: #f1f5f0;
          color: #073e36;
        }

        .badgeSupport {
          background: #f1f5f0;
          color: #073e36;
        }

        .whyChooseCardTitle {
          margin: 0 0 9px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: -0.2px;
          line-height: 1.25;
        }

        .whyChooseCardDesc {
          margin: 0;
          color: #687174;
          font-size: 13.5px;
          line-height: 1.65;
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
          background: #edf3e8;
          padding: 70px 0 86px;
        }

        .storyHeader {
          max-width: 760px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .storyEyebrow {
          display: block;
          color: #ed8a28;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.8px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .storyHeading {
          margin: 0 0 10px;
          color: #092a2a;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 3.6vw, 48px);
          line-height: 1.12;
          letter-spacing: -1px;
        }

        .storySubtitle {
          margin: 0;
          color: #667172;
          font-size: 15px;
          line-height: 1.65;
        }

        .storyGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .storyCard {
          padding: 28px 30px 30px;
          border-radius: 14px;
          border: 1px solid #eaf0e7;
          background: #ffffff;
          box-shadow: 0 7px 22px rgba(31, 46, 36, 0.025);
        }

        .storyCardTop {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 20px;
        }

        .storyIconBadge {
          display: grid;
          place-items: center;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          color: #073e36;
          background: #fdf3e5;
          flex: none;
        }

        .storyCardTag {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.4px;
          text-transform: uppercase;
          color: #ed8a28;
          margin-bottom: 6px;
        }

        .storyCardTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 26px;
          font-weight: 700;
          color: #073e36;
          margin: 0;
        }

        .storyCardText {
          color: #687174;
          font-size: 14.5px;
          line-height: 1.7;
          margin: 0;
        }

        /* Stats Counter Bar */
        .statsBarSection {
          background: #004f40;
          color: #ffffff;
          padding: 46px 0;
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          text-align: center;
        }

        .statItem {
          padding: 0 18px;
        }

        .statItem + .statItem {
          border-left: 1px solid rgba(255, 255, 255, 0.26);
        }

        .statItemNumber {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 3.8vw, 50px);
          font-weight: 700;
          color: #f7b548;
          margin: 0 0 5px;
        }

        .statItemLabel {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
          color: #ffffff;
          font-weight: 700;
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
          .decorPalmLeft, .decorLeafRight, .decorDotGrid {
            display: none;
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
          .storyGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 800px) {
          .whyChooseCardsGrid,
          .statsGrid {
            grid-template-columns: repeat(2, 1fr);
          }
          .statsGrid {
            row-gap: 28px;
          }
          .statItem:nth-child(3) {
            border-left: 0;
          }
          .whyChooseUsSection,
          .storySection {
            padding-top: 56px;
            padding-bottom: 64px;
          }
        }

        @media (max-width: 640px) {
          .whyChooseCardsGrid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .whyChooseCard {
            min-height: 0;
            padding: 24px;
          }
        }

        @media (max-width: 600px) {
          .statsGrid {
            grid-template-columns: 1fr 1fr;
            column-gap: 0;
            row-gap: 24px;
          }
          .statItem {
            padding: 0 8px;
          }
          .statItemNumber {
            font-size: 32px;
          }
          .statItemLabel {
            font-size: 12px;
          }
          .storyCard {
            padding: 24px;
          }
          .storyCardTop {
            gap: 14px;
          }
          .storyIconBadge {
            width: 58px;
            height: 58px;
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
                  <span>{aboutData.eyebrow}</span>
                  <span className="aboutEyebrowLine" aria-hidden="true" />
                </div>

                <h2 className="aboutTitle">
                  {aboutData.titleMain} <br />
                  <span className="titleAccent">{aboutData.titleAccent}</span>
                </h2>

                <p className="aboutParagraph">{aboutData.paragraph1}</p>

                <p className="aboutParagraph">{aboutData.paragraph2}</p>

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
                    src={aboutData.topImage}
                    alt="Sri Lankan leopard resting on a tree branch"
                    fill
                    unoptimized
                    sizes="(max-width: 900px) 92vw, 46vw"
                    className="collagePhoto"
                  />
                </div>
                <div className="collageBottomPair">
                  <div className="collageBottomItem">
                    <Image
                      src={aboutData.bottomLeftImage}
                      alt="Traveler watching a sea turtle at Sri Lankan beach"
                      fill
                      unoptimized
                      sizes="(max-width: 900px) 46vw, 23vw"
                      className="collagePhoto"
                    />
                  </div>
                  <div className="collageBottomItem">
                    <Image
                      src={aboutData.bottomRightImage}
                      alt="Ruwanwelisaya ancient Buddhist stupa in Anuradhapura"
                      fill
                      unoptimized
                      sizes="(max-width: 900px) 46vw, 23vw"
                      className="collagePhoto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Why Choose Us Section */}
        <section className="whyChooseUsSection" aria-label="Why Choose Us">
          <div className="aboutContainer">
            <div className="whyChooseUsHeader">
              <div className="whyChooseUsEyebrow">
                <span className="eyebrowLine" aria-hidden="true" />
                <span>WHY CHOOSE US</span>
                <span className="eyebrowLine" aria-hidden="true" />
              </div>
              <h2 className="whyChooseUsTitle">Why Choose Us</h2>
              <p className="whyChooseUsSubtitle">
                Experience the best of Sri Lanka with our dedicated team and premium travel services.
              </p>
            </div>

            <div className="whyChooseCardsGrid">
              {whyChoosePillars.map((pillar, idx) => {
                const meta = pillarIcons[idx % pillarIcons.length];
                return (
                  <div key={pillar.id || idx} className="whyChooseCard">
                    <div className={`whyChooseIconBadge ${meta.badgeClass}`} aria-hidden="true">
                      {meta.icon}
                    </div>
                    <h3 className="whyChooseCardTitle">{pillar.title}</h3>
                    <p className="whyChooseCardDesc">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

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
            <div className="storyHeader">
              <span className="storyEyebrow">Our Purpose</span>
              <h2 className="storyHeading">Our Future</h2>
              <p className="storySubtitle">
                Guided by a deeper purpose, we look ahead to a more sustainable and inspiring future for travel in Sri Lanka.
              </p>
            </div>
            <div className="storyGrid">
              <div className="storyCard">
                <div className="storyCardTop">
                  <span className="storyIconBadge" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 28V17M16 21c-7 0-11-4-11-11 7 0 11 4 11 11ZM16 17c0-7 4-11 11-11 0 7-4 11-11 11Z" />
                    </svg>
                  </span>
                  <div>
                    <span className="storyCardTag">Our Mission</span>
                    <h3 className="storyCardTitle">Our Mission</h3>
                  </div>
                </div>
                <p className="storyCardText">
                  To craft inspiring, seamless, and deeply authentic travel experiences
                  across Sri Lanka. We believe every journey should nurture genuine
                  connections between travelers, local communities, and the timeless
                  heritage of the island.
                </p>
              </div>

              <div className="storyCard">
                <div className="storyCardTop">
                  <span className="storyIconBadge" aria-hidden="true">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="16" cy="18" r="12" /><circle cx="16" cy="18" r="6" /><circle cx="16" cy="18" r="1.5" fill="currentColor" stroke="none" /><path d="m16 18 12-12m-4 0h4v4" />
                    </svg>
                  </span>
                  <div>
                    <span className="storyCardTag">Our Vision</span>
                    <h3 className="storyCardTitle">Our Vision</h3>
                  </div>
                </div>
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
