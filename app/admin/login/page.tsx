"use client";

import { useState } from "react";
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errorMessage) setErrorMessage("");
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.usernameOrEmail.trim() || !formData.password) {
      setErrorMessage("Please enter both username/email and password.");
      return;
    }

    setIsLoading(true);
    // UI demo simulation
    setTimeout(() => {
      setIsLoading(false);
      setErrorMessage("");
    }, 1000);
  };

  return (
    <>
      <style>{`
        .whiteLoginWrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f8fafc;
          background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
          background-size: 24px 24px;
          padding: 24px 16px;
          color: #0f172a;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .loginContainer {
          width: 100%;
          max-width: 420px;
        }

        /* Top Brand Header */
        .brandContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 28px;
          text-align: center;
        }

        .brandContainer .brandName {
          color: #073e36;
        }

        .brandContainer .brandTagline {
          color: #d97706;
        }

        /* White Card */
        .whiteCard {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 38px 34px;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.03);
        }

        .cardHeader {
          text-align: center;
          margin-bottom: 28px;
        }

        .cardTitle {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin: 0 0 6px 0;
        }

        .cardSubtitle {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        /* Form Controls */
        .formGroup {
          margin-bottom: 20px;
        }

        .formLabel {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 7px;
        }

        .inputWrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .inputIcon {
          position: absolute;
          left: 14px;
          width: 18px;
          height: 18px;
          color: #94a3b8;
          pointer-events: none;
          transition: color 0.2s;
        }

        .whiteInput {
          width: 100%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 12px 14px 12px 42px;
          font-size: 14px;
          color: #0f172a;
          outline: none;
          transition: all 0.2s ease;
        }

        .whiteInput::placeholder {
          color: #94a3b8;
        }

        .whiteInput:focus {
          border-color: #073e36;
          box-shadow: 0 0 0 3px rgba(7, 62, 54, 0.12);
        }

        .whiteInput:focus + .inputIcon {
          color: #073e36;
        }

        .passwordField {
          padding-right: 42px;
        }

        .eyeToggleBtn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.2s;
        }

        .eyeToggleBtn:hover {
          color: #0f172a;
        }

        /* Checkbox & Forgot */
        .formOptions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          font-size: 13px;
        }

        .rememberMeLabel {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #475569;
          cursor: pointer;
          user-select: none;
        }

        .rememberCheckbox {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1px solid #cbd5e1;
          accent-color: #073e36;
          cursor: pointer;
        }

        .forgotPasswordLink {
          color: #073e36;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .forgotPasswordLink:hover {
          text-decoration: underline;
          color: #0b5e52;
        }

        /* Submit Button */
        .primaryBtn {
          width: 100%;
          background: #073e36;
          border: none;
          border-radius: 10px;
          padding: 13px 20px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(7, 62, 54, 0.2);
          transition: all 0.2s ease;
        }

        .primaryBtn:hover:not(:disabled) {
          background: #0b5449;
          box-shadow: 0 6px 18px rgba(7, 62, 54, 0.28);
          transform: translateY(-1px);
        }

        .primaryBtn:active:not(:disabled) {
          transform: translateY(0);
        }

        .primaryBtn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loadingSpinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Error Notification */
        .errorAlert {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 12px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Footer Return Link */
        .bottomReturn {
          margin-top: 24px;
          text-align: center;
        }

        .returnLink {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 13px;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }

        .returnLink:hover {
          color: #073e36;
        }

        .copyrightNote {
          margin-top: 16px;
          font-size: 11px;
          color: #94a3b8;
          text-align: center;
        }
      `}</style>

      <div className="whiteLoginWrapper">
        <div className="loginContainer">
          {/* Brand Logo Header */}
          <div className="brandContainer">
            <Brand />
          </div>

          {/* Clean White Card */}
          <div className="whiteCard">
            <div className="cardHeader">
              <h1 className="cardTitle">Admin Sign In</h1>
              <p className="cardSubtitle">Enter your credentials to access the dashboard</p>
            </div>

            {errorMessage && (
              <div className="errorAlert" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleDemoSubmit} id="admin-login-form">
              {/* Username or Email */}
              <div className="formGroup">
                <label className="formLabel" htmlFor="usernameOrEmail">
                  Username or Email
                </label>
                <div className="inputWrapper">
                  <svg className="inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    id="usernameOrEmail"
                    name="usernameOrEmail"
                    type="text"
                    required
                    placeholder="admin or admin@traveltube.com"
                    value={formData.usernameOrEmail}
                    onChange={handleChange}
                    className="whiteInput"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="formGroup">
                <label className="formLabel" htmlFor="password">
                  Password
                </label>
                <div className="inputWrapper">
                  <svg className="inputIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="whiteInput passwordField"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="eyeToggleBtn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="formOptions">
                <label className="rememberMeLabel" htmlFor="rememberMe">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rememberCheckbox"
                  />
                  <span>Remember me</span>
                </label>

                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("To reset password, check your .env or contact system admin.");
                  }}
                  className="forgotPasswordLink"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                id="admin-login-submit-btn"
                className="primaryBtn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loadingSpinner" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>

          {/* Return to website */}
          <div className="bottomReturn">
            <Link href="/" className="returnLink" id="return-home-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to TravelTube Website</span>
            </Link>
            <p className="copyrightNote">
              © {new Date().getFullYear()} TravelTube Lanka • Admin Portal
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
