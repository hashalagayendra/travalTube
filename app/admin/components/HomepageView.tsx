"use client";

import { useState } from "react";
import Link from "next/link";

export function HomepageView() {
  const [heroFirst, setHeroFirst] = useState("Discover the");
  const [heroSecond, setHeroSecond] = useState("Real");
  const [heroScript, setHeroScript] = useState("Sri Lanka");
  const [heroDesc, setHeroDesc] = useState(
    "Unforgettable journeys, authentic experiences and memories that last a lifetime."
  );

  interface TourCategory {
    id: number;
    title: string;
    badge: string;
    description: string;
    actionText: string;
    image: string;
    href: string;
    accent: "green" | "orange";
    isActive: boolean;
  }

  const [categories, setCategories] = useState<TourCategory[]>([
    {
      id: 1,
      title: "One Day Tours",
      badge: "Day Trips",
      description:
        "Feel with the nature in Sri Lanka. Can you arrange a trip on a day? We give you amazing and adventure feeling. Cover the most attractive areas within one day.",
      actionText: "Explore Tours",
      image: "/images/day-tours.jpg",
      href: "/#packages",
      accent: "green",
      isActive: true,
    },
    {
      id: 2,
      title: "Round Tours",
      badge: "Multi-Day",
      description:
        "In every country there are hidden places and stories. Explore ancient cultures, legends and history. Sri Lanka is the best destination to fulfill your travel diary.",
      actionText: "Explore Journeys",
      image: "/images/sigiriya.jpg",
      href: "/#packages",
      accent: "orange",
      isActive: true,
    },
    {
      id: 3,
      title: "Plan your Trip",
      badge: "Tailor-Made",
      description:
        "Planning a trip is the hardest part of traveling. We will help you to arrange your trip, schedule your valuable time and choose the best routes with a cost-effective plan.",
      actionText: "Start Planning",
      image: "/images/package-13.jpg",
      href: "/contact",
      accent: "green",
      isActive: true,
    },
  ]);

  const handleUpdateCategory = (id: number, field: keyof TourCategory, value: string | boolean) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleMoveCategory = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    const updated = [...categories];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setCategories(updated);
  };

  const [searchJourneys] = useState([
    {
      name: "The Cultural Triangle",
      tags: "Sigiriya · Dambulla · Kandy",
      description: "Follow ancient footsteps, climb the Lion Rock and discover the island's living heritage.",
      days: "7 days",
      style: "Culture & heritage",
    },
    {
      name: "Into the Hill Country",
      tags: "Ella · Nuwara Eliya · Kandy",
      description: "Slow train rides, misty mountain mornings and a cup of tea straight from the hills.",
      days: "5 days",
      style: "Nature & adventure",
    },
    {
      name: "A Little Coastal Bliss",
      tags: "Galle · Mirissa · Bentota",
      description: "Find your rhythm between golden beaches, ocean sunsets and charming coastal towns.",
      days: "6 days",
      style: "Beaches & relaxation",
    },
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Banner */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "24px 28px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#073e36", margin: 0 }}>
              Homepage & Hero Section Editor
            </h1>
            <span style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "4px",
              background: "#ecfdf5",
              color: "#065f46"
            }}>
              Controls: app/page.tsx
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Adjust the main hero banner, homepage tour category cards, and search modal journeys.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            href="/"
            target="_blank"
            style={{
              background: "#f1f5f9",
              border: "1px solid #cbd5e1",
              color: "#073e36",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            ↗ Preview Live Homepage
          </Link>
          <button
            onClick={() => alert("Homepage configuration updated successfully!")}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 20px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Save Homepage Changes
          </button>
        </div>
      </div>

      {/* Hero Section Live Editor */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            1. Hero Section Banner (HeroSection.tsx)
          </h2>
          <span style={{ fontSize: "12px", color: "#64748b" }}>Live preview below</span>
        </div>

        {/* Live Preview Box */}
        <div style={{
          height: "200px",
          borderRadius: "12px",
          backgroundImage: "linear-gradient(rgba(7, 62, 54, 0.75), rgba(7, 29, 22, 0.85)), url(/images/sigiriya.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          padding: "28px",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "24px",
          position: "relative"
        }}>
          <h3 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
            {heroFirst} <span style={{ color: "#ffffff" }}>{heroSecond}</span>{" "}
            <em style={{ color: "#f0642b", fontFamily: "cursive", fontStyle: "normal" }}>{heroScript}</em>
          </h3>
          <p style={{ fontSize: "14px", color: "#bad3cc", margin: 0, maxWidth: "500px" }}>
            {heroDesc}
          </p>
        </div>

        {/* Edit Inputs Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Headline Part 1
            </label>
            <input
              type="text"
              value={heroFirst}
              onChange={(e) => setHeroFirst(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Headline Part 2 (Bold Accent)
            </label>
            <input
              type="text"
              value={heroSecond}
              onChange={(e) => setHeroSecond(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Script Font Word (e.g. Sri Lanka)
            </label>
            <input
              type="text"
              value={heroScript}
              onChange={(e) => setHeroScript(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
            />
          </div>

          <div style={{ gridColumn: "span 3" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Hero Subtitle Tagline
            </label>
            <textarea
              rows={2}
              value={heroDesc}
              onChange={(e) => setHeroDesc(e.target.value)}
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
            />
          </div>
        </div>
      </div>

      {/* 2. Tour Categories & Options Section (TourOptionsSection.tsx) */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "18px",
        padding: "30px",
        boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.03), 0 2px 6px -1px rgba(15, 23, 42, 0.02)"
      }}>
        {/* Section Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          paddingBottom: "18px",
          borderBottom: "1px solid #f1f5f9",
          flexWrap: "wrap",
          gap: "14px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#073e36",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.3px" }}>
                    2. Tour Categories & Options
                  </h2>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#475569",
                    fontFamily: "monospace"
                  }}>
                    TourOptionsSection.tsx
                  </span>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    background: "#ecfdf5",
                    color: "#065f46",
                    border: "1px solid #a7f3d0",
                    padding: "3px 9px",
                    borderRadius: "20px"
                  }}>
                    3 Fixed Homepage Categories
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>
                  Manage the 3 entrance cards floating directly beneath the hero section on the homepage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Elevated Categories Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
          {categories.map((cat, idx) => {
            const isGreen = cat.accent === "green";
            const badgeBg = isGreen ? "#e6f3e5" : "#fff0e8";
            const badgeColor = isGreen ? "#073e36" : "#f0642b";

            return (
              <div
                key={cat.id}
                style={{
                  background: "#ffffff",
                  border: cat.isActive ? "1px solid #e2e8f0" : "1px dashed #cbd5e1",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: cat.isActive ? "0 4px 14px rgba(0,0,0,0.04)" : "none",
                  opacity: cat.isActive ? 1 : 0.75,
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s ease"
                }}
              >
                {/* 1. Card Top Toolbar (Ordering, Status & Delete) */}
                <div style={{
                  padding: "12px 18px",
                  background: "#f8fafc",
                  borderBottom: "1px solid #edf2f7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#475569",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      padding: "2px 8px",
                      borderRadius: "6px"
                    }}>
                      Position #{idx + 1}
                    </span>

                    {/* Order Arrows */}
                    <div style={{ display: "flex", gap: "3px" }}>
                      <button
                        type="button"
                        onClick={() => handleMoveCategory(idx, "up")}
                        disabled={idx === 0}
                        style={{
                          background: "#ffffff",
                          border: "1px solid #cbd5e1",
                          color: "#475569",
                          borderRadius: "4px",
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          cursor: idx === 0 ? "not-allowed" : "pointer",
                          opacity: idx === 0 ? 0.35 : 1
                        }}
                        title="Move Left/Up"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveCategory(idx, "down")}
                        disabled={idx === categories.length - 1}
                        style={{
                          background: "#ffffff",
                          border: "1px solid #cbd5e1",
                          color: "#475569",
                          borderRadius: "4px",
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          cursor: idx === categories.length - 1 ? "not-allowed" : "pointer",
                          opacity: idx === categories.length - 1 ? 0.35 : 1
                        }}
                        title="Move Right/Down"
                      >
                        ▼
                      </button>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {/* Active Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleUpdateCategory(cat.id, "isActive", !cat.isActive)}
                      style={{
                        background: cat.isActive ? "#ecfdf5" : "#f1f5f9",
                        color: cat.isActive ? "#065f46" : "#64748b",
                        border: `1px solid ${cat.isActive ? "#a7f3d0" : "#cbd5e1"}`,
                        borderRadius: "20px",
                        padding: "3px 9px",
                        fontSize: "11px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px"
                      }}
                    >
                      <span style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: cat.isActive ? "#10b981" : "#94a3b8",
                        boxShadow: cat.isActive ? "0 0 0 2px rgba(16,185,129,0.25)" : "none"
                      }} />
                      <span>{cat.isActive ? "Active on Live" : "Hidden"}</span>
                    </button>
                  </div>
                </div>

                {/* 2. Realistic Frontend Live Card Preview */}
                <div style={{
                  padding: "16px 18px 12px",
                  background: "#fbfcfd",
                  borderBottom: "1px solid #edf2f7"
                }}>
                  <div style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    color: "#94a3b8",
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <span>Live Frontend Preview</span>
                    <span style={{ color: badgeColor, textTransform: "none", fontWeight: 600 }}>
                      Accent: {isGreen ? "Emerald Green" : "Warm Orange"}
                    </span>
                  </div>

                  <div style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    border: "1px solid #e2eae6",
                    padding: "12px 12px 16px 12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                  }}>
                    {/* Media Container with Overlapping Icon Badge */}
                    <div style={{ position: "relative", width: "100%", marginBottom: "16px" }}>
                      <div style={{
                        width: "100%",
                        height: "120px",
                        borderRadius: "10px",
                        backgroundImage: `url(${cat.image || "/images/day-tours.jpg"})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }} />

                      {/* Floating Circular Icon Badge (Matches Frontend TourOptionsSection) */}
                      <div style={{
                        position: "absolute",
                        bottom: "-14px",
                        left: "14px",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: badgeBg,
                        color: badgeColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ffffff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                      }}>
                        {cat.title.toLowerCase().includes("day") ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                          </svg>
                        ) : cat.title.toLowerCase().includes("round") ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        )}
                      </div>

                      <span style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "rgba(0,0,0,0.6)",
                        backdropFilter: "blur(4px)",
                        color: "#ffffff",
                        fontSize: "9.5px",
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: "4px",
                        textTransform: "uppercase"
                      }}>
                        {cat.badge || "Featured"}
                      </span>
                    </div>

                    {/* Card Content Excerpt */}
                    <div style={{ padding: "0 4px" }}>
                      <h3 style={{
                        margin: "0 0 6px",
                        color: "#073e36",
                        fontFamily: "Georgia, serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        lineHeight: 1.25
                      }}>
                        {cat.title || "Category Title"}
                      </h3>
                      <p style={{
                        margin: "0 0 10px",
                        color: "#556c75",
                        fontSize: "12px",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        {cat.description || "Category description summary..."}
                      </p>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "6px",
                        borderTop: "1px solid #f1f5f9"
                      }}>
                        <span style={{
                          color: badgeColor,
                          fontSize: "12.5px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px"
                        }}>
                          <span>{cat.actionText || "Explore"}</span>
                          <span>→</span>
                        </span>
                        <span style={{ fontSize: "10.5px", color: "#94a3b8", fontFamily: "monospace" }}>
                          {cat.href}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Card Configuration Editor */}
                <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "4px" }}>
                        Category Title
                      </label>
                      <input
                        type="text"
                        value={cat.title}
                        onChange={(e) => handleUpdateCategory(cat.id, "title", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px", fontWeight: 600, color: "#0f172a" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "4px" }}>
                        Badge Pill (e.g. Day Trips)
                      </label>
                      <input
                        type="text"
                        value={cat.badge}
                        onChange={(e) => handleUpdateCategory(cat.id, "badge", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "4px" }}>
                        Button Action Text
                      </label>
                      <input
                        type="text"
                        value={cat.actionText}
                        onChange={(e) => handleUpdateCategory(cat.id, "actionText", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "4px" }}>
                        Accent Theme
                      </label>
                      <select
                        value={cat.accent}
                        onChange={(e) => handleUpdateCategory(cat.id, "accent", e.target.value as "green" | "orange")}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px", background: "#ffffff", fontWeight: 600 }}
                      >
                        <option value="green">🟢 Emerald Green</option>
                        <option value="orange">🟠 Warm Orange</option>
                      </select>
                    </div>

                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "4px" }}>
                        Image Path
                      </label>
                      <input
                        type="text"
                        value={cat.image}
                        onChange={(e) => handleUpdateCategory(cat.id, "image", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
                      />

                      {/* Preset Image Chips for 1-click photo switching */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                        <span style={{ fontSize: "10.5px", color: "#64748b", alignSelf: "center" }}>Quick photos:</span>
                        {[
                          { label: "Day Tours", path: "/images/day-tours.jpg" },
                          { label: "Sigiriya", path: "/images/sigiriya.jpg" },
                          { label: "Ella Hills", path: "/images/package-13.jpg" },
                          { label: "Wildlife", path: "/images/package-18.jpg" },
                          { label: "Beach", path: "/images/package-16.jpg" },
                        ].map((p) => (
                          <button
                            key={p.path}
                            type="button"
                            onClick={() => handleUpdateCategory(cat.id, "image", p.path)}
                            style={{
                              background: cat.image === p.path ? "#073e36" : "#f1f5f9",
                              color: cat.image === p.path ? "#ffffff" : "#475569",
                              border: `1px solid ${cat.image === p.path ? "#073e36" : "#cbd5e1"}`,
                              fontSize: "10.5px",
                              fontWeight: 600,
                              padding: "2px 7px",
                              borderRadius: "4px",
                              cursor: "pointer"
                            }}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "4px" }}>
                        Target Link (URL)
                      </label>
                      <input
                        type="text"
                        value={cat.href}
                        onChange={(e) => handleUpdateCategory(cat.id, "href", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
                        placeholder="e.g. /#packages or /contact"
                      />
                    </div>

                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "4px" }}>
                        Description Copy
                      </label>
                      <textarea
                        rows={2}
                        value={cat.description}
                        onChange={(e) => handleUpdateCategory(cat.id, "description", e.target.value)}
                        style={{ width: "100%", padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12px", lineHeight: "1.4" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End of 3 Categories */}
        </div>
      </div>

      {/* 3. Search Modal Journeys */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>
          3. Search Dialog Suggested Journeys (SearchDialog.tsx / data.ts)
        </h2>
        <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 18px 0" }}>
          These are the 3 quick-curated journeys that appear when users click &ldquo;Search your dream journey&rdquo; on the homepage.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {searchJourneys.map((j, idx) => (
            <div key={idx} style={{
              background: "#f8fafc",
              border: "1px solid #edf2f7",
              borderRadius: "10px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <strong style={{ fontSize: "15px", color: "#073e36", display: "block" }}>{j.name}</strong>
                <span style={{ fontSize: "12.5px", color: "#0f172a", display: "block", marginTop: "2px" }}>
                  📍 {j.tags} • ⏱️ {j.days}
                </span>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "4px 0 0" }}>
                  &ldquo;{j.description}&rdquo;
                </p>
              </div>
              <span style={{
                background: "#ecfdf5",
                color: "#065f46",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700
              }}>
                {j.style}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
