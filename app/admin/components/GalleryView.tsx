"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export interface GalleryItemData {
  id: number;
  title: string;
  location: string;
  category: "nature" | "wildlife" | "culture" | "beaches" | "adventure" | string;
  categoryLabel: string;
  image: string;
  description: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

const CATEGORY_OPTIONS = [
  { value: "nature", label: "Nature" },
  { value: "wildlife", label: "Wildlife" },
  { value: "culture", label: "Culture" },
  { value: "beaches", label: "Beaches" },
  { value: "adventure", label: "Adventure" },
];

export function GalleryView() {
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemData | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formCategory, setFormCategory] = useState("culture");
  const [formCategoryLabel, setFormCategoryLabel] = useState("Culture");
  const [formImage, setFormImage] = useState("/images/dest-mirissa.jpg");
  const [formDescription, setFormDescription] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/gallery", { cache: "no-store" });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setItems(json.data);
      }
    } catch (err) {
      console.error("Failed to load gallery items:", err);
      showNotice("error", "Could not load gallery items from database.");
    } finally {
      setIsLoading(false);
    }
  }

  const showNotice = (type: "success" | "error", text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormLocation("");
    setFormCategory("culture");
    setFormCategoryLabel("Culture");
    setFormImage("/images/dest-mirissa.jpg");
    setFormDescription("");
    setShowModal(true);
  };

  const handleOpenEdit = (item: GalleryItemData) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormLocation(item.location || "");
    setFormCategory(item.category || "culture");
    setFormCategoryLabel(item.categoryLabel || "Culture");
    setFormImage(item.image || "");
    setFormDescription(item.description || "");
    setShowModal(true);
  };

  const handleCategoryChange = (val: string) => {
    setFormCategory(val);
    const found = CATEGORY_OPTIONS.find((c) => c.value === val);
    setFormCategoryLabel(found ? found.label : val.charAt(0).toUpperCase() + val.slice(1));
  };

  // Canvas Image Compression (max 1600x1200, 85% JPEG)
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
    if (!formTitle.trim() || !formImage.trim()) {
      showNotice("error", "Please provide a title and an image.");
      return;
    }

    setIsSaving(true);
    try {
      if (editingItem) {
        // Update gallery item
        const res = await fetch("/api/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            title: formTitle.trim(),
            location: formLocation.trim(),
            category: formCategory,
            categoryLabel: formCategoryLabel.trim(),
            image: formImage.trim(),
            description: formDescription.trim(),
          }),
        });
        const json = await res.json();
        if (json.success) {
          showNotice("success", `Gallery photo "${formTitle.trim()}" updated successfully!`);
          await fetchGallery();
          setShowModal(false);
        } else {
          showNotice("error", json.message || "Failed to update gallery photo.");
        }
      } else {
        // Create new gallery item
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formTitle.trim(),
            location: formLocation.trim(),
            category: formCategory,
            categoryLabel: formCategoryLabel.trim(),
            image: formImage.trim(),
            description: formDescription.trim(),
          }),
        });
        const json = await res.json();
        if (json.success) {
          showNotice("success", `New gallery photo "${formTitle.trim()}" added successfully!`);
          await fetchGallery();
          setShowModal(false);
        } else {
          showNotice("error", json.message || "Failed to add gallery photo.");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      showNotice("error", "An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item: GalleryItemData) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    try {
      const res = await fetch(`/api/gallery?id=${item.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        showNotice("success", `Photo "${item.title}" deleted.`);
        await fetchGallery();
      } else {
        showNotice("error", json.message || "Failed to delete photo.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showNotice("error", "Could not delete photo.");
    }
  };

  const handleCopyUrl = (item: GalleryItemData) => {
    navigator.clipboard.writeText(item.image);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter & Search
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedFilter === "all" ||
      item.category?.toLowerCase() === selectedFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.location?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {notice && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            padding: "14px 22px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            background: notice.type === "success" ? "#073e36" : "#e11d48",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>{notice.type === "success" ? "✓" : "⚠"}</span>
          <span>{notice.text}</span>
        </div>
      )}

      {/* Top Header */}
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
              Photo Gallery Manager
            </h1>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "4px",
                background: "#ecfdf5",
                color: "#065f46",
                border: "1px solid #a7f3d0",
              }}
            >
              Database Connected
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Managing <strong>{items.length} travel photos</strong> showcased on the public gallery page (<code>/gallery</code>).
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/gallery"
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
            ↗ View Live /gallery
          </Link>

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
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 4px rgba(7,62,54,0.2)",
            }}
          >
            <span>+</span> Add Travel Photo
          </button>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "12px 18px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Photos" },
            { id: "beaches", label: "Beaches" },
            { id: "culture", label: "Culture" },
            { id: "wildlife", label: "Wildlife" },
            { id: "nature", label: "Nature" },
            { id: "adventure", label: "Adventure" },
          ].map((cat) => {
            const count =
              cat.id === "all"
                ? items.length
                : items.filter((i) => i.category?.toLowerCase() === cat.id).length;
            const active = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: active ? "#073e36" : "#f1f5f9",
                  color: active ? "#ffffff" : "#475569",
                  transition: "all 0.15s ease",
                }}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "7px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "12.5px",
              width: "220px",
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Loading Screen */}
      {isLoading ? (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "60px 20px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid #e2e8f0",
              borderTopColor: "#073e36",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: 500 }}>
            Loading gallery photos from database...
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
            padding: "60px 20px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          <p style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>
            No gallery photos found
          </p>
          <p style={{ fontSize: "13px", margin: 0 }}>
            {searchQuery
              ? "No photos match your search query."
              : "No photos in this category yet. Click '+ Add Travel Photo' to create one."}
          </p>
        </div>
      ) : (
        /* Photo Grid */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Photo Area */}
              <div
                style={{
                  height: "190px",
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  backgroundColor: "#e2e8f0",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    padding: "4px 9px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    background: "rgba(7,62,54,0.85)",
                    color: "#ffffff",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {item.categoryLabel || item.category}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: 600,
                    background: "rgba(0,0,0,0.6)",
                    color: "#ffffff",
                  }}
                >
                  #{item.id}
                </span>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: "0 0 4px",
                      lineHeight: "1.3",
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span>📍</span>
                    <span>{item.location || "Sri Lanka"}</span>
                  </div>
                  {item.description && (
                    <p
                      style={{
                        fontSize: "12.5px",
                        color: "#475569",
                        lineHeight: "1.5",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "14px",
                    marginTop: "14px",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  <button
                    onClick={() => handleCopyUrl(item)}
                    style={{
                      background: copiedId === item.id ? "#ecfdf5" : "#f8fafc",
                      border: "1px solid",
                      borderColor: copiedId === item.id ? "#a7f3d0" : "#e2e8f0",
                      color: copiedId === item.id ? "#065f46" : "#64748b",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {copiedId === item.id ? "✓ Copied!" : "🔗 Copy URL"}
                  </button>

                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        color: "#073e36",
                        padding: "5px 11px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      style={{
                        background: "#fff1f2",
                        border: "1px solid #fecdd3",
                        color: "#e11d48",
                        padding: "5px 11px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => !isSaving && setShowModal(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              maxWidth: "580px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              padding: "28px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#073e36", margin: 0 }}>
                  {editingItem ? "Edit Travel Photo" : "Add Travel Photo"}
                </h2>
                <p style={{ fontSize: "12.5px", color: "#64748b", margin: "3px 0 0" }}>
                  Photo will be displayed live on the public <code>/gallery</code> page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => !isSaving && setShowModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  color: "#94a3b8",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveModal} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Photo Title */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Golden Hour Coastal Sunset"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13.5px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Location */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Location *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mirissa, Southern Province"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13.5px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Category & Badge Label */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13.5px",
                      outline: "none",
                      background: "#ffffff",
                      boxSizing: "border-box",
                    }}
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                    Badge Label
                  </label>
                  <input
                    type="text"
                    value={formCategoryLabel}
                    onChange={(e) => setFormCategoryLabel(e.target.value)}
                    placeholder="e.g. Beaches"
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: "8px",
                      border: "1px solid #cbd5e1",
                      fontSize: "13.5px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Description / Caption
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description of this travel photo..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "8px",
                    border: "1px solid #cbd5e1",
                    fontSize: "13px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Image Upload & Live Preview */}
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Photo Image *
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />

                {/* Image Preview Box */}
                {formImage ? (
                  <div
                    style={{
                      position: "relative",
                      borderRadius: "10px",
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      height: "180px",
                      backgroundImage: `url(${formImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        background: "rgba(0,0,0,0.75)",
                        color: "#ffffff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      📷 Change Photo
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: "2px dashed #cbd5e1",
                      borderRadius: "10px",
                      padding: "24px",
                      textAlign: "center",
                      cursor: "pointer",
                      marginBottom: "10px",
                      background: "#f8fafc",
                    }}
                  >
                    <span style={{ fontSize: "28px", display: "block", marginBottom: "6px" }}>📸</span>
                    <strong style={{ fontSize: "13px", color: "#334155" }}>
                      Click to upload photo
                    </strong>
                    <span style={{ fontSize: "11.5px", color: "#94a3b8", display: "block" }}>
                      PNG, JPG, WebP up to 10MB (auto-compressed to high-def web size)
                    </span>
                  </div>
                )}

                {/* Direct Image Path / URL Fallback */}
                <input
                  type="text"
                  placeholder="Or enter image URL path (e.g. /images/dest-mirissa.jpg)"
                  value={formImage.startsWith("data:") ? "" : formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#64748b",
                  }}
                />
              </div>

              {/* Modal Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  paddingTop: "14px",
                  borderTop: "1px solid #e2e8f0",
                  marginTop: "6px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={isSaving}
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    color: "#475569",
                    padding: "9px 18px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: isSaving ? "not-allowed" : "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    background: "#073e36",
                    border: "none",
                    color: "#ffffff",
                    padding: "9px 22px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: isSaving ? "not-allowed" : "pointer",
                    boxShadow: "0 2px 4px rgba(7,62,54,0.2)",
                  }}
                >
                  {isSaving ? "Saving..." : editingItem ? "Update Photo" : "Add Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
