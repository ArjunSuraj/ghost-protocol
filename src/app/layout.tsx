import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GhostProtocol | Disappear on Your Own Terms",
  description: "AI-powered digital footprint erasure. Remove your personal data from brokers, breaches, and search results. Self-serve, privacy-first.",
  keywords: ["privacy", "data removal", "digital footprint", "GDPR", "CCPA", "data broker", "breach scan"],
  authors: [{ name: "GhostProtocol" }],
  openGraph: {
    title: "GhostProtocol | Disappear on Your Own Terms",
    description: "AI-powered digital footprint erasure. Remove your personal data from brokers, breaches, and search results.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground scanlines">{children}</body>
    </html>
  );
}
