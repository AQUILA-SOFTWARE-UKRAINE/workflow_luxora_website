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
  title: "Luxora — Професійна хімчистка | Виїзд та оцінка безкоштовно",
  description:
    "Luxora — професійна хімчистка, прання, чищення шкіри, килимів і штор по всій Україні. Залиш заявку — спеціаліст приїде на огляд. Ціна фіксується після оцінки.",
  openGraph: {
    siteName: "Luxora",
    type: "website",
    locale: "uk_UA",
    title: "Luxora — Професійна хімчистка",
    description:
      "Хімчистка з виїздом та індивідуальною оцінкою. Залиш заявку — передзвонимо за 10 хвилин.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DryCleaningOrLaundry",
  name: "Luxora",
  description:
    "Професійна хімчистка та прання з виїздом і індивідуальною оцінкою речей.",
  url: "https://luxora.ua",
  telephone: "+380XXXXXXXXX",
  areaServed: { "@type": "Country", name: "Ukraine" },
  priceRange: "₴₴",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-white">
        <Nav />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
