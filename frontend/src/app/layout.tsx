import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Luxora Reinigungsservice — Professional Home Cleaning Berlin",
  description:
    "Professional cleaning services in Berlin and surrounding areas. Sofas, windows, apartments, driveways, car interiors. Free estimate. Reply in 10 minutes.",
  openGraph: {
    siteName: "Luxora Reinigungsservice",
    type: "website",
    locale: "de_DE",
    title: "Luxora — Professional Home Cleaning Berlin",
    description:
      "From sofas and windows to full apartments. Professional cleaning at your door across Berlin. New clients get 20% off.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Luxora Reinigungsservice",
  description:
    "Professional cleaning services in Berlin and surrounding areas.",
  url: "https://luxsora.de",
  telephone: "+4916343250808",
  email: "hello@luxsora.de",
  areaServed: { "@type": "City", name: "Berlin" },
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-white overflow-x-hidden">
        <Nav />
        <>
          {children}
          <Footer />
        </>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
