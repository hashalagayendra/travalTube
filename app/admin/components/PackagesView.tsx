"use client";

import { useState } from "react";
import Link from "next/link";

interface TourPackage {
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

export function PackagesView() {
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);

  // Exact 7 tour packages from components/landing-page/PackagesSection.tsx
  const [packages, setPackages] = useState<TourPackage[]>([
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
  ]);

  const handleSave = (updated: TourPackage) => {
    if (editingPackage) {
      setPackages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } else {
      setPackages((prev) => [...prev, { ...updated, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
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
              Tour Packages Manager
            </h1>
            <span style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "4px",
              background: "#ecfdf5",
              color: "#065f46"
            }}>
              Directly controls: components/landing-page/PackagesSection.tsx
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Currently managing <strong>{packages.length} active tour packages</strong> displayed in the interactive carousel on the homepage.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
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
              textDecoration: "none"
            }}
          >
            ↗ View Live on Website
          </Link>

          <button
            onClick={() => {
              setEditingPackage(null);
              setShowModal(true);
            }}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>+</span> Add Tour Package
          </button>
        </div>
      </div>

      {/* Packages Grid mapped to frontend */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "20px"
      }}>
        {packages.map((pkg) => (
          <div key={pkg.id} style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            {/* Image Header with Live Badges */}
            <div style={{
              height: "170px",
              backgroundImage: `url(${pkg.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative"
            }}>
              <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px" }}>
                <span style={{
                  background: "#073e36",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "4px"
                }}>
                  ID #{pkg.id}
                </span>

                <span style={{
                  background: "rgba(0,0,0,0.7)",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: "4px"
                }}>
                  ⏱️ {pkg.days}
                </span>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "20px" }}>
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

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "14px",
                borderTop: "1px solid #edf2f7"
              }}>
                <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                  Image: <code>{pkg.image}</code>
                </span>

                <button
                  onClick={() => {
                    setEditingPackage(pkg);
                    setShowModal(true);
                  }}
                  style={{
                    background: "#073e36",
                    color: "#ffffff",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: "6px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Edit Package
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Package Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          padding: "20px"
        }}>
          <div style={{
            background: "#ffffff",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "640px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "28px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#073e36", margin: 0 }}>
                {editingPackage ? `Edit: ${editingPackage.name}` : "Create New Tour Package"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const updated: TourPackage = {
                  id: editingPackage ? editingPackage.id : Date.now(),
                  name: (form.elements.namedItem("name") as HTMLInputElement).value,
                  days: (form.elements.namedItem("days") as HTMLInputElement).value,
                  locations: (form.elements.namedItem("locations") as HTMLInputElement).value,
                  description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
                  image: (form.elements.namedItem("image") as HTMLInputElement).value,
                  alt: (form.elements.namedItem("alt") as HTMLInputElement).value,
                  rating: editingPackage?.rating || 4.9,
                  reviews: editingPackage?.reviews || 100,
                };
                handleSave(updated);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Tour Package Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingPackage?.name || ""}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Duration (e.g. 5 Days, 13 Days)
                </label>
                <input
                  name="days"
                  type="text"
                  required
                  defaultValue={editingPackage?.days || "5 Days"}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Locations Visited (slash-separated)
                </label>
                <input
                  name="locations"
                  type="text"
                  required
                  defaultValue={editingPackage?.locations || "Sigiriya / Kandy / Dambulla"}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Short Description
                </label>
                <textarea
                  name="description"
                  rows={2}
                  required
                  defaultValue={editingPackage?.description || ""}
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Image Path (in public/images)
                  </label>
                  <input
                    name="image"
                    type="text"
                    required
                    defaultValue={editingPackage?.image || "/images/sigiriya.jpg"}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Image SEO Alt Text
                  </label>
                  <input
                    name="alt"
                    type="text"
                    required
                    defaultValue={editingPackage?.alt || "Sigiriya rock fortress rising above lush green forest"}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ background: "#f1f5f9", border: "1px solid #cbd5e1", padding: "9px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: "#073e36", color: "#ffffff", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
                >
                  Update Frontend Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
