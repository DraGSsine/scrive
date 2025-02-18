import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Scrive | Chrome Extension",
    template: "%s | Scrive",
  },
  description:
    "Enhance your LinkedIn messaging with our Chrome extension. Generate better responses and refine draft messages for improved engagement and networking.",
  keywords: [
    "LinkedIn",
    "Chrome extension",
    "message optimizer",
    "response generation",
    "draft refinement",
    "LinkedIn messaging",
    "networking",
    "engagement",
    "professional communication",
    "AI message assistant",
  ],
  authors: [{ name: "Scrive" }],
  creator: "Scrive",
  publisher: "Scrive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scrive.pro", // Replace with your actual domain
    siteName: "Scrive",
    title: "Scrive | Chrome Extension",
    description:
      "Generate better responses and refine draft messages on LinkedIn with our Chrome extension. Improve your engagement and networking efforts.",
    images: [
      {
        url: "https://scrive.pro/og-image.png", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Scrive Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrive | Chrome Extension",
    description:
      "Generate better responses and refine draft messages on LinkedIn with our Chrome extension. Improve your engagement and networking efforts.",
    creator: "@yassin_ouchen", // Replace with your Twitter handle
    images: ["https://scrive.pro/twitter-image.png"], // Replace with your actual Twitter image URL
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  alternates: {
    canonical: "https://scrive.pro", // Replace with your actual domain
    languages: {
      "en-US": "https://scrive.pro", // Replace with your actual domain
    },
  },
  category: "utilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
