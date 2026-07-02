import { redirect } from "next/navigation";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const prefix = locale === "de" ? "" : `/${locale}`;
  redirect(`${prefix}/#services`);
}
