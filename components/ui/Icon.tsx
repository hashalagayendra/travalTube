import React from "react";

export type IconName =
  | "arrow"
  | "search"
  | "leaf"
  | "people"
  | "shield"
  | "heart"
  | "pin"
  | "menu"
  | "close"
  | "palm"
  | "calendar";

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3C9 3 3 8 4 15c1 6 10 6 13 0 2-4 2-8 3-12Z" />
        <path d="M3 21 15 9" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a3 3 0 0 1 0 6M19 14a5 5 0 0 1 3 5v2" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    pin: (
      <>
        <path d="M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 0 1 14 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    palm: (
      <>
        <path d="M12 21c-1-5-1-9 0-14M12 8C8 2 4 4 2 7c4-1 7-1 10 1ZM12 8c4-6 8-4 10-1-4-1-7-1-10 1ZM12 8c-5-1-7 3-8 6 3-3 5-4 8-6ZM12 8c5-1 7 3 8 6-3-3-5-4-8-6ZM12 7c-2-3-1-5 0-6 2 2 2 4 0 6M8 21h8" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2M8 17h2M14 17h2" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
