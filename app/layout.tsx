import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lite Orbit",
  description: "Refined Essentials for Modern Living",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}