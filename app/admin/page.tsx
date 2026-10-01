"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";

interface AdminUser {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

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
          Verifying admin authentication...
        </p>
      </div>
    );
  }

  // Authenticated Admin Page
  return (
    <>
      <style>{`
        .adminPageWrapper {
          min-height: 100vh;
          background: #f8fafc;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #0f172a;
        }

        .adminNavbar {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navLeft {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .adminBadge {
          padding: 4px 10px;
          border-radius: 6px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .navRight {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .userPill {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 12px;
        }

        .userName {
          font-weight: 600;
          color: #0f172a;
        }

        .userEmail {
          color: #64748b;
          font-size: 11px;
        }

        .logoutBtn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #b91c1c;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .logoutBtn:hover:not(:disabled) {
          background: #fef2f2;
          border-color: #fca5a5;
        }

        .logoutBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .mainContainer {
          max-width: 1000px;
          margin: 36px auto;
          padding: 0 20px;
        }

        .heroCard {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 32px 36px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 24px;
        }

        .heroCard h1 {
          font-size: 24px;
          font-weight: 700;
          color: #073e36;
          margin: 0 0 8px 0;
        }

        .heroCard p {
          color: #475569;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        .gridSection {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
          margin-bottom: 24px;
        }

        .infoCard {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }

        .infoCard h3 {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #64748b;
          margin: 0 0 10px 0;
        }

        .infoCard p {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
        }

        .infoCard span {
          display: block;
          font-size: 12px;
          color: #94a3b8;
          margin-top: 4px;
        }

        .noticeBox {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 12px;
          padding: 18px 24px;
          color: #065f46;
          font-size: 13.5px;
          line-height: 1.6;
        }

        .noticeBox strong {
          color: #047857;
        }
      `}</style>

      <div className="adminPageWrapper">
        {/* Top Navbar */}
        <header className="adminNavbar">
          <div className="navLeft">
            <Brand />
            <span className="adminBadge">Admin Panel</span>
          </div>

          <div className="navRight">
            <div className="userPill">
              <span className="userName">{admin?.name}</span>
              <span className="userEmail">{admin?.email}</span>
            </div>

            <button
              onClick={handleLogout}
              className="logoutBtn"
              disabled={isLoggingOut}
              title="Sign out of admin session"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="mainContainer">
          <div className="heroCard">
            <h1>Admin Dashboard</h1>
            <p>
              Welcome back, <strong>{admin?.name}</strong>. Authentication was successfully
              verified through the <code>/api/admin/me</code> endpoint. You are now inside
              the protected admin area.
            </p>
          </div>

          {/* Simple Info Cards */}
          <div className="gridSection">
            <div className="infoCard">
              <h3>Database Status</h3>
              <p>Connected to MySQL</p>
              <span>Table: admins (synced via Prisma)</span>
            </div>

            <div className="infoCard">
              <h3>Admin Username</h3>
              <p>@{admin?.username}</p>
              <span>ID: #{admin?.id}</span>
            </div>

            <div className="infoCard">
              <h3>Session Type</h3>
              <p>HttpOnly Cookie Session</p>
              <span>Cryptographic HMAC-SHA256 signature</span>
            </div>
          </div>

          {/* Simple Text Notice */}
          <div className="noticeBox">
            <strong>Next Steps:</strong> We can now create the Tour Packages manager,
            Destinations editor, and Customer Inquiries inbox directly within this dashboard.
          </div>
        </main>
      </div>
    </>
  );
}
