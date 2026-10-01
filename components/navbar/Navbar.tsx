"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";

interface NavbarProps {
  onOpenSearch?: () => void;
  activePage?: string;
}

const navigation = [
  { label: "Home", href: "/", id: "home" },
  { label: "About Us", href: "/about", id: "about" },
  { label: "Tour Packages", href: "/#packages", id: "packages", hasDropdown: true },
  { label: "Services", href: "/services", id: "services" },
  { label: "Destination", href: "/destination", id: "destination" },
  { label: "Things To Do", href: "/#packages", id: "things" },
  { label: "Gallery", href: "/gallery", id: "gallery" },
  { label: "Contact Us", href: "/contact", id: "contact" },
];

export function Navbar({ onOpenSearch, activePage = "home" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileToursOpen, setMobileToursOpen] = useState(false);

  return (
    <>
      <style>{`
        .header {
          display: flex;
          align-items: center;
          gap: 26px;
          width: min(1400px, 86%);
          margin: 0 auto;
          padding: 24px 0;
          color: #ffffff;
          position: relative;
          z-index: 50;
        }

        .header .brandName { color: #ffffff; }
        .header .brandTagline { color: #ffb11b; }

        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex: 1;
          gap: 4px;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 40px;
          padding: 9px 12px;
          box-shadow: 0 5px 24px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(10px);
        }

        .navItemLink {
          color: #073e36;
          white-space: nowrap;
          font-size: 11px;
          font-weight: 600;
          padding: 11px 8px;
          border-radius: 25px;
          transition: background 0.2s, color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
        }

        .navItemLink:hover {
          color: #f06c2f;
          background: #ffffff;
        }

        .navItemLink.activeLink {
          color: #f06c2f;
          background: #ffffff;
          padding-inline: 16px;
          position: relative;
        }

        .navItemLink.activeLink::after {
          content: "";
          position: absolute;
          width: 25px;
          height: 1px;
          background: #f06c2f;
          bottom: 7px;
          left: 50%;
          transform: translateX(-50%);
        }

        /* Tour Packages Dropdown Wrapper */
        .navDropdownContainer {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .dropdownChevron {
          width: 13px;
          height: 13px;
          transition: transform 0.22s ease;
          opacity: 0.75;
        }

        .navDropdownContainer:hover .dropdownChevron,
        .navDropdownContainer:focus-within .dropdownChevron {
          transform: rotate(180deg);
          opacity: 1;
          color: #f06c2f;
        }

        /* Dropdown Flyout Panel */
        .tourMegaDropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          padding-top: 12px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
                      visibility 0.24s;
          z-index: 1000;
          cursor: default;
        }

        .navDropdownContainer:hover .tourMegaDropdown,
        .navDropdownContainer:focus-within .tourMegaDropdown {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
        }

        .tourMegaCard {
          width: 630px;
          background: #ffffff;
          border: 1px solid #e1ebe7;
          border-radius: 20px;
          padding: 22px 24px 20px;
          box-shadow: 0 20px 48px rgba(7, 40, 35, 0.16), 0 4px 14px rgba(7, 40, 35, 0.06);
          color: #073e36;
        }

        .tourMegaHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          margin-bottom: 16px;
          border-bottom: 1px solid #edf4f1;
        }

        .tourMegaHeaderTitle {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ed8a28;
        }

        .tourMegaHeaderLink {
          font-size: 11.5px;
          font-weight: 600;
          color: #073e36;
          text-decoration: none;
          transition: color 0.2s;
        }

        .tourMegaHeaderLink:hover {
          color: #f0642b;
        }

        /* 2-Column Grid for Day & Round Tours */
        .tourMegaGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .tourCard {
          display: flex;
          flex-direction: column;
          background: #fbfdfc;
          border: 1px solid #e7f0ec;
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .tourCard:hover {
          border-color: #b8d8cf;
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(7, 62, 54, 0.08);
        }

        .tourCardThumb {
          position: relative;
          width: 100%;
          height: 100px;
          background: #e8f0ec;
          overflow: hidden;
        }

        .tourCardThumb img {
          object-fit: cover;
          transition: transform 0.35s ease;
        }

        .tourCard:hover .tourCardThumb img {
          transform: scale(1.05);
        }

        .tourCardBadge {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #ffffff;
          padding: 3px 9px;
          border-radius: 12px;
          backdrop-filter: blur(4px);
        }

        .badgeDay {
          background: rgba(7, 62, 54, 0.88);
        }

        .badgeRound {
          background: rgba(237, 138, 40, 0.92);
        }

        .tourCardBody {
          padding: 12px 14px 14px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .tourCardTitle {
          margin: 0 0 6px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
        }

        .tourCardDesc {
          margin: 0 0 12px;
          color: #556c75;
          font-size: 11.5px;
          line-height: 1.55;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tourCardBtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #f0642b;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.3px;
        }

        .tourCardBtn svg {
          width: 14px;
          height: 14px;
          transition: transform 0.2s ease;
        }

        .tourCard:hover .tourCardBtn svg {
          transform: translateX(4px);
        }

        /* Plan Your Trip Footer Bar */
        .tourMegaFooter {
          margin-top: 14px;
          padding: 12px 16px;
          background: #eef6f3;
          border: 1px solid #d9ebe4;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .tourMegaFooter:hover {
          background: #e4f2ed;
          border-color: #bad5ce;
        }

        .megaFooterInfo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .megaFooterIcon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #ffffff;
          color: #073e36;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(7, 62, 54, 0.08);
        }

        .megaFooterIcon svg {
          width: 17px;
          height: 17px;
        }

        .megaFooterTitle {
          font-weight: 700;
          font-size: 13.5px;
          color: #073e36;
          margin-bottom: 2px;
        }

        .megaFooterDesc {
          font-size: 11px;
          color: #556c75;
        }

        .megaFooterPill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 15px;
          border-radius: 9999px;
          background: #003f3b;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          transition: background 0.2s ease;
        }

        .tourMegaFooter:hover .megaFooterPill {
          background: #096359;
        }

        /* Header Actions */
        .headerActions { display: flex; gap: 15px; align-items: center; }
        .searchButton, .menuButton { width: 40px; height: 40px; border: 0; border-radius: 50%; background: #ffffff; color: #073e36; display: grid; place-items: center; cursor: pointer; }
        .searchButton svg, .menuButton svg { width: 19px; height: 19px; }
        .planButton { display: flex; align-items: center; justify-content: center; gap: 14px; min-height: 42px; padding: 0 23px; background: #003f3b; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 28px; color: white; font-size: 11px; white-space: nowrap; transition: background .2s, transform .2s; text-decoration: none; }
        .planButton:hover { background: #086157; transform: translateY(-2px); }
        .planButton svg { width: 17px; height: 17px; }
        .menuButton { display: none; }

        /* Responsive Breakpoints */
        @media (min-width: 1550px) {
          .header { gap: 35px; }
          .navItemLink { font-size: 12px; padding-inline: 11px; }
        }

        @media (max-width: 1250px) {
          .header { width: 90%; gap: 18px; }
          .navigation { padding: 7px; gap: 0; }
          .navItemLink { font-size: 9.5px; padding-inline: 6px; }
          .headerActions { gap: 10px; }
          .planButton { padding-inline: 16px; font-size: 10px; }
          .tourMegaCard { width: 560px; padding: 18px; }
        }

        @media (max-width: 1020px) {
          .header { position: relative; justify-content: space-between; }
          .navigation { display: none; }
          .navigationOpen {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 88px;
            left: 0;
            right: 0;
            z-index: 100;
            border-radius: 18px;
            background: #ffffff;
            padding: 16px 20px 24px;
            box-shadow: 0 12px 35px rgba(7, 62, 54, 0.2);
            gap: 4px;
          }
          .navigationOpen .navItemLink {
            font-size: 13.5px;
            padding: 12px 14px;
            color: #073e36;
            width: 100%;
            justify-content: space-between;
          }
          .tourMegaDropdown {
            display: none;
          }
          .mobileSubmenu {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 8px 12px 12px 20px;
            background: #f7faf9;
            border-radius: 12px;
            margin: 4px 0 8px;
          }
          .mobileSubItem {
            font-size: 12.5px;
            font-weight: 600;
            color: #073e36;
            text-decoration: none;
            padding: 6px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .mobileSubItem:hover {
            color: #f0642b;
          }
          .menuButton { display: grid; }
        }

        @media (max-width: 700px) {
          .header { width: 90%; padding-top: 18px; gap: 12px; }
          .headerActions { gap: 8px; }
          .searchButton, .menuButton { width: 35px; height: 35px; }
          .headerActions .planButton { display: none; }
        }

        @media (max-width: 370px) {
          .headerActions { gap: 5px; }
        }
      `}</style>

      <header className="header">
        <Brand />

        <nav
          id="main-navigation"
          className={`navigation ${menuOpen ? "navigationOpen" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const isActive = item.id === activePage;

            if (item.hasDropdown) {
              return (
                <div key={item.label} className="navDropdownContainer">
                  <Link
                    className={`navItemLink ${isActive ? "activeLink" : ""}`}
                    href={item.href}
                    scroll={false}
                    onClick={(e) => {
                      if (menuOpen) {
                        e.preventDefault();
                        setMobileToursOpen(!mobileToursOpen);
                      }
                    }}
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={menuOpen ? mobileToursOpen : undefined}
                  >
                    {item.label}
                    <svg
                      className="dropdownChevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Link>

                  {/* Desktop Mega Dropdown Flyout */}
                  <div className="tourMegaDropdown" role="region" aria-label="Tour Packages Submenu">
                    <div className="tourMegaCard">
                      <div className="tourMegaHeader">
                        <span className="tourMegaHeaderTitle">EXPLORE SRI LANKA TOURS</span>
                        <Link
                          href="/#packages"
                          scroll={false}
                          className="tourMegaHeaderLink"
                        >
                          All Tour Packages →
                        </Link>
                      </div>

                      <div className="tourMegaGrid">
                        {/* 1. One Day Tours */}
                        <a
                          className="tourCard"
                          href="https://traveltube.lk/tour-packages.php?id=1"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="tourCardThumb">
                            <Image
                              src="/images/day-tours.jpg"
                              alt="One Day Tours across Sri Lanka beaches and nature"
                              fill
                              sizes="300px"
                            />
                            <span className="tourCardBadge badgeDay">Day Tours</span>
                          </div>
                          <div className="tourCardBody">
                            <h3 className="tourCardTitle">One Day Tours</h3>
                            <p className="tourCardDesc">
                              Feel with the nature in Sri Lanka. Can you arrange a trip on a day?
                              We give you amazing and adventure feeling. We have selected best places
                              to you which can enjoy your day. Within one day cover the most attractive
                              areas in Sri Lanka.
                            </p>
                            <span className="tourCardBtn">
                              Explore Tours
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </a>

                        {/* 2. Round Tours */}
                        <a
                          className="tourCard"
                          href="https://traveltube.lk/tour-packages.php?id=2"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="tourCardThumb">
                            <Image
                              src="/images/package-14.jpg"
                              alt="Round Tours exploring ancient cultures and national parks"
                              fill
                              sizes="300px"
                            />
                            <span className="tourCardBadge badgeRound">Round Tours</span>
                          </div>
                          <div className="tourCardBody">
                            <h3 className="tourCardTitle">Round Tours</h3>
                            <p className="tourCardDesc">
                              In every country there some hidden places and stories. Explore the
                              cultures, the legends and history of this areas. Find your way. Get a
                              wonderful experience, add little to your memories. And Sri Lanka is the
                              best destination to fulfill your travel diary. Travel and enjoy your life.
                            </p>
                            <span className="tourCardBtn">
                              Explore Journeys
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </span>
                          </div>
                        </a>
                      </div>

                      {/* 3. Plan your Trip Banner */}
                      <a
                        className="tourMegaFooter"
                        href="https://traveltube.lk/plan-tour.php"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="megaFooterInfo">
                          <div className="megaFooterIcon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" />
                              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
                            </svg>
                          </div>
                          <div>
                            <div className="megaFooterTitle">Plan your Trip</div>
                            <div className="megaFooterDesc">
                              Craft a custom tailor-made Sri Lankan journey matching your schedule and interests.
                            </div>
                          </div>
                        </div>
                        <span className="megaFooterPill">Plan Your Trip →</span>
                      </a>
                    </div>
                  </div>

                  {/* Mobile Accordion Submenu */}
                  {menuOpen && mobileToursOpen && (
                    <div className="mobileSubmenu">
                      <a
                        className="mobileSubItem"
                        href="https://traveltube.lk/tour-packages.php?id=1"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>One Day Tours</span>
                        <span style={{ color: "#ed8a28" }}>Explore Tours →</span>
                      </a>
                      <a
                        className="mobileSubItem"
                        href="https://traveltube.lk/tour-packages.php?id=2"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span>Round Tours</span>
                        <span style={{ color: "#ed8a28" }}>Explore Journeys →</span>
                      </a>
                      <a
                        className="mobileSubItem"
                        href="https://traveltube.lk/plan-tour.php"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span style={{ fontWeight: 700 }}>Plan your Trip</span>
                        <span style={{ color: "#073e36" }}>Custom Itinerary →</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                className={`navItemLink ${isActive ? "activeLink" : ""}`}
                href={item.href}
                scroll={false}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="headerActions">
          <button
            type="button"
            className="searchButton"
            aria-label="Search destinations"
            onClick={(e) => {
              e.preventDefault();
              onOpenSearch?.();
            }}
          >
            <Icon name="search" />
          </button>
          <Link className="planButton" href="/#contact" scroll={false}>
            Plan Your Trip <Icon name="arrow" />
          </Link>
          <button
            type="button"
            className="menuButton"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}
