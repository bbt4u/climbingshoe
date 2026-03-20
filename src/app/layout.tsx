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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-text-primary antialiased font-sans">{children}</body>
    </html>
  );
}
