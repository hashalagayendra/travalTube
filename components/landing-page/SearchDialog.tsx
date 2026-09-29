"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { journeys } from "./data";

interface SearchDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onSelectJourney: (style: string) => void;
}

export function SearchDialog({ dialogRef, onSelectJourney }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = journeys.filter((journey) =>
    `${journey.name} ${journey.tags} ${journey.style}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // Focus input without scrolling the document
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const observer = new MutationObserver(() => {
      if (dialog.open) {
        // Prevent background scrolling while open
        document.body.style.overflow = "hidden";
        setTimeout(() => {
          inputRef.current?.focus({ preventScroll: true });
        }, 30);
      } else {
        document.body.style.overflow = "";
      }
    });

    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });

    const handleClose = () => {
      document.body.style.overflow = "";
    };
    dialog.addEventListener("close", handleClose);

    return () => {
      observer.disconnect();
      dialog.removeEventListener("close", handleClose);
      document.body.style.overflow = "";
    };
  }, [dialogRef]);

  return (
    <>
      <style>{`
        .searchDialog {
          position: fixed;
          inset: 0;
          margin: auto;
          width: min(540px, calc(100% - 36px));
          max-height: min(620px, 86vh);
          padding: 32px;
          color: #073e36;
          border: 0;
          border-radius: 20px;
          box-shadow: 0 24px 80px rgba(7, 29, 22, 0.35);
          background: #ffffff;
          overflow-y: auto;
          z-index: 99999;
        }

        .searchDialog::backdrop {
          position: fixed;
          inset: 0;
          background: rgba(7, 29, 22, 0.78);
          backdrop-filter: blur(6px);
        }

        .dialogHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 18px;
        }

        .dialogHeader h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 700;
          font-size: 26px;
          color: #073e36;
        }

        .dialogHeader button {
          background: transparent;
          border: 0;
          color: #073e36;
          padding: 6px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background .2s, color .2s;
        }

        .dialogHeader button:hover {
          background: #edf5f3;
          color: #f06c2f;
        }

        .dialogHeader svg {
          width: 20px;
          height: 20px;
        }

        .searchDialog label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #556c75;
          margin-bottom: 8px;
        }

        .searchDialog input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #cad8d3;
          border-radius: 10px;
          color: #073e36;
          font-size: 14.5px;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }

        .searchDialog input:focus {
          border-color: #073e36;
          box-shadow: 0 0 0 3px rgba(7, 62, 54, 0.12);
        }

        .searchResults {
          margin-top: 18px;
          max-height: 300px;
          overflow-y: auto;
        }

        .searchResults a {
          padding: 14px 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e5edeb;
          font-size: 14.5px;
          font-weight: 600;
          color: #073e36;
          transition: color .2s;
          text-decoration: none;
        }

        .searchResults a:hover {
          color: #f06c2f;
        }

        .searchResults small {
          display: block;
          color: #556c75;
          font-size: 11px;
          font-weight: 400;
          margin-top: 4px;
        }

        .searchResults svg {
          width: 18px;
          height: 18px;
          color: #073e36;
          transition: transform .2s, color .2s;
        }

        .searchResults a:hover svg {
          color: #f06c2f;
          transform: translateX(3px);
        }

        .searchResults > p {
          font-size: 13px;
          color: #556c75;
          line-height: 1.6;
          margin: 14px 0 0;
        }
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
            type="button"
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
          ref={inputRef}
          id="destination-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Sigiriya, Ella or beaches…"
        />
        <div className="searchResults">
          {matches.map((journey) => (
            <Link
              key={journey.name}
              href="/#packages"
              scroll={false}
              onClick={(e) => {
                e.preventDefault();
                onSelectJourney(journey.style);
                dialogRef.current?.close();
              }}
            >
              <span>
                {journey.name}
                <small>{journey.tags}</small>
              </span>
              <Icon name="arrow" />
            </Link>
          ))}
          {matches.length === 0 && (
            <p>No matching journeys. Try “Kandy”, “coast” or “nature”.</p>
          )}
        </div>
      </dialog>
    </>
  );
}
