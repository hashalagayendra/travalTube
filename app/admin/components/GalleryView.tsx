"use client";

import { useState } from "react";

interface MediaItem {
  id: string;
  title: string;
  category: "Beaches" | "Culture" | "Wildlife" | "Nature";
  location: string;
  path: string;
  fileSize: string;
  dimensions: string;
}

export function GalleryView() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const mediaLibrary: MediaItem[] = [
    {
      id: "med-1",
      title: "Mirissa Palm Sunset",
      category: "Beaches",
      location: "Mirissa, Southern Province",
      path: "/images/dest-mirissa.jpg",
      fileSize: "1.02 MB",
      dimensions: "1920 × 1080"
    },
    {
      id: "med-2",
      title: "Sigiriya Ancient Citadel Pillar",
      category: "Culture",
      location: "Sigiriya, Matale",
      path: "/images/sigiriya.jpg",
      fileSize: "977 KB",
      dimensions: "2048 × 1365"
    },
    {
      id: "med-3",
      title: "Sri Lankan Leopard in Yala",
      category: "Wildlife",
      location: "Yala National Park",
      path: "/images/about-collage-leopard-hd.jpg",
      fileSize: "211 KB",
      dimensions: "1600 × 1066"
    },
    {
      id: "med-4",
      title: "Ella Nine Arch Bridge & Mist",
      category: "Nature",
      location: "Ella, Badulla District",
      path: "/images/dest-ella.jpg",
      fileSize: "1.09 MB",
      dimensions: "1920 × 1280"
    },
    {
      id: "med-5",
      title: "Galle Fort Colonial Ramparts",
      category: "Culture",
      location: "Galle Dutch Fort",
      path: "/images/dest-galle-fort.jpg",
      fileSize: "134 KB",
      dimensions: "1280 × 850"
    },
    {
      id: "med-6",
      title: "Hikkaduwa Shallow Coral Reef",
      category: "Beaches",
      location: "Hikkaduwa Beach",
      path: "/images/dest-hikkaduwa.jpg",
      fileSize: "123 KB",
      dimensions: "1200 × 800"
    },
  ];

  const filtered = mediaLibrary.filter(
    (item) => selectedFilter === "All" || item.category === selectedFilter
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Header & Azure Storage Status */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "24px 28px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#073e36", margin: 0 }}>
              Photo Gallery & Media Manager
            </h1>
            <span style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "4px",
              background: "#ecfdf5",
              color: "#065f46",
              border: "1px solid #a7f3d0"
            }}>
              ☁️ Azure Blob Storage Connected
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Upload, optimize, and organize high-resolution travel photography across website pages.
          </p>
        </div>

        <button
          onClick={() => alert("Upload Modal Triggered: Drag & drop images to Azure container.")}
          style={{
            background: "#073e36",
            color: "#ffffff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <span>📤</span> Upload Travel Photos
        </button>
      </div>

      {/* Drag & Drop Upload Zone Mockup */}
      <div style={{
        background: "#fbfcfd",
        border: "2px dashed #cbd5e1",
        borderRadius: "16px",
        padding: "36px 20px",
        textAlign: "center",
        cursor: "pointer",
        transition: "border-color 0.2s"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#ecfdf5",
          color: "#065f46",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          marginBottom: "12px"
        }}>
          📁
        </div>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
          Drag and drop your photos here, or browse files
        </h3>
        <p style={{ fontSize: "12.5px", color: "#64748b", margin: 0 }}>
          Supports High-Res WebP, JPG, and PNG up to 15MB each • Auto-optimized for web delivery
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All", "Beaches", "Culture", "Wildlife", "Nature"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            style={{
              padding: "7px 16px",
              borderRadius: "20px",
              fontSize: "12.5px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: selectedFilter === cat ? "#073e36" : "#ffffff",
              color: selectedFilter === cat ? "#ffffff" : "#475569",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
            }}
          >
            {cat === "All" ? `All Media (${mediaLibrary.length})` : cat}
          </button>
        ))}
      </div>

      {/* Media Grid Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "18px"
      }}>
        {filtered.map((item) => (
          <div key={item.id} style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div style={{
              height: "170px",
              backgroundImage: `url(${item.path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative"
            }}>
              <span style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "3px 8px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 600,
                background: "rgba(0,0,0,0.65)",
                color: "#ffffff",
                backdropFilter: "blur(4px)"
              }}>
                {item.category}
              </span>
            </div>

            <div style={{ padding: "16px" }}>
              <strong style={{ fontSize: "14px", color: "#0f172a", display: "block", marginBottom: "2px" }}>
                {item.title}
              </strong>
              <span style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "8px" }}>
                📍 {item.location}
              </span>
              <div style={{ fontSize: "11px", color: "#94a3b8", display: "flex", gap: "10px", marginBottom: "14px" }}>
                <span>{item.dimensions}</span>
                <span>•</span>
                <span>{item.fileSize}</span>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "12px",
                borderTop: "1px solid #edf2f7"
              }}>
                <button
                  onClick={() => alert(`Copied path: ${item.path}`)}
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    color: "#334155",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  🔗 Copy URL
                </button>

                <button
                  onClick={() => alert(`Delete confirmation for ${item.title}`)}
                  style={{
                    background: "#fff1f2",
                    border: "1px solid #fecdd3",
                    color: "#e11d48",
                    padding: "5px 10px",
                    borderRadius: "6px",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
