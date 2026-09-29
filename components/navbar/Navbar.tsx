"use client";

import { useState } from "react";
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
  { label: "Tour Packages", href: "/#packages", id: "packages" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Destination", href: "/#destinations", id: "destinations" },
  { label: "Things To Do", href: "/#packages", id: "things" },
  { label: "Gallery", href: "/#gallery", id: "gallery" },
  { label: "Contact Us", href: "/#contact", id: "contact" },
];

export function Navbar({ onOpenSearch, activePage = "home" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .header { display: flex; align-items: center; gap: 26px; width: min(1400px, 86%); margin: 0 auto; padding: 24px 0; color: #ffffff; }
        .header .brandName { color: #ffffff; }
        .header .brandTagline { color: #ffb11b; }
        .navigation { display: flex; justify-content: space-between; align-items: center; flex: 1; gap: 4px; background: rgba(255,255,255,.9); border-radius: 40px; padding: 9px 12px; box-shadow: 0 5px 24px rgba(0, 0, 0, 0.08); backdrop-filter: blur(8px); }
        .navigation a { color: #073e36; white-space: nowrap; font-size: 11px; font-weight: 600; padding: 11px 7px; border-radius: 25px; transition: background .2s, color .2s; }
        .navigation a:hover { color: #f06c2f; background: #fff; }
        .navigation .activeLink { color: #f06c2f; background: #fff; padding-inline: 17px; position: relative; }
        .activeLink::after { content: ""; position: absolute; width: 25px; height: 1px; background: #f06c2f; bottom: 7px; left: 50%; transform: translateX(-50%); }
        .headerActions { display: flex; gap: 15px; align-items: center; }
        .searchButton, .menuButton { width: 40px; height: 40px; border: 0; border-radius: 50%; background: #ffffff; color: #073e36; display: grid; place-items: center; }
        .searchButton svg, .menuButton svg { width: 19px; height: 19px; }
        .planButton { display: flex; align-items: center; justify-content: center; gap: 14px; min-height: 42px; padding: 0 23px; background: #003f3b; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 28px; color: white; font-size: 11px; white-space: nowrap; transition: background .2s, transform .2s; text-decoration: none; }
        .planButton:hover { background: #086157; transform: translateY(-2px); }
        .planButton svg { width: 17px; height: 17px; }
        .menuButton { display: none; }

        @media (min-width: 1550px) {
          .header { gap: 35px; }
          .navigation a { font-size: 12px; padding-inline: 11px; }
        }
        @media (max-width: 1250px) {
          .header { width: 90%; gap: 18px; }
          .navigation { padding: 7px; gap: 0; }
          .navigation a { font-size: 9px; padding-inline: 6px; }
          .headerActions { gap: 10px; }
          .planButton { padding-inline: 16px; font-size: 10px; }
        }
        @media (max-width: 1020px) {
          .header { position: relative; justify-content: space-between; }
          .navigation { display: none; }
          .navigationOpen { display: grid; grid-template-columns: 1fr 1fr; position: absolute; top: 88px; left: 0; right: 0; z-index: 5; border-radius: 15px; background: #fffffff5; padding: 15px; box-shadow: 0 8px 30px #073e3630; }
          .navigationOpen a { font-size: 13px; padding: 15px; color: #073e36; }
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
            return (
              <Link
                key={item.label}
                className={isActive ? "activeLink" : ""}
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
