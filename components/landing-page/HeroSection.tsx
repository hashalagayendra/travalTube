"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar/Navbar";
import { Icon, IconName } from "@/components/ui/Icon";

interface HeroSectionProps {
  onOpenSearch: () => void;
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

export function HeroSection({ onOpenSearch }: HeroSectionProps) {
  return (
    <>
      <style>{`
        .hero { position: relative; min-height: 620px; height: min(780px, 89svh); isolation: isolate; color: #fffdf5; overflow: hidden; }
        .heroImage, .heroShade { position: absolute; inset: 0; z-index: -2; }
        .heroImage img { object-fit: cover; object-position: center 76%; }
        .heroShade { z-index: -1; background: linear-gradient(180deg, rgba(255,249,229,.86) 0%, rgba(255,249,229,.25) 16%, transparent 32%), linear-gradient(90deg, rgba(7,29,22,.79), rgba(7,29,22,.42) 39%, rgba(7,29,22,.02) 76%), linear-gradient(0deg, rgba(6,29,23,.62), transparent 35%); }
        .heroContent { width: min(1230px, 78%); margin: 85px auto 0; animation: enter .65s ease both; }
        .eyebrow { font-size: 11px; letter-spacing: 3px; font-weight: 600; margin: 0 0 18px; }
        .heroContent h1 { font-family: Georgia, "Times New Roman", serif; font-size: clamp(58px, 5.9vw, 91px); font-weight: 500; line-height: .99; letter-spacing: -2px; margin: 0; }
        .heroContent h1 em { font-family: "Segoe Script", "Brush Script MT", cursive; font-size: 1.01em; font-weight: 400; color: #ffb11b; letter-spacing: -5px; }
        .heroDescription { max-width: 430px; font-size: 17px; line-height: 1.65; margin: 24px 0 31px; text-wrap: pretty; }
        .benefits { display: flex; gap: 27px; align-items: center; }
        .benefit { display: flex; align-items: center; gap: 11px; }
        .benefit svg { width: 29px; height: 29px; flex-shrink: 0; }
        .benefit span { font-size: 10px; line-height: 1.65; }
        .heroBottom { position: absolute; bottom: 29px; left: 7%; right: 7%; display: grid; grid-template-columns: 1fr 1fr; align-items: end; }
        .location { grid-column: 2; justify-self: end; display: flex; gap: 10px; align-items: center; font-size: 12px; margin: 0; }
        .location svg { width: 21px; height: 21px; }
        .location small { display: block; font-size: 10px; margin-top: 4px; opacity: .8; }

        @keyframes enter {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1250px) {
          .heroContent { margin-top: 100px; }
        }
        @media (max-width: 1020px) {
          .hero { height: 720px; }
          .heroContent { margin-top: 105px; }
          .heroContent h1 { font-size: 76px; }
          .benefits { gap: 20px; }
          .benefit { gap: 8px; }
        }
        @media (max-width: 700px) {
          .hero { min-height: 700px; height: 91svh; max-height: 900px; }
          .heroImage img { object-position: 61% bottom; }
          .heroShade { background: linear-gradient(180deg, #fff6dfa6, transparent 24%), linear-gradient(90deg, #071d16b5, #071d1640), linear-gradient(0deg, #071d16c9, transparent 55%); }
          .heroContent { width: 84%; margin-top: 125px; }
          .eyebrow { font-size: 8px; letter-spacing: 2.3px; margin-bottom: 19px; }
          .heroContent h1 { font-size: clamp(48px, 9.7vw, 67px); letter-spacing: -1px; line-height: 1.05; }
          .heroContent h1 em { letter-spacing: -3px; }
          .heroDescription { font-size: 14px; max-width: 320px; margin: 24px 0 30px; }
          .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 22px 18px; max-width: 325px; }
          .benefit svg { width: 26px; height: 26px; }
          .benefit span { font-size: 10px; }
          .heroBottom { left: 8%; right: 8%; bottom: 28px; grid-template-columns: 1fr 1fr; }
          .location { font-size: 10px; gap: 6px; }
          .location small { font-size: 8px; }
          .location svg { width: 16px; }
        }
        @media (max-width: 370px) {
          .heroContent { margin-top: 110px; }
          .heroContent h1 { font-size: 44px; }
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

        <Navbar onOpenSearch={onOpenSearch} />

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
