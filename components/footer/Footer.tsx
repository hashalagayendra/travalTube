import Link from "next/link";
import { Brand } from "@/components/ui/Brand";

export function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: #073e36;
          padding: 65px 0 28px;
          color: #cbe0da;
          position: relative;
        }

        .footer .brandName {
          color: #ffffff;
        }

        .footer .brandName em {
          color: #f0642b;
        }

        .footer .brandTagline {
          color: #ffb11b;
        }

        .footerInner {
          width: min(1360px, 92%);
          margin: 0 auto;
        }

        .footerGrid {
          display: grid;
          grid-template-columns: 1.35fr 1.05fr 0.85fr 1.15fr;
          gap: 40px;
          padding-bottom: 50px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footerCol {
          display: flex;
          flex-direction: column;
        }

        .footerBrandDesc {
          margin: 14px 0 18px;
          font-size: 13px;
          line-height: 1.65;
          color: #bad3cc;
        }

        .contactList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contactItem {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          line-height: 1.55;
          color: #cbe0da;
        }

        .contactItem svg {
          width: 17px;
          height: 17px;
          flex-shrink: 0;
          color: #e8a838;
          margin-top: 2px;
        }

        .contactItem a {
          color: #cbe0da;
          text-decoration: none;
          transition: color .2s ease;
        }

        .contactItem a:hover {
          color: #ffb11b;
        }

        .footerTitle {
          margin: 0 0 18px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.2px;
          position: relative;
          padding-bottom: 8px;
        }

        .footerTitle::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 28px;
          height: 2px;
          background: #e8a838;
        }

        .footerLinksList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .footerLinksList li a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          color: #cbe0da;
          text-decoration: none;
          transition: color .2s ease, transform .2s ease;
        }

        .footerLinksList li a::before {
          content: "›";
          color: #e8a838;
          font-size: 15px;
          line-height: 1;
          font-weight: 700;
          transition: transform .2s ease;
        }

        .footerLinksList li a:hover {
          color: #ffb11b;
          transform: translateX(4px);
        }

        .footerLinksList li a:hover::before {
          transform: translateX(2px);
        }

        .wantCardsList {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .wantCardItem {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 11px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          transition: background .2s ease, border-color .2s ease;
        }

        .wantCardItem:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(232, 168, 56, 0.45);
        }

        .wantCardTitle {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
          transition: color .2s ease;
        }

        .wantCardTitle:hover {
          color: #ffb11b;
        }

        .wantCardBtn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11.5px;
          font-weight: 700;
          color: #ffb11b;
          text-decoration: none;
          white-space: nowrap;
          transition: transform .2s ease, color .2s ease;
        }

        .wantCardBtn svg {
          width: 12px;
          height: 12px;
        }

        .wantCardItem:hover .wantCardBtn {
          transform: translateX(3px);
          color: #f0642b;
        }

        .footerBottomBar {
          padding-top: 24px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-size: 12px;
          color: #8faea6;
        }

        .footerBottomBar a {
          color: #cbe0da;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color .2s ease;
        }

        .footerBottomBar a:hover {
          color: #ffb11b;
        }

        @media (max-width: 1080px) {
          .footerGrid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
        }

        @media (max-width: 640px) {
          .footerGrid {
            grid-template-columns: 1fr;
            gap: 32px;
            padding-bottom: 35px;
          }
          .footer {
            padding: 50px 0 25px;
          }
          .footerBottomBar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>

      <footer id="contact" className="footer">
        <div className="footerInner">
          <div className="footerGrid">
            {/* Column 1: Company Info */}
            <div className="footerCol">
              <Brand />
              <p className="footerBrandDesc">
                Your trusted travel partner for authentic journeys, round tours,
                and personalized experiences across Sri Lanka.
              </p>

              <ul className="contactList">
                <li className="contactItem">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span>
                    Travel Tube Lanka (Pvt) Ltd,
                    <br />
                    452/01/A/01, Kandy Road, Kadawatha, Sri Lanka
                  </span>
                </li>

                <li className="contactItem">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>
                    <a href="tel:+94762399399">+94 76 2399399</a> /{" "}
                    <a href="tel:+94114399699">+94 11 4399699</a>
                  </span>
                </li>

                <li className="contactItem">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:info@traveltube.lk">info@traveltube.lk</a>
                </li>

                <li className="contactItem">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
                  </svg>
                  <a
                    href="https://traveltube.lk/about-us.php#"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.traveltube.lk
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: What You Want.? */}
            <div className="footerCol">
              <h3 className="footerTitle">What You Want.?</h3>
              <ul className="wantCardsList">
                <li className="wantCardItem">
                  <a
                    className="wantCardTitle"
                    href="https://traveltube.lk/tour-packages.php?id=1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    One day tour
                  </a>
                  <a
                    className="wantCardBtn"
                    href="https://traveltube.lk/tour-packages.php?id=1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View More{" "}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>

                <li className="wantCardItem">
                  <a
                    className="wantCardTitle"
                    href="https://traveltube.lk/tour-packages.php?id=2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Round Tour
                  </a>
                  <a
                    className="wantCardBtn"
                    href="https://traveltube.lk/tour-packages.php?id=2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View More{" "}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>

                <li className="wantCardItem">
                  <a
                    className="wantCardTitle"
                    href="https://traveltube.lk/plan-tour.php"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Plan your Tour
                  </a>
                  <a
                    className="wantCardBtn"
                    href="https://traveltube.lk/plan-tour.php"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View More{" "}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Useful Links */}
            <div className="footerCol">
              <h3 className="footerTitle">Useful Links</h3>
              <ul className="footerLinksList">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About us</Link>
                </li>
                <li>
                  <Link href="/#services">Services</Link>
                </li>
                <li>
                  <Link href="/#destinations">Destination</Link>
                </li>
                <li>
                  <Link href="/#packages">Thing to do</Link>
                </li>
                <li>
                  <Link href="/#gallery">Gallery</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Tour Packages */}
            <div className="footerCol">
              <h3 className="footerTitle">Tour Packages</h3>
              <ul className="footerLinksList">
                <li>
                  <a
                    href="https://traveltube.lk/view-tour.php?id=14"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Classic Mini Tour
                  </a>
                </li>
                <li>
                  <a
                    href="https://traveltube.lk/view-tour.php?id=15"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Seat in Coach Tour Sri Lanka
                  </a>
                </li>
                <li>
                  <a
                    href="https://traveltube.lk/view-tour.php?id=16"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Culture & Heritage Tour
                  </a>
                </li>
                <li>
                  <a
                    href="https://traveltube.lk/view-tour.php?id=17"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Esala Perahera Tour
                  </a>
                </li>
                <li>
                  <a
                    href="https://traveltube.lk/view-tour.php?id=18"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Family Holidays Sri Lanka
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footerBottomBar">
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} Travel Tube Lanka (Pvt) Ltd. All Rights
              Reserved.
            </p>
            <small>
              Photo:{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:Sigiriya_lion_rock_Luftbild_(29781058870).jpg"
                target="_blank"
                rel="noreferrer"
              >
                dronepicr
              </a>{" "}
              ·{" "}
              <a
                href="https://creativecommons.org/licenses/by/2.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY 2.0
              </a>{" "}
              · cropped for display
            </small>
          </div>
        </div>
      </footer>
    </>
  );
}
