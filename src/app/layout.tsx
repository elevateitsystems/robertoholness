import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/ui/ConditionalLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
        className={`${poppins.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ConditionalLayout>{children}</ConditionalLayout>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </body>
    </html>
  );
}
