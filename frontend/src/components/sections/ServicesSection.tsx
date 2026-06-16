import Link from "next/link";
import Kicker from "@/components/ui/Kicker";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICE_CARDS } from "@/data/home";

export default function ServicesSection() {
  const [row1, row2] = [SERVICE_CARDS.slice(0, 3), SERVICE_CARDS.slice(3)];

  return (
    <section id="services" className="bg-white pt-10 pb-0 md:py-[80px] px-4 md:px-[64px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-8 md:mb-12 px-[41px] md:px-0">
          <Kicker>OUR SERVICES</Kicker>
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.15] mb-3">
            <span className="block text-[#0666c6]">Easy Booking.</span>
            <span className="block text-[#032445]">Spotless Results</span>
          </h2>
          <p className="text-[#4b6070] text-[16px] max-w-[500px] mx-auto">
            Fill the form → We call you within 10 min → You get a fixed price
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {row1.map((c) => <ServiceCard key={c.name} {...c} />)}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6 md:max-w-[calc(66.667%+1.5rem)] md:mx-auto">
          {row2.map((c) => <ServiceCard key={c.name} {...c} />)}
        </div>

        <div className="mt-6 flex flex-col items-center gap-5">
          <p className="text-[13px] md:text-[14px] text-[#4b6070] text-center">
            <span className="text-[#F26C68]">*</span>
            {" "}Final price depends on size and condition. VAT Includes: travel, cleaning products, all equipment
          </p>
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center gap-2 bg-[#0666c6] text-white font-medium text-[16px] pl-7 pr-6 h-[48px] md:h-[53px] rounded-[12px] hover:bg-[#064a8d] active:bg-[#043565] transition-colors duration-150"
          >
            Request a Free Estimate
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
