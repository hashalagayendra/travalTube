"use client";

import Link from "next/link";
import { Brand } from "@/components/ui/Brand";

export type AdminTab =
  | "homepage"
  | "about"
  | "packages"
  | "destinations"
  | "gallery"
  | "services"
  | "contact"
  | "inquiries"
  | "settings";

interface SidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  adminName?: string;
  adminEmail?: string;
  onLogout: () => void;
  isLoggingOut: boolean;
}

const navItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  {
    id: "homepage",
    label: "Homepage & Hero",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About Us",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: "packages",
    label: "Tour Packages",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    id: "destinations",
    label: "Destinations",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "gallery",
    label: "Photo Gallery",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: "services",
    label: "Our Services",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "contact",
    label: "Contact Us Page",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "inquiries",
    label: "Contact Leads",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Footer & Settings",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export function Sidebar({
  activeTab,
  onSelectTab,
  adminName,
  adminEmail,
  onLogout,
  isLoggingOut,
}: SidebarProps) {
  return (
    <>
      <style>{`
        .adminSidebar {
          width: 270px;
          min-height: 100vh;
          background: #ffffff;
          color: #1e293b;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid #e2e8f0;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          box-shadow: 1px 0 3px rgba(0, 0, 0, 0.02);
        }

        .sidebarHeader {
          padding: 22px 20px 18px;
          border-bottom: 1px solid #edf2f7;
        }

        .sidebarHeader .brandName {
          color: #073e36;
          font-size: 20px;
        }

        .sidebarHeader .brandTagline {
          color: #d97706;
          font-size: 6px;
        }

        .portalLabel {
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #065f46;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .statusPulseDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        .sidebarNav {
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          flex: 1;
        }

        .navSectionTitle {
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          padding: 10px 12px 4px;
        }

        .navButton {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-radius: 8px;
          background: none;
          border: none;
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
        }

        .navButton:hover {
          color: #0f172a;
          background: #f8fafc;
        }

        .navButton.active {
          color: #ffffff;
          background: #073e36;
          font-weight: 600;
          box-shadow: 0 3px 10px rgba(7, 62, 54, 0.2);
        }

        .navButtonLeft {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebarFooter {
          padding: 16px 14px;
          border-top: 1px solid #edf2f7;
          background: #fbfcfd;
        }

        .adminProfile {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding: 8px 10px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #073e36 0%, #008b86 100%);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }

        .adminInfo {
          overflow: hidden;
        }

        .adminNameText {
          font-size: 12.5px;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .adminEmailText {
          font-size: 11px;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logoutSidebarBtn {
          width: 100%;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #fecaca;
          color: #b91c1c;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.15s;
        }

        .logoutSidebarBtn:hover:not(:disabled) {
          background: #fef2f2;
          border-color: #f87171;
        }

        .publicSiteLink {
          display: block;
          text-align: center;
          font-size: 11px;
          color: #64748b;
          text-decoration: none;
          margin-top: 10px;
          font-weight: 500;
          transition: color 0.15s;
        }

        .publicSiteLink:hover {
          color: #073e36;
        }
      `}</style>

      <aside className="adminSidebar">
        <div>
          {/* Header */}
          <div className="sidebarHeader">
            <Brand />
            <div className="portalLabel">
              <span className="statusPulseDot" />
              Frontend CMS Control
            </div>
          </div>

          {/* Navigation Items mapped to frontend pages */}
          <nav className="sidebarNav">
            <div className="navSectionTitle">Frontend Pages</div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`navButton ${isActive ? "active" : ""}`}
                >
                  <div className="navButtonLeft">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer with Admin User Profile & Logout */}
        <div className="sidebarFooter">
          <div className="adminProfile">
            <div className="avatar">
              {adminName ? adminName.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="adminInfo">
              <div className="adminNameText">{adminName || "Administrator"}</div>
              <div className="adminEmailText">{adminEmail || "admin@traveltube.com"}</div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="logoutSidebarBtn"
            disabled={isLoggingOut}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
          </button>

          <Link href="/" target="_blank" className="publicSiteLink">
            ↗ Open Live Frontend
          </Link>
        </div>
      </aside>
    </>
  );
}
