import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://luxspace.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LUXSPACE | Luxury PG in Noida · Co Living Near Amity University Sector 126",
    template: "%s | LUXSPACE Co-Living Noida",
  },
  description:
    "LuxSpace offers ultra-premium PG accommodation in Sector 126 Noida, walking distance from Amity University. Fully furnished rooms, healthy meals, AC, 24x7 security & optical fiber Wi-Fi for students & working professionals.",
  keywords: [
    "PG in Noida",
    "PG Near Amity",
    "Best PG Sector 126",
    "Co Living Noida",
    "Students Accommodation",
    "Working Professional PG",
    "Luxury PG Noida",
    "Luxury PG Sector 126 Noida",
    "PG near Amity University Noida",
    "Paying Guest Sector 126 Noida",
  ],
  authors: [{ name: "LUXSPACE Co-Living" }],
  creator: "LUXSPACE",
  publisher: "LUXSPACE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LUXSPACE | Luxury Co-Living & PG in Sector 126 Noida",
    description:
      "Ultra-premium PG & Co-Living accommodation walking distance from Amity University Noida. Fully furnished rooms, meals, AC, Wi-Fi & 24/7 security.",
    url: siteUrl,
    siteName: "LUXSPACE Co-Living",
    images: [
      {
        url: `${siteUrl}/gallery/room-1.jpg`,
        width: 1200,
        height: 630,
        alt: "LUXSPACE Premium Co-Living Room Sector 126 Noida",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXSPACE | Luxury Co-Living & PG in Sector 126 Noida",
    description:
      "Ultra-premium PG accommodation near Amity University Noida. Fully furnished suites, meals, AC, Wi-Fi & round-the-clock security.",
    images: [`${siteUrl}/gallery/room-1.jpg`],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "LUXSPACE Co-Living",
    "image": `${siteUrl}/gallery/room-1.jpg`,
    "@id": `${siteUrl}/#lodging`,
    "url": siteUrl,
    "telephone": "+919876543210",
    "email": "stay@luxspace.in",
    "priceRange": "₹12,000 - ₹25,000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sector 126",
      "addressLocality": "Noida",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "201313",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.5391585,
      "longitude": 77.3328424,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      "opens": "00:00",
      "closes": "23:59",
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Fully Furnished Rooms", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Attached Washroom", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "High Speed Fiber Wi-Fi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Daily Housekeeping", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Healthy Meals Included", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Power Backup", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24x7 CCTV & Security", "value": true },
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#F7F1E8] text-[#2D2D2D] font-sans antialiased selection:bg-[#A7B7E7]/40 selection:text-[#2D2D2D]">
        {children}
      </body>
    </html>
  );
}
