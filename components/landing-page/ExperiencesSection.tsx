export function ExperiencesSection() {
  return (
    <>
      <style>{`
        .experiences {
          background: #edf5f3;
          padding: 75px 8%;
          text-align: center;
        }

        .sectionEyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 600;
          color: #556c75;
          margin: 0 0 16px;
        }

        .sectionEyebrow::before,
        .sectionEyebrow::after {
          content: "";
          display: inline-block;
          width: 28px;
          height: 2px;
          background: #e8a838;
        }

        .experiences h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 500;
          font-size: clamp(33px, 3.4vw, 48px);
          line-height: 1.2;
          letter-spacing: -1px;
          color: #073e36;
          margin: 0;
        }

        .experiences h2 em {
          font-family: "Segoe Script", "Brush Script MT", cursive;
          color: #ffb11b;
          font-weight: 400;
          font-style: normal;
          letter-spacing: -2px;
          margin-left: 6px;
        }

        .experiences > div {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px 50px;
          font-size: 13.5px;
          font-weight: 600;
          color: #073e36;
          margin-top: 32px;
        }

        .experiences > div span {
          display: inline-flex;
          align-items: center;
        }

        .experiences > div span::before {
          content: "✧";
          color: #e8a838;
          font-size: 16px;
          margin-right: 10px;
        }

        @media (max-width: 700px) {
          .experiences {
            padding: 55px 8%;
          }
          .experiences h2 {
            font-size: 34px;
          }
          .experiences > div {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
      <section id="experiences" className="experiences">
        <p className="sectionEyebrow">MORE THAN A PLACE. A FEELING.</p>
        <h2>
          Make room for <em>the unexpected.</em>
        </h2>
        <div>
          <span>A sunrise above the clouds</span>
          <span>A home-cooked Sri Lankan meal</span>
          <span>A road that leads to the ocean</span>
        </div>
      </section>
    </>
  );
}
