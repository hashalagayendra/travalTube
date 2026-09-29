import { Brand } from "@/components/ui/Brand";

export function Footer() {
  return (
    <>
      <style>{`
        .footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 20px; padding: 28px 8%; border-top: 1px solid #123f3814; }
        .footer .brandMark { width: 45px; height: 40px; }
        .footer .brandName { font-size: 20px; }
        .footer .brandName em { font-size: 24px; }
        .footer .brandTagline { font-size: 5px; letter-spacing: 1.5px; }
        .footer > p { color: #6a746f; font-size: 11px; }
        .footer > small { color: #6a746f; font-size: 9px; }
        .footer > small a { text-decoration: underline; text-underline-offset: 3px; }

        @media (max-width: 700px) {
          .footer { padding-block: 25px; }
          .footer > p { display: none; }
          .footer > small { width: 100%; font-size: 8px; }
        }
      `}</style>
      <footer className="footer">
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
