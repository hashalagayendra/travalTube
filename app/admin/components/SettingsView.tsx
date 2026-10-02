"use client";

import { useState, useEffect } from "react";
import { DEFAULT_SITE_SETTINGS, SiteSettingsData } from "@/app/api/settings/route";
import { DEFAULT_FOOTER_SETTINGS, FooterSettingsData } from "@/app/api/footer/route";

type SettingsSubTab = "general" | "footer" | "currency" | "social" | "seo";

export function SettingsView() {
  const [activeSubTab, setActiveSubTab] = useState<SettingsSubTab>("general");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Settings State
  const [settings, setSettings] = useState<SiteSettingsData>(DEFAULT_SITE_SETTINGS);

  // Footer State
  const [footer, setFooter] = useState<FooterSettingsData>(DEFAULT_FOOTER_SETTINGS);

  // Fetch settings & footer on mount
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [settingsRes, footerRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/footer"),
        ]);

        if (settingsRes.ok) {
          const json = await settingsRes.json();
          if (json.success && json.data) {
            setSettings(json.data);
          }
        }

        if (footerRes.ok) {
          const json = await footerRes.json();
          if (json.success && json.data) {
            setFooter(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to load settings data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      setErrorMessage(null);

      const [settingsRes, footerRes] = await Promise.all([
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        }),
        fetch("/api/footer", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(footer),
        }),
      ]);

      const settingsData = await settingsRes.json();
      const footerData = await footerRes.json();

      if (!settingsRes.ok || !footerRes.ok || !settingsData.success || !footerData.success) {
        throw new Error(settingsData.message || footerData.message || "Failed to save settings");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Save settings error:", err);
      setErrorMessage(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "48px 24px",
        textAlign: "center",
        color: "#64748b",
      }}>
        <div style={{
          width: "36px",
          height: "36px",
          border: "3px solid #cbd5e1",
          borderTopColor: "#073e36",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 14px",
        }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>Loading agency and footer settings...</p>
      </div>
    );
  }

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
            Agency, Footer & System Settings
          </h1>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Configure global travel agency contact details, footer content, WhatsApp direct line, currency options, and SEO.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {saveSuccess && (
            <span style={{
              background: "#dcfce7",
              color: "#15803d",
              fontSize: "13px",
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid #bbf7d0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              animation: "fadeIn 0.2s ease"
            }}>
              ✓ Saved Successfully
            </span>
          )}

          {errorMessage && (
            <span style={{
              background: "#fee2e2",
              color: "#b91c1c",
              fontSize: "13px",
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid #fecaca",
            }}>
              {errorMessage}
            </span>
          )}

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            style={{
              background: isSaving ? "#64748b" : "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "10px 22px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: isSaving ? "not-allowed" : "pointer",
              boxShadow: "0 2px 6px rgba(7, 62, 54, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
            }}
          >
            {isSaving ? "Saving Changes..." : "Save All Changes"}
          </button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
        {[
          { id: "general", label: "📞 Contact & WhatsApp" },
          { id: "footer", label: "🦶 Footer & Quick Links" },
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
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              transition: "all 0.15s ease",
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
                value={settings.companyBrand}
                onChange={(e) => setSettings({ ...settings, companyBrand: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                SLTDA Registration Number (Tourism Board)
              </label>
              <input
                type="text"
                value={settings.sltdaReg}
                onChange={(e) => setSettings({ ...settings, sltdaReg: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Official Travel Hotline (24/7)
              </label>
              <input
                type="text"
                value={settings.hotline}
                onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Official WhatsApp Number (International format)
              </label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
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
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Operating Office Hours
              </label>
              <input
                type="text"
                value={settings.officeHours}
                onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Physical Office Address (Printed in Invoices & Correspondence)
              </label>
              <textarea
                rows={2}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Footer & Quick Links */}
      {activeSubTab === "footer" && (
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}>
          <div>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
              Global Website Footer Configuration
            </h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              Control the company bio, contact info, quick action cards, and copyright displayed at the bottom of every page.
            </p>
          </div>

          {/* Section 1: Footer Brand & Contact Info */}
          <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#073e36", margin: "0 0 14px" }}>
              1. Brand Description & Address
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Footer Brand Bio / Mission Statement
                </label>
                <textarea
                  rows={2}
                  value={footer.brandDescription}
                  onChange={(e) => setFooter({ ...footer, brandDescription: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Footer Street Address
                </label>
                <textarea
                  rows={2}
                  value={footer.address}
                  onChange={(e) => setFooter({ ...footer, address: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Display Hotline String (Shown to visitors)
                </label>
                <input
                  type="text"
                  value={footer.phones}
                  onChange={(e) => setFooter({ ...footer, phones: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Primary Click-to-Call Number
                </label>
                <input
                  type="text"
                  value={footer.phonePrimary}
                  onChange={(e) => setFooter({ ...footer, phonePrimary: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Secondary Click-to-Call Number
                </label>
                <input
                  type="text"
                  value={footer.phoneSecondary}
                  onChange={(e) => setFooter({ ...footer, phoneSecondary: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Footer Inquiries Email Address
                </label>
                <input
                  type="email"
                  value={footer.email}
                  onChange={(e) => setFooter({ ...footer, email: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Website Display Label
                </label>
                <input
                  type="text"
                  value={footer.websiteLabel}
                  onChange={(e) => setFooter({ ...footer, websiteLabel: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Website Destination URL
                </label>
                <input
                  type="text"
                  value={footer.websiteUrl}
                  onChange={(e) => setFooter({ ...footer, websiteUrl: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: What You Want.? Quick Cards */}
          <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#073e36", margin: "0 0 14px" }}>
              2. "What You Want.?" Quick Action Cards
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {/* Card 1 */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Card 1 Title
                </label>
                <input
                  type="text"
                  value={footer.want1Title}
                  onChange={(e) => setFooter({ ...footer, want1Title: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Card 1 Link URL
                </label>
                <input
                  type="text"
                  value={footer.want1Url}
                  onChange={(e) => setFooter({ ...footer, want1Url: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              {/* Card 2 */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Card 2 Title
                </label>
                <input
                  type="text"
                  value={footer.want2Title}
                  onChange={(e) => setFooter({ ...footer, want2Title: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Card 2 Link URL
                </label>
                <input
                  type="text"
                  value={footer.want2Url}
                  onChange={(e) => setFooter({ ...footer, want2Url: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              {/* Card 3 */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Card 3 Title
                </label>
                <input
                  type="text"
                  value={footer.want3Title}
                  onChange={(e) => setFooter({ ...footer, want3Title: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Card 3 Link URL
                </label>
                <input
                  type="text"
                  value={footer.want3Url}
                  onChange={(e) => setFooter({ ...footer, want3Url: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Bottom Bar & Credits */}
          <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#073e36", margin: "0 0 14px" }}>
              3. Copyright Notice & Photo Credits
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Copyright Notice Text (Rendered after © {new Date().getFullYear()})
                </label>
                <input
                  type="text"
                  value={footer.copyrightText}
                  onChange={(e) => setFooter({ ...footer, copyrightText: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Photo Credit Label
                </label>
                <input
                  type="text"
                  value={footer.photoCreditText}
                  onChange={(e) => setFooter({ ...footer, photoCreditText: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Photo Credit Link
                </label>
                <input
                  type="text"
                  value={footer.photoCreditUrl}
                  onChange={(e) => setFooter({ ...footer, photoCreditUrl: e.target.value })}
                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13px" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Currency & Booking Policies */}
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
              <select
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              >
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
              <select
                value={settings.depositPercent}
                onChange={(e) => setSettings({ ...settings, depositPercent: parseInt(e.target.value) || 20 })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              >
                <option value={20}>20% Advance Deposit</option>
                <option value={30}>30% Advance Deposit (Recommended for High Season)</option>
                <option value={50}>50% Advance Deposit</option>
              </select>
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Standard Cancellation Policy Terms
              </label>
              <textarea
                rows={3}
                value={settings.cancellationPolicy}
                onChange={(e) => setSettings({ ...settings, cancellationPolicy: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Social & Reviews */}
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
                value={settings.tripAdvisorUrl}
                onChange={(e) => setSettings({ ...settings, tripAdvisorUrl: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Google Business Reviews URL
              </label>
              <input
                type="text"
                value={settings.googleReviewsUrl}
                onChange={(e) => setSettings({ ...settings, googleReviewsUrl: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Instagram Profile Link
              </label>
              <input
                type="text"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Facebook Page Link
              </label>
              <input
                type="text"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                YouTube Channel URL (Optional)
              </label>
              <input
                type="text"
                value={settings.youtubeUrl || ""}
                onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                TikTok Profile URL (Optional)
              </label>
              <input
                type="text"
                value={settings.tiktokUrl || ""}
                onChange={(e) => setSettings({ ...settings, tiktokUrl: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: SEO & Top Announcement */}
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
                  checked={settings.announcementEnabled}
                  onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                />
                <span>Enable on Public Website</span>
              </label>
            </div>
            <input
              type="text"
              value={settings.announcementText}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
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
                value={settings.metaTitle}
                onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                Website Meta Description
              </label>
              <textarea
                rows={3}
                value={settings.metaDescription}
                onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "13.5px" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
