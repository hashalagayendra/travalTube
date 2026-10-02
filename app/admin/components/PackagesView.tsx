"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export interface TourPackage {
  id: number;
  name: string;
  days: string;
  locations: string;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  alt: string;
  featured?: boolean;
}

export const DEFAULT_PACKAGES: TourPackage[] = [
  {
    id: 14,
    name: "Classic Cultural Tour",
    days: "5 Days",
    locations: "Sigiriya / Kandy / Dambulla",
    description: "Explore ancient wonders, royal heritage and Sri Lanka’s rich cultural heart.",
    rating: 4.8,
    reviews: 120,
    image: "/images/sigiriya.jpg",
    alt: "Sigiriya rock fortress rising above lush green forest at sunset",
    featured: true,
  },
  {
    id: 16,
    name: "Culture & Heritage Tour",
    days: "7 Days",
    locations: "Kandy / Cultural Triangle / Sigiriya",
    description: "Discover sacred temples, royal palaces and UNESCO world heritage treasures.",
    rating: 4.9,
    reviews: 98,
    image: "/images/package-16.jpg",
    alt: "The illuminated Temple of the Tooth in Kandy",
    featured: true,
  },
  {
    id: 18,
    name: "Family Holidays Sri Lanka",
    days: "13 Days",
    locations: "Bentota / Yala / Ella / Kandy",
    description: "A joyful family journey combining wildlife safaris, scenic trains and sunny beaches.",
    rating: 4.9,
    reviews: 145,
    image: "/images/package-18.jpg",
    alt: "Buddhist statues and painted ceilings in a Sri Lankan cave temple",
    featured: true,
  },
  {
    id: 19,
    name: "Honeymoon in Paradise",
    days: "11 Days",
    locations: "Mirissa / Nuwara Eliya / Ella",
    description: "Romantic getaways with tea-plantation retreats, coastal sunsets and private dining.",
    rating: 5.0,
    reviews: 84,
    image: "/images/package-19.jpg",
    alt: "Ancient stone architecture and a Buddha statue in Polonnaruwa",
    featured: true,
  },
  {
    id: 20,
    name: "Beach Holiday Tour",
    days: "12 Days",
    locations: "Galle / Bentota / Mirissa",
    description: "Golden coastlines, turquoise waves, whale watching and tropical ocean breezes.",
    rating: 4.7,
    reviews: 110,
    image: "/images/package-20.jpg",
    alt: "Travelers relaxing under a blue umbrella on a Sri Lankan beach",
    featured: false,
  },
  {
    id: 3,
    name: "Yala Safari Adventure",
    days: "1 Day",
    locations: "Yala National Park / Tissamaharama",
    description: "Thrilling leopard tracking, wild elephants and vibrant birdlife on a guided safari.",
    rating: 4.8,
    reviews: 215,
    image: "/images/package-3.jpg",
    alt: "Elephants crossing a road beside a safari jeep",
    featured: false,
  },
  {
    id: 13,
    name: "Ella Scenic Highlands",
    days: "1 Day",
    locations: "Ella / Nine Arch Bridge / Little Adam’s Peak",
    description: "Iconic blue train journeys, mist-covered mountain peaks and roaring waterfalls.",
    rating: 4.9,
    reviews: 180,
    image: "/images/package-13.jpg",
    alt: "A blue train crossing the Nine Arch Bridge in Ella",
    featured: false,
  },
];

