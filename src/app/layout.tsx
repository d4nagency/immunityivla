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
  verification: {
    google: "google-site-verification-code", // Will be replaced with actual code
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console Verification - Replace with your code */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="Los Angeles" />
        <meta name="geo.position" content="34.0522;-118.2437" />
        <meta name="ICBM" content="34.0522, -118.2437" />
        
        {/* Preconnect to Google Analytics */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Google Analytics 4 - Replace G-XXXXXXXXXX with your actual GA4 ID */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
