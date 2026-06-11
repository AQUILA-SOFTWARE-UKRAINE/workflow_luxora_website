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
      <div className="px-6 md:px-16 pt-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#596067] text-[15px] font-semibold py-[7px] px-1 hover:text-[#032445] transition-colors duration-150"
        >
          <svg className="size-[18px] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </Link>
      </div>

      {/* Form section */}
      <section className="py-10 px-6 pb-20">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center mb-10">
          <p className="text-[#0666c6] text-[14px] font-[510] uppercase tracking-[-0.28px]">
            Book a Cleaning
          </p>
          <h1 className="text-[40px] font-bold text-[#032445] leading-[1.2]">
            Get a Free Estimate
          </h1>
          <p className="text-[#596067] text-[16px]">
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
