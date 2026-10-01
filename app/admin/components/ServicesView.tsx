"use client";

import { useState } from "react";
import Link from "next/link";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export function ServicesView() {
  // Page Header Text State
  const [pageTitleWord1, setPageTitleWord1] = useState("OUR");
  const [pageTitleWord2, setPageTitleWord2] = useState("SERVICES");
  const [pageSubtitle, setPageSubtitle] = useState(
    "Experience comprehensive, reliable and personalized travel solutions across Sri Lanka and worldwide destinations."
  );

  // Exact 9 services from app/services/page.tsx
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: "air-ticketing",
      title: "AIR TICKETING",
      description: "Domestic and international flight reservations at competitive prices.",
      iconName: "Airplane / Flights",
    },
    {
      id: "plan-your-trip",
      title: "PLAN YOUR TRIP",
      description: "Personalized travel planning according to your budget and preferences.",
      iconName: "Map / Route",
    },
    {
      id: "one-day-tours",
      title: "ONE DAY TOURS",
      description: "Carefully designed day trips to popular attractions across Sri Lanka.",
      iconName: "Calendar / Day Trips",
    },
    {
      id: "visa-assistance",
      title: "VISA ASSISTANCE",
      description: "Guidance and support for visa applications and documentation.",
      iconName: "Passport / Clipboard",
    },
    {
      id: "round-tours",
      title: "ROUND TOURS",
      description: "Complete tour packages for individuals, families, and groups.",
      iconName: "Globe / Multi-day",
    },
    {
      id: "activities-destinations",
      title: "ACTIVITIES & DESTINATIONS",
      description: "Exciting activities and carefully selected destinations for unforgettable experiences.",
      iconName: "Mountain / Scenery",
    },
    {
      id: "inbound-outbound-tours",
      title: "INBOUND & OUTBOUND TOURS",
      description: "Travel services for visitors coming into the country and travelers going abroad.",
      iconName: "Arrows / In-Out",
    },
    {
      id: "travellers-cheques",
      title: "TRAVELLER'S CHEQUES",
      description: "Safe and convenient travel money services for your security.",
      iconName: "Payment / Currency",
    },
    {
      id: "airport-transfers",
      title: "AIRPORT TRANSFERS",
      description: "Comfortable and reliable airport pick-up and drop-off services.",
      iconName: "Car / Chauffeur",
    },
  ]);


  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const handleSave = (updated: ServiceItem) => {
    if (editingService) {
      setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    } else {
      setServices((prev) => [...prev, updated]);
    }
    setShowModal(false);
    showNotice("Service card updated successfully!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this service card?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      showNotice("Service card removed.");
    }
  };

  const showNotice = (msg: string) => {
    setSavedNotification(msg);
    setTimeout(() => setSavedNotification(null), 3500);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset Our Services page to default values?")) {
      setPageTitleWord1("OUR");
      setPageTitleWord2("SERVICES");
      setPageSubtitle(
        "Experience comprehensive, reliable and personalized travel solutions across Sri Lanka and worldwide destinations."
      );
      showNotice("Reset to default configuration.");
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
              Controls: app/services/page.tsx
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Managing <strong>{services.length} agency service cards</strong> and heading introduction on the public <code>/services</code> page.
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
            onClick={() => {
              setEditingService(null);
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
              gap: "6px",
            }}
          >
            <span>+</span> Add Service Card
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

      {/* Section 1: Page Header & Title Settings */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "26px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ marginBottom: "18px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 700, color: "#073e36", margin: "0 0 4px 0" }}>
            1. Services Page Header & Introduction
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Configure the main headline and italicized subtitle rendered above the 3x3 service card grid.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Title Word #1 (Green Accent)
            </label>
            <input
              type="text"
              value={pageTitleWord1}
              onChange={(e) => setPageTitleWord1(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#073e36",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Title Word #2 (Orange Accent)
            </label>
            <input
              type="text"
              value={pageTitleWord2}
              onChange={(e) => setPageTitleWord2(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 700,
                color: "#ed8a28",
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: "14px" }}>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
            Section Subtitle
          </label>
          <textarea
            rows={2}
            value={pageSubtitle}
            onChange={(e) => setPageSubtitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "13px",
              lineHeight: 1.5,
              color: "#556c75",
            }}
          />
        </div>
      </div>

      {/* Section 2: Service Cards Grid (3x3 matching frontend) */}
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
              2. Core Service Cards ({services.length} Total)
            </h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              Displayed in the responsive 3-column grid on the /services page.
            </p>
          </div>
          <span style={{ fontSize: "12px", color: "#166534", background: "#f0fdf4", padding: "4px 10px", borderRadius: "20px", fontWeight: 600 }}>
            ● All {services.length} cards live on /services
          </span>
        </div>

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
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
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
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>{service.iconName}</span>
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
                  onClick={() => handleDelete(service.id)}
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
                  onClick={() => {
                    setEditingService(service);
                    setShowModal(true);
                  }}
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
      </div>


      {/* Edit / Add Service Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "540px",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#073e36", margin: 0 }}>
                {editingService ? `Edit: ${editingService.title}` : "Add New Service Card"}
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
                const updated: ServiceItem = {
                  id: editingService
                    ? editingService.id
                    : (form.elements.namedItem("title") as HTMLInputElement).value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-"),
                  title: (form.elements.namedItem("title") as HTMLInputElement).value,
                  description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
                  iconName: (form.elements.namedItem("iconName") as HTMLInputElement).value,
                };
                handleSave(updated);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Service Card Title
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={editingService?.title || ""}
                  placeholder="e.g. VIP CHAUFFEUR TRANSPORT"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Service Description (Shown on card)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  required
                  defaultValue={editingService?.description || ""}
                  placeholder="Enter the short overview describing this travel service..."
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                  Icon Category Label
                </label>
                <input
                  name="iconName"
                  type="text"
                  defaultValue={editingService?.iconName || "General Travel"}
                  placeholder="e.g. Airplane / Flights"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
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
                  Save Service Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
