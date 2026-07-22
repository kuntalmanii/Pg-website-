import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* ─── Font Optimisation (local Geist woff included by Next 14 scaffold) ───── */
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

/* ─── Metadata ─────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Luxspace PG — Premium Paying Guest Accommodation",
  description:
    "Luxspace PG offers premium, fully-furnished paying guest rooms with curated amenities, a prime location, and transparent pricing. Book your visit today.",
  keywords: ["PG accommodation", "paying guest", "Luxspace PG", "furnished rooms", "student housing"],
  authors: [{ name: "Luxspace PG" }],
  creator: "Luxspace PG",
  openGraph: {
    title: "Luxspace PG — Premium Paying Guest Accommodation",
    description:
      "Premium PG accommodation with curated amenities, prime location & transparent pricing.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxspace PG",
    description: "Premium PG accommodation — Book your visit today.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FDFBF7",
  width: "device-width",
  initialScale: 1,
};

/* ─── Root Layout ──────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-beige-light text-dark-void">
        {children}
      </body>
    </html>
  );
}
