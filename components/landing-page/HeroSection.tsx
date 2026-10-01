"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar/Navbar";
import { Icon, IconName } from "@/components/ui/Icon";

interface HeroSectionProps {
  onOpenSearch?: () => void;
  showSearch?: boolean;
}

const benefits: { icon: IconName; title: string; subtitle: string }[] = [
  { icon: "leaf", title: "Authentic", subtitle: "Experiences" },
  { icon: "people", title: "Expert Local", subtitle: "Team" },
  { icon: "shield", title: "Safe & Reliable", subtitle: "Travel" },
  { icon: "heart", title: "Personalized", subtitle: "Itineraries" },
];

const hero = {
  first: "Discover the",
  second: "Real",
  script: "Sri Lanka",
  description:
    "Unforgettable journeys, authentic experiences and memories that last a lifetime.",
  label: "Sigiriya",
  caption: "A timeless wonder",
};

export function HeroSection({ onOpenSearch, showSearch = false }: HeroSectionProps = {}) {
  return (
    <>
      <style>{`
        .hero {
          position: relative;
          min-height: 720px;
          height: min(860px, 94svh);
          isolation: isolate;
          color: #fffdf5;
          overflow: hidden;
        }

        .heroImage, .heroShade {
          position: absolute;
          inset: 0;
          z-index: -2;
        }

        .heroImage img {
          object-fit: cover;
          object-position: center 76%;
        }

        .heroShade {
          z-index: -1;
          background:
            linear-gradient(180deg, rgba(7, 62, 54, 0.92) 0%, rgba(7, 62, 54, 0.45) 18%, transparent 36%),
            linear-gradient(90deg, rgba(7,29,22,.82), rgba(7,29,22,.45) 42%, rgba(7,29,22,.03) 78%),
            linear-gradient(0deg, rgba(6,29,23,.68), transparent 42%);
        }

        .heroBottomWave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 160px;
          z-index: 1;
          pointer-events: none;
        }

        .heroContent {
          position: relative;
          z-index: 2;
          width: min(1360px, 92%);
          margin: 75px auto 0;
          animation: enter .65s ease both;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 600;
          margin: 0 0 18px;
          color: #f6f3eb;
        }

        .eyebrow::before {
          content: "";
          display: inline-block;
          width: 32px;
          height: 2px;
          background: #e8a838;
        }

        .heroContent h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(58px, 6.2vw, 92px);
          font-weight: 500;
          line-height: .99;
          letter-spacing: -2px;
          margin: 0;
        }

        .heroContent h1 em {
          font-family: "Segoe Script", "Brush Script MT", cursive;
          font-size: 1.02em;
          font-weight: 400;
          color: #ffb11b;
          letter-spacing: -5px;
        }

        .heroDescription {
          max-width: 440px;
          font-size: 17px;
          line-height: 1.65;
          margin: 24px 0 32px;
          text-wrap: pretty;
        }

        .benefits {
          display: flex;
          gap: 28px;
          align-items: center;
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .benefit svg {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }

        .benefit span {
          font-size: 10.5px;
          line-height: 1.6;
          font-weight: 500;
        }

        .heroBottom {
          position: absolute;
          bottom: 165px;
          right: max(4%, calc((100% - 1360px) / 2));
          z-index: 2;
          display: flex;
          align-items: center;
        }

        .location {
          display: flex;
          gap: 10px;
          align-items: center;
          font-size: 12px;
          margin: 0;
          color: #fffdf5;
        }

        .location svg {
          width: 22px;
          height: 22px;
        }

        .location small {
          display: block;
          font-size: 10px;
          margin-top: 3px;
          opacity: .85;
        }

        @keyframes enter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1250px) {
          .heroContent { margin-top: 85px; }
          .heroBottom { bottom: 155px; }
        }

        @media (max-width: 1020px) {
          .hero { height: auto; min-height: 700px; padding-bottom: 120px; }
          .heroContent { margin-top: 95px; }
          .heroContent h1 { font-size: 74px; }
          .benefits { gap: 20px; }
          .benefit { gap: 8px; }
          .heroBottom { display: none; }
        }

        @media (max-width: 700px) {
          .hero { min-height: 640px; }
          .heroImage img { object-position: 61% bottom; }
          .heroContent { width: 90%; margin-top: 110px; }
          .eyebrow { font-size: 8.5px; letter-spacing: 2px; margin-bottom: 16px; }
          .heroContent h1 { font-size: clamp(46px, 9.6vw, 65px); letter-spacing: -1px; line-height: 1.05; }
          .heroContent h1 em { letter-spacing: -3px; }
          .heroDescription { font-size: 14px; max-width: 320px; margin: 20px 0 28px; }
          .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 14px; max-width: 320px; }
          .benefit svg { width: 24px; height: 24px; }
        }
      `}</style>
      <section
        id="home"
        className="hero"
        aria-label="Welcome to Sri Lanka"
      >
        <div id="gallery" className="heroImage">
          <Image
            src="/images/sigiriya.jpg"
            alt="Sigiriya rock fortress rising above the green forests of Sri Lanka"
            fill
            sizes="100vw"
            preload
          />
        </div>
        <div className="heroShade" />

        <svg
          className="heroBottomWave"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,60 C380,140 1060,140 1440,50 L1440,160 L0,160 Z"
            fill="#ffffff"
          />
        </svg>

        <Navbar onOpenSearch={onOpenSearch} showSearch={showSearch} />

        <div className="heroContent">
          <p className="eyebrow">YOUR TRUSTED TRAVEL PARTNER</p>
          <h1>
            {hero.first}
            <br />
            {hero.second} <em>{hero.script}</em>
          </h1>
          <p className="heroDescription">{hero.description}</p>
          <div className="benefits" id="services">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="benefit">
                <Icon name={benefit.icon} />
                <span>
                  {benefit.title}
                  <br />
                  {benefit.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="heroBottom">
          <p className="location">
            <Icon name="pin" />
            <span>
              {hero.label}
              <small>{hero.caption}</small>
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
