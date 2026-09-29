"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { Brand } from "@/components/ui/Brand";
import { Icon } from "@/components/ui/Icon";

interface NavbarProps {
  onOpenSearch?: () => void;
}

const navigation = [
  ["Home", "home"],
  ["About Us", "about"],
  ["Tour Packages", "packages"],
  ["Services", "services"],
  ["Destination", "destinations"],
  ["Things To Do", "experiences"],
  ["Gallery", "gallery"],
  ["Contact Us", "contact"],
];

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Brand />
      <nav
        id="main-navigation"
        className={`${styles.navigation} ${
          menuOpen ? styles.navigationOpen : ""
        }`}
        aria-label="Main navigation"
      >
        {navigation.map(([label, target]) => (
          <a
            key={target}
            className={target === "home" ? styles.activeLink : ""}
            href={`#${target}`}
            onClick={() => setMenuOpen(false)}
            aria-current={target === "home" ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className={styles.headerActions}>
        <button
          className={styles.searchButton}
          aria-label="Search destinations"
          onClick={onOpenSearch}
        >
          <Icon name="search" />
        </button>
        <a className={styles.planButton} href="#contact">
          Plan Your Trip <Icon name="arrow" />
        </a>
        <button
          className={styles.menuButton}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
