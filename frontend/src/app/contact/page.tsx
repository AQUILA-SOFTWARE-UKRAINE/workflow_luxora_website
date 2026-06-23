import type { Metadata } from "next";
import Link from "next/link";
import RequestForm from "@/components/request-form";

export const metadata: Metadata = {
  title: "Book a Cleaning — Luxora",
  description:
    "Get a free estimate. Fill in your details and a manager will call you within 10 minutes to confirm the details and arrange a specialist visit.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <>
      {/* Back link */}
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
          Back
        </Link>
      </div>

      {/* Form section */}
      <section className="pt-6 pb-20 px-4 md:pt-[40px] md:pb-[80px] md:px-6">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center mb-8 md:mb-10">
          <p className="text-[#0666c6] text-[12px] md:text-[14px] font-[510] uppercase leading-[18px]">
            Book a Cleaning
          </p>
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#032445] leading-[1.1]">
            Get a Free Estimate
          </h1>
          <p className="text-[#596067] text-[14px] md:text-[16px] leading-[21px]">
            Fill in your details — we call you within 10 minutes
          </p>
        </div>

        {/* Form */}
        <div className="max-w-[814px] mx-auto">
          <RequestForm preselect={service} />
        </div>
      </section>
    </>
  );
}
