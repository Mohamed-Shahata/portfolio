import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://devcore.dev";
const SITE_TITLE =
  "Mohamed Shehata | Full Stack Software Agency-Grade Development";
const SITE_DESCRIPTION =
  "I design and develop modern web applications, SaaS platforms, business systems, APIs, and desktop solutions that help businesses grow.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Mohamed Shehata",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "full stack developer",
    "ERP development",
    "SaaS development",
    "NestJS",
    "Next.js",
    "business systems",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Mohamed Shehata",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cairo.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-white font-[family-name:var(--font-inter)] [html[dir=rtl]_&]:font-[family-name:var(--font-cairo)]">
        <LocaleProvider>{children}</LocaleProvider>
        <PageViewTracker />
      </body>
    </html>
  );
}
