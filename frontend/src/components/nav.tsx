"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "/#why-us", label: "Why Choose Us?" },
  { href: "/#services", label: "Our Services" },
  { href: "/#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-200 bg-[#fafcff] ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      {/* Updated Container */}
      <div className="w-full px-16 py-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="size-11 rounded-[10px] bg-[#0666c6] flex items-center justify-center shrink-0 overflow-hidden">
            <svg
              width="11.817"
              height="18.731"
              viewBox="0 0 11.8171 18.7314"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 18.7314V0H3.89714V15.3371H11.8171V18.7314H0Z" fill="#EAEBEC" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-extrabold text-[#032445] text-[20px] tracking-[-0.2px]">
              Luxora
            </span>
            <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-[#032445] text-[12px] tracking-[-0.12px]">
              Reinigungsservice
            </span>
          </div>
        </Link>

        {/* Location */}
        <div className="hidden lg:flex items-center gap-1.5 text-[#032445] text-[16px] leading-6 shrink-0">
          <div className="relative size-5 shrink-0 overflow-hidden">
            <svg
              className="absolute"
              style={{ top: "1.25px", left: "3.75px", width: "12.5px", height: "17.5px" }}
              viewBox="0 0 12.5 17.4992"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M0 5.97656C0 2.64896 2.82899 0 6.25 0C9.67101 0 12.5 2.64896 12.5 5.97656C12.5 7.85252 11.4857 10.1735 10.3746 12.1796C9.24688 14.2158 7.94812 16.0503 7.25162 16.9909C7.1367 17.148 6.98642 17.2759 6.81292 17.3642C6.63854 17.4529 6.44565 17.4992 6.25 17.4992C6.05434 17.4992 5.86146 17.4529 5.68708 17.3642C5.51356 17.2759 5.36327 17.148 5.24834 16.9908C4.55187 16.0499 3.2531 14.2147 2.12536 12.1783C1.01432 10.172 0 7.85119 0 5.97656ZM6.25 1.25C3.46007 1.25 1.25 3.39713 1.25 5.97656C1.25 7.50037 2.11068 9.57155 3.21888 11.5727C4.30739 13.5383 5.5682 15.3216 6.25 16.243C6.93177 15.3221 8.1926 13.5394 9.28114 11.574C10.3893 9.57318 11.25 7.50177 11.25 5.97656C11.25 3.39713 9.03993 1.25 6.25 1.25Z" fill="#0666C6" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5ZM3.75 6.25C3.75 4.86929 4.86929 3.75 6.25 3.75C7.63071 3.75 8.75 4.86929 8.75 6.25C8.75 7.63071 7.63071 8.75 6.25 8.75C4.86929 8.75 3.75 7.63071 3.75 6.25Z" fill="#0666C6" />
            </svg>
          </div>
          Berlin &amp; Surrounding Areas
        </div>

        {/* Language */}
        <div className="hidden lg:flex items-center gap-2 px-2 py-0.5 rounded-[8px] shrink-0">
          <Image
            src="/images/flag-de.png"
            alt="German flag"
            width={32}
            height={32}
            className="rounded-full border border-[#DFE0E2]"
          />
          <span className="text-[#032445] text-[16px] leading-6">DE</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 shrink-0">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[16px] font-[590] leading-6 text-[#032445] hover:text-[#0666c6] transition-colors duration-150 whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/contact"
            className="flex items-center gap-2 text-[16px] font-[590] leading-6 text-[#0666c6] hover:text-[#0666c6]/80 transition-colors duration-150 whitespace-nowrap"
          >
            Contact Us
            <div className="relative shrink-0 size-[18px] overflow-hidden">
              <svg
                className="absolute"
                style={{ top: "1.125px", left: "1.125px", width: "15.75px", height: "15.75px" }}
                viewBox="0 0 15.7502 15.7507"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M3.68709 0.249818C3.80502 0.342438 3.93747 0.467045 4.08985 0.617552C4.41631 0.93886 4.79506 1.45365 5.12005 1.94785C5.44869 2.44758 5.75321 2.97366 5.92389 3.33982C6.02063 3.54787 6.10805 3.73686 6.16934 3.9021C6.23159 4.0699 6.28331 4.25447 6.28365 4.45589C6.28435 4.8775 6.05551 5.20289 5.83508 5.50302C5.77175 5.58924 5.71794 5.65989 5.67157 5.72079C5.5716 5.85205 5.50607 5.9381 5.45361 6.03762C5.40244 6.1347 5.3875 6.20478 5.41172 6.31761C5.44665 6.48031 5.59849 6.83644 5.89333 7.30232C6.17846 7.75288 6.56886 8.26107 7.03531 8.72605C7.50166 9.19091 8.00178 9.57102 8.44336 9.84606C8.89837 10.1295 9.24878 10.275 9.41616 10.3107C9.53264 10.3355 9.60537 10.32 9.70264 10.2693C9.80525 10.2159 9.89654 10.1462 10.0385 10.0379C10.0943 9.99526 10.1579 9.9467 10.2331 9.8908L10.2389 9.88649C10.54 9.66274 10.8746 9.41415 11.2988 9.4146C11.5083 9.41482 11.6964 9.47399 11.862 9.54159C12.0202 9.60617 12.202 9.69774 12.4014 9.79818L12.418 9.80659C12.7675 9.98282 13.2871 10.2814 13.7902 10.6068C14.2843 10.9265 14.8057 11.2997 15.1304 11.6268C15.2813 11.7792 15.4067 11.9122 15.4996 12.0301C15.5895 12.1442 15.6881 12.2918 15.7297 12.4754C15.7766 12.6822 15.7341 12.8543 15.6905 12.9737C15.6709 13.0275 15.6477 13.0791 15.6311 13.1161C15.6285 13.1218 15.626 13.1275 15.6235 13.133C15.6081 13.1672 15.5946 13.1971 15.5803 13.2314L15.5799 13.2322L15.5796 13.233C15.4326 13.5815 15.2539 13.9156 15.0456 14.2313L15.045 14.2322L15.0444 14.2332C14.6374 14.8446 14.2546 15.244 13.6595 15.5212C13.3502 15.6653 12.9084 15.8108 12.2217 15.7251C11.5612 15.6428 10.7019 15.3503 9.52915 14.6935C7.65247 13.641 6.35001 12.7334 4.67023 11.0584C2.99538 9.38818 2.17215 8.29812 1.01894 6.20314C-0.142018 4.09409 -0.140355 2.79349 0.191187 2.08503C0.469557 1.49019 0.873034 1.1091 1.48239 0.704261L1.48359 0.703464L1.4848 0.702673C1.80078 0.495066 2.13511 0.316833 2.48361 0.170206L2.48476 0.169722L2.48591 0.169244C2.52039 0.154913 2.55056 0.141391 2.58505 0.12593C2.59046 0.123505 2.59597 0.121033 2.60163 0.118503C2.63869 0.101919 2.69037 0.0788629 2.74414 0.0593304C2.86333 0.0160358 3.03507 -0.0262549 3.24151 0.0202965C3.42507 0.0616854 3.57273 0.160004 3.68709 0.249818ZM2.91884 1.2076C2.63448 1.32732 2.36164 1.47276 2.10374 1.64211C1.58896 1.98426 1.36828 2.22393 1.21013 2.56187C1.10503 2.78645 0.910525 3.67328 2.00449 5.66063C3.1062 7.66206 3.865 8.66661 5.46461 10.2617C7.0592 11.8519 8.27487 12.7002 10.0789 13.712C11.1828 14.3303 11.8986 14.5511 12.3609 14.6088C12.797 14.6632 13.0258 14.5754 13.1844 14.5014C13.525 14.3428 13.7657 14.1237 14.1073 13.6106C14.2771 13.3532 14.4228 13.0807 14.5427 12.7965C14.5589 12.7579 14.5747 12.7221 14.5881 12.6923C14.5357 12.63 14.4553 12.544 14.3317 12.4191C14.0981 12.1837 13.6644 11.8653 13.1791 11.5513C12.7026 11.2431 12.2183 10.9658 11.9117 10.8112C11.6904 10.6997 11.5487 10.6288 11.4368 10.5831C11.328 10.5387 11.2963 10.5396 11.2976 10.5396C11.3077 10.5396 11.273 10.5197 10.9041 10.7938C10.8664 10.8218 10.8257 10.853 10.7826 10.8861C10.6183 11.012 10.4193 11.1646 10.2221 11.2672C9.92743 11.4206 9.58919 11.4979 9.18149 11.4109C8.82469 11.3348 8.34347 11.1092 7.84857 10.801C7.34022 10.4843 6.77212 10.0522 6.24108 9.5228C5.71015 8.99356 5.2684 8.41859 4.9427 7.90393C4.6267 7.4046 4.38901 6.91347 4.31178 6.55374C4.22386 6.14415 4.30402 5.80589 4.45842 5.513C4.55792 5.32425 4.70666 5.12923 4.82908 4.96873C4.8651 4.9215 4.89883 4.87727 4.92837 4.83705C5.16484 4.51508 5.15929 4.46376 5.15868 4.45816C5.15866 4.45798 5.15868 4.45826 5.15868 4.45816C5.15867 4.44732 5.15613 4.40538 5.11457 4.29336C5.07208 4.17879 5.00592 4.03381 4.90406 3.81477C4.76497 3.51646 4.49232 3.04077 4.18009 2.56598C3.86424 2.0857 3.53847 1.65327 3.30043 1.41908L3.29962 1.41828C3.17402 1.29421 3.08763 1.2138 3.02526 1.16146C2.99496 1.17501 2.95844 1.19113 2.91884 1.2076Z" fill="#0666C6" />
              </svg>
            </div>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[#032445]"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-[#e2eaf0] bg-white">
          <nav className="px-6 py-5 flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-base font-semibold text-[#032445] hover:text-[#0666c6]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              className="mt-1 inline-flex items-center justify-center gap-2 bg-[#0666c6] text-white text-sm font-medium px-5 py-3 rounded-xl"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
