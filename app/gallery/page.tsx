"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer";
import { SearchDialog } from "@/components/landing-page/SearchDialog";

type GalleryCategory = "all" | "nature" | "wildlife" | "culture" | "beaches" | "adventure";

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: "nature" | "wildlife" | "culture" | "beaches" | "adventure";
  categoryLabel: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Golden Hour Coastal Sunset",
    location: "Mirissa, Southern Province",
    category: "beaches",
    categoryLabel: "Beaches",
    image: "/images/dest-mirissa.jpg",
    description: "Leaning coconut palms over golden sands as tropical ocean waves break against the sunset shore.",
  },
  {
    id: "gal-2",
    title: "Cultural Triangle Expeditions",
    location: "Habarana & Sigiriya",
    category: "adventure",
    categoryLabel: "Adventure",
    image: "/images/plan-trip.jpg",
    description: "Cheerful group of travelers enjoying a genuine Sri Lankan cultural village experience under traditional thatch.",
  },
  {
    id: "gal-3",
    title: "Sigiriya Ancient Citadel",
    location: "Sigiriya, Matale District",
    category: "culture",
    categoryLabel: "Culture",
    image: "/images/sigiriya.jpg",
    description: "The magnificent 5th-century royal rock fortress rising above serene water lily ponds and manicured royal gardens.",
  },
  {
    id: "gal-4",
    title: "4x4 Wildlife Safari Adventure",
    location: "Yala National Park",
    category: "wildlife",
    categoryLabel: "Wildlife",
    image: "/images/package-3.jpg",
    description: "Travelers in an open-air safari jeep tracking wild leopards, herds of Asian elephants, and exotic tropical birds.",
  },
  {
    id: "gal-5",
    title: "Madu River Wetland Boat Safari",
    location: "Balapitiya, Southern Province",
    category: "nature",
    categoryLabel: "Nature",
    image: "/images/we-3.jpg",
    description: "Gliding through peaceful mangrove tunnels and tranquil water lily lagoons on an authentic wooden boat ride.",
  },
  {
    id: "gal-6",
    title: "Wild Sea Turtle Encounter",
    location: "Hikkaduwa Beach",
    category: "beaches",
    categoryLabel: "Beaches",
    image: "/images/about-collage-turtle-hd.jpg",
    description: "Hand-feeding giant wild sea turtles in the shallow, crystal-clear turquoise surf along Hikkaduwa's coral reef.",
  },
  {
    id: "gal-7",
    title: "Rock Fortress Expedition Group",
    location: "Sigiriya Rock Base",
    category: "adventure",
    categoryLabel: "Adventure",
    image: "/images/package-18.jpg",
    description: "Friends celebrating an unforgettable climb to King Kashyapa's 5th-century palace above the clouds.",
  },
  {
    id: "gal-8",
    title: "Ruwanwelisaya Sacred Stupa",
    location: "Anuradhapura Ancient Capital",
    category: "culture",
    categoryLabel: "Culture",
    image: "/images/about-collage-stupa-hd.jpg",
    description: "The colossal ancient white stupa surrounded by stone elephant walls and sacred Bodhi trees in evening sunlight.",
  },
  {
    id: "gal-9",
    title: "Nine Arch Bridge Blue Train",
    location: "Ella, Central Highlands",
    category: "adventure",
    categoryLabel: "Adventure",
    image: "/images/dest-ella.jpg",
    description: "The legendary blue passenger train crossing over the colonial stone viaduct framed by emerald tea estates.",
  },
  {
    id: "gal-10",
    title: "Temple of the Tooth Relic at Dusk",
    location: "Kandy Lakefront",
    category: "culture",
    categoryLabel: "Culture",
    image: "/images/dest-kandy.jpg",
    description: "The illuminated palace and golden roof of Sri Dalada Maligawa reflecting serenely across Kandy lake.",
  },
  {
    id: "gal-11",
    title: "Leopard in the Wild",
    location: "Yala National Park",
    category: "wildlife",
    categoryLabel: "Wildlife",
    image: "/images/about-collage-leopard-hd.jpg",
    description: "Sri Lanka's apex predator resting gracefully on a high branch in the dense scrub jungle canopy.",
  },
  {
    id: "gal-12",
    title: "Secret Jungle Beach Cove",
    location: "Unawatuna, Galle",
    category: "beaches",
    categoryLabel: "Beaches",
    image: "/images/dest-jungle-beach.jpg",
    description: "A secluded emerald bay surrounded by lush coastal rainforest with peaceful swimming waters.",
  },
  {
    id: "gal-13",
    title: "Historic Galle Fort Lighthouse",
    location: "Galle Fort Ramparts",
    category: "culture",
    categoryLabel: "Culture",
    image: "/images/dest-galle-fort.jpg",
    description: "The iconic 1939 white lighthouse standing sentinel over 17th-century Dutch ramparts and the Indian Ocean.",
  },
  {
    id: "gal-14",
    title: "Wild Elephant Gathering",
    location: "Minneriya National Park",
    category: "wildlife",
    categoryLabel: "Wildlife",
    image: "/images/welcome-wildlife.jpg",
    description: "Majestic Asian elephants gathering in large matriarchal herds around ancient reservoir grass plains.",
  },
  {
    id: "gal-15",
    title: "Virgin Rainforest Canopy",
    location: "Sinharaja Biosphere Reserve",
    category: "nature",
    categoryLabel: "Nature",
    image: "/images/we-1.jpg",
    description: "Exploring ancient Gondwanaland primary rainforest trails rich in endemic flora, birds, and cascading streams.",
  },
  {
    id: "gal-16",
    title: "Traditional Outrigger Canoes",
    location: "Bentota & Negombo Coast",
    category: "beaches",
    categoryLabel: "Beaches",
    image: "/images/welcome-coast.jpg",
    description: "Traditional wooden Oruwa fishing catamarans resting on the golden shoreline beneath swaying palm fronds.",
  },
];

