"use client";

import { RefObject, useState } from "react";
import styles from "@/app/page.module.css";
import { Icon } from "@/components/ui/Icon";
import { journeys } from "./data";

interface SearchDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onSelectJourney: (style: string) => void;
}

export function SearchDialog({ dialogRef, onSelectJourney }: SearchDialogProps) {
  const [query, setQuery] = useState("");

  const matches = journeys.filter((journey) =>
    `${journey.name} ${journey.tags} ${journey.style}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <dialog
      ref={dialogRef}
      className={styles.searchDialog}
      aria-labelledby="search-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          dialogRef.current?.close();
        }
      }}
    >
      <div className={styles.dialogHeader}>
        <h2 id="search-title">Where would you like to go?</h2>
        <button
          aria-label="Close search"
          onClick={() => dialogRef.current?.close()}
        >
          <Icon name="close" />
        </button>
      </div>
      <label htmlFor="destination-search">
        Search a destination or travel style
      </label>
      <input
        id="destination-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try Sigiriya, Ella or beaches…"
        autoFocus
      />
      <div className={styles.searchResults}>
        {matches.map((journey) => (
          <a
            key={journey.name}
            href="#contact"
            onClick={() => onSelectJourney(journey.style)}
          >
            <span>
              {journey.name}
              <small>{journey.tags}</small>
            </span>
            <Icon name="arrow" />
          </a>
        ))}
        {matches.length === 0 && (
          <p>No matching journeys. Try “Kandy”, “coast” or “nature”.</p>
        )}
      </div>
    </dialog>
  );
}
