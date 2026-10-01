"use client";

import { useState } from "react";

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  package: string;
  dates: string;
  pax: string;
  budget: string;
  hotelPreference: string;
  status: "New Lead" | "Quote Sent" | "Confirmed" | "Archived";
  message: string;
  notes: string;
  createdAt: string;
}

export function InquiriesView() {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const inquiriesData: InquiryItem[] = [
    {
      id: "INQ-501",
      name: "Arthur & Charlotte Pendelton",
      email: "arthur.pendelton@gmail.com",
      phone: "+44 7911 123456",
      country: "🇬🇧 United Kingdom",
      package: "Classic Cultural Tour (7 Days)",
      dates: "Dec 15, 2026 – Dec 22, 2026",
      pax: "2 Adults (Couple)",
      budget: "US$ 1,800 – $2,200",
      hotelPreference: "4-star Boutique Heritage Villas",
      status: "New Lead",
      message: "Hello TravelTube! We are visiting Sri Lanka for our 10th anniversary. We'd love a dedicated chauffeur with an air-conditioned car, climbing Sigiriya Rock at sunrise, and experiencing a scenic tea factory in Kandy.",
      notes: "High priority lead. Client requested English-speaking licensed chauffeur guide.",
      createdAt: "Today at 10:15 AM",
    },
    {
      id: "INQ-502",
      name: "Claire & Julien Moreau",
      email: "c.moreau@orange.fr",
      phone: "+33 6 45 89 12 34",
      country: "🇫🇷 France",
      package: "Ceylon Tea Country & Wildlife Safari (9 Days)",
      dates: "Jan 08, 2027 – Jan 17, 2027",
      pax: "4 Travelers (2 Adults, 2 Teens)",
      budget: "US$ 3,600",
      hotelPreference: "5-star Resorts & Eco-Lodges",
      status: "Quote Sent",
      message: "We want a private 4x4 safari in Yala National Park for 2 full days, plus the Kandy to Ella train tickets in first class reserved seats. Please send quote with all park entry permits included.",
      notes: "Official itinerary quote v1 sent on Oct 1. Waiting for client confirmation on train ticket seats.",
      createdAt: "Yesterday at 4:30 PM",
    },
    {
      id: "INQ-503",
      name: "Liam & Grace O'Connor",
      email: "liam.oconnor@ausnet.com.au",
      phone: "+61 412 345 678",
      country: "🇦🇺 Australia",
      package: "Southern Beaches & Coastal Bliss (6 Days)",
      dates: "Nov 12, 2026 – Nov 18, 2026",
      pax: "2 Adults",
      budget: "US$ 1,400",
      hotelPreference: "Beachfront Boutique in Mirissa/Galle",
      status: "Confirmed",
      message: "Looking forward to surfing in Weligama and seeing the stilt fishermen in Koggala. 30% advance deposit paid via bank transfer.",
      notes: "Advance deposit received. Chauffeur Kamal confirmed for airport pickup at CMB Colombo.",
      createdAt: "Sep 29, 2026",
    },
    {
      id: "INQ-504",
      name: "Dr. Kenji & Emi Takahashi",
      email: "takahashi.k@tokyo-u.ac.jp",
      phone: "+81 90 1234 5678",
      country: "🇯🇵 Japan",
      package: "Heritage Wonders & World Heritage Sites (5 Days)",
      dates: "Oct 20, 2026 – Oct 25, 2026",
      pax: "2 Adults",
      budget: "US$ 1,300",
      hotelPreference: "Comfort 3/4-star near Dambulla & Kandy",
      status: "New Lead",
      message: "Interested in ancient Buddhist architecture, Anuradhapura ruins, and Dambulla cave murals.",
      notes: "Need Japanese-speaking chauffeur guide if available, otherwise fluent English.",
      createdAt: "Sep 28, 2026",
    },
  ];

  const filteredInquiries = inquiriesData.filter((item) => {
    const matchesFilter = filterStatus === "All" || item.status === filterStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.package.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Header & Search Bar */}
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
            Customer Inquiries & Booking Leads
          </h1>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Manage traveler quote requests, review travel dates, and respond via WhatsApp or Email.
          </p>
        </div>

        {/* Search input & Export */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search traveler, email, tour..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "9px 14px 9px 34px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
                width: "250px",
                outline: "none"
              }}
            />
            <svg
              style={{ position: "absolute", left: "10px", top: "10px", color: "#94a3b8" }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <button
            onClick={() => alert("Exporting all leads to inquiries_export_2026.csv...")}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>📥</span> Export CSV
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All", "New Lead", "Quote Sent", "Confirmed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              padding: "7px 16px",
              borderRadius: "20px",
              fontSize: "12.5px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: filterStatus === status ? "#073e36" : "#ffffff",
              color: filterStatus === status ? "#ffffff" : "#475569",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)"
            }}
          >
            {status === "All" ? `All Inquiries (${inquiriesData.length})` : status}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "12px" }}>
              <th style={{ padding: "14px 18px" }}>ID & Traveler</th>
              <th style={{ padding: "14px 18px" }}>Tour Package & Dates</th>
              <th style={{ padding: "14px 18px" }}>Travelers / Est. Budget</th>
              <th style={{ padding: "14px 18px" }}>Lead Status</th>
              <th style={{ padding: "14px 18px" }}>Received</th>
              <th style={{ padding: "14px 18px", textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.map((inq) => (
              <tr key={inq.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: "#ecfdf5",
                      color: "#065f46",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px"
                    }}>
                      {inq.name.charAt(0)}
                    </div>
                    <div>
                      <strong style={{ color: "#0f172a", display: "block" }}>{inq.name}</strong>
                      <span style={{ color: "#64748b", fontSize: "11px" }}>{inq.country} • {inq.phone}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <strong style={{ color: "#073e36", display: "block" }}>{inq.package}</strong>
                  <span style={{ color: "#64748b", fontSize: "11px" }}>📅 {inq.dates}</span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <span style={{ color: "#334155", display: "block" }}>{inq.pax}</span>
                  <strong style={{ color: "#16a34a", fontSize: "12px" }}>{inq.budget}</strong>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <span style={{
                    padding: "4px 9px",
                    borderRadius: "4px",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    background: inq.status === "New Lead" ? "#fef3c7" : inq.status === "Confirmed" ? "#dcfce7" : "#e0f2fe",
                    color: inq.status === "New Lead" ? "#92400e" : inq.status === "Confirmed" ? "#166534" : "#0369a1",
                  }}>
                    {inq.status}
                  </span>
                </td>
                <td style={{ padding: "14px 18px", color: "#64748b", fontSize: "12px" }}>
                  {inq.createdAt}
                </td>
                <td style={{ padding: "14px 18px", textAlign: "right" }}>
                  <button
                    onClick={() => setSelectedInquiry(inq)}
                    style={{
                      background: "#073e36",
                      color: "#ffffff",
                      border: "none",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    View & Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal / Drawer for Viewing Single Inquiry Details */}
      {selectedInquiry && (
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
            maxWidth: "680px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "28px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#008b86", fontWeight: 700 }}>
                  INQUIRY #{selectedInquiry.id}
                </span>
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "2px 0 4px" }}>
                  {selectedInquiry.name}
                </h2>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  {selectedInquiry.country} • {selectedInquiry.email} • {selectedInquiry.phone}
                </span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#64748b"
                }}
              >
                ✕
              </button>
            </div>

            {/* Travel Trip Details Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              background: "#f8fafc",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "18px"
            }}>
              <div>
                <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", display: "block" }}>Requested Package</span>
                <strong style={{ fontSize: "13.5px", color: "#073e36" }}>{selectedInquiry.package}</strong>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", display: "block" }}>Travel Window</span>
                <strong style={{ fontSize: "13.5px", color: "#0f172a" }}>{selectedInquiry.dates}</strong>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", display: "block" }}>Party Size</span>
                <strong style={{ fontSize: "13.5px", color: "#0f172a" }}>{selectedInquiry.pax}</strong>
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", display: "block" }}>Estimated Budget</span>
                <strong style={{ fontSize: "13.5px", color: "#16a34a" }}>{selectedInquiry.budget}</strong>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <span style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", display: "block" }}>Hotel Standard</span>
                <strong style={{ fontSize: "13.5px", color: "#0f172a" }}>{selectedInquiry.hotelPreference}</strong>
              </div>
            </div>

            {/* Traveler Message */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Client&apos;s Special Requirements:
              </label>
              <div style={{
                background: "#fdfefe",
                border: "1px solid #e2e8f0",
                padding: "14px",
                borderRadius: "8px",
                fontSize: "13.5px",
                lineHeight: "1.6",
                color: "#1e293b"
              }}>
                &ldquo;{selectedInquiry.message}&rdquo;
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Internal Agency Notes & Chauffeur Assignment:
              </label>
              <textarea
                defaultValue={selectedInquiry.notes}
                rows={2}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px"
                }}
              />
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", borderTop: "1px solid #edf2f7", paddingTop: "18px" }}>
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(selectedInquiry.name)},%20thank%20you%20for%20contacting%20TravelTube%20Lanka!`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#25D366",
                  color: "#ffffff",
                  padding: "9px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                💬 Chat on WhatsApp
              </a>

              <a
                href={`mailto:${selectedInquiry.email}?subject=TravelTube Lanka - Itinerary Quote for ${encodeURIComponent(selectedInquiry.package)}`}
                style={{
                  background: "#073e36",
                  color: "#ffffff",
                  padding: "9px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                ✉️ Send Email Quote
              </a>

              <button
                onClick={() => setSelectedInquiry(null)}
                style={{
                  background: "#f1f5f9",
                  border: "1px solid #cbd5e1",
                  padding: "9px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
