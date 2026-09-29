import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export function WelcomeSection() {
  return (
    <>
      <style>{`
        .welcomeSection {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          margin-top: 30px;
          padding: 70px 0 80px;
          background: #ffffff;
        }

        .welcomeInner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 65px;
          width: min(1360px, 92%);
          margin: 0 auto;
        }

        .welcomeEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 600;
          color: #556c75;
          margin: 0 0 16px;
        }

        .welcomeEyebrow::before {
          content: "";
          display: inline-block;
          width: 32px;
          height: 2px;
          background: #e8a838;
        }

        .welcomeCopy h2 {
          margin: 0 0 18px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 2.7vw, 42px);
          font-weight: 700;
          letter-spacing: -.6px;
          line-height: 1.22;
        }

        .welcomeCopy h2 span {
          color: #ed8a28;
          white-space: nowrap;
        }

        .welcomeCopy > p:not(.welcomeEyebrow) {
          margin: 0 0 16px;
          color: #556c75;
          font-size: 14.5px;
          line-height: 1.75;
        }

        .welcomeReadMore {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 10px;
          padding: 13px 26px;
          min-height: 44px;
          border-radius: 28px;
          background: #003f3b;
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          transition: background .2s ease, transform .2s ease;
        }

        .welcomeReadMore:hover {
          background: #086157;
          transform: translateY(-2px);
        }

        .welcomeReadMore svg {
          width: 17px;
          height: 17px;
        }

        .welcomeSocial {
          margin-top: 32px;
        }

        .socialHeading {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 0 16px;
          color: #556c75;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2.5px;
        }

        .socialHeading span {
          height: 1px;
          background: #e2ece9;
          flex: 1;
        }

        .socialLinks {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .socialLink {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 18px;
          min-height: 64px;
          border-radius: 14px;
          color: #073e36;
          font-size: 15px;
          font-weight: 600;
          border: 1px solid #e5edeb;
          transition: border-color .2s ease;
        }

        .socialLink:hover {
          border-color: #c5ded7;
        }

        .twitterLink {
          background: #f2f7fc;
        }

        .facebookLink {
          background: #f1f4fa;
        }

        .socialIcon {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          color: #ffffff;
        }

        .twitterLink .socialIcon {
          background: #3998e6;
        }

        .facebookLink .socialIcon {
          background: #3b5998;
        }

        .socialIcon svg {
          width: 22px;
          height: 22px;
        }

        .socialLink > svg {
          width: 18px;
          height: 18px;
          margin-left: auto;
          flex-shrink: 0;
          color: #073e36;
        }

        .welcomeCollage {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1.08fr 1fr;
          gap: 14px;
          aspect-ratio: 1.38;
        }

        .welcomeWildlife, .welcomePhoto {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
        }

        .welcomeWildlife {
          grid-column: 1 / -1;
        }

        .welcomeCollage img {
          object-fit: cover;
          object-position: center;
        }

        .welcomePalm {
          position: absolute;
          left: -75px;
          top: 55px;
          z-index: -1;
          width: 220px;
          height: 370px;
          color: #d1dbd4;
          opacity: .45;
          transform: rotate(-13deg);
        }

        .welcomeLeaf {
          position: absolute;
          right: -50px;
          top: 30px;
          z-index: -1;
          width: 190px;
          height: 350px;
          color: #e2ece7;
          opacity: .4;
          transform: rotate(13deg);
        }

        .welcomeWave {
          display: none;
        }

        @media (max-width: 1200px) {
          .welcomeInner {
            gap: 36px;
            width: 90%;
          }
          .welcomeCopy h2 {
            font-size: 28px;
          }
          .socialLinks {
            gap: 12px;
          }
        }

        @media (max-width: 900px) {
          .welcomeSection {
            padding: 50px 0 65px;
          }
          .welcomeInner {
            grid-template-columns: 1fr;
            max-width: 620px;
            gap: 35px;
          }
          .welcomeCollage {
            aspect-ratio: 1.35;
          }
          .welcomeLeaf {
            top: auto;
            bottom: 75px;
          }
        }

        @media (max-width: 480px) {
          .welcomeSocial .socialLinks {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <section
        id="about"
        className="welcomeSection"
        aria-labelledby="welcome-title"
      >
        <svg
          className="welcomePalm"
          viewBox="0 0 200 330"
          aria-hidden="true"
        >
          <path
            d="M85 330C76 242 72 140 97 69"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
          <path
            d="M96 73C48 21 14 32 0 62c40-12 61-1 96 11ZM96 73C34 57 5 80 0 113c37-26 61-30 96-40ZM96 73C32 88 16 121 23 158c15-43 38-65 73-85ZM96 73c7-53 37-65 70-54-37 11-53 26-70 54ZM96 73c49-44 86-26 104 7-43-13-69-17-104-7ZM96 73c59-9 88 23 94 58-34-36-55-49-94-58ZM96 73c42 20 53 54 46 92-14-41-25-66-46-92Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className="welcomeLeaf"
          viewBox="0 0 180 340"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M21 335C39 236 103 149 142 16c52 57 48 137 8 199-33 47-72 65-113 71M142 16c-57 34-97 83-100 146-3 59 18 95 2 130M128 62l37 62M111 111l-61-7M94 154l64 22M76 196l-38-16M59 235l68 9"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        <div className="welcomeInner">
          <div className="welcomeCopy">
            <p className="welcomeEyebrow">WELCOME TO</p>
            <h2 id="welcome-title">
              TRAVEL TUBE LANKA <span>(PVT) LTD</span>
            </h2>
            <p>
              Your trusted partner for all travel and tourism services. We are
              committed to making your travel experience smooth, comfortable, and
              memorable.
            </p>
            <p>
              Our company provides a wide range of travel solutions for both local
              and international travelers. With a professional and friendly team,
              we help our clients plan their journeys with confidence and
              convenience.
            </p>
            <a
              className="welcomeReadMore"
              href="https://traveltube.lk/about-us.php"
            >
              READ MORE <Icon name="arrow" />
            </a>
            <div className="welcomeSocial">
              <p className="socialHeading">
                Visit Us On <span />
              </p>
              <div className="socialLinks">
                <a
                  className="socialLink twitterLink"
                  href="https://x.com/search?q=TravelTube%20Lanka&src=typed_query"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Find TravelTube Lanka on Twitter"
                >
                  <span className="socialIcon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M22.2 5.5a8.4 8.4 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8 11.9 11.9 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5 4.2 4.2 0 0 0 3.4 4.2 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.3a11.9 11.9 0 0 0 18.3-10 8.5 8.5 0 0 0 1.9-2.8Z" />
                    </svg>
                  </span>
                  <span>Twitter</span>
                  <Icon name="arrow" />
                </a>
                <a
                  className="socialLink facebookLink"
                  href="https://www.facebook.com/profile.php?id=61585560331201"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="socialIcon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M14.2 22v-9h3l.5-3.5h-3.5V7.3c0-1 .3-1.7 1.8-1.7h1.9V2.5a25 25 0 0 0-2.8-.2c-2.8 0-4.7 1.7-4.7 4.8v2.4H7.2V13h3.2v9Z" />
                    </svg>
                  </span>
                  <span>Facebook</span>
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>

          <div className="welcomeCollage">
            <div className="welcomeWildlife">
              <Image
                src="/images/welcome-wildlife.jpg"
                alt="A leopard resting on a tree branch"
                fill
                sizes="(max-width: 900px) 90vw, 42vw"
              />
            </div>
            <div className="welcomePhoto">
              <Image
                src="/images/welcome-coast.jpg"
                alt="A traveler watching sea turtles in the shallow water at a Sri Lankan beach"
                fill
                sizes="(max-width: 900px) 44vw, 21vw"
              />
            </div>
            <div className="welcomePhoto">
              <Image
                src="/images/welcome-heritage.jpg"
                alt="An ancient brick stupa surrounded by trees in Sri Lanka"
                fill
                sizes="(max-width: 900px) 44vw, 21vw"
              />
            </div>
          </div>
        </div>

        <svg
          className="welcomeWave"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 53C216 30 261 160 547 108S1031 104 1440 0v120H0Z"
            fill="#e6f0f1"
          />
          <path
            d="M0 93C321 46 449 157 794 115S1250 5 1440 80v40H0Z"
            fill="#edf5f5"
          />
        </svg>
      </section>
    </>
  );
}
