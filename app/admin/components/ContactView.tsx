"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function ContactView() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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

  // Load from database on mount
  useEffect(() => {
    async function loadContactInfo() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/contact", { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          if (d.eyebrow) setEyebrow(d.eyebrow);
          if (d.headingWord) setHeadingWord(d.headingWord);
          if (d.headingAccent) setHeadingAccent(d.headingAccent);
          if (d.subheading) setSubheading(d.subheading);
          if (d.officeTitle) setOfficeTitle(d.officeTitle);
          if (d.companyName) setCompanyName(d.companyName);
          if (d.addressLine1) setAddressLine1(d.addressLine1);
          if (d.addressCity) setAddressCity(d.addressCity);
          if (d.phoneTitle) setPhoneTitle(d.phoneTitle);
          if (d.phone1) setPhone1(d.phone1);
          if (d.phone2) setPhone2(d.phone2);
          if (d.emailTitle) setEmailTitle(d.emailTitle);
          if (d.primaryEmail) setPrimaryEmail(d.primaryEmail);
          if (d.secondaryEmail) setSecondaryEmail(d.secondaryEmail);
        }
      } catch (err) {
        console.error("Failed to load contact info from database:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadContactInfo();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eyebrow,
          headingWord,
          headingAccent,
          subheading,
          officeTitle,
          companyName,
          addressLine1,
          addressCity,
          phoneTitle,
          phone1,
          phone2,
          emailTitle,
          primaryEmail,
          secondaryEmail,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSavedNotification("Contact Us page configuration saved successfully!");
      } else {
        alert("Failed to save: " + (json.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("An error occurred while saving contact information.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSavedNotification(null), 3500);
    }
  };

  const handleResetDefaults = async () => {
    if (confirm("Reset Contact Us page content to default values?")) {
      const defaults = {
        eyebrow: "WE ARE HERE FOR YOU",
        headingWord: "Get In",
        headingAccent: "Touch",
        subheading:
          "We'd love to hear from you! Whether you have a question, need a custom travel plan, or simply want to learn more about our services, our team is always ready to assist you.",
        officeTitle: "Our Office Location",
        companyName: "Travel Tube Lanka(Pvt) Ltd",
        addressLine1: "452/01/A/01, Kandy Road",
        addressCity: "Kadawatha, Sri Lanka",
        phoneTitle: "Contact Number",
        phone1: "+94 76 2399399",
        phone2: "+94 11 4399699",
        emailTitle: "Email Address",
        primaryEmail: "info@traveltube.lk",
        secondaryEmail: "support@traveltube.lk",
      };

      setEyebrow(defaults.eyebrow);
      setHeadingWord(defaults.headingWord);
      setHeadingAccent(defaults.headingAccent);
      setSubheading(defaults.subheading);
      setOfficeTitle(defaults.officeTitle);
      setCompanyName(defaults.companyName);
      setAddressLine1(defaults.addressLine1);
      setAddressCity(defaults.addressCity);
      setPhoneTitle(defaults.phoneTitle);
      setPhone1(defaults.phone1);
      setPhone2(defaults.phone2);
      setEmailTitle(defaults.emailTitle);
      setPrimaryEmail(defaults.primaryEmail);
      setSecondaryEmail(defaults.secondaryEmail);

      setIsSaving(true);
      try {
        await fetch("/api/contact", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(defaults),
        });
        setSavedNotification("Reset to default configuration.");
      } catch (err) {
        console.error("Reset error:", err);
      } finally {
        setIsSaving(false);
        setTimeout(() => setSavedNotification(null), 3000);
      }
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
                border: "1px solid #a7f3d0",
              }}
            >
              Database Connected
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
            type="button"
            onClick={() => handleSave()}
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
              boxShadow: "0 2px 4px rgba(7,62,54,0.2)",
            }}
          >
            {isSaving ? "Saving..." : "Save Contact Changes"}
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
          disabled={isSaving}
          style={{
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            color: "#64748b",
            padding: "9px 18px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          Reset to Defaults
        </button>
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={isSaving}
          style={{
            background: "#073e36",
            color: "#ffffff",
            border: "none",
            padding: "9px 24px",
            borderRadius: "8px",
            fontSize: "13.5px",
            fontWeight: 600,
            cursor: isSaving ? "not-allowed" : "pointer",
            boxShadow: "0 2px 4px rgba(7,62,54,0.2)",
          }}
        >
          {isSaving ? "Saving..." : "Save Contact Changes"}
        </button>
      </div>
    </div>
  );
}
