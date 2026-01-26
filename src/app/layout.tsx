import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
});

const siteUrl = "https://oklahomabillionaire.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Office of the Oklahoma Billionaire | Private Office",
    template: "%s | Oklahoma Billionaire",
  },
  description: "A private office facilitating Global Economic Abundance through technology, innovation, and the arts. Managing a diverse portfolio of operating companies, venture investments, and philanthropic initiatives.",
  keywords: [
    "private office",
    "Oklahoma",
    "venture capital",
    "technology",
    "innovation",
    "philanthropy",
    "Jessy Artman",
    "PowerClub Global",
    "Alpha Protocol",
    "Omega Wireless",
  ],
  authors: [{ name: "Jessy Artman" }],
  creator: "The Office of the Oklahoma Billionaire",
  publisher: "The Office of the Oklahoma Billionaire",
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
    url: siteUrl,
    siteName: "The Office of the Oklahoma Billionaire",
    title: "The Office of the Oklahoma Billionaire | Private Office",
    description: "A private office facilitating Global Economic Abundance through technology, innovation, and the arts.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Office of the Oklahoma Billionaire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Office of the Oklahoma Billionaire",
    description: "A private office facilitating Global Economic Abundance through technology, innovation, and the arts.",
    creator: "@oklahomabillion",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "business",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Office of the Oklahoma Billionaire",
  alternateName: "Oklahoma Billionaire",
  url: siteUrl,
  logo: `${siteUrl}/images/og-image.jpg`,
  description: "A private office facilitating Global Economic Abundance through technology, innovation, and the arts.",
  founder: {
    "@type": "Person",
    name: "Jessy Artman",
    jobTitle: "Principal",
  },
  sameAs: [
    "https://www.linkedin.com/in/jessyartman/",
    "https://x.com/oklahomabillion",
    "https://instagram.com/oklahomabillionaire",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "general inquiries",
    email: "theoffice@oklahomabillionaire.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} antialiased bg-white text-black`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
