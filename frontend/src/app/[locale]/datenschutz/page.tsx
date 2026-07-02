import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: `${t("datenschutzTitle")} — Luxora` };
}

export default async function DatenschutzPage() {
  const t = await getTranslations("legal");
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <h1 className="text-[32px] font-bold text-[#032445]">{t("datenschutzTitle")}</h1>
      <p className="text-[#596067] text-[16px]">{t("placeholder")}</p>
      <Link href="/" className="text-[#0666C6] text-[14px] font-[510] hover:underline">
        {t("backHome")}
      </Link>
    </section>
  );
}
