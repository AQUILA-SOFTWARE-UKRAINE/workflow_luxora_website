import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RequestForm from "@/components/request-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contactTitle"),
    description: t("contactDesc"),
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const t = await getTranslations("contact");

  return (
    <>
      <div className="px-4 pt-4 min-[744px]:pl-10 min-[744px]:pt-6 min-[1280px]:pl-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[14px] font-[510] text-[#032445] hover:text-[#0666c6] transition-colors duration-150 min-[744px]:gap-3 min-[744px]:text-[16px]"
        >
          <svg
            width="16" height="16"
            className="min-[744px]:w-5 min-[744px]:h-5"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
          </svg>
          {t("back")}
        </Link>
      </div>

      <section className="pt-6 pb-20 px-4 md:pt-[40px] md:pb-[80px] md:px-6">
        <div className="flex flex-col items-center gap-2 text-center mb-8 md:mb-10">
          <p className="text-[#0666c6] text-[12px] md:text-[14px] font-[510] uppercase leading-[18px]">
            {t("kicker")}
          </p>
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#032445] leading-[1.1]">
            {t("heading")}
          </h1>
          <p className="text-[#596067] text-[14px] md:text-[16px] leading-[21px]">
            {t("subtext")}
          </p>
        </div>

        <div className="max-w-[814px] mx-auto">
          <RequestForm preselect={service} />
        </div>
      </section>
    </>
  );
}
