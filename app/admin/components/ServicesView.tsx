"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LucideIcon } from "@/components/ui/LucideIcon";

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "AIR TICKETING",
    description: "Domestic and international flight reservations at competitive prices.",
    icon: "Plane",
  },
  {
    id: 2,
    title: "PLAN YOUR TRIP",
    description: "Personalized travel planning according to your budget and preferences.",
    icon: "Map",
  },
  {
    id: 3,
    title: "ONE DAY TOURS",
    description: "Carefully designed day trips to popular attractions across Sri Lanka.",
    icon: "Calendar",
  },
  {
    id: 4,
    title: "VISA ASSISTANCE",
    description: "Guidance and support for visa applications and documentation.",
    icon: "FileText",
  },
  {
    id: 5,
    title: "ROUND TOURS",
    description: "Complete tour packages for individuals, families, and groups.",
    icon: "Globe",
  },
  {
    id: 6,
    title: "ACTIVITIES & DESTINATIONS",
    description: "Exciting activities and carefully selected destinations for unforgettable experiences.",
    icon: "Mountain",
  },
  {
    id: 7,
    title: "INBOUND & OUTBOUND TOURS",
    description: "Travel services for visitors coming into the country and travelers going abroad.",
    icon: "ArrowLeftRight",
  },
  {
    id: 8,
    title: "TRAVELLER'S CHEQUES",
    description: "Safe and convenient travel money services for your security.",
    icon: "CreditCard",
  },
  {
    id: 9,
    title: "AIRPORT TRANSFERS",
    description: "Comfortable and reliable airport pick-up and drop-off services.",
    icon: "Car",
  },
];

const SUGGESTED_LUCIDE_ICONS = [
  { name: "Plane", label: "Flights / Airline" },
  { name: "Map", label: "Trip Planning" },
  { name: "Calendar", label: "Day Tours" },
  { name: "FileText", label: "Visa / Documents" },
  { name: "Globe", label: "Round Tours" },
  { name: "Mountain", label: "Destinations / Adventure" },
  { name: "ArrowLeftRight", label: "Inbound / Outbound" },
  { name: "CreditCard", label: "Cheques / Currency" },
  { name: "Car", label: "Airport / Transfers" },
  { name: "Compass", label: "Navigation / Guide" },
  { name: "ShieldCheck", label: "Safety / Insurance" },
  { name: "Camera", label: "Sightseeing / Wildlife" },
  { name: "Luggage", label: "Baggage / Travel" },
  { name: "Clock", label: "24/7 Hours / Support" },
  { name: "HeartHandshake", label: "Hospitality" },
  { name: "Ticket", label: "Passes & Tickets" },
  { name: "Hotel", label: "Accommodation" },
  { name: "Palmtree", label: "Beaches & Resorts" },
];

