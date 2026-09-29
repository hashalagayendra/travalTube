"use client";

import { RefObject, useState } from "react";
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
    <>
      <style>{`
        .searchDialog { width: min(540px, calc(100% - 36px)); padding: 28px; color: #123f38; border: 0; border-radius: 14px; box-shadow: 0 20px 80px #0004; }
        .searchDialog::backdrop { background: #052c28a8; backdrop-filter: blur(5px); }
        .dialogHeader { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
        .dialogHeader h2 { font-family: Georgia, serif; font-weight: 400; font-size: 25px; }
        .dialogHeader button { background: transparent; border: 0; color: #123f38; padding: 5px; }
        .dialogHeader svg { width: 21px; height: 21px; }
        .searchDialog label { display: block; font-size: 11px; margin-bottom: 10px; }
        .searchDialog input { width: 100%; padding: 14px; border: 1px solid #cdd8d2; border-radius: 6px; color: #123f38; }
        .searchResults { margin-top: 15px; }
        .searchResults a { padding: 16px 0; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #123f3814; font-size: 14px; }
        .searchResults a:hover { color: #a27834; }
        .searchResults small { display: block; color: #6a746f; font-size: 10px; margin-top: 6px; }
        .searchResults svg { width: 20px; height: 20px; }
        .searchResults > p { font-size: 12px; line-height: 1.7; }
      `}</style>
      <dialog
        ref={dialogRef}
        className="searchDialog"
        aria-labelledby="search-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        <div className="dialogHeader">
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
        <div className="searchResults">
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
    </>
  );
}
