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
          margin-top: 34px;
          padding: 68px 0 78px;
          background: #fdfdfc;
        }
        .welcomeInner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 65px;
          width: min(1400px, 84%);
          margin: 0 auto;
        }
        .welcomeEyebrow {
          position: relative;
          margin: 0 0 10px;
          padding-top: 19px;
          color: #626462;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 6px;
        }
        .welcomeEyebrow::before { content: ""; position: absolute; top: 0; left: 0; width: 55px; height: 2px; background: #ef912c; }
        .welcomeCopy h2 {
          margin: 0 0 19px;
          color: #106273;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(25px, 2.32vw, 39px);
          font-weight: 700;
          letter-spacing: -.6px;
          line-height: 1.25;
        }
        .welcomeCopy h2 span { color: #ed8a28; white-space: nowrap; }
        .welcomeCopy > p:not(.welcomeEyebrow) { margin: 0 0 15px; color: #747573; font-size: 14px; line-height: 1.75; }
        .welcomeReadMore {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 27px;
          margin-top: 7px;
          padding: 16px 21px;
          min-width: 182px;
          border-radius: 11px;
          background: #0f6776;
          color: white;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 10px 24px #0f677613;
          transition: background .2s;
        }
        .welcomeReadMore:hover { background: #094f5d; }
        .welcomeReadMore svg { width: 20px; height: 20px; }
        .welcomeSocial { margin-top: 27px; }
        .socialHeading { display: flex; align-items: center; gap: 17px; margin: 0 0 15px; color: #767774; font-size: 12px; letter-spacing: 3px; }
        .socialHeading span { height: 1px; background: #e7e9e8; flex: 1; }
        .socialLinks { display: grid; grid-template-columns: 1fr 1fr; gap: 23px; }
        .socialLink {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 18px;
          min-height: 64px;
          border-radius: 13px;
          color: #303735;
          font-size: 16px;
          font-weight: 600;
          transition: box-shadow .2s;
        }
        .socialLink:hover { box-shadow: 0 5px 18px #123f3814; }
        .twitterLink { background: #eaf3fc; }
        .facebookLink { background: #ebeff9; }
        .socialIcon { display: grid; place-items: center; flex-shrink: 0; width: 39px; height: 39px; border-radius: 50%; color: white; }
        .twitterLink .socialIcon { background: #45a7f9; }
        .facebookLink .socialIcon { background: #4464a1; }
        .socialIcon svg { width: 25px; height: 25px; }
        .socialLink > svg { width: 21px; height: 21px; margin-left: auto; flex-shrink: 0; color: #6d7476; }
        .welcomeCollage { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1.08fr 1fr; gap: 12px; aspect-ratio: 1.39; }
        .welcomeWildlife, .welcomePhoto { position: relative; overflow: hidden; border-radius: 15px; }
        .welcomeWildlife { grid-column: 1 / -1; }
        .welcomeCollage img { object-fit: cover; object-position: center; }
        .welcomePalm { position: absolute; left: -75px; top: 55px; z-index: -1; width: 220px; height: 370px; color: #e7ece7; opacity: .55; transform: rotate(-13deg); }
        .welcomeLeaf { position: absolute; right: -50px; top: 30px; z-index: -1; width: 190px; height: 350px; color: #f4e6d0; opacity: .4; transform: rotate(13deg); }
        .welcomeWave { position: absolute; bottom: 0; left: 0; z-index: -1; width: 100%; height: 105px; }

        @media (max-width: 1200px) {
          .welcomeInner { gap: 36px; width: 88%; }
          .welcomeCopy h2 { font-size: 27px; }
          .welcomeCopy > p:not(.welcomeEyebrow) { font-size: 13px; }
          .socialLinks { gap: 12px; }
          .socialLink { padding: 12px; gap: 10px; font-size: 14px; }
          .welcomeCollage { aspect-ratio: 1.15; }
        }
        @media (max-width: 900px) {
          .welcomeSection { padding: 50px 0 65px; }
          .welcomeInner { grid-template-columns: 1fr; max-width: 640px; gap: 35px; }
          .welcomeCopy h2 { font-size: clamp(26px, 4.6vw, 36px); }
          .welcomeCopy > p:not(.welcomeEyebrow) { font-size: 14px; }
          .welcomeCollage { aspect-ratio: 1.4; }
          .socialLink { padding: 14px 18px; font-size: 16px; }
          .welcomeLeaf { top: auto; bottom: 75px; }
        }
        @media (max-width: 430px) {
          .welcomeEyebrow { font-size: 14px; letter-spacing: 4px; }
          .welcomeCopy h2 { font-size: 27px; }
          .welcomeCopy > p:not(.welcomeEyebrow) { font-size: 13px; }
          .socialLinks { gap: 10px; }
          .socialLink { gap: 9px; padding: 12px 10px; font-size: 13px; }
          .socialIcon { width: 32px; height: 32px; }
          .socialIcon svg { width: 21px; height: 21px; }
          .socialLink > svg { width: 16px; height: 16px; }
          .welcomeCollage { gap: 9px; aspect-ratio: 1.25; }
          .welcomeWildlife, .welcomePhoto { border-radius: 11px; }
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
