"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export function HomepageView() {
  const [heroFirst, setHeroFirst] = useState("Discover the");
  const [heroSecond, setHeroSecond] = useState("Real");
  const [heroScript, setHeroScript] = useState("Sri Lanka");
  const [heroDesc, setHeroDesc] = useState(
    "Unforgettable journeys, authentic experiences and memories that last a lifetime."
  );
  const [bgImage, setBgImage] = useState("/images/sigiriya.jpg");
  const [isSavingHero, setIsSavingHero] = useState(false);
  const [isLoadingHero, setIsLoadingHero] = useState(true);
  const [heroSaveStatus, setHeroSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  interface TourCategory {
    id: number;
    title: string;
    badge: string;
    description: string;
    actionText: string;
    image: string;
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
      isActive: true,
    },
  ]);

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSavingCategories, setIsSavingCategories] = useState(false);
  const [categoriesSaveStatus, setCategoriesSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load current hero banner & categories from MySQL via API
  useEffect(() => {
    async function loadInitialData() {
      try {
        setIsLoadingHero(true);
        setIsLoadingCategories(true);
        const [heroRes, catRes] = await Promise.all([
          fetch("/api/homepage/hero"),
          fetch("/api/homepage/categories"),
        ]);

        const heroJson = await heroRes.json();
        if (heroJson.success && heroJson.data) {
          if (heroJson.data.heroFirst) setHeroFirst(heroJson.data.heroFirst);
          if (heroJson.data.heroSecond) setHeroSecond(heroJson.data.heroSecond);
          if (heroJson.data.heroScript) setHeroScript(heroJson.data.heroScript);
          if (heroJson.data.heroDesc) setHeroDesc(heroJson.data.heroDesc);
          if (heroJson.data.bgImage) setBgImage(heroJson.data.bgImage);
        }

        const catJson = await catRes.json();
        if (catJson.success && Array.isArray(catJson.data) && catJson.data.length > 0) {
          setCategories(
            catJson.data.map((c: TourCategory) => ({
              id: c.id,
              title: c.title || "",
              badge: c.badge || "",
              description: c.description || "",
              actionText: c.actionText || "",
              image: c.image || "",
              isActive: true,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setIsLoadingHero(false);
        setIsLoadingCategories(false);
      }
    }
    loadInitialData();
  }, []);

  // Save changes to MySQL via PUT /api/homepage/hero (Targeting row id = 1 only)
  const handleSaveHero = async () => {
    try {
      setIsSavingHero(true);
      setHeroSaveStatus(null);
      const res = await fetch("/api/homepage/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heroFirst,
          heroSecond,
          heroScript,
          heroDesc,
          bgImage,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setHeroSaveStatus({
          type: "success",
          message: "✓ Hero section updated successfully in database!",
        });
        setTimeout(() => setHeroSaveStatus(null), 4000);
      } else {
        setHeroSaveStatus({
          type: "error",
          message: data.message || "Failed to update hero section.",
        });
      }
    } catch (err) {
      console.error("Hero save error:", err);
      setHeroSaveStatus({
        type: "error",
        message: "Network or server error while saving.",
      });
    } finally {
      setIsSavingHero(false);
    }
  };

  // Convert uploaded image directly to optimized Base64 data string
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        // High-definition web resize (max 1920x1080)
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
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
          // Compress to clean 85% JPEG to keep size lightweight (< 500KB)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          setBgImage(compressedDataUrl);
        } else {
          if (typeof event.target?.result === "string") {
            setBgImage(event.target.result);
          }
        }
      };
      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateCategory = (id: number, field: keyof TourCategory, value: string | boolean) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // Save all categories to MySQL via PUT /api/homepage/categories
  const handleSaveCategories = async () => {
    try {
      setIsSavingCategories(true);
      setCategoriesSaveStatus(null);
      const res = await fetch("/api/homepage/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCategoriesSaveStatus({
          type: "success",
          message: "✓ All 3 Categories saved successfully to database!",
        });
        setTimeout(() => setCategoriesSaveStatus(null), 4000);
      } else {
        setCategoriesSaveStatus({
          type: "error",
          message: data.message || "Failed to update categories.",
        });
      }
    } catch (err) {
      console.error("Categories save error:", err);
      setCategoriesSaveStatus({
        type: "error",
        message: "Network or server error while saving categories.",
      });
    } finally {
      setIsSavingCategories(false);
    }
  };

  // Client-side image upload and compression for category cards
  const handleCategoryImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
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
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
          handleUpdateCategory(id, "image", compressedDataUrl);
        } else {
          if (typeof event.target?.result === "string") {
            handleUpdateCategory(id, "image", event.target.result);
          }
        }
      };
      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
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
            onClick={async () => {
              await Promise.all([handleSaveHero(), handleSaveCategories()]);
            }}
            disabled={isSavingHero || isSavingCategories}
            style={{
              background: isSavingHero || isSavingCategories ? "#0a564b" : "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 20px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: isSavingHero || isSavingCategories ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 4px rgba(7, 62, 54, 0.2)"
            }}
          >
            {isSavingHero || isSavingCategories ? "Saving all..." : "Save Homepage Changes"}
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px 0" }}>
              1. Hero Section Banner (HeroSection.tsx)
            </h2>
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              Updates the singleton database record (row id: 1) in <code style={{ background: "#f1f5f9", padding: "2px 5px", borderRadius: "4px" }}>homepage_hero</code>
            </span>
          </div>

          <button
            onClick={handleSaveHero}
            disabled={isSavingHero}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              fontSize: "12.5px",
              fontWeight: 600,
              cursor: isSavingHero ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            {isSavingHero ? "Saving changes..." : "💾 Save Hero Section"}
          </button>
        </div>

        {/* Status Notification Banner */}
        {heroSaveStatus && (
          <div style={{
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "18px",
            fontSize: "13px",
            fontWeight: 600,
            background: heroSaveStatus.type === "success" ? "#ecfdf5" : "#fef2f2",
            border: heroSaveStatus.type === "success" ? "1px solid #a7f3d0" : "1px solid #fecaca",
            color: heroSaveStatus.type === "success" ? "#065f46" : "#991b1b",
          }}>
            {heroSaveStatus.message}
          </div>
        )}

        {/* Live Preview Box */}
        <div style={{
          height: "220px",
          borderRadius: "12px",
          backgroundImage: `linear-gradient(rgba(7, 62, 54, 0.75), rgba(7, 29, 22, 0.85)), url(${bgImage || "/images/sigiriya.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
          padding: "28px",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginBottom: "24px",
          position: "relative",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.2)"
        }}>
          {isLoadingHero && (
            <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: "20px", fontSize: "11px" }}>
              Loading from database...
            </div>
          )}
          <h3 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
            {heroFirst} <span style={{ color: "#ffffff" }}>{heroSecond}</span>{" "}
            <em style={{ color: "#f0642b", fontFamily: "cursive", fontStyle: "normal" }}>{heroScript}</em>
          </h3>
          <p style={{ fontSize: "14px", color: "#bad3cc", margin: 0, maxWidth: "560px", lineHeight: "1.5" }}>
            {heroDesc}
          </p>
        </div>

        {/* Edit Inputs Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Headline Part 1
            </label>
            <input
              type="text"
              value={heroFirst}
              onChange={(e) => setHeroFirst(e.target.value)}
              placeholder="Discover the"
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
              placeholder="Real"
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
              placeholder="Sri Lanka"
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
              placeholder="Unforgettable journeys, authentic experiences and memories that last a lifetime."
              style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
            />
          </div>

          {/* Background Image Controls (Direct Image Base64 or URL) */}
          <div style={{ gridColumn: "span 3", background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#073e36", marginBottom: "6px" }}>
              Hero Background Image (Supports Direct File Upload & Base64 or URLs)
            </label>
            <p style={{ fontSize: "11.5px", color: "#64748b", margin: "0 0 12px 0" }}>
              Upload an image file directly from your computer (saved as Base64 in MySQL) or paste an image URL.
            </p>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginBottom: "12px" }}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageFileUpload}
                style={{ display: "none" }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: "#073e36",
                  color: "#ffffff",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                📁 Choose Image from Computer
              </button>

              <button
                type="button"
                onClick={() => setBgImage("/images/sigiriya.jpg")}
                style={{
                  background: "#ffffff",
                  color: "#334155",
                  border: "1px solid #cbd5e1",
                  padding: "7px 12px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  cursor: "pointer"
                }}
              >
                Reset Default (/images/sigiriya.jpg)
              </button>

              {bgImage.startsWith("data:image") && (
                <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: 600 }}>
                  ✓ Direct image loaded ({Math.round(bgImage.length / 1024)} KB Base64)
                </span>
              )}
            </div>

            <input
              type="text"
              value={bgImage.startsWith("data:image") ? "[Direct Base64 Image Loaded]" : bgImage}
              onChange={(e) => setBgImage(e.target.value)}
              placeholder="e.g. /images/sigiriya.jpg or https://..."
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
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
          marginBottom: "20px",
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
                    {isLoadingCategories ? "Loading categories..." : "3 Active Database Categories"}
                  </span>
                </div>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "4px 0 0" }}>
                  Manage the 3 entrance cards floating directly beneath the hero section on the homepage.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveCategories}
            disabled={isSavingCategories}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "8px 18px",
              borderRadius: "8px",
              fontSize: "12.5px",
              fontWeight: 600,
              cursor: isSavingCategories ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 4px rgba(7, 62, 54, 0.15)"
            }}
          >
            {isSavingCategories ? "Saving changes..." : "💾 Save Tour Categories"}
          </button>
        </div>

        {/* Status Notification Banner */}
        {categoriesSaveStatus && (
          <div style={{
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "18px",
            fontSize: "13px",
            fontWeight: 600,
            background: categoriesSaveStatus.type === "success" ? "#ecfdf5" : "#fef2f2",
            border: categoriesSaveStatus.type === "success" ? "1px solid #a7f3d0" : "1px solid #fecaca",
            color: categoriesSaveStatus.type === "success" ? "#065f46" : "#991b1b",
          }}>
            {categoriesSaveStatus.message}
          </div>
        )}

        {/* Elevated Categories Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
          {categories.map((cat, idx) => {
            const isGreen = idx === 1 ? false : true;
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

                    <div style={{ gridColumn: "1 / -1" }}>
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

                    <div style={{ gridColumn: "1 / -1" }}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#475569", marginBottom: "4px" }}>
                        Image Path
                      </label>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <input
                          type="text"
                          value={cat.image}
                          onChange={(e) => handleUpdateCategory(cat.id, "image", e.target.value)}
                          style={{ flex: 1, padding: "8px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
                          placeholder="Image URL or upload"
                        />
                        <label
                          style={{
                            background: "#f8fafc",
                            border: "1px solid #cbd5e1",
                            color: "#334155",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px"
                          }}
                        >
                          📁 Upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCategoryImageUpload(cat.id, e)}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
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
    </div>
  );
}
