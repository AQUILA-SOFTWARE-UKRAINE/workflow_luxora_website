import FaqItem from "@/components/ui/FaqItem";
import { FAQ_DATA } from "@/data/home";

export default function FaqSection() {
  return (
    <section id="faq" className="bg-white pt-10 pb-10 md:pt-[80px] md:pb-[160px] px-4 md:px-[64px]">
      <div className="max-w-[980px] mx-auto flex flex-col gap-10 md:gap-[56px]">

        <div className="flex flex-col items-center gap-2">
          <p className="text-[#0666c6] text-[14px] font-[510] uppercase leading-[21px]">FAQ</p>
          <h2 className="text-[28px] leading-[1.15] md:text-[40px] md:leading-[48px] font-bold text-center">
            <span className="text-[#032445]">Got </span>
            <span className="text-[#0666c6]">Questions?</span>
            <span className="text-[#032445]"><br />We Have Answers</span>
          </h2>
          <p className="text-[#596067] text-[16px] leading-6 text-center">
            Can&apos;t find your answer here? Write to us. We reply within 10 minutes
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQ_DATA.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

      </div>
    </section>
  );
}
