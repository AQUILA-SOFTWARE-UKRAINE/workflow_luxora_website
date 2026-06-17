"use client";

import { useState } from "react";

type Props = { q: string; a: string; defaultOpen?: boolean };

export default function FaqItem({ q, a, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`group bg-white overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen
          ? "rounded-[20px] outline outline-1 outline-[#c2ddfd] shadow-[0px_0px_4px_rgba(194,221,253,0.50)]"
          : "rounded-[16px] outline outline-1 outline-[#dfe0e2] hover:outline-[#c2ddfd] hover:shadow-[0px_0px_4px_rgba(194,221,253,0.50)]"
        }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-6 flex items-center justify-between cursor-pointer gap-4 transition-colors duration-300 ease-in-out ${
          isOpen ? "bg-[#ebf3ff]" : "bg-transparent"
        }`}
      >
        <span className="text-[#032445] text-[16px] font-[590] leading-6 text-left">{q}</span>
        <span className="size-6 shrink-0 text-[#747A80] group-hover:text-[#0666c6] transition-colors duration-300 flex items-center justify-center">
          <svg
            className={`size-6 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-2">
            <p className="text-[#596067] text-[16px] font-normal leading-6">{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
