import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boulder Fit — Find Your Perfect Climbing Shoe",
  description:
    "AI-powered bouldering shoe recommendations based on your foot shape, size, and climbing style.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased">{children}</body>
    </html>
  );
}
