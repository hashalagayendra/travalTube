"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // File input refs
  const topImageInputRef = useRef<HTMLInputElement>(null);
  const bottomLeftImageInputRef = useRef<HTMLInputElement>(null);
  const bottomRightImageInputRef = useRef<HTMLInputElement>(null);

  // Fetch initial data from /api/about and /api/about/why-choose
  useEffect(() => {
    async function fetchAboutData() {
      try {
        setIsLoading(true);
        // 1. Fetch Welcome section
        const res = await fetch("/api/about");
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          if (d.eyebrow) setEyebrow(d.eyebrow);
          if (d.titleMain) setTitleMain(d.titleMain);
          if (d.titleAccent) setTitleAccent(d.titleAccent);
          if (d.paragraph1) setParagraph1(d.paragraph1);
          if (d.paragraph2) setParagraph2(d.paragraph2);
          if (d.topImage) setTopImage(d.topImage);
          if (d.bottomLeftImage) setBottomLeftImage(d.bottomLeftImage);
          if (d.bottomRightImage) setBottomRightImage(d.bottomRightImage);
        }

        // 2. Fetch Why Choose Us pillars
        const resWhy = await fetch("/api/about/why-choose");
        const jsonWhy = await resWhy.json();
        if (jsonWhy.success && Array.isArray(jsonWhy.data) && jsonWhy.data.length > 0) {
          setWhyChooseCards(jsonWhy.data);
        }
      } catch (err) {
        console.error("Failed to load about data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAboutData();
  }, []);


  // Helper to compress uploaded images via Canvas to high-definition Base64
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (val: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.85);
          setImage(compressed);
        } else {
          if (typeof event.target?.result === "string") {
            setImage(event.target.result);
          }
        }
      };
      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

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

  const [isSavingWhyChoose, setIsSavingWhyChoose] = useState(false);
  const [whyChooseStatus, setWhyChooseStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSaveWhyChoose = async () => {
    try {
      setIsSavingWhyChoose(true);
      setWhyChooseStatus(null);
      const res = await fetch("/api/about/why-choose", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pillars: whyChooseCards }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWhyChooseStatus({
          type: "success",
          message: "✓ All 4 Why Choose Us pillars saved successfully to database!",
        });
        setTimeout(() => setWhyChooseStatus(null), 4000);
      } else {
        setWhyChooseStatus({
          type: "error",
          message: data.message || "Failed to save pillars.",
        });
      }
    } catch (err) {
      console.error("Pillars save error:", err);
      setWhyChooseStatus({
        type: "error",
        message: "Network or server error while saving pillars.",
      });
    } finally {
      setIsSavingWhyChoose(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setIsSaving(true);
      setSaveStatus(null);

      // Save Welcome Section
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eyebrow,
          titleMain,
          titleAccent,
          paragraph1,
          paragraph2,
          topImage,
          bottomLeftImage,
          bottomRightImage,
        }),
      });

      // Save Why Choose Us Section in parallel
      await fetch("/api/about/why-choose", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pillars: whyChooseCards }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveStatus({
          type: "success",
          message: "✓ All About Us sections (Welcome & 4 Pillars) saved successfully to database!",
        });
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus({
          type: "error",
          message: data.message || "Failed to save About Us changes.",
        });
      }
    } catch (err) {
      console.error("About Us save error:", err);
      setSaveStatus({
        type: "error",
        message: "Network or server error while saving changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };


  const handleReset = async () => {
    if (confirm("Reset all About Us content back to default values?")) {
      const defaultData = {
        eyebrow: "WELCOME TO",
        titleMain: "Travel Tube Lanka",
        titleAccent: "(Pvt) Ltd",
        paragraph1:
          "Welcome to TRAVEL TUBE LANKA (PVT) LTD, your trusted partner for all travel and tourism services. We are committed to making your travel experience smooth, comfortable, and memorable.",
        paragraph2:
          "Our company provides a wide range of travel solutions for both local and international travelers. With a professional and friendly team, we help our clients plan their journeys with confidence and convenience.",
        topImage: "/images/about-collage-leopard-hd.jpg",
        bottomLeftImage: "/images/about-collage-turtle-hd.jpg",
        bottomRightImage: "/images/about-collage-stupa-hd.jpg",
      };

      setEyebrow(defaultData.eyebrow);
      setTitleMain(defaultData.titleMain);
      setTitleAccent(defaultData.titleAccent);
      setParagraph1(defaultData.paragraph1);
      setParagraph2(defaultData.paragraph2);
      setTopImage(defaultData.topImage);
      setBottomLeftImage(defaultData.bottomLeftImage);
      setBottomRightImage(defaultData.bottomRightImage);

      try {
        await fetch("/api/about", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(defaultData),
        });
        setSaveStatus({
          type: "success",
          message: "Reset to default values and synchronized with database.",
        });
        setTimeout(() => setSaveStatus(null), 3000);
      } catch (err) {
        console.error("Reset error:", err);
      }
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
            disabled={isSaving}
            onClick={() => handleSave()}
            style={{
              background: isSaving ? "#94a3b8" : "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 20px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: isSaving ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {isSaving ? "Saving to Database..." : "Save About Changes"}
          </button>
        </div>
      </div>

      {/* Save Notification / Status Alert */}
      {saveStatus && (
        <div
          style={{
            background: saveStatus.type === "success" ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${saveStatus.type === "success" ? "#a7f3d0" : "#fecaca"}`,
            color: saveStatus.type === "success" ? "#065f46" : "#991b1b",
            padding: "12px 18px",
            borderRadius: "10px",
            fontSize: "13.5px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "16px" }}>{saveStatus.type === "success" ? "✓" : "⚠️"}</span>
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div style={{ textAlign: "center", padding: "16px", color: "#64748b", fontSize: "14px" }}>
          Loading active About Us content from database...
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
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Top Wide Photo */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                  Top Wide Photo (Leopard / Hero Landscape)
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="text"
                    value={topImage}
                    onChange={(e) => setTopImage(e.target.value)}
                    style={{ flex: 1, padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                    placeholder="Image URL or Base64 data..."
                  />
                  <input
                    type="file"
                    ref={topImageInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(e, setTopImage)}
                  />
                  <button
                    type="button"
                    onClick={() => topImageInputRef.current?.click()}
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      padding: "9px 14px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    📁 Upload Photo
                  </button>
                  {topImage && (
                    <div style={{ width: "44px", height: "44px", borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1", position: "relative", flexShrink: 0 }}>
                      <img src={topImage} alt="Top Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Pair */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {/* Bottom Left Photo */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                    Bottom Left Photo (Turtle / Coast)
                  </label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      type="text"
                      value={bottomLeftImage}
                      onChange={(e) => setBottomLeftImage(e.target.value)}
                      style={{ flex: 1, padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                      placeholder="Image URL or Base64..."
                    />
                    <input
                      type="file"
                      ref={bottomLeftImageInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageUpload(e, setBottomLeftImage)}
                    />
                    <button
                      type="button"
                      onClick={() => bottomLeftImageInputRef.current?.click()}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        padding: "9px 12px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      📁 Upload
                    </button>
                    {bottomLeftImage && (
                      <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1", position: "relative", flexShrink: 0 }}>
                        <img src={bottomLeftImage} alt="Bottom Left Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Right Photo */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                    Bottom Right Photo (Ancient Stupa / Heritage)
                  </label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      type="text"
                      value={bottomRightImage}
                      onChange={(e) => setBottomRightImage(e.target.value)}
                      style={{ flex: 1, padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                      placeholder="Image URL or Base64..."
                    />
                    <input
                      type="file"
                      ref={bottomRightImageInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => handleImageUpload(e, setBottomRightImage)}
                    />
                    <button
                      type="button"
                      onClick={() => bottomRightImageInputRef.current?.click()}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        padding: "9px 12px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      📁 Upload
                    </button>
                    {bottomRightImage && (
                      <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", border: "1px solid #cbd5e1", position: "relative", flexShrink: 0 }}>
                        <img src={bottomRightImage} alt="Bottom Right Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
            <button
              type="submit"
              disabled={isSaving}
              style={{
                background: isSaving ? "#94a3b8" : "#073e36",
                color: "#ffffff",
                border: "none",
                padding: "11px 26px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: isSaving ? "not-allowed" : "pointer",
              }}
            >
              {isSaving ? "Saving..." : "Update Welcome Statement"}
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

        {/* Section 2 Save Alert */}
        {whyChooseStatus && (
          <div
            style={{
              background: whyChooseStatus.type === "success" ? "#ecfdf5" : "#fef2f2",
              border: `1px solid ${whyChooseStatus.type === "success" ? "#a7f3d0" : "#fecaca"}`,
              color: whyChooseStatus.type === "success" ? "#065f46" : "#991b1b",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            <span>{whyChooseStatus.type === "success" ? "✓" : "⚠️"}</span>
            <span>{whyChooseStatus.message}</span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <button
            type="button"
            disabled={isSavingWhyChoose}
            onClick={handleSaveWhyChoose}
            style={{
              background: isSavingWhyChoose ? "#94a3b8" : "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "11px 26px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: isSavingWhyChoose ? "not-allowed" : "pointer",
            }}
          >
            {isSavingWhyChoose ? "Saving Pillars..." : "Update Why Choose Us Pillars"}
          </button>
        </div>
      </div>
    </div>
  );
}
