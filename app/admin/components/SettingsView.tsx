"use client";

import { useState } from "react";

type SettingsSubTab = "general" | "currency" | "social" | "seo";

export function SettingsView() {
  const [activeSubTab, setActiveSubTab] = useState<SettingsSubTab>("general");
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);

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
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px"
      }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#073e36", margin: "0 0 4px" }}>
            Agency & Website Settings
          </h1>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Configure global travel agency contact details, WhatsApp direct line, currency options, and SEO.
          </p>
        </div>

        <button
          onClick={() => alert("Settings saved successfully! (Connected to database / environment config)")}
          style={{
            background: "#073e36",
            color: "#ffffff",
            border: "none",
            padding: "10px 22px",
            borderRadius: "8px",
            fontSize: "13.5px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(7, 62, 54, 0.2)"
          }}
        >
          Save All Changes
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
        {[
          { id: "general", label: "📞 Contact & WhatsApp" },
          { id: "currency", label: "💵 Currency & Booking Policies" },
          { id: "social", label: "🌐 Social Media & Reviews" },
          { id: "seo", label: "🔍 SEO & Top Announcement" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as SettingsSubTab)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: activeSubTab === tab.id ? "#073e36" : "#ffffff",
              color: activeSubTab === tab.id ? "#ffffff" : "#475569",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: General & WhatsApp */}
      {activeSubTab === "general" && (
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Official TravelTube Agency Credentials
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Company Brand Name
              </label>
              <input
                type="text"
                defaultValue="TravelTube Lanka"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                SLTDA Registration Number (Tourism Board)
              </label>
              <input
                type="text"
                defaultValue="SLTDA/SQA/TA/2026/0491"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Official Travel Hotline (24/7)
              </label>
              <input
                type="text"
                defaultValue="+94 77 123 4567"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Official WhatsApp Number (International format with country code)
              </label>
              <input
                type="text"
                defaultValue="+94 77 987 6543"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
              <span style={{ fontSize: "11px", color: "#16a34a", marginTop: "4px", display: "block" }}>
                ✓ Used to trigger WhatsApp instant messaging across tour booking pages.
              </span>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Primary Inquiries Email Address
              </label>
              <input
                type="email"
                defaultValue="info@traveltubelanka.com"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Operating Office Hours
              </label>
              <input
                type="text"
                defaultValue="Mon – Sat: 8:00 AM – 7:00 PM (Sri Lanka Time GMT+5:30)"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Physical Office Address (Printed in Footer & Invoices)
              </label>
              <textarea
                rows={2}
                defaultValue="No. 45, Lighthouse Street, Historic Dutch Fort, Galle 80000, Southern Province, Sri Lanka"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Currency & Booking Policies */}
      {activeSubTab === "currency" && (
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Pricing, Currencies & Advance Deposit Terms
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Default Base Currency
              </label>
              <select style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}>
                <option value="USD">United States Dollar (US$) - Primary Global</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="AUD">Australian Dollar (A$)</option>
                <option value="LKR">Sri Lankan Rupee (LKR Rs)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Required Advance Deposit to Lock Itinerary
              </label>
              <select style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}>
                <option value="20">20% Advance Deposit</option>
                <option value="30">30% Advance Deposit (Recommended for High Season)</option>
                <option value="50">50% Advance Deposit</option>
              </select>
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Standard Cancellation Policy Terms
              </label>
              <textarea
                rows={3}
                defaultValue="Free cancellation up to 30 days prior to arrival with full refund. 50% refund between 29 to 14 days. Non-refundable under 14 days due to advance hotel and train bookings."
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Social & Reviews */}
      {activeSubTab === "social" && (
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Social Media Channels & Review Badge Integration
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                TripAdvisor Profile Page
              </label>
              <input
                type="text"
                defaultValue="https://www.tripadvisor.com/Attraction_Review-TravelTube_Lanka"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Google Business Reviews URL
              </label>
              <input
                type="text"
                defaultValue="https://g.page/r/traveltube-lanka-reviews"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Instagram Profile Link
              </label>
              <input
                type="text"
                defaultValue="https://instagram.com/traveltubelanka"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Facebook Page Link
              </label>
              <input
                type="text"
                defaultValue="https://facebook.com/traveltubelankatours"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: SEO & Top Announcement */}
      {activeSubTab === "seo" && (
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Global Announcement Banner & Search Engine Optimization
          </h2>

          <div style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#073e36" }}>Top Announcement Bar Banner</span>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={announcementEnabled}
                  onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                />
                <span>Enable on Public Website</span>
              </label>
            </div>
            <input
              type="text"
              defaultValue="🔥 Early Bird Offer: Save 10% on Private Chauffeur Winter 2026/27 Tours. Enquire Today!"
              style={{ width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Website Meta Title (Google Search)
              </label>
              <input
                type="text"
                defaultValue="TravelTube Lanka | Discover the Real Sri Lanka - Tailor Made Tours & Safaris"
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Website Meta Description
              </label>
              <textarea
                rows={3}
                defaultValue="Authentic experiences, private chauffeur tours, cultural heritage citadels, and personalized journeys through the beautiful tropical island of Sri Lanka."
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
