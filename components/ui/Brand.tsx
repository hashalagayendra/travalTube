import styles from "@/app/page.module.css";

interface BrandProps {
  className?: string;
}

export function Brand({ className }: BrandProps) {
  return (
    <a
      className={`${styles.brand} ${className || ""}`}
      href="#home"
      aria-label="TravelTube Lanka home"
    >
      <svg className={styles.brandMark} viewBox="0 0 76 64" aria-hidden="true">
        <circle cx="48" cy="27" r="20" fill="#ffb321" />
        <path d="M12 39c16-9 32 9 55 0v9c-19 11-36-8-55 1Z" fill="#008b86" />
        <path
          d="M14 49c15-8 32 9 52 0M18 55c14-6 29 7 43 1"
          fill="none"
          stroke="#008b86"
          strokeWidth="3"
        />
        <path
          d="M25 43c-3-10-3-19 1-29"
          fill="none"
          stroke="#07594a"
          strokeWidth="3"
        />
        <path
          d="M26 15C17 2 8 8 5 13c9-2 13-1 21 2ZM26 15C14 12 8 18 7 24c8-6 12-7 19-9ZM26 15C29 3 37 4 43 10c-8-1-12 0-17 5ZM26 15c11-4 16 3 18 10-7-6-11-8-18-10ZM26 15c-4-8-2-13 1-15 3 6 3 10-1 15Z"
          fill="#07594a"
        />
        <path d="m36 36 8-11 7 11Z" fill="#fff5dd" />
        <path
          d="M43 25v12M40 38h20"
          stroke="#07594a"
          strokeWidth="1.5"
        />
      </svg>
      <span>
        <span className={styles.brandName}>
          TravelTube <em>Lanka</em>
        </span>
        <span className={styles.brandTagline}>
          EXPLORE · EXPERIENCE · SRI LANKA
        </span>
      </span>
    </a>
  );
}
