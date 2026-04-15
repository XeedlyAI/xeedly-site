import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout/Layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://xeedly.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "XeedlyAI — AI intelligence platforms for operational businesses",
    template: "%s — XeedlyAI",
  },
  description:
    "XeedlyAI builds AI-native intelligence platforms and automated growth systems. Sovvrn for restaurants, Propertyolio for property management, and growth systems starting at $297/mo.",
  keywords: [
    "AI intelligence platform",
    "operational intelligence",
    "restaurant AI",
    "property management AI",
    "AI marketing automation",
    "Sovvrn",
    "Propertyolio",
    "Claude-powered",
    "AI briefing",
    "signal engine",
  ],
  authors: [{ name: "XeedlyAI" }],
  creator: "XeedlyAI",
  publisher: "XeedlyAI",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "XeedlyAI",
    title: "XeedlyAI — AI intelligence platforms for operational businesses",
    description:
      "Every business generates thousands of signals a day. XeedlyAI turns that operational data into daily intelligence.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "XeedlyAI — AI intelligence platforms",
    description:
      "AI-native intelligence platforms and automated growth systems.",
    creator: "@xeedlyai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "XeedlyAI",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "AI-native intelligence platforms and automated growth systems for operational businesses.",
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Salt Lake City",
    addressRegion: "UT",
    addressCountry: "US",
  },
  email: "hello@xeedly.com",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