export function ServicesView() {
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalDescription, setModalDescription] = useState<string>("");
  const [modalIcon, setModalIcon] = useState<string>("Plane");

  // Load services from API on mount
  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/services");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setServices(json.data);
      }
    } catch (err) {
      console.error("Failed to load services:", err);
      showNotice("error", "Could not load service cards from database.");
    } finally {
      setIsLoading(false);
    }
  }

  const showNotice = (type: "success" | "error", text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4000);
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setModalTitle("");
    setModalDescription("");
    setModalIcon("Plane");
    setShowModal(true);
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    setModalTitle(service.title);
    setModalDescription(service.description);
    setModalIcon(service.icon || "Plane");
    setShowModal(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim() || !modalDescription.trim()) {
      showNotice("error", "Please fill in all required fields.");
      return;
    }

    setIsSaving(true);
    try {
      if (editingService) {
        // Update existing card
        const res = await fetch("/api/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingService.id,
            title: modalTitle.trim(),
            description: modalDescription.trim(),
            icon: modalIcon.trim() || "Plane",
          }),
        });
        const json = await res.json();
        if (json.success) {
          showNotice("success", `Service card "${modalTitle.trim()}" updated successfully!`);
          await fetchServices();
          setShowModal(false);
        } else {
          showNotice("error", json.message || "Failed to update service card.");
        }
      } else {
        // Create new card
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: modalTitle.trim(),
            description: modalDescription.trim(),
            icon: modalIcon.trim() || "Plane",
          }),
        });
        const json = await res.json();
        if (json.success) {
          showNotice("success", `New service card "${modalTitle.trim()}" created successfully!`);
          await fetchServices();
          setShowModal(false);
        } else {
          showNotice("error", json.message || "Failed to create service card.");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      showNotice("error", "An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}"?`)) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        showNotice("success", `Service card "${title}" removed.`);
        await fetchServices();
      } else {
        showNotice("error", json.message || "Failed to delete service card.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showNotice("error", "Could not delete service card.");
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm("Reset all 9 Core Service cards back to system defaults? Any custom edits will be replaced.")) {
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch("/api/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DEFAULT_SERVICES),
      });
      const json = await res.json();
      if (json.success) {
        showNotice("success", "Reset to 9 default service cards successfully.");
        await fetchServices();
      } else {
        showNotice("error", json.message || "Failed to reset service cards.");
      }
    } catch (err) {
      console.error("Reset error:", err);
      showNotice("error", "Could not reset service cards.");
    } finally {
      setIsSaving(false);
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
              Our Services Page Manager
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
            Managing <strong>{services.length} Core Service Cards</strong> stored with <strong>Lucide React</strong> icon names.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/services"
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
            ↗ View Live /services Page
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
            <span>+</span> Add Service Card
          </button>
        </div>
      </div>

      {/* Notification Alert */}
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

      {/* Service Cards Grid (3x3 matching frontend) */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "26px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#073e36", margin: "0 0 4px 0" }}>
              Core Service Cards ({services.length} Total)
            </h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              Displayed in the responsive 3-column grid on the /services page.
            </p>
          </div>
          <span style={{ fontSize: "12px", color: "#166534", background: "#f0fdf4", padding: "4px 10px", borderRadius: "20px", fontWeight: 600 }}>
            ● All {services.length} cards live on /services
          </span>
        </div>

        {isLoading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b", fontSize: "14px" }}>
            Loading service cards from database...
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: "20px",
            }}
          >
            {services.map((service, idx) => (
              <div
                key={service.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "22px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#073e36",
                        background: "#f0fdfa",
                        border: "1px solid #ccfbf1",
                        padding: "3px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      Card #{idx + 1}
                    </span>
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "#c2410c",
                        background: "#fff7ed",
                        border: "1px solid #ffedd5",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontWeight: 600,
                        fontFamily: "monospace",
                      }}
                    >
                      {service.icon || "Plane"}
                    </span>
                  </div>

                  {/* Render Icon preview with Lucide */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#fff7ed",
                      border: "1px solid #fed7aa",
                      color: "#ed8a28",
                      display: "grid",
                      placeItems: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <LucideIcon name={service.icon} size={26} strokeWidth={1.9} />
                  </div>

                  <h3
                    style={{
                      fontSize: "15.5px",
                      fontWeight: 700,
                      color: "#073e36",
                      margin: "0 0 8px 0",
                      letterSpacing: "0.4px",
                      textTransform: "uppercase",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p style={{ fontSize: "13px", color: "#556c75", margin: 0, lineHeight: 1.55 }}>
                    {service.description}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "14px",
                    marginTop: "16px",
                    borderTop: "1px solid #edf2f7",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleDelete(service.id, service.title)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#ef4444",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: "4px 8px",
                    }}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(service)}
                    style={{
                      background: "#073e36",
                      color: "#ffffff",
                      border: "none",
                      padding: "7px 16px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Edit Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / Add Service Modal */}
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
              maxWidth: "580px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#073e36", margin: 0 }}>
                  {editingService ? `Edit: ${editingService.title}` : "Add New Service Card"}
                </h2>
                <p style={{ fontSize: "12.5px", color: "#64748b", margin: "4px 0 0" }}>
                  Card icon is rendered dynamically from Lucide React
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

            <form onSubmit={handleSaveModal} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Card Title */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Service Card Title *
                </label>
                <input
                  type="text"
                  required
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                  placeholder="e.g. AIR TICKETING"
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              {/* Card Description */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Service Description (Shown on card) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={modalDescription}
                  onChange={(e) => setModalDescription(e.target.value)}
                  placeholder="Enter the short overview describing this travel service..."
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              {/* Lucide React Icon Field with Live Preview */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Lucide React Icon Name *
                </label>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <input
                    type="text"
                    required
                    value={modalIcon}
                    onChange={(e) => setModalIcon(e.target.value)}
                    placeholder="e.g. Plane, Map, Calendar, Globe, Car"
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                      fontFamily: "monospace",
                    }}
                  />

                  {/* Dynamic Live Icon Preview Box */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#fff7ed",
                      border: "1px solid #fed7aa",
                      padding: "6px 14px",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#c2410c" }}>Preview:</span>
                    <div style={{ color: "#ed8a28", display: "grid", placeItems: "center" }}>
                      <LucideIcon name={modalIcon} size={24} strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Quick Icon Selector Pills */}
                <div style={{ marginTop: "12px" }}>
                  <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#64748b", display: "block", marginBottom: "6px" }}>
                    Quick Select Popular Travel Icons:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {SUGGESTED_LUCIDE_ICONS.map((item) => {
                      const isSelected = modalIcon.toLowerCase() === item.name.toLowerCase();
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setModalIcon(item.name)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "5px 10px",
                            borderRadius: "6px",
                            border: `1px solid ${isSelected ? "#ed8a28" : "#e2e8f0"}`,
                            background: isSelected ? "#fff7ed" : "#f8fafc",
                            color: isSelected ? "#c2410c" : "#334155",
                            fontSize: "11.5px",
                            fontWeight: isSelected ? 700 : 500,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <LucideIcon name={item.name} size={14} strokeWidth={2} />
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
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
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isSaving ? "Saving..." : editingService ? "Update Card" : "Create Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
