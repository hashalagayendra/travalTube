"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, AdminTab } from "./components/Sidebar";
import { HomepageView } from "./components/HomepageView";
import { AboutView } from "./components/AboutView";
import { PackagesView } from "./components/PackagesView";
import { DestinationsView } from "./components/DestinationsView";
import { GalleryView } from "./components/GalleryView";
import { ServicesView } from "./components/ServicesView";
import { ContactView } from "./components/ContactView";
import { InquiriesView } from "./components/InquiriesView";
import { SettingsView } from "./components/SettingsView";

interface AdminUser {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("homepage");

  // Step 1: Pre-render Authentication Check
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/me", {
          method: "GET",
          headers: { "Cache-Control": "no-store" },
        });

        const data = await res.json();

        if (res.ok && data.authenticated && data.admin) {
          setAdmin(data.admin);
          setIsLoading(false);
        } else {
          router.replace("/admin/login");
        }
      } catch {
        router.replace("/admin/login");
      }
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/me", { method: "DELETE" });
      router.replace("/admin/login");
    } catch {
      router.replace("/admin/login");
    }
  };

  // Loading Screen while verifying session
  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#334155"
      }}>
        <div style={{
          width: "36px",
          height: "36px",
          border: "3px solid #e2e8f0",
          borderTopColor: "#073e36",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
          marginBottom: "16px"
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}>
          Verifying admin session...
        </p>
      </div>
    );
  }

  const getTabTitle = (tab: AdminTab) => {
    switch (tab) {
      case "homepage": return "Homepage & Hero Editor (app/page.tsx)";
      case "about": return "About Us Editor (/about Page & Homepage Welcome)";
      case "packages": return "Tour Packages Manager (PackagesSection.tsx)";
      case "destinations": return "Destination Cards Manager (Homepage & /destination)";
      case "gallery": return "Photo Gallery Showcase (app/gallery/page.tsx)";
      case "services": return "Our Services Manager (app/services/page.tsx)";
      case "contact": return "Contact Us Page Editor (app/contact/page.tsx)";
      case "inquiries": return "Customer Inquiries & Contact Leads (app/contact/page.tsx)";
      case "settings": return "Footer & Global Settings (components/footer/Footer.tsx)";
    }
  };

  return (
    <>
      <style>{`
        .adminLayoutWrapper {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #0f172a;
        }

        .mainContentArea {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .adminTopNav {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .breadcrumb {
          font-size: 13px;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .pageContentContainer {
          padding: 32px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
        }
      `}</style>

      <div className="adminLayoutWrapper">
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          adminName={admin?.name}
          adminEmail={admin?.email}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />

        {/* Right Main Content Area */}
        <div className="mainContentArea">
          {/* Top Bar */}
          <header className="adminTopNav">
            <div>
              <div className="breadcrumb">
                <span>Admin</span>
                <span style={{ color: "#94a3b8" }}>›</span>
                <span style={{ color: "#073e36", fontWeight: 600, textTransform: "capitalize" }}>
                  {activeTab}
                </span>
              </div>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: "2px 0 0 0" }}>
                {getTabTitle(activeTab)}
              </h2>
            </div>
          </header>

          {/* Render Active View Component directly adjusting frontend */}
          <main className="pageContentContainer">
            {activeTab === "homepage" && <HomepageView />}
            {activeTab === "about" && <AboutView />}
            {activeTab === "packages" && <PackagesView />}
            {activeTab === "destinations" && <DestinationsView />}
            {activeTab === "gallery" && <GalleryView />}
            {activeTab === "services" && <ServicesView />}
            {activeTab === "contact" && <ContactView />}
            {activeTab === "inquiries" && <InquiriesView />}
            {activeTab === "settings" && <SettingsView />}
          </main>
        </div>
      </div>
    </>
  );
}
