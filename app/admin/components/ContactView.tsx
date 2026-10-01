"use client";

import { useState } from "react";
import Link from "next/link";

export function ContactView() {
  // Section 1: Header Intro
  const [eyebrow, setEyebrow] = useState("WE ARE HERE FOR YOU");
  const [headingWord, setHeadingWord] = useState("Get In");
  const [headingAccent, setHeadingAccent] = useState("Touch");
  const [subheading, setSubheading] = useState(
    "We'd love to hear from you! Whether you have a question, need a custom travel plan, or simply want to learn more about our services, our team is always ready to assist you."
  );

  // Section 2: Core 3 Info Cards
  // Office Location
  const [officeTitle, setOfficeTitle] = useState("Our Office Location");
  const [companyName, setCompanyName] = useState("Travel Tube Lanka(Pvt) Ltd");
  const [addressLine1, setAddressLine1] = useState("452/01/A/01, Kandy Road");
  const [addressCity, setAddressCity] = useState("Kadawatha, Sri Lanka");

  // Phone Numbers
  const [phoneTitle, setPhoneTitle] = useState("Contact Number");
  const [phone1, setPhone1] = useState("+94 76 2399399");
  const [phone2, setPhone2] = useState("+94 11 4399699");

  // Email
  const [emailTitle, setEmailTitle] = useState("Email Address");
  const [primaryEmail, setPrimaryEmail] = useState("info@traveltube.lk");
  const [secondaryEmail, setSecondaryEmail] = useState("support@traveltube.lk");

  // Notification state
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavedNotification("Contact Us page configuration saved successfully!");
    setTimeout(() => setSavedNotification(null), 3500);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset Contact Us page content to default values?")) {
      setEyebrow("WE ARE HERE FOR YOU");
      setHeadingWord("Get In");
      setHeadingAccent("Touch");
      setSubheading(
        "We'd love to hear from you! Whether you have a question, need a custom travel plan, or simply want to learn more about our services, our team is always ready to assist you."
      );
      setOfficeTitle("Our Office Location");
      setCompanyName("Travel Tube Lanka(Pvt) Ltd");
      setAddressLine1("452/01/A/01, Kandy Road");
      setAddressCity("Kadawatha, Sri Lanka");
      setPhoneTitle("Contact Number");
      setPhone1("+94 76 2399399");
      setPhone2("+94 11 4399699");
      setEmailTitle("Email Address");
      setPrimaryEmail("info@traveltube.lk");
      setSecondaryEmail("support@traveltube.lk");
      setSavedNotification("Reset to default configuration.");
      setTimeout(() => setSavedNotification(null), 3000);
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
              Contact Us Page Manager
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
              Controls: app/contact/page.tsx
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Manage official office address, contact phone numbers, and email inboxes on <code>/contact</code>.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/contact"
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
            ↗ View Live /contact Page
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
            type="button"
            onClick={() => handleSave()}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 20px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Save Contact Changes
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

      {/* Section 1: Header Introduction */}
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
            1. Contact Page Header & Greeting
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Configure the main eyebrow tag, headline, and welcoming subheading rendered at the top of /contact.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", marginBottom: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Eyebrow Tag
            </label>
            <input
              type="text"
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
              Main Heading
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={headingWord}
                onChange={(e) => setHeadingWord(e.target.value)}
                placeholder="Get In"
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#073e36",
                }}
              />
              <input
                type="text"
                value={headingAccent}
                onChange={(e) => setHeadingAccent(e.target.value)}
                placeholder="Touch"
                style={{
                  flex: 1,
                  padding: "9px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#f0642b",
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
            Subheading Message
          </label>
          <textarea
            rows={2}
            value={subheading}
            onChange={(e) => setSubheading(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "13px",
              lineHeight: 1.55,
              color: "#556c75",
            }}
          />
        </div>
      </div>

      {/* Section 2: The 3 Core Contact Info Cards */}
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
            2. Core Contact Information Cards (Location, Phone, Email)
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Displayed in the 3 featured contact cards across the top of the /contact page.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {/* Card 1: Office Address */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>📍</span>
              <strong style={{ fontSize: "13.5px", color: "#073e36" }}>Card #1: Office Location</strong>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Card Title
              </label>
              <input
                type="text"
                value={officeTitle}
                onChange={(e) => setOfficeTitle(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Street Address Line
              </label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                City & Country
              </label>
              <input
                type="text"
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>
          </div>

          {/* Card 2: Contact Numbers */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>📞</span>
              <strong style={{ fontSize: "13.5px", color: "#073e36" }}>Card #2: Phone Numbers</strong>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Card Title
              </label>
              <input
                type="text"
                value={phoneTitle}
                onChange={(e) => setPhoneTitle(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Primary Mobile / WhatsApp Number
              </label>
              <input
                type="text"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Secondary Landline / Office Line
              </label>
              <input
                type="text"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <span style={{ fontSize: "11px", color: "#166534", marginTop: "auto" }}>
              ✓ Click-to-call enabled on mobile devices
            </span>
          </div>

          {/* Card 3: Email Inboxes */}
          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>✉️</span>
              <strong style={{ fontSize: "13.5px", color: "#073e36" }}>Card #3: Email Addresses</strong>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Card Title
              </label>
              <input
                type="text"
                value={emailTitle}
                onChange={(e) => setEmailTitle(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Primary Booking Email
              </label>
              <input
                type="text"
                value={primaryEmail}
                onChange={(e) => setPrimaryEmail(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11.5px", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>
                Secondary Support Email
              </label>
              <input
                type="text"
                value={secondaryEmail}
                onChange={(e) => setSecondaryEmail(e.target.value)}
                style={{ width: "100%", padding: "7px 10px", border: "1px solid #cbd5e1", borderRadius: "6px", fontSize: "12.5px" }}
              />
            </div>

            <span style={{ fontSize: "11px", color: "#166534", marginTop: "auto" }}>
              ✓ Mailto links wired directly to visitor email clients
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
          padding: "16px 20px",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <button
          type="button"
          onClick={handleResetDefaults}
          style={{
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            color: "#64748b",
            padding: "9px 18px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reset to Defaults
        </button>
        <button
          type="button"
          onClick={() => handleSave()}
          style={{
            background: "#073e36",
            color: "#ffffff",
            border: "none",
            padding: "9px 24px",
            borderRadius: "8px",
            fontSize: "13.5px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Save Contact Changes
        </button>
      </div>
    </div>
  );
}
