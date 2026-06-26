import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "@/components/client-wrapper";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const siteDescription = "FJOR Studio is a digital design studio crafting art direction, motion design, brand identity, UI/UX, web experiences, and SEO-focused digital systems.";

export const metadata: Metadata = {
  title: {
    default: "FJOR Studio",
    template: "%s | FJOR Studio",
  },
  description: siteDescription,
  applicationName: "FJOR Studio",
  authors: [{ name: "FJOR Studio", url: "mailto:contact.fjor@gmail.com" }],
  creator: "FJOR Studio",
  publisher: "FJOR Studio",
  keywords: [
    "FJOR Studio",
    "digital design studio",
    "art direction",
    "motion design",
    "brand identity",
    "UI/UX",
    "web experience",
    "SEO",
  ],
  openGraph: {
    title: "FJOR Studio",
    description: siteDescription,
    siteName: "FJOR Studio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FJOR Studio",
    description: siteDescription,
  },
  category: "Design Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ClientWrapper>
          <div className="noise-overlay" />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
