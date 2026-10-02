"use client";

import { useState, useEffect } from "react";

export interface ContactMessageItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
  status: "New Lead" | "In Review" | "Quote Sent" | "Confirmed" | "Archived" | string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

const STATUS_OPTIONS = [
  "New Lead",
  "In Review",
  "Quote Sent",
  "Confirmed",
  "Archived",
];

export function InquiriesView() {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Edit in modal
  const [modalStatus, setModalStatus] = useState<string>("New Lead");
  const [modalNotes, setModalNotes] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact/messages", { cache: "no-store" });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setMessages(json.data);
      }
    } catch (err) {
      console.error("Failed to load contact messages:", err);
      showNotice("error", "Could not load contact messages from database.");
    } finally {
      setIsLoading(false);
    }
  }

  const showNotice = (type: "success" | "error", text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4000);
  };

  const handleOpenDetail = (msg: ContactMessageItem) => {
    setSelectedMessage(msg);
    setModalStatus(msg.status || "New Lead");
    setModalNotes(msg.notes || "");
  };

  const handleUpdateStatusAndNotes = async () => {
    if (!selectedMessage) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/contact/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedMessage.id,
          status: modalStatus,
          notes: modalNotes,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showNotice("success", `Message #${selectedMessage.id} updated successfully!`);
        await fetchMessages();
        setSelectedMessage({
          ...selectedMessage,
          status: modalStatus,
          notes: modalNotes,
        });
      } else {
        showNotice("error", json.message || "Failed to update status.");
      }
    } catch (err) {
      console.error("Update error:", err);
      showNotice("error", "An error occurred while updating status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete message from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/contact/messages?id=${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        showNotice("success", `Message #${id} deleted.`);
        if (selectedMessage?.id === id) setSelectedMessage(null);
        await fetchMessages();
      } else {
        showNotice("error", json.message || "Failed to delete message.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showNotice("error", "Could not delete message.");
    }
  };

  const handleExportCSV = () => {
    if (messages.length === 0) {
      alert("No messages to export.");
      return;
    }
    const headers = ["ID", "Name", "Email", "Phone", "Subject", "Status", "Notes", "Date", "Message"];
    const rows = messages.map((m) => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${m.phone.replace(/"/g, '""')}"`,
      `"${(m.subject || "").replace(/"/g, '""')}"`,
      `"${m.status}"`,
      `"${(m.notes || "").replace(/"/g, '""')}"`,
      `"${new Date(m.createdAt).toLocaleDateString()}"`,
      `"${(m.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `traveltube_messages_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMessages = messages.filter((item) => {
    const matchesFilter = filterStatus === "All" || item.status === filterStatus;
    const query = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.phone.toLowerCase().includes(query) ||
      (item.message && item.message.toLowerCase().includes(query)) ||
      (item.subject && item.subject.toLowerCase().includes(query));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "New Lead":
        return { bg: "#fef3c7", text: "#92400e", border: "#fde68a" };
      case "In Review":
        return { bg: "#e0e7ff", text: "#3730a3", border: "#c7d2fe" };
      case "Quote Sent":
        return { bg: "#e0f2fe", text: "#0369a1", border: "#bae6fd" };
      case "Confirmed":
        return { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" };
      case "Archived":
        return { bg: "#f1f5f9", text: "#475569", border: "#e2e8f0" };
      default:
        return { bg: "#f1f5f9", text: "#475569", border: "#e2e8f0" };
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Toast Notification */}
      {notice && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 9999,
            padding: "14px 22px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "14px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            background: notice.type === "success" ? "#073e36" : "#e11d48",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span>{notice.type === "success" ? "✓" : "⚠"}</span>
          <span>{notice.text}</span>
        </div>
      )}

      {/* Top Header & Search Bar */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "24px 28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#073e36", margin: 0 }}>
              Customer Inquiries & Contact Messages
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
            Messages submitted via the <strong>&ldquo;Send Us a Message&rdquo;</strong> form on <code>/contact</code> with live status tracking.
          </p>
        </div>

        {/* Search input & Export */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search traveler, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "9px 14px 9px 34px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                fontSize: "13px",
                width: "240px",
                outline: "none",
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
            onClick={handleExportCSV}
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
              gap: "6px",
              boxShadow: "0 2px 4px rgba(7,62,54,0.2)",
            }}
          >
            <span>📥</span> Export CSV
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["All", ...STATUS_OPTIONS].map((status) => {
          const count =
            status === "All"
              ? messages.length
              : messages.filter((m) => m.status === status).length;
          const active = filterStatus === status;
          return (
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
                background: active ? "#073e36" : "#ffffff",
                color: active ? "#ffffff" : "#475569",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                transition: "all 0.15s ease",
              }}
            >
              {status === "All" ? `All Messages (${messages.length})` : `${status} (${count})`}
            </button>
          );
        })}
      </div>

      {/* Leads Table */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        {isLoading ? (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "3px solid #e2e8f0",
                borderTopColor: "#073e36",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
                margin: "0 auto 12px",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ margin: 0, fontSize: "14px", fontWeight: 500 }}>
              Loading user contact messages from database...
            </p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center", color: "#64748b" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>
              No messages found
            </p>
            <p style={{ fontSize: "13px", margin: 0 }}>
              {searchTerm
                ? "No messages match your search term."
                : "No messages in this status category."}
            </p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "12px" }}>
                <th style={{ padding: "14px 18px" }}>ID & Sender</th>
                <th style={{ padding: "14px 18px" }}>Contact Details</th>
                <th style={{ padding: "14px 18px" }}>Message Preview</th>
                <th style={{ padding: "14px 18px" }}>Status</th>
                <th style={{ padding: "14px 18px" }}>Received</th>
                <th style={{ padding: "14px 18px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((inq) => {
                const badge = getStatusBadgeStyle(inq.status);
                const dateStr = inq.createdAt
                  ? new Date(inq.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Recent";

                return (
                  <tr key={inq.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            background: "#ecfdf5",
                            color: "#065f46",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: "12px",
                            flexShrink: 0,
                          }}
                        >
                          {inq.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong style={{ color: "#0f172a", display: "block" }}>{inq.name}</strong>
                          <span style={{ color: "#94a3b8", fontSize: "11px" }}>#{inq.id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <a
                        href={`mailto:${inq.email}`}
                        style={{ color: "#073e36", textDecoration: "none", fontWeight: 600, display: "block" }}
                      >
                        ✉️ {inq.email}
                      </a>
                      <a
                        href={`tel:${inq.phone.replace(/\s+/g, "")}`}
                        style={{ color: "#64748b", textDecoration: "none", fontSize: "11.5px" }}
                      >
                        📞 {inq.phone}
                      </a>
                    </td>
                    <td style={{ padding: "14px 18px", maxWidth: "280px" }}>
                      {inq.subject && (
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#f0642b", display: "block" }}>
                          {inq.subject}
                        </span>
                      )}
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12.5px",
                          color: "#334155",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {inq.message || "(No message body)"}
                      </p>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          background: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`,
                          display: "inline-block",
                        }}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px", color: "#64748b", fontSize: "12px", whiteSpace: "nowrap" }}>
                      {dateStr}
                    </td>
                    <td style={{ padding: "14px 18px", textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <button
                          onClick={() => handleOpenDetail(inq)}
                          style={{
                            background: "#073e36",
                            color: "#ffffff",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          View & Reply
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id, inq.name)}
                          style={{
                            background: "#fff1f2",
                            border: "1px solid #fecdd3",
                            color: "#e11d48",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal / Drawer for Viewing Single Inquiry Details */}
      {selectedMessage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(3px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
          onClick={() => setSelectedMessage(null)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "680px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#008b86", fontWeight: 700 }}>
                  MESSAGE #{selectedMessage.id}
                </span>
                <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "2px 0 4px" }}>
                  {selectedMessage.name}
                </h2>
                <span style={{ fontSize: "13px", color: "#64748b" }}>
                  {selectedMessage.email} • {selectedMessage.phone}
                </span>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#64748b",
                }}
              >
                ✕
              </button>
            </div>

            {/* Status Change Selector */}
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "20px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Update Message Status:
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "13px",
                    fontWeight: 600,
                    outline: "none",
                    background: "#ffffff",
                    color: "#073e36",
                  }}
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleUpdateStatusAndNotes}
                disabled={isUpdating}
                style={{
                  background: "#073e36",
                  color: "#ffffff",
                  border: "none",
                  padding: "9px 18px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: isUpdating ? "not-allowed" : "pointer",
                  boxShadow: "0 2px 4px rgba(7,62,54,0.15)",
                }}
              >
                {isUpdating ? "Saving..." : "✓ Save Status & Notes"}
              </button>
            </div>

            {/* Traveler Message */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Client&apos;s Message:
              </label>
              <div
                style={{
                  background: "#fdfefe",
                  border: "1px solid #e2e8f0",
                  padding: "16px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  lineHeight: "1.65",
                  color: "#1e293b",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedMessage.message || "(No message content provided)"}
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontSize: "12px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
                Internal Staff Notes:
              </label>
              <textarea
                value={modalNotes}
                onChange={(e) => setModalNotes(e.target.value)}
                placeholder="Add private staff notes, chauffeur guide assignment, or custom quote details..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Direct Action Buttons */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #edf2f7", paddingTop: "18px" }}>
              <button
                onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                style={{
                  background: "#fff1f2",
                  border: "1px solid #fecdd3",
                  color: "#e11d48",
                  padding: "9px 16px",
                  borderRadius: "8px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                🗑️ Delete Message
              </button>

              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(selectedMessage.name)},%20thank%20you%20for%20contacting%20TravelTube%20Lanka!`}
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
                    gap: "6px",
                  }}
                >
                  💬 Chat on WhatsApp
                </a>

                <a
                  href={`mailto:${selectedMessage.email}?subject=TravelTube Lanka - Reply to Your Inquiry`}
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
                    gap: "6px",
                  }}
                >
                  ✉️ Send Email
                </a>

                <button
                  onClick={() => setSelectedMessage(null)}
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    padding: "9px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