export function PackagesView() {
  const [packages, setPackages] = useState<TourPackage[]>(DEFAULT_PACKAGES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);

  // Form Fields
  const [formName, setFormName] = useState<string>("");
  const [formDays, setFormDays] = useState<string>("");
  const [formLocations, setFormLocations] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formImage, setFormImage] = useState<string>("");
  const [formAlt, setFormAlt] = useState<string>("");
  const [formRating, setFormRating] = useState<number>(4.9);
  const [formReviews, setFormReviews] = useState<number>(100);
  const [formFeatured, setFormFeatured] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/packages");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setPackages(json.data);
      }
    } catch (err) {
      console.error("Failed to load packages:", err);
      showNotice("error", "Could not load tour packages from database.");
    } finally {
      setIsLoading(false);
    }
  }

  const showNotice = (type: "success" | "error", text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingPackage(null);
    setFormName("");
    setFormDays("5 Days");
    setFormLocations("Sigiriya / Kandy / Nuwara Eliya");
    setFormDescription("");
    setFormImage("/images/sigiriya.jpg");
    setFormAlt("Scenic Sri Lanka Tour");
    setFormRating(4.9);
    setFormReviews(100);
    setFormFeatured(true);
    setShowModal(true);
  };

  const handleOpenEdit = (pkg: TourPackage) => {
    setEditingPackage(pkg);
    setFormName(pkg.name);
    setFormDays(pkg.days);
    setFormLocations(pkg.locations);
    setFormDescription(pkg.description);
    setFormImage(pkg.image);
    setFormAlt(pkg.alt);
    setFormRating(pkg.rating);
    setFormReviews(pkg.reviews);
    setFormFeatured(Boolean(pkg.featured));
    setShowModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showNotice("error", "Image file must be under 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const MAX_WIDTH = 1600;
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
            setFormImage(compressed);
          } else {
            if (typeof event.target?.result === "string") {
              setFormImage(event.target.result);
            }
          }
        };
        if (typeof event.target?.result === "string") {
          img.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formLocations.trim() || !formDescription.trim()) {
      showNotice("error", "Please fill in all required fields.");
      return;
    }

    setIsSaving(true);
    try {
      if (editingPackage) {
        // Update package
        const res = await fetch("/api/packages", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingPackage.id,
            name: formName.trim(),
            days: formDays.trim() || "1 Day",
            locations: formLocations.trim(),
            description: formDescription.trim(),
            image: formImage.trim() || "/images/sigiriya.jpg",
            alt: formAlt.trim() || `${formName.trim()} Tour`,
            rating: Number(formRating) || 4.9,
            reviews: Number(formReviews) || 100,
            featured: formFeatured,
          }),
        });
        const json = await res.json();
        if (json.success) {
          showNotice("success", `Tour package "${formName.trim()}" updated successfully!`);
          await fetchPackages();
          setShowModal(false);
        } else {
          showNotice("error", json.message || "Failed to update package.");
        }
      } else {
        // Create new package
        const res = await fetch("/api/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName.trim(),
            days: formDays.trim() || "1 Day",
            locations: formLocations.trim(),
            description: formDescription.trim(),
            image: formImage.trim() || "/images/sigiriya.jpg",
            alt: formAlt.trim() || `${formName.trim()} Tour`,
            rating: Number(formRating) || 4.9,
            reviews: Number(formReviews) || 100,
            featured: formFeatured,
          }),
        });
        const json = await res.json();
        if (json.success) {
          showNotice("success", `New tour package "${formName.trim()}" created successfully!`);
          await fetchPackages();
          setShowModal(false);
        } else {
          showNotice("error", json.message || "Failed to create package.");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      showNotice("error", "An error occurred while saving the package.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/packages?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        showNotice("success", `Tour package "${name}" deleted.`);
        await fetchPackages();
      } else {
        showNotice("error", json.message || "Failed to delete tour package.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showNotice("error", "Could not delete tour package.");
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm("Reset all tour packages back to system defaults? Any custom packages or edits will be replaced.")) {
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch("/api/packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEFAULT_PACKAGES),
      });
      const json = await res.json();
      if (json.success) {
        showNotice("success", "Reset to default tour packages successfully.");
        await fetchPackages();
      } else {
        showNotice("error", json.message || "Failed to reset tour packages.");
      }
    } catch (err) {
      console.error("Reset error:", err);
      showNotice("error", "Could not reset tour packages.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header Banner */}
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
              Tour Packages Manager
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
              Database Connected
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Currently managing <strong>{packages.length} active tour packages</strong> displayed in the interactive carousel on the homepage.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/#packages"
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
            ↗ View Live on Website
          </Link>

          <button
            type="button"
            onClick={handleResetDefaults}
            disabled={isSaving}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#64748b",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: isSaving ? "not-allowed" : "pointer",
            }}
          >
            Reset Defaults
          </button>

          <button
            onClick={handleOpenAdd}
            disabled={isSaving}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: isSaving ? "not-allowed" : "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>+</span> Add Tour Package
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {notice && (
        <div
          style={{
            background: notice.type === "success" ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${notice.type === "success" ? "#a7f3d0" : "#fecaca"}`,
            color: notice.type === "success" ? "#065f46" : "#b91c1c",
            padding: "12px 18px",
            borderRadius: "10px",
            fontSize: "13.5px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "16px" }}>{notice.type === "success" ? "✓" : "⚠"}</span>
          <span>{notice.text}</span>
        </div>
      )}

      {/* Packages Grid */}
      {isLoading ? (
        <div style={{ background: "#fff", padding: "40px", borderRadius: "16px", textAlign: "center", color: "#64748b" }}>
          Loading tour packages from database...
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Image Header with Live Badges */}
              <div
                style={{
                  height: "180px",
                  background: "#073e36",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {pkg.image && (
                  <Image
                    src={pkg.image}
                    alt={pkg.alt || pkg.name}
                    fill
                    unoptimized={Boolean(pkg.image?.startsWith("data:") || pkg.image?.startsWith("http"))}
                    style={{ objectFit: "cover" }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 50%, rgba(0,0,0,0.6) 100%)",
                  }}
                />

                <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px", zIndex: 2 }}>
                  <span
                    style={{
                      background: "#073e36",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    ID #{pkg.id}
                  </span>

                  <span
                    style={{
                      background: "rgba(0,0,0,0.75)",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    ⏱️ {pkg.days}
                  </span>

                  {pkg.featured && (
                    <span
                      style={{
                        background: "#f06c2f",
                        color: "#ffffff",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                      }}
                    >
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 700 }}>
                      ★ {pkg.rating} ({pkg.reviews} reviews)
                    </span>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>
                      Homepage Carousel
                    </span>
                  </div>

                  <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>
                    {pkg.name}
                  </h2>

                  <p style={{ fontSize: "12px", color: "#008b86", fontWeight: 600, margin: "0 0 10px" }}>
                    📍 {pkg.locations}
                  </p>

                  <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px", lineHeight: 1.5 }}>
                    {pkg.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "14px",
                    borderTop: "1px solid #edf2f7",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleDelete(pkg.id, pkg.name)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ef4444",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: "4px 8px",
                    }}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(pkg)}
                    style={{
                      background: "#073e36",
                      color: "#ffffff",
                      border: "none",
                      padding: "7px 16px",
                      borderRadius: "6px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Edit Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Add Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "640px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#073e36", margin: 0 }}>
                  {editingPackage ? `Edit: ${editingPackage.name}` : "Create New Tour Package"}
                </h2>
                <p style={{ fontSize: "12.5px", color: "#64748b", margin: "4px 0 0" }}>
                  Saved directly to MySQL <code>tour_packages</code> table
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "14px",
                  color: "#64748b",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Package Name */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Tour Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Classic Cultural Tour"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              {/* Duration & Locations */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={formDays}
                    onChange={(e) => setFormDays(e.target.value)}
                    placeholder="e.g. 5 Days, 1 Day"
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Locations Visited *
                  </label>
                  <input
                    type="text"
                    required
                    value={formLocations}
                    onChange={(e) => setFormLocations(e.target.value)}
                    placeholder="e.g. Sigiriya / Kandy / Dambulla"
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Short Overview Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Enter the short engaging summary for this tour package..."
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              {/* Rating, Reviews, Featured */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Rating (out of 5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formRating}
                    onChange={(e) => setFormRating(parseFloat(e.target.value) || 4.9)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Review Count
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formReviews}
                    onChange={(e) => setFormReviews(parseInt(e.target.value, 10) || 0)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Homepage Featured
                  </label>
                  <div style={{ display: "flex", alignItems: "center", height: "38px" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600, color: "#073e36" }}>
                      <input
                        type="checkbox"
                        checked={formFeatured}
                        onChange={(e) => setFormFeatured(e.target.checked)}
                        style={{ width: "18px", height: "18px", accentColor: "#073e36" }}
                      />
                      <span>Featured Tour</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Image Input & Upload */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Package Photo (Path or Device Upload)
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <input
                    type="text"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="e.g. /images/sigiriya.jpg or upload file below"
                    style={{ flex: 1, padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #cbd5e1",
                      padding: "9px 14px",
                      borderRadius: "8px",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    📁 Upload Photo
                  </button>
                </div>

                {/* Live Photo Preview */}
                {formImage && (
                  <div
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      height: "120px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <Image
                      src={formImage}
                      alt={formAlt || "Preview"}
                      fill
                      unoptimized={Boolean(formImage.startsWith("data:") || formImage.startsWith("http"))}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              {/* Alt Text */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  SEO Alt Text
                </label>
                <input
                  type="text"
                  value={formAlt}
                  onChange={(e) => setFormAlt(e.target.value)}
                  placeholder="e.g. Sigiriya rock fortress rising above lush green forest at sunset"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    padding: "9px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    background: "#073e36",
                    color: "#ffffff",
                    border: "none",
                    padding: "9px 20px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: isSaving ? "not-allowed" : "pointer",
                  }}
                >
                  {isSaving ? "Saving..." : editingPackage ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
