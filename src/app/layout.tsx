import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { LayoutWrapper } from "@/components/ui/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simply Diego's | Natural Pet Food & DIY Dog Wash",
  description: "Albuquerque's premier natural pet food market, offering DIY dog wash, local delivery, and professional nutritional counseling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Footer />
      </body>
    </html>
  );
}