export default function GalleryPage() {
  const searchDialog = useRef<HTMLDialogElement>(null);
  const [items, setItems] = useState<GalleryItem[]>(galleryItems);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch live items from /api/gallery database
  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery", { cache: "no-store" });
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setItems(
            json.data.map((item: any) => ({
              id: String(item.id),
              title: item.title,
              location: item.location,
              category: item.category as GalleryItem["category"],
              categoryLabel: item.categoryLabel || item.category,
              image: item.image,
              description: item.description,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load gallery items from database:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGallery();
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

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % displayedItems.length : 0
      );
    }
  }, [activeLightboxIndex, displayedItems.length]);

  const prevLightbox = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + displayedItems.length) % displayedItems.length : 0
      );
    }
  }, [activeLightboxIndex, displayedItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, nextLightbox, prevLightbox]);

  return (
    <>
      <style>{`
        .galleryPageWrapper {
          min-height: 100vh;
          background: #ffffff;
          color: #173832;
        }

        /* Top Header Bar */
        .galleryHeaderBar {
          background: #073e36;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Hero Banner */
        .galleryHeroBanner {
          position: relative;
          width: 100%;
          height: clamp(185px, 22vw, 280px);
          overflow: hidden;
          background: #0d211a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .galleryBannerImg {
          object-fit: cover;
          object-position: center 32%;
        }

        .bannerOverlayGradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(7, 30, 25, 0.38) 0%,
            rgba(7, 30, 25, 0.65) 100%
          );
          z-index: 2;
        }

        .galleryBannerContent {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 10px 24px;
        }

        .galleryBannerTitle {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.7), 0 1px 4px rgba(0, 0, 0, 0.9);
        }

        .galleryBannerDivider {
          width: 36px;
          height: 2.5px;
          background: #ed8a28;
          margin: 10px auto 12px;
          border-radius: 2px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        .galleryBreadcrumbs {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: clamp(12px, 1.2vw, 14px);
          letter-spacing: 0.5px;
        }

        .galleryBreadcrumbs .crumbLink {
          color: #ffffff;
          font-weight: 500;
          text-decoration: none;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
          transition: color 0.2s ease;
        }

        .galleryBreadcrumbs .crumbLink:hover {
          color: #ffb11b;
          text-decoration: underline;
        }

        .galleryBreadcrumbs .crumbSlash {
          color: rgba(255, 255, 255, 0.65);
          font-weight: 400;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
        }

        .galleryBreadcrumbs .crumbActive {
          color: #ed8a28;
          font-weight: 600;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        /* Main Gallery Section */
        .galleryMainSection {
          position: relative;
          padding: 65px 0 95px;
          background: #ffffff;
          overflow: hidden;
        }

        .galleryContainer {
          position: relative;
          z-index: 5;
          width: min(1320px, 92%);
          margin: 0 auto;
        }

        /* Header Area */
        .galleryHeadingWrapper {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 38px;
        }

        .galleryMainTitle {
          margin: 0 0 14px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 3.4vw, 44px);
          font-weight: 700;
          letter-spacing: -0.4px;
          line-height: 1.2;
          color: #073e36;
        }

        .titleAccentOrange {
          color: #ed8a28;
          display: inline-block;
          margin-left: 8px;
        }

        .gallerySubtitle {
          margin: 0;
          color: #556c75;
          font-size: clamp(14px, 1.2vw, 15px);
          line-height: 1.65;
        }

        /* Category Filter Pills */
        .galleryFilterBar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 42px;
        }

        .filterPillBtn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 600;
          color: #073e36;
          background: #ffffff;
          border: 1px solid #d9e6e2;
          cursor: pointer;
          transition: all 0.22s ease;
        }

        .filterPillBtn:hover {
          border-color: #ed8a28;
          color: #ed8a28;
        }

        .filterPillBtn.activePill {
          background: #003f3b;
          color: #ffffff;
          border-color: #003f3b;
          box-shadow: 0 4px 14px rgba(0, 63, 59, 0.2);
        }

        .filterIcon {
          width: 15px;
          height: 15px;
        }

        /* Gallery Grid (4 columns desktop, 2 tablet, 1 mobile) */
        .galleryGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .galleryCard {
          position: relative;
          aspect-ratio: 1.55 / 1;
          border-radius: 18px;
          overflow: hidden;
          background: #eef3f1;
          border: 1px solid #e7efec;
          box-shadow: 0 4px 16px rgba(7, 62, 54, 0.04);
          cursor: pointer;
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
        }

        .galleryCard:hover {
          transform: translateY(-4px);
          border-color: #bad5ce;
          box-shadow: 0 14px 28px rgba(7, 62, 54, 0.1);
        }

        .galleryCardPhoto {
          object-fit: cover;
          transition: transform 0.45s ease;
        }

        .galleryCard:hover .galleryCardPhoto {
          transform: scale(1.08);
        }

        /* Top-left category badge on card */
        .cardCategoryBadge {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(6px);
          color: #073e36;
          font-size: 11.5px;
          font-weight: 700;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          z-index: 3;
          pointer-events: none;
        }

        .badgeIcon {
          width: 13px;
          height: 13px;
          color: #ed8a28;
        }

        /* Bottom-right zoom icon button */
        .cardZoomBtn {
          position: absolute;
          bottom: 14px;
          right: 14px;
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(7, 30, 25, 0.6);
          backdrop-filter: blur(4px);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          color: #ffffff;
          z-index: 3;
          transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
        }

        .galleryCard:hover .cardZoomBtn {
          background: #ed8a28;
          border-color: #ed8a28;
          transform: scale(1.1);
        }

        .zoomSvg {
          width: 16px;
          height: 16px;
        }

        /* Bottom subtle gradient on hover showing location title */
        .cardHoverOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(7, 30, 25, 0.85) 0%,
            rgba(7, 30, 25, 0.2) 45%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px 18px 48px;
          z-index: 2;
        }

        .galleryCard:hover .cardHoverOverlay {
          opacity: 1;
        }

        .overlayTitle {
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 3px;
          font-family: Georgia, "Times New Roman", serif;
        }

        .overlayLocation {
          color: #ffb11b;
          font-size: 11.5px;
          font-weight: 600;
          margin: 0;
        }

        /* Bottom View More Button */
        .galleryActionArea {
          text-align: center;
          margin-top: 48px;
        }

        .viewMoreBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 34px;
          min-height: 48px;
          border-radius: 9999px;
          background: #003f3b;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 16px rgba(0, 63, 59, 0.25);
        }

        .viewMoreBtn:hover {
          background: #ed8a28;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(237, 138, 40, 0.35);
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

        .decorDotGridLeft {
          position: absolute;
          left: 40px;
          top: 48%;
          z-index: 2;
          pointer-events: none;
          opacity: 0.85;
        }

        .decorDotGridRight {
          position: absolute;
          right: 40px;
          top: 42%;
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

        /* Travel Doodle Flight & Camera Path on Bottom */
        .decorFlightDoodle {
          position: absolute;
          left: 30%;
          bottom: 25px;
          width: 220px;
          height: 60px;
          color: #92b7ad;
          opacity: 0.55;
          pointer-events: none;
          z-index: 1;
        }

        .decorCameraDoodle {
          position: absolute;
          right: 24%;
          bottom: 15px;
          width: 60px;
          height: 50px;
          color: #92b7ad;
          opacity: 0.5;
          pointer-events: none;
          z-index: 1;
        }

        /* Lightbox Fullscreen Modal */
        .lightboxBackdrop {
          position: fixed;
          inset: 0;
          background: rgba(7, 24, 20, 0.88);
          backdrop-filter: blur(8px);
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .lightboxModalBox {
          position: relative;
          max-width: 900px;
          width: 100%;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
        }

        .lightboxImageFrame {
          position: relative;
          width: 100%;
          height: clamp(280px, 50vh, 520px);
          background: #000000;
        }

        .lightboxFullPhoto {
          object-fit: cover;
        }

        .lightboxNavBtn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.4);
          cursor: pointer;
          font-size: 20px;
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 5;
        }

        .lightboxNavBtn:hover {
          background: #ed8a28;
          border-color: #ed8a28;
          transform: translateY(-50%) scale(1.08);
        }

        .navBtnPrev {
          left: 16px;
        }

        .navBtnNext {
          right: 16px;
        }

        .lightboxCloseBtn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          color: #ffffff;
          border: none;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 20px;
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 10;
        }

        .lightboxCloseBtn:hover {
          background: #ed8a28;
          transform: scale(1.1);
        }

        .lightboxInfoBar {
          padding: 22px 28px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          flex-wrap: wrap;
          gap: 14px;
        }

        .lightboxCaption {
          max-width: 600px;
        }

        .lightboxBadge {
          display: inline-block;
          background: #fef0e7;
          color: #ed8a28;
          font-size: 11.5px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          margin-bottom: 6px;
        }

        .lightboxTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          font-weight: 700;
          color: #073e36;
          margin: 0 0 6px;
        }

        .lightboxDesc {
          color: #556c75;
          font-size: 13.5px;
          line-height: 1.6;
          margin: 0;
        }

        .lightboxPlanLink {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          border-radius: 9999px;
          background: #003f3b;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s ease;
          white-space: nowrap;
        }

        .lightboxPlanLink:hover {
          background: #ed8a28;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .galleryGrid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
          .decorPalmTreeLeft, .decorLeafBranchRight, .decorDotGridLeft, .decorDotGridRight {
            display: none;
          }
        }

        @media (max-width: 800px) {
          .galleryGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .galleryMainSection {
            padding: 45px 0 70px;
          }
          .galleryHeadingWrapper {
            margin-bottom: 28px;
          }
          .galleryFilterBar {
            gap: 8px;
            margin-bottom: 30px;
          }
          .filterPillBtn {
            padding: 7px 15px;
            font-size: 12px;
          }
        }

        @media (max-width: 520px) {
          .galleryGrid {
            grid-template-columns: 1fr;
            max-width: 420px;
            margin: 0 auto;
          }
        }
      `}</style>

      <div className="galleryPageWrapper">
        {/* Header Navigation */}
        <div className="galleryHeaderBar">
          <Navbar activePage="gallery" onOpenSearch={handleOpenSearch} />
        </div>

        {/* Top Scenic Banner: Ancient Buddha & Stupa Sunset */}
        <div className="galleryHeroBanner">
          <Image
            src="/images/gallery-hero-banner.jpg"
            alt="Scenic Golden Hour Sunset over Sri Lanka Ancient Heritage and Stupa"
            fill
            priority
            sizes="100vw"
            className="galleryBannerImg"
          />
          <div className="bannerOverlayGradient" aria-hidden="true" />

          <div className="galleryBannerContent">
            <h1 className="galleryBannerTitle">Gallery</h1>
            <div className="galleryBannerDivider" aria-hidden="true" />
            <nav className="galleryBreadcrumbs" aria-label="Breadcrumb">
              <Link href="/" className="crumbLink">Home</Link>
              <span className="crumbSlash" aria-hidden="true">/</span>
              <span className="crumbActive">Gallery</span>
            </nav>
          </div>
        </div>

        {/* Main Gallery Section */}
        <main className="galleryMainSection">
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

          {/* Travel Flight Path Doodle with small plane */}
          <svg
            className="decorFlightDoodle"
            viewBox="0 0 220 60"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 45 Q 60 10, 120 35 T 200 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="m198 12 12 3-8 9-2-4-5 1 1-5-4-1 6-3z"
              fill="currentColor"
            />
          </svg>

          {/* Camera Doodle */}
          <svg
            className="decorCameraDoodle"
            viewBox="0 0 60 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 16h8l4-6h16l4 6h8a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z" />
            <circle cx="30" cy="28" r="9" />
          </svg>

          <div className="galleryContainer">
            {/* Header: Travel Moments Gallery */}
            <div className="galleryHeadingWrapper">
              <h2 className="galleryMainTitle">
                Travel Moments
                <span className="titleAccentOrange">Gallery</span>
              </h2>
              <p className="gallerySubtitle">
                Explore unforgettable experiences, destinations, wildlife, culture, and adventure across Sri Lanka.
              </p>
            </div>

            {/* Filter Category Pills Bar */}
            <div className="galleryFilterBar" role="tablist" aria-label="Gallery category filters">
              <button
                type="button"
                className={`filterPillBtn ${selectedCategory === "all" ? "activePill" : ""}`}
                onClick={() => {
                  setSelectedCategory("all");
                  setVisibleCount(8);
                }}
              >
                All
              </button>

              <button
                type="button"
                className={`filterPillBtn ${selectedCategory === "nature" ? "activePill" : ""}`}
                onClick={() => {
                  setSelectedCategory("nature");
                  setVisibleCount(8);
                }}
              >
                <svg className="filterIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 3C9 3 3 8 4 15c1 6 10 6 13 0 2-4 2-8 3-12Z" />
                  <path d="M3 21 15 9" />
                </svg>
                <span>Nature</span>
              </button>

              <button
                type="button"
                className={`filterPillBtn ${selectedCategory === "wildlife" ? "activePill" : ""}`}
                onClick={() => {
                  setSelectedCategory("wildlife");
                  setVisibleCount(8);
                }}
              >
                <svg className="filterIcon" viewBox="0 0 24 24" fill="currentColor">
                  <ellipse cx="12" cy="15" rx="4" ry="3.5" />
                  <circle cx="7" cy="9" r="2" />
                  <circle cx="17" cy="9" r="2" />
                  <circle cx="10.5" cy="6" r="1.8" />
                  <circle cx="13.5" cy="6" r="1.8" />
                </svg>
                <span>Wildlife</span>
              </button>

              <button
                type="button"
                className={`filterPillBtn ${selectedCategory === "culture" ? "activePill" : ""}`}
                onClick={() => {
                  setSelectedCategory("culture");
                  setVisibleCount(8);
                }}
              >
                <svg className="filterIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10h20M12 3 2 10h20L12 3z" />
                </svg>
                <span>Culture</span>
              </button>

              <button
                type="button"
                className={`filterPillBtn ${selectedCategory === "beaches" ? "activePill" : ""}`}
                onClick={() => {
                  setSelectedCategory("beaches");
                  setVisibleCount(8);
                }}
              >
                <svg className="filterIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c-1-5-1-9 0-14M12 8C8 2 4 4 2 7c4-1 7-1 10 1ZM12 8c4-6 8-4 10-1-4-1-7-1-10 1ZM12 8c-5-1-7 3-8 6 3-3 5-4 8-6ZM12 8c5-1 7 3 8 6-3-3-5-4-8-6" />
                </svg>
                <span>Beaches</span>
              </button>

              <button
                type="button"
                className={`filterPillBtn ${selectedCategory === "adventure" ? "activePill" : ""}`}
                onClick={() => {
                  setSelectedCategory("adventure");
                  setVisibleCount(8);
                }}
              >
                <svg className="filterIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
                <span>Adventure</span>
              </button>
            </div>

            {/* Gallery 4-Column Grid */}
            <div className="galleryGrid">
              {displayedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="galleryCard"
                  onClick={() => openLightbox(index)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openLightbox(index);
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 520px) 92vw, (max-width: 800px) 46vw, (max-width: 1100px) 30vw, 23vw"
                    className="galleryCardPhoto"
                  />

                  {/* Top-Left Category Badge */}
                  <div className="cardCategoryBadge">
                    {item.category === "beaches" && (
                      <svg className="badgeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21c-1-5-1-9 0-14M12 8C8 2 4 4 2 7c4-1 7-1 10 1ZM12 8c4-6 8-4 10-1-4-1-7-1-10 1Z" />
                      </svg>
                    )}
                    {item.category === "adventure" && (
                      <svg className="badgeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                      </svg>
                    )}
                    {item.category === "culture" && (
                      <svg className="badgeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 21h18M5 21V10M19 21V10M12 3 2 10h20L12 3z" />
                      </svg>
                    )}
                    {item.category === "wildlife" && (
                      <svg className="badgeIcon" viewBox="0 0 24 24" fill="currentColor">
                        <ellipse cx="12" cy="15" rx="4" ry="3.5" />
                        <circle cx="7" cy="9" r="2" />
                        <circle cx="17" cy="9" r="2" />
                      </svg>
                    )}
                    {item.category === "nature" && (
                      <svg className="badgeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 3C9 3 3 8 4 15c1 6 10 6 13 0 2-4 2-8 3-12Z" />
                        <path d="M3 21 15 9" />
                      </svg>
                    )}
                    <span>{item.categoryLabel}</span>
                  </div>

                  {/* Bottom-Right Zoom Button */}
                  <div className="cardZoomBtn" aria-hidden="true">
                    <svg className="zoomSvg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <line x1="21" y1="21" x2="16" y2="16" />
                    </svg>
                  </div>

                  {/* Hover Caption Overlay */}
                  <div className="cardHoverOverlay">
                    <h4 className="overlayTitle">{item.title}</h4>
                    <p className="overlayLocation">📍 {item.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom View More Action */}
            {displayedItems.length < filteredItems.length && (
              <div className="galleryActionArea">
                <button
                  type="button"
                  className="viewMoreBtn"
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                >
                  <span>View More Memories</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Fullscreen Lightbox Modal */}
        {activeLightboxIndex !== null && displayedItems[activeLightboxIndex] && (
          <div
            className="lightboxBackdrop"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Photo Lightbox"
          >
            <div
              className="lightboxModalBox"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightboxImageFrame">
                <Image
                  src={displayedItems[activeLightboxIndex].image}
                  alt={displayedItems[activeLightboxIndex].title}
                  fill
                  className="lightboxFullPhoto"
                />

                <button
                  type="button"
                  className="lightboxCloseBtn"
                  onClick={closeLightbox}
                  aria-label="Close photo view"
                >
                  ✕
                </button>

                {displayedItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="lightboxNavBtn navBtnPrev"
                      onClick={prevLightbox}
                      aria-label="Previous photo"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      className="lightboxNavBtn navBtnNext"
                      onClick={nextLightbox}
                      aria-label="Next photo"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              <div className="lightboxInfoBar">
                <div className="lightboxCaption">
                  <span className="lightboxBadge">
                    {displayedItems[activeLightboxIndex].categoryLabel}
                  </span>
                  <h3 className="lightboxTitle">
                    {displayedItems[activeLightboxIndex].title}
                  </h3>
                  <p className="lightboxDesc">
                    📍 {displayedItems[activeLightboxIndex].location} — {displayedItems[activeLightboxIndex].description}
                  </p>
                </div>

                <Link
                  href={`/#contact?journey=${encodeURIComponent(displayedItems[activeLightboxIndex].title)}`}
                  className="lightboxPlanLink"
                  onClick={closeLightbox}
                >
                  Experience This Tour →
                </Link>
              </div>
            </div>
          </div>
        )}

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
