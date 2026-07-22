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

export const metadata: Metadata = {
  title: "LuxSpace | Luxury Co-Living · Sector 126 Noida",
  description: "Ultra-premium, editorial co-living accommodation in Sector 126 Noida near Amity University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#F7F1E8] text-[#2D2D2D] font-sans antialiased selection:bg-[#A7B7E7]/40 selection:text-[#2D2D2D]">
        {children}
      </body>
    </html>
  );
}
