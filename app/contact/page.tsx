"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer";
import { SearchDialog } from "@/components/landing-page/SearchDialog";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

interface ContactInfoData {
  eyebrow: string;
  headingWord: string;
  headingAccent: string;
  subheading: string;
  officeTitle: string;
  companyName: string;
  addressLine1: string;
  addressCity: string;
  phoneTitle: string;
  phone1: string;
  phone2: string;
  emailTitle: string;
  primaryEmail: string;
  secondaryEmail: string;
}

const DEFAULT_CONTACT: ContactInfoData = {
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

export default function ContactPage() {
  const searchDialog = useRef<HTMLDialogElement>(null);

  // Live Contact Info from Database
  const [contactInfo, setContactInfo] = useState<ContactInfoData>(DEFAULT_CONTACT);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch("/api/contact", { cache: "no-store" });
        const json = await res.json();
        if (json.success && json.data) {
          setContactInfo(json.data);
        }
      } catch (err) {
        console.error("Failed to load contact info:", err);
      }
    }
    fetchContact();
  }, []);

  // Form State
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleOpenSearch = () => {
    if (typeof window !== "undefined") {
      const scrollPos = window.scrollY;
      searchDialog.current?.showModal();
      window.scrollTo({ top: scrollPos, behavior: "instant" });
    } else {
      searchDialog.current?.showModal();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your contact number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert(json.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An unexpected error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .contactPageWrapper {
          min-height: 100vh;
          background: #ffffff;
          color: #173832;
          overflow-x: hidden;
        }

        /* Top Header Bar */
        .contactHeaderBar {
          background: #073e36;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Top Scenic Sigiriya Golden-Hour Banner */
        .contactHeroBanner {
          position: relative;
          width: 100%;
          height: clamp(190px, 21vw, 280px);
          overflow: hidden;
          background: #0d211a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contactBannerImg {
          object-fit: cover;
          object-position: center 30%;
        }

        .bannerOverlayGradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(7, 30, 26, 0.45) 0%,
            rgba(7, 30, 26, 0.62) 50%,
            rgba(7, 30, 26, 0.78) 100%
          );
          z-index: 2;
        }

        .bannerContentOverlay {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 10px 24px;
        }

        .bannerMainTitle {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4.2vw, 56px);
          font-weight: 700;
          letter-spacing: -0.6px;
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.7), 0 1px 4px rgba(0, 0, 0, 0.9);
        }

        .bannerTitleAccent {
          color: #f0642b;
        }

        .bannerDividerLine {
          width: 36px;
          height: 2.5px;
          background: #e8a838;
          margin: 10px auto 12px;
          border-radius: 2px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        .bannerBreadcrumbs {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: clamp(12px, 1.2vw, 14px);
          letter-spacing: 0.5px;
        }

        .bannerBreadcrumbs .crumbLink {
          color: #ffffff;
          font-weight: 500;
          text-decoration: none;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
          transition: color 0.2s ease;
        }

        .bannerBreadcrumbs .crumbLink:hover {
          color: #ffb11b;
          text-decoration: underline;
        }

        .bannerBreadcrumbs .crumbSlash {
          color: rgba(255, 255, 255, 0.65);
          font-weight: 400;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
        }

        .bannerBreadcrumbs .crumbActive {
          color: #f0642b;
          font-weight: 600;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        /* Banner Corner Botanical Accent */
        .bannerCornerLeaf {
          position: absolute;
          right: 28px;
          top: 18px;
          width: 140px;
          height: 140px;
          color: rgba(255, 255, 255, 0.28);
          pointer-events: none;
          z-index: 3;
        }

        /* Main Contact Section */
        .contactMainSection {
          position: relative;
          padding: 60px 0 90px;
          background: #ffffff;
          overflow: hidden;
        }

        .contactContainer {
          position: relative;
          z-index: 2;
          width: min(1300px, 92%);
          margin: 0 auto;
        }

        /* Header Intro */
        .contactHeaderGroup {
          position: relative;
          text-align: center;
          max-width: 720px;
          margin: 0 auto 46px;
        }

        .contactEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #f0642b;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .contactEyebrowLine {
          display: inline-block;
          width: 32px;
          height: 2px;
          background: #073e36;
          border-radius: 1px;
        }

        .contactMainHeading {
          margin: 0 0 14px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(32px, 3.4vw, 46px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: -0.6px;
        }

        .contactMainHeading .headingAccent {
          color: #f0642b;
        }

        .contactSubheading {
          margin: 0 auto;
          color: #556c75;
          font-size: 14.5px;
          line-height: 1.65;
          max-width: 660px;
        }

        /* Cute Top-Right Airplane Doodle with Flight Trail */
        .flightTrailContainer {
          position: absolute;
          top: -12px;
          right: -130px;
          width: 170px;
          height: 120px;
          pointer-events: none;
          z-index: 2;
        }

        /* Decorative Botanical Accents */
        .decorPalmLeft {
          position: absolute;
          left: -35px;
          top: 140px;
          width: 220px;
          height: 480px;
          color: #a7ccc3;
          opacity: 0.42;
          pointer-events: none;
          z-index: 1;
        }

        .decorLeafRight {
          position: absolute;
          right: -30px;
          top: 120px;
          width: 200px;
          height: 460px;
          color: #a7ccc3;
          opacity: 0.42;
          pointer-events: none;
          z-index: 1;
        }

        .decorDotGrid {
          position: absolute;
          right: 28px;
          top: 38%;
          z-index: 1;
          pointer-events: none;
          opacity: 0.85;
        }

        .decorWaveLeft {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 280px;
          height: 180px;
          color: #f0f7f5;
          pointer-events: none;
          z-index: 0;
        }

        .decorWaveRight {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 300px;
          height: 190px;
          color: #f0f7f5;
          pointer-events: none;
          z-index: 0;
        }

        /* 3 Contact Info Cards Grid */
        .contactCardsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 46px;
        }

        .infoCard {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 26px 28px;
          background: #ffffff;
          border: 1px solid #e7efec;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(7, 62, 54, 0.035);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .infoCard:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(7, 62, 54, 0.08);
          border-color: #bad5ce;
        }

        .infoCardBadge {
          display: grid;
          place-items: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .infoCard:hover .infoCardBadge {
          transform: scale(1.08);
        }

        .badgeLocation {
          background: #e5f4f0;
          color: #f0642b;
        }

        .badgePhone {
          background: #fef0e7;
          color: #f0642b;
        }

        .badgeEmail {
          background: #fef0e7;
          color: #f0642b;
        }

        .infoCardContent {
          display: flex;
          flex-direction: column;
        }

        .infoCardTitle {
          margin: 0 0 6px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17.5px;
          font-weight: 700;
          letter-spacing: -0.2px;
        }

        .infoCardText {
          margin: 0;
          color: #556c75;
          font-size: 13.5px;
          line-height: 1.55;
        }

        .infoCardText a {
          color: #556c75;
          text-decoration: none;
          transition: color 0.2s ease;
          display: inline-block;
        }

        .infoCardText a:hover {
          color: #f0642b;
        }

        /* Two-Column Section: Form + Promotional Showcase */
        .contactTwoColGrid {
          display: grid;
          grid-template-columns: 1.32fr 1fr;
          gap: 28px;
          align-items: stretch;
        }

        /* Left Column: Form Card */
        .formCard {
          background: #ffffff;
          border: 1px solid #e7efec;
          border-radius: 22px;
          padding: 34px 38px;
          box-shadow: 0 6px 24px rgba(7, 62, 54, 0.04);
          display: flex;
          flex-direction: column;
        }

        .formTopAccentBar {
          width: 32px;
          height: 3px;
          background: #f0642b;
          border-radius: 2px;
          margin-bottom: 12px;
        }

        .formCardTitle {
          margin: 0 0 6px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(24px, 2.2vw, 28px);
          font-weight: 700;
          letter-spacing: -0.4px;
        }

        .formCardTitle .titleAccent {
          color: #f0642b;
        }

        .formCardSubtitle {
          margin: 0 0 24px;
          color: #6a8288;
          font-size: 13.5px;
          line-height: 1.55;
        }

        .contactForm {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .formRowTwoCol {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .formLabel {
          font-size: 12.5px;
          font-weight: 600;
          color: #1e453e;
          letter-spacing: 0.2px;
        }

        .inputWithIcon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .inputIcon {
          position: absolute;
          left: 14px;
          width: 17px;
          height: 17px;
          color: #92ab9f;
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .formInput {
          width: 100%;
          min-height: 44px;
          padding: 10px 14px 10px 42px;
          background: #ffffff;
          border: 1.5px solid #dbe6e2;
          border-radius: 12px;
          font-size: 13.5px;
          color: #123630;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }

        .formInput::placeholder {
          color: #a4bab2;
          font-weight: 400;
          font-size: 13px;
        }

        .formInput:focus {
          border-color: #073e36;
          box-shadow: 0 0 0 3px rgba(7, 62, 54, 0.08);
        }

        .formInput.inputError {
          border-color: #e5533d;
          background: #fffafa;
        }

        .formInput:focus ~ .inputIcon,
        .inputWithIcon:focus-within .inputIcon {
          color: #073e36;
        }

        .formTextarea {
          width: 100%;
          min-height: 110px;
          padding: 12px 14px 12px 42px;
          background: #ffffff;
          border: 1.5px solid #dbe6e2;
          border-radius: 12px;
          font-size: 13.5px;
          color: #123630;
          outline: none;
          resize: vertical;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }

        .formTextarea::placeholder {
          color: #a4bab2;
          font-weight: 400;
          font-size: 13px;
        }

        .formTextarea:focus {
          border-color: #073e36;
          box-shadow: 0 0 0 3px rgba(7, 62, 54, 0.08);
        }

        .textareaWithIcon .inputIcon {
          top: 14px;
        }

        .fieldErrorMessage {
          font-size: 11.5px;
          color: #e5533d;
          font-weight: 500;
          margin-top: 2px;
        }

        /* Submit Button */
        .submitBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 6px;
          padding: 13px 32px;
          min-height: 46px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #f0642b 0%, #ed8a28 100%);
          color: #ffffff;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(240, 100, 43, 0.32);
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          align-self: flex-start;
        }

        .submitBtn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(240, 100, 43, 0.42);
        }

        .submitBtn:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .submitBtn .btnArrow {
          transition: transform 0.2s ease;
        }

        .submitBtn:hover:not(:disabled) .btnArrow {
          transform: translateX(4px);
        }

        /* Success Message Card */
        .formSuccessCard {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 24px;
          background: #f4fbf8;
          border: 1.5px solid #a8d5c7;
          border-radius: 16px;
          margin-top: 10px;
        }

        .successIconCircle {
          display: grid;
          place-items: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #073e36;
          color: #ffffff;
          margin-bottom: 16px;
        }

        .successTitle {
          margin: 0 0 10px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 22px;
          font-weight: 700;
        }

        .successDesc {
          margin: 0 0 22px;
          color: #556c75;
          font-size: 14px;
          line-height: 1.6;
          max-width: 440px;
        }

        .resetFormBtn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 9999px;
          background: #073e36;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .resetFormBtn:hover {
          background: #0b564b;
        }

        /* Right Column: Promotional Showcase Card */
        .showcaseCard {
          background: #ffffff;
          border: 1px solid #e7efec;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 6px 24px rgba(7, 62, 54, 0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .showcaseCard:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(7, 62, 54, 0.08);
        }

        .showcaseImageWrapper {
          position: relative;
          width: 100%;
          height: clamp(230px, 22vw, 290px);
          overflow: hidden;
          background: #d8ece6;
        }

        .showcasePhoto {
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }

        .showcaseCard:hover .showcasePhoto {
          transform: scale(1.04);
        }

        /* SVG Curved Wave at Bottom of Photo */
        .showcaseWave {
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          width: 100%;
          height: 48px;
          z-index: 2;
          pointer-events: none;
        }

        .showcaseContent {
          padding: 26px 32px 34px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .showcaseAccentBar {
          width: 32px;
          height: 3px;
          background: #f0642b;
          border-radius: 2px;
          margin-bottom: 14px;
        }

        .showcaseTitle {
          margin: 0 0 12px;
          color: #073e36;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(24px, 2.3vw, 30px);
          font-weight: 700;
          letter-spacing: -0.4px;
          line-height: 1.22;
        }

        .showcaseTitle .titleAccent {
          color: #f0642b;
        }

        .showcaseText {
          margin: 0 0 24px;
          color: #556c75;
          font-size: 14px;
          line-height: 1.65;
        }

        .showcasePillRow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .showcasePill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          background: #f0f7f5;
          color: #073e36;
          font-size: 11.5px;
          font-weight: 600;
        }

        .showcasePill svg {
          width: 13px;
          height: 13px;
          color: #f0642b;
        }

        .showcaseActionBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #073e36;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
          margin-top: auto;
        }

        .showcaseActionBtn:hover {
          color: #f0642b;
          transform: translateX(4px);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1120px) {
          .contactCardsGrid {
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
          }
          .flightTrailContainer,
          .decorPalmLeft,
          .decorLeafRight,
          .decorDotGrid {
            display: none;
          }
        }

        @media (max-width: 960px) {
          .contactCardsGrid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .contactTwoColGrid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .formCard {
            padding: 28px 24px;
          }
          .showcaseContent {
            padding: 24px;
          }
        }

        @media (max-width: 640px) {
          .contactMainSection {
            padding: 42px 0 60px;
          }
          .formRowTwoCol {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .submitBtn {
            width: 100%;
          }
        }
      `}</style>

      <div className="contactPageWrapper">
        {/* Header Navigation */}
        <div className="contactHeaderBar">
          <Navbar activePage="contact" onOpenSearch={handleOpenSearch} />
        </div>

        {/* Top Scenic Sigiriya Sunrise Banner with HTML/CSS Text Overlay */}
        <div className="contactHeroBanner">
          <Image
            src="/images/contact-hero-banner.jpg"
            alt="Scenic Sunrise over Sigiriya Rock Fortress with Traveler Overlooking Sri Lanka Landscape"
            fill
            priority
            sizes="100vw"
            className="contactBannerImg"
          />
          <div className="bannerOverlayGradient" aria-hidden="true" />

          {/* Subtle Botanical Branch Outline in Upper Right */}
          <svg
            className="bannerCornerLeaf"
            viewBox="0 0 160 160"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M150 10C100 20 50 60 20 120c40-10 90-40 130-110Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M20 120c15-40 45-75 90-100M60 70l35 25M85 45l35 25M110 25l30 20"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>

          <div className="bannerContentOverlay">
            <h1 className="bannerMainTitle">
              Contact <span className="bannerTitleAccent">Us</span>
            </h1>
            <div className="bannerDividerLine" aria-hidden="true" />
            <nav className="bannerBreadcrumbs" aria-label="Breadcrumb">
              <Link href="/" className="crumbLink">
                Home
              </Link>
              <span className="crumbSlash" aria-hidden="true">
                /
              </span>
              <span className="crumbActive">Contact Us</span>
            </nav>
          </div>
        </div>

        {/* Main Section Content */}
        <main className="contactMainSection">
          {/* Subtle Decorative Botanical SVGs matching the mockup */}
          <svg
            className="decorPalmLeft"
            viewBox="0 0 200 360"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M70 360C62 260 58 145 88 65"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M87 69C45 22 14 33 2 60c36-11 55-1 85 9M87 69C32 54 6 75 2 105c33-24 55-27 85-36M87 69C30 83 15 113 22 146c13-39 34-59 65-77M87 69c6-48 33-59 63-49-33 10-48 24-63 49M87 69c44-40 77-24 94 6-39-12-62-15-94-6M87 69c53-8 79 21 85 52-31-32-50-44-85-52M87 69c38 18 48 49 41 83-13-37-23-59-41-83Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            {/* Secondary smaller palm behind */}
            <path
              d="M135 360C128 280 130 190 155 130"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.65"
            />
            <path
              d="M155 130C120 95 95 105 85 125c28-8 42-1 65 7M155 130c5-38 26-47 50-39-26 8-38 19-50 39M155 130c35-32 61-19 75 5-31-10-49-12-75-5M155 130c30 14 38 39 32 66-10-29-18-47-32-66Z"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.65"
            />
          </svg>

          <svg
            className="decorLeafRight"
            viewBox="0 0 180 340"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M30 330 C45 220 110 130 145 15 C195 70 190 150 150 210 C120 255 75 275 35 280"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M145 15 C90 50 50 100 45 160 C40 220 60 255 45 290"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M130 65 L165 125 M115 110 L55 105 M100 155 L160 175 M80 195 L40 180 M65 235 L130 245"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>

          {/* Orange Dot Grid on Right */}
          <svg
            className="decorDotGrid"
            width="56"
            height="96"
            viewBox="0 0 56 96"
            fill="none"
            aria-hidden="true"
          >
            {[...Array(6)].map((_, row) =>
              [...Array(3)].map((_, col) => (
                <circle
                  key={`dot-${row}-${col}`}
                  cx={col * 19 + 6}
                  cy={row * 16 + 6}
                  r="2.5"
                  fill="#ea8a3a"
                />
              ))
            )}
          </svg>

          {/* Bottom Left & Right Landscape Wash SVGs */}
          <svg
            className="decorWaveLeft"
            viewBox="0 0 280 180"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 180V90c30-15 70-35 120-20 60 18 100-10 160 10v100H0Z" />
          </svg>

          <svg
            className="decorWaveRight"
            viewBox="0 0 300 190"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M300 190V80c-40-20-80-10-130 15-50 25-100 10-170 25v70h300Z" />
          </svg>

          <div className="contactContainer">
            {/* Header Intro Group */}
            <div className="contactHeaderGroup">
              {/* Cute Looping Flight Path with Airplane */}
              <div className="flightTrailContainer" aria-hidden="true">
                <svg
                  viewBox="0 0 160 110"
                  fill="none"
                  className="w-full h-full"
                >
                  <path
                    d="M10 85 C 45 90, 85 75, 105 38 C 115 20, 132 18, 140 22"
                    stroke="#74b5a8"
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                  />
                  <g transform="translate(130, 16) rotate(22)">
                    <path
                      d="M1.5 12.5L20 7L13 22L10 14.5L1.5 12.5Z"
                      fill="#5aa899"
                    />
                  </g>
                </svg>
              </div>

              <div className="contactEyebrow">
                <span className="contactEyebrowLine" aria-hidden="true" />
                <span>{contactInfo.eyebrow}</span>
                <span className="contactEyebrowLine" aria-hidden="true" />
              </div>

              <h2 className="contactMainHeading">
                {contactInfo.headingWord} <span className="headingAccent">{contactInfo.headingAccent}</span>
              </h2>

              <p className="contactSubheading">
                {contactInfo.subheading}
              </p>
            </div>

            {/* Top 3 Info Cards Grid */}
            <div className="contactCardsGrid">
              {/* Card 1: Our Office Location */}
              <div className="infoCard">
                <div className="infoCardBadge badgeLocation" aria-hidden="true">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div className="infoCardContent">
                  <h3 className="infoCardTitle">{contactInfo.officeTitle}</h3>
                  <p className="infoCardText">
                    {contactInfo.companyName},
                    <br />
                    {contactInfo.addressLine1},
                    <br />
                    {contactInfo.addressCity}
                  </p>
                </div>
              </div>

              {/* Card 2: Contact Number */}
              <div className="infoCard">
                <div className="infoCardBadge badgePhone" aria-hidden="true">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="infoCardContent">
                  <h3 className="infoCardTitle">{contactInfo.phoneTitle}</h3>
                  <p className="infoCardText">
                    <a href={`tel:${contactInfo.phone1.replace(/\s+/g, "")}`}>{contactInfo.phone1}</a>
                    {contactInfo.phone2 && (
                      <>
                        <br />
                        <a href={`tel:${contactInfo.phone2.replace(/\s+/g, "")}`}>{contactInfo.phone2}</a>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Card 3: Email Address */}
              <div className="infoCard">
                <div className="infoCardBadge badgeEmail" aria-hidden="true">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="infoCardContent">
                  <h3 className="infoCardTitle">{contactInfo.emailTitle}</h3>
                  <p className="infoCardText">
                    <a href={`mailto:${contactInfo.primaryEmail}`}>{contactInfo.primaryEmail}</a>
                    {contactInfo.secondaryEmail && (
                      <>
                        <br />
                        <a href={`mailto:${contactInfo.secondaryEmail}`}>{contactInfo.secondaryEmail}</a>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Two-Column Section: Form + Promotional Showcase */}
            <div className="contactTwoColGrid">
              {/* Left Column: Form Card */}
              <div className="formCard">
                <div className="formTopAccentBar" aria-hidden="true" />
                <h3 className="formCardTitle">
                  Send Us a <span className="titleAccent">Message</span>
                </h3>
                <p className="formCardSubtitle">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>

                {isSuccess ? (
                  <div className="formSuccessCard">
                    <div className="successIconCircle" aria-hidden="true">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <h4 className="successTitle">Message Sent Successfully!</h4>
                    <p className="successDesc">
                      Thank you for contacting Travel Tube Lanka! Our tour specialists have received your message and will reach out to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      className="resetFormBtn"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contactForm" onSubmit={handleSubmit} noValidate>
                    {/* Row 1: Name and Email */}
                    <div className="formRowTwoCol">
                      <div className="formGroup">
                        <label className="formLabel" htmlFor="contact-name">
                          Name *
                        </label>
                        <div className="inputWithIcon">
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`formInput ${errors.name ? "inputError" : ""}`}
                            aria-required="true"
                            aria-invalid={!!errors.name}
                          />
                          <svg
                            className="inputIcon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        {errors.name && (
                          <span className="fieldErrorMessage">{errors.name}</span>
                        )}
                      </div>

                      <div className="formGroup">
                        <label className="formLabel" htmlFor="contact-email">
                          Email *
                        </label>
                        <div className="inputWithIcon">
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`formInput ${errors.email ? "inputError" : ""}`}
                            aria-required="true"
                            aria-invalid={!!errors.email}
                          />
                          <svg
                            className="inputIcon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </div>
                        {errors.email && (
                          <span className="fieldErrorMessage">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Contact Number */}
                    <div className="formGroup">
                      <label className="formLabel" htmlFor="contact-phone">
                        Contact Number *
                      </label>
                      <div className="inputWithIcon">
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          placeholder="Enter the contact number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`formInput ${errors.phone ? "inputError" : ""}`}
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                        />
                        <svg
                          className="inputIcon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      {errors.phone && (
                        <span className="fieldErrorMessage">{errors.phone}</span>
                      )}
                    </div>

                    {/* Row 3: Message */}
                    <div className="formGroup">
                      <label className="formLabel" htmlFor="contact-message">
                        Message
                      </label>
                      <div className="inputWithIcon textareaWithIcon">
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={4}
                          placeholder="Enter your message"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="formTextarea"
                        />
                        <svg
                          className="inputIcon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="submitBtn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Send Your Message</span>
                          <svg
                            className="btnArrow"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Promotional Showcase Card */}
              <div className="showcaseCard">
                <div className="showcaseImageWrapper">
                  <Image
                    src="/images/contact-lighthouse.jpg"
                    alt="Scenic coastal lighthouse perched on Sri Lanka tropical promontory surrounded by turquoise ocean"
                    fill
                    sizes="(max-width: 960px) 100vw, 500px"
                    className="showcasePhoto"
                  />
                  {/* Organic Smooth Wave Cutout matching the mockup */}
                  <svg
                    className="showcaseWave"
                    viewBox="0 0 500 50"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,28 C140,58 330,-12 500,32 L500,50 L0,50 Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>

                <div className="showcaseContent">
                  <div className="showcaseAccentBar" aria-hidden="true" />
                  <h3 className="showcaseTitle">
                    Let&apos;s Plan Your <span className="titleAccent">Next Journey</span>
                  </h3>
                  <p className="showcaseText">
                    Have a travel idea in mind? Get in touch with our friendly team and let us turn it into an unforgettable experience in Sri Lanka and beyond.
                  </p>

                  <div className="showcasePillRow">
                    <span className="showcasePill">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Tailor-Made Tours
                    </span>
                    <span className="showcasePill">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      24/7 Island Support
                    </span>
                    <span className="showcasePill">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Direct Operator Rates
                    </span>
                  </div>

                  <a
                    href="https://traveltube.lk/plan-tour.php"
                    target="_blank"
                    rel="noreferrer"
                    className="showcaseActionBtn"
                  >
                    <span>Create Custom Itinerary</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Search Modal Dialog */}
        <SearchDialog
          dialogRef={searchDialog}
          onSelectJourney={() => searchDialog.current?.close()}
        />
      </div>
    </>
  );
}
