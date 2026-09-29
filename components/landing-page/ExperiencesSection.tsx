export function ExperiencesSection() {
  return (
    <>
      <style>{`
        .sectionEyebrow { font-size: 9px; letter-spacing: 2.2px; font-weight: 700; color: #678177; margin: 0 0 17px; }
        .experiences { background: #eef0e7; padding: 65px 8%; text-align: center; }
        .experiences h2 { font-family: Georgia, serif; font-weight: 400; font-size: clamp(33px, 3.3vw, 48px); line-height: 1.15; letter-spacing: -1px; margin: 0; }
        .experiences h2 em { color: #a27834; font-weight: 400; }
        .experiences > div { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px 60px; font-size: 12px; color: #62786b; margin-top: 30px; }
        .experiences > div span::before { content: "✧"; color: #a27834; margin-right: 10px; }

        @media (max-width: 700px) {
          .experiences h2 { font-size: 36px; }
          .experiences { padding: 50px 8%; }
          .experiences > div { flex-direction: column; gap: 17px; }
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
