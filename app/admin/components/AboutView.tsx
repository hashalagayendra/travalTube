"use client";

import { useState } from "react";
import Link from "next/link";

interface WhyChooseCard {
  id: number;
  title: string;
  description: string;
}

export function AboutView() {
  // Main Welcome & Introduction Content
  const [eyebrow, setEyebrow] = useState("WELCOME TO");
  const [titleMain, setTitleMain] = useState("Travel Tube Lanka");
  const [titleAccent, setTitleAccent] = useState("(Pvt) Ltd");
  const [paragraph1, setParagraph1] = useState(
    "Welcome to TRAVEL TUBE LANKA (PVT) LTD, your trusted partner for all travel and tourism services. We are committed to making your travel experience smooth, comfortable, and memorable."
  );
  const [paragraph2, setParagraph2] = useState(
    "Our company provides a wide range of travel solutions for both local and international travelers. With a professional and friendly team, we help our clients plan their journeys with confidence and convenience."
  );


  // Collage Images
  const [topImage, setTopImage] = useState("/images/about-collage-leopard-hd.jpg");
  const [bottomLeftImage, setBottomLeftImage] = useState("/images/about-collage-turtle-hd.jpg");
  const [bottomRightImage, setBottomRightImage] = useState("/images/about-collage-stupa-hd.jpg");

  // Why Choose Us Pillars
  const [whyChooseCards, setWhyChooseCards] = useState<WhyChooseCard[]>([
    {
      id: 1,
      title: "Professional Service",
      description: "Professional and friendly service to ensure your comfort throughout the journey.",
    },
    {
      id: 2,
      title: "Competitive Packages",
      description: "Competitive travel packages tailored to your budget without compromising quality.",
    },
    {
      id: 3,
      title: "Personalized Planning",
      description: "Tailor-made itineraries designed to suit your personal schedule, budget, and travel style.",
    },
    {
      id: 4,
      title: "24/7 Dedicated Support",
      description: "Round-the-clock local support to give you complete peace of mind while exploring Sri Lanka.",
    },
  ]);

  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavedNotification("About section changes saved successfully!");
    setTimeout(() => {
      setSavedNotification(null);
    }, 3500);
  };

  const handleReset = () => {
    if (confirm("Reset all About Us content back to default values?")) {
      setEyebrow("WELCOME TO");
      setTitleMain("Travel Tube Lanka");
      setTitleAccent("(Pvt) Ltd");
      setParagraph1(
        "Welcome to TRAVEL TUBE LANKA (PVT) LTD, your trusted partner for all travel and tourism services. We are committed to making your travel experience smooth, comfortable, and memorable."
      );
      setParagraph2(
        "Our company provides a wide range of travel solutions for both local and international travelers. With a professional and friendly team, we help our clients plan their journeys with confidence and convenience."
      );
      setTopImage("/images/about-collage-leopard-hd.jpg");
      setBottomLeftImage("/images/about-collage-turtle-hd.jpg");
      setBottomRightImage("/images/about-collage-stupa-hd.jpg");
      setSavedNotification("Reset to default values.");
      setTimeout(() => setSavedNotification(null), 3000);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Banner */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "24px 28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#073e36", margin: 0 }}>
              About Us Content Editor
            </h1>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "4px",
                background: "#ecfdf5",
                color: "#065f46",
              }}
            >
              Controls: /about Page & Homepage Welcome
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Manage the official company introduction statement, welcome paragraphs, collage images, and value pillars.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/about"
            target="_blank"
            style={{
              background: "#f1f5f9",
              border: "1px solid #cbd5e1",
              color: "#073e36",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ↗ View Live /about Page
          </Link>

          <Link
            href="/#about"
            target="_blank"
            style={{
              background: "#f1f5f9",
              border: "1px solid #cbd5e1",
              color: "#073e36",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ↗ View Homepage Welcome
          </Link>

          <button
            type="button"
            onClick={handleReset}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#64748b",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => handleSave()}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 20px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save About Changes
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {savedNotification && (
        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            color: "#065f46",
            padding: "12px 18px",
            borderRadius: "10px",
            fontSize: "13.5px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "16px" }}>✓</span>
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Form: Welcome & Company Introduction */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ marginBottom: "22px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#073e36", margin: "0 0 4px 0" }}>
            1. Welcome & Company Introduction Statement
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Configure the primary introduction text and company profile shown on both the /about page and homepage welcome section.
          </p>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Eyebrow & Title */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Eyebrow Tag
              </label>
              <input
                type="text"
                value={eyebrow}
                onChange={(e) => setEyebrow(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13.5px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Company Heading
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  value={titleMain}
                  onChange={(e) => setTitleMain(e.target.value)}
                  placeholder="Travel Tube Lanka"
                  style={{
                    flex: 2,
                    padding: "10px 14px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13.5px",
                  }}
                />
                <input
                  type="text"
                  value={titleAccent}
                  onChange={(e) => setTitleAccent(e.target.value)}
                  placeholder="(Pvt) Ltd"
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13.5px",
                    color: "#f0642b",
                    fontWeight: 700,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Paragraph 1 - Core Welcome & Commitment */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}>
                Paragraph #1 (Welcome Statement & Commitment)
              </label>
              <span style={{ fontSize: "11.5px", color: "#64748b" }}>Primary Introduction</span>
            </div>
            <textarea
              rows={4}
              value={paragraph1}
              onChange={(e) => setParagraph1(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13.5px",
                lineHeight: 1.6,
              }}
            />
          </div>

          {/* Paragraph 2 - Travel Solutions & Professional Team */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155" }}>
                Paragraph #2 (Travel Solutions & Professional Team)
              </label>
              <span style={{ fontSize: "11.5px", color: "#64748b" }}>Secondary Detail</span>
            </div>
            <textarea
              rows={4}
              value={paragraph2}
              onChange={(e) => setParagraph2(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13.5px",
                lineHeight: 1.6,
              }}
            />
          </div>


          {/* Collage Images */}
          <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#073e36", marginBottom: "14px" }}>
              Showcase Collage Photos (3 Photos)
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                  Top Wide Photo Path
                </label>
                <input
                  type="text"
                  value={topImage}
                  onChange={(e) => setTopImage(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                    Bottom Left Photo Path
                  </label>
                  <input
                    type="text"
                    value={bottomLeftImage}
                    onChange={(e) => setBottomLeftImage(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                    Bottom Right Photo Path
                  </label>
                  <input
                    type="text"
                    value={bottomRightImage}
                    onChange={(e) => setBottomRightImage(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
            <button
              type="submit"
              style={{
                background: "#073e36",
                color: "#ffffff",
                border: "none",
                padding: "11px 26px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Update Welcome Statement
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Why Choose Us Pillars */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ marginBottom: "18px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#073e36", margin: "0 0 4px 0" }}>
            2. Why Choose Us Highlights (4 Pillars)
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Features and trust points displayed under the welcome section on the /about page.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {whyChooseCards.map((card, idx) => (
            <div
              key={card.id}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    background: "#073e36",
                    color: "#ffffff",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setWhyChooseCards((prev) =>
                      prev.map((c) => (c.id === card.id ? { ...c, title: newTitle } : c))
                    );
                  }}
                  style={{
                    flex: 1,
                    padding: "6px 10px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#073e36",
                  }}
                />
              </div>
              <textarea
                rows={3}
                value={card.description}
                onChange={(e) => {
                  const newDesc = e.target.value;
                  setWhyChooseCards((prev) =>
                    prev.map((c) => (c.id === card.id ? { ...c, description: newDesc } : c))
                  );
                }}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "12.5px",
                  lineHeight: 1.5,
                  color: "#475569",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
