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
  metadataBase: new URL("https://immunityivla.com"),
  title: {
    default: "Immunity IV LA | Mobile Immune Boost IV in Los Angeles",
    template: "%s | Immunity IV LA",
  },
  description:
    "Mobile immune boost IV therapy in Los Angeles. Same-day appointments, licensed clinicians, and on-demand hydration and vitamins delivered to your home or hotel.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Immunity IV LA | Mobile Immune Boost IV in Los Angeles",
    description:
      "Mobile immune boost IV therapy in Los Angeles. Same-day appointments and licensed clinicians—delivered to your door.",
    url: "https://immunityivla.com",
    siteName: "Immunity IV LA",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
