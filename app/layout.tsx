import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./providers";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-themes.vercel.app/"),
  title: {
    default: "DevThemes | Premium Website Templates & Design Systems",
    template: "%s | DevThemes"
  },
  description: "Premium, highly-converting Next.js templates, Figma design systems, and headless WordPress architectures for modern startups and creators.",
  keywords: ["Next.js templates", "React templates", "Figma design systems", "SaaS templates", "Headless E-commerce", "WordPress themes", "Tailwind CSS UI kits", "Website Templates"],
  authors: [{ name: "DevThemes" }],
  creator: "DevThemes",
  publisher: "DevThemes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DevThemes | Premium Website Templates",
    description: "Build, launch, and scale faster with our premium framework-agnostic templates and design systems.",
    url: "https://dev-themes.vercel.app/",
    siteName: "DevThemes",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevThemes Premium Templates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevThemes | Premium Next.js Templates",
    description: "Premium Next.js templates, Figma design systems, and headless WordPress architectures.",
    images: ["/images/og-image.jpg"],
    creator: "@devthemes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent/30 relative transition-colors duration-500 ease-in-out">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 z-10 relative">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
          <Script src="https://app.lemonsqueezy.com/js/lemon.js" strategy="lazyOnload" />
        </body>
      </html>
    </ClerkProvider>
  );
}
