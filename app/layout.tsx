import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelTube Lanka | Discover the Real Sri Lanka",
  description: "Authentic experiences, local knowledge and personalized journeys through the beautiful island of Sri Lanka.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
