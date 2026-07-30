import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* ─── Font Optimisation (local Geist woff) ───────────────────────────────── */
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

/* ─── Production SEO Metadata ────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Luxspace PG — Premium Student PG near Amity University Noida",
  description:
    "Luxspace PG offers luxury, fully-furnished paying guest suites near Amity University Gate 2, Sector 126 Noida. 3 daily chef meals, 1 Gbps Wi-Fi, daily housekeeping, 24/7 security. All-inclusive starting at ₹12,000/mo.",
  keywords: [
    "Luxspace PG",
    "PG near Amity University",
    "Paying Guest Sector 126 Noida",
    "Luxury PG Noida",
    "Boys PG Sector 126",
    "Girls PG Sector 126",
    "Student accommodation Noida",
  ],
  authors: [{ name: "Luxspace PG Hospitality" }],
  creator: "Luxspace PG",
  publisher: "Luxspace PG",
  metadataBase: new URL("https://luxspacepg.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Luxspace PG — Premium Student PG near Amity University Noida",
    description:
      "Luxury student residence 2 mins from Amity University Gate 2. 3 daily chef meals, 1 Gbps Wi-Fi, daily housekeeping, 24/7 biometric security. Book your private visit today.",
    url: "https://luxspacepg.com",
    siteName: "Luxspace PG",
    images: [
      {
        url: "/rooms/executive-suite.png",
        width: 1200,
        height: 630,
        alt: "Luxspace PG Executive Suite Interior",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxspace PG — Luxury Student Residence",
    description:
      "Premium PG accommodation near Amity University Noida. 3 daily chef meals, 1 Gbps Wi-Fi, 24/7 security. Schedule a visit.",
    images: ["/rooms/executive-suite.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1A18",
  width: "device-width",
  initialScale: 1,
};

/* ─── Schema.org Structured Data (JSON-LD) ───────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Luxspace PG",
  image: "https://luxspacepg.com/rooms/executive-suite.png",
  description:
    "Luxury student paying guest residence near Amity University Gate 2, Sector 126 Noida.",
  url: "https://luxspacepg.com",
  telephone: "+918882813740",
  priceRange: "₹12,000 - ₹18,000 / month",
  address: {
    "@type": "PostalAddress",
    streetAddress: "J-14, Royal Street Lane, 80 Raipur Khadar, Sector 126",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201313",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5435,
    longitude: 77.3328,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "3 Daily Chef Meals", value: true },
    { "@type": "LocationFeatureSpecification", name: "1 Gbps Mesh Wi-Fi 6", value: true },
    { "@type": "LocationFeatureSpecification", name: "24/7 Biometric Security", value: true },
    { "@type": "LocationFeatureSpecification", name: "Daily Housekeeping", value: true },
    { "@type": "LocationFeatureSpecification", name: "Covered Parking", value: true },
  ],
};

/* ─── Root Layout ──────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#FAF6F0] text-[#24211E]">
        {children}
      </body>
    </html>
  );
}
