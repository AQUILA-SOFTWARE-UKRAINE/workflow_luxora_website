import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("siteTitle"),
    description: t("siteDesc"),
    openGraph: {
      siteName: "Luxora Reinigungsservice",
      type: "website",
      locale: locale === "de" ? "de_DE" : locale === "en" ? "en_GB" : "ru_RU",
      title: t("homeTitle"),
      description: t("homeDesc"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Nav />
      <>
        {children}
        <Footer />
      </>
    </NextIntlClientProvider>
  );
}
