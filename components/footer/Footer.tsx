import { Brand } from "@/components/ui/Brand";

export function Footer() {
  return (
    <>
      <style>{`
        .footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 32px 8%;
          background: #ffffff;
          border-top: 1px solid rgba(7, 62, 54, 0.1);
        }

        .footer .brandMark {
          width: 48px;
          height: 42px;
        }

        .footer .brandName {
          font-size: 21px;
          color: #073e36;
        }

        .footer .brandName em {
          font-family: "Segoe Script", "Brush Script MT", cursive;
          color: #f0642b;
          font-size: 24px;
        }

        .footer .brandTagline {
          font-size: 5.5px;
          letter-spacing: 1.5px;
          color: #073e36;
        }

        .footer > p {
          color: #556c75;
          font-size: 12px;
          font-weight: 500;
          margin: 0;
        }

        .footer > small {
          color: #556c75;
          font-size: 10px;
          margin: 0;
        }

        .footer > small a {
          color: #073e36;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color .2s;
        }

        .footer > small a:hover {
          color: #f06c2f;
        }

        @media (max-width: 700px) {
          .footer {
            padding-block: 28px;
          }
          .footer > p {
            display: none;
          }
          .footer > small {
            width: 100%;
            font-size: 9px;
          }
        }
      `}</style>
      <footer id="contact" className="footer">
        <Brand />
        <p>Explore. Experience. Sri Lanka.</p>
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
      </footer>
    </>
  );
}
