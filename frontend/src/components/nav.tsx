"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/#why-us", label: "Why Choose Us?" },
  { href: "/#services", label: "Our Services" },
  { href: "/#results", label: "See Results" },
  { href: "/#reviews", label: "Client's Reviews" },
  { href: "/#discounts", label: "Discounts" },
  { href: "/#faq", label: "FAQ" },
];


export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close desktop menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-shadow duration-200 bg-[#fafcff] ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="w-full px-4 py-3 md:px-16 md:py-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="size-11 rounded-[10px] bg-[#0666c6] flex items-center justify-center shrink-0 overflow-hidden">
              <svg width="11.817" height="18.731" viewBox="0 0 11.8171 18.7314" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          {/* Location — desktop only */}
          <div className="hidden lg:flex items-center gap-1.5 text-[#032445] text-[16px] leading-6 shrink-0">
            <div className="relative size-5 shrink-0 overflow-hidden">
              <svg className="absolute" style={{ top: "1.25px", left: "3.75px", width: "12.5px", height: "17.5px" }} viewBox="0 0 12.5 17.4992" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 5.97656C0 2.64896 2.82899 0 6.25 0C9.67101 0 12.5 2.64896 12.5 5.97656C12.5 7.85252 11.4857 10.1735 10.3746 12.1796C9.24688 14.2158 7.94812 16.0503 7.25162 16.9909C7.1367 17.148 6.98642 17.2759 6.81292 17.3642C6.63854 17.4529 6.44565 17.4992 6.25 17.4992C6.05434 17.4992 5.86146 17.4529 5.68708 17.3642C5.51356 17.2759 5.36327 17.148 5.24834 16.9908C4.55187 16.0499 3.2531 14.2147 2.12536 12.1783C1.01432 10.172 0 7.85119 0 5.97656ZM6.25 1.25C3.46007 1.25 1.25 3.39713 1.25 5.97656C1.25 7.50037 2.11068 9.57155 3.21888 11.5727C4.30739 13.5383 5.5682 15.3216 6.25 16.243C6.93177 15.3221 8.1926 13.5394 9.28114 11.574C10.3893 9.57318 11.25 7.50177 11.25 5.97656C11.25 3.39713 9.03993 1.25 6.25 1.25Z" fill="#0666C6" />
                <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5ZM3.75 6.25C3.75 4.86929 4.86929 3.75 6.25 3.75C7.63071 3.75 8.75 4.86929 8.75 6.25C8.75 7.63071 7.63071 8.75 6.25 8.75C4.86929 8.75 3.75 7.63071 3.75 6.25Z" fill="#0666C6" />
              </svg>
            </div>
            Berlin &amp; Surrounding Areas
          </div>

          {/* Language — desktop */}
          <div className="hidden lg:flex items-center gap-2 px-2 py-0.5 rounded-[8px] shrink-0">
            <Image src="/images/flag-de.png" alt="German flag" width={32} height={32} className="rounded-full border border-[#DFE0E2]" />
            <span className="text-[#032445] text-[16px] leading-6">DE</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 shrink-0">

            {/* Menu dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className={`flex items-center gap-2 h-10 px-4 rounded-[10px] border transition-colors duration-150 ${
                  menuOpen
                    ? "bg-[#ebf5ff] border-[#0666c6] text-[#0666c6]"
                    : "bg-white border-[#e2eaf0] text-[#032445] hover:bg-[#ebf5ff] hover:border-[#0666c6] hover:text-[#0666c6]"
                }`}
              >
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                  <path d="M1 1h16M1 6.5h10M1 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span className="text-[15px] font-[590] leading-none">Menu</span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
                  className={`transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute top-[calc(100%+8px)] left-0 z-50 w-[230px] bg-white rounded-[16px] border border-[#e2eaf0] shadow-[0_8px_40px_rgba(3,36,69,0.12)] py-2 transition-all duration-200 origin-top ${
                  menuOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-3 px-5 py-[11px] text-[15px] font-[510] text-[#032445] hover:bg-[#ebf5ff] hover:text-[#0666c6] transition-colors duration-150"
                  >
                    <span className="size-[6px] rounded-full bg-[#0666c6] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Us */}
            <a
              href="/contact"
              className="flex items-center gap-2 text-[16px] font-[590] leading-6 text-[#0666c6] hover:text-[#0666c6]/80 transition-colors duration-150 whitespace-nowrap"
            >
              Contact Us
              <svg className="size-[18px]" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.91612 0.33309C5.07336 0.456583 5.24996 0.622727 5.45313 0.823403C5.88842 1.25181 6.39341 1.9382 6.82673 2.59713C7.26492 3.26344 7.67094 3.96488 7.89852 4.45309C8.02751 4.73049 8.14407 4.98249 8.22579 5.2028C8.30878 5.42653 8.37775 5.67263 8.3782 5.94118C8.37913 6.50333 8.07401 6.93719 7.7801 7.33736C7.69566 7.45232 7.62392 7.54652 7.56209 7.62772C7.4288 7.80273 7.34143 7.91747 7.27148 8.05016C7.20325 8.17959 7.18334 8.27304 7.21563 8.42348C7.2622 8.64041 7.46465 9.11525 7.85777 9.73643C8.23795 10.3372 8.75848 11.0148 9.38042 11.6347C10.0022 12.2546 10.669 12.7614 11.2578 13.1281C11.8645 13.506 12.3317 13.7 12.5549 13.7476C12.7102 13.7807 12.8072 13.76 12.9369 13.6924C13.0737 13.6212 13.1954 13.5283 13.3847 13.3838C13.459 13.327 13.5439 13.2623 13.6441 13.1877L13.6519 13.182C14.0534 12.8837 14.4995 12.5522 15.065 12.5528C15.3444 12.5531 15.5952 12.632 15.816 12.7221C16.0269 12.8082 16.2693 12.9303 16.5351 13.0642L16.5574 13.0754C17.0234 13.3104 17.7162 13.7085 18.3869 14.1424C19.0458 14.5687 19.741 15.0662 20.1739 15.5024C20.3751 15.7057 20.5423 15.8829 20.6661 16.0401C20.7859 16.1922 20.9175 16.3891 20.973 16.6339C21.0354 16.9097 20.9788 17.1391 20.9207 17.2982C20.8945 17.37 20.8637 17.4388 20.8415 17.4881C20.838 17.4958 20.8347 17.5033 20.8314 17.5106C20.8108 17.5563 20.7928 17.5962 20.7737 17.6418L20.7732 17.6429L20.7728 17.644C20.5769 18.1086 20.3385 18.5542 20.0608 18.975L20.06 18.9763L20.0592 18.9776C19.5166 19.7928 19.0061 20.3254 18.2126 20.695C17.8003 20.887 17.2111 21.081 16.2956 20.9668C15.4149 20.857 14.2692 20.4671 12.7055 19.5914C10.2033 18.188 8.46667 16.9779 6.22697 14.7445C3.99384 12.5176 2.8962 11.0642 1.35859 8.27085C-0.189357 5.45878 -0.18714 3.72466 0.254916 2.78004C0.626077 1.98691 1.16404 1.47881 1.97652 0.939015L1.97812 0.937952L1.97973 0.936897C2.40104 0.660088 2.84682 0.422444 3.31148 0.226941L3.31301 0.226297L3.31454 0.225659C3.36053 0.206551 3.40075 0.188521 3.44673 0.167906C3.45394 0.164674 3.4613 0.161378 3.46884 0.158004C3.51825 0.135892 3.58716 0.105151 3.65885 0.0791072C3.81777 0.0213811 4.04675 -0.0350065 4.32202 0.0270621C4.56676 0.0822472 4.76365 0.213338 4.91612 0.33309ZM3.89179 1.61014C3.51264 1.76977 3.14886 1.96369 2.80498 2.18948C2.11861 2.64568 1.82437 2.96524 1.61351 3.41582C1.47338 3.71527 1.21403 4.89771 2.67265 7.54751C4.1416 10.2161 5.15334 11.5555 7.28614 13.6823C9.41226 15.8025 11.0332 16.9336 13.4385 18.2826C14.9105 19.107 15.8648 19.4015 16.4812 19.4784C17.0627 19.5509 17.3677 19.4338 17.5792 19.3353C18.0333 19.1237 18.3543 18.8315 18.8098 18.1475C19.0361 17.8043 19.2305 17.4409 19.3903 17.0621C19.4118 17.0105 19.433 16.9629 19.4509 16.9231C19.3809 16.8401 19.2738 16.7253 19.109 16.5588C18.7974 16.245 18.2192 15.8204 17.5721 15.4018C16.9368 14.9908 16.291 14.6211 15.8823 14.4149C15.5872 14.2663 15.3983 14.1718 15.2491 14.1109C15.104 14.0516 15.0618 14.0528 15.0634 14.0528C15.077 14.0528 15.0306 14.0263 14.5388 14.3917C14.4886 14.429 14.4343 14.4707 14.3768 14.5147C14.1577 14.6827 13.8923 14.8861 13.6294 15.023C13.2366 15.2275 12.7856 15.3305 12.242 15.2146C11.7663 15.1131 11.1246 14.8123 10.4648 14.4013C9.78696 13.9791 9.02949 13.4029 8.32145 12.6971C7.61354 11.9914 7.02454 11.2248 6.59027 10.5386C6.16893 9.8728 5.85201 9.21796 5.74904 8.73832C5.63181 8.19219 5.73869 7.74119 5.94456 7.35066C6.07723 7.099 6.27555 6.83898 6.43877 6.62497C6.48679 6.562 6.53178 6.50302 6.57116 6.44941C6.88645 6.02011 6.87905 5.95168 6.87824 5.94422C6.87822 5.94397 6.87824 5.94434 6.87824 5.94422C6.87822 5.92977 6.87484 5.87384 6.81943 5.72448C6.76277 5.57173 6.67456 5.37841 6.53875 5.08637C6.35329 4.68861 5.98975 4.05436 5.57345 3.42131C5.15232 2.78093 4.71796 2.20436 4.40057 1.8921L4.3995 1.89104C4.23202 1.72561 4.11684 1.6184 4.03368 1.54861C3.99327 1.56667 3.94458 1.58818 3.89179 1.61014Z" fill="#0666C6" />
              </svg>
            </a>
          </nav>

          {/* Mobile: language + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <Image src="/images/flag-de.png" alt="German flag" width={24} height={24} className="rounded-full border border-[#DFE0E2]" />
            <span className="text-[#032445] text-[14px] leading-none">DE</span>
            <button
              className="p-2.5 rounded-[12px] outline outline-[1px] outline-[#DFE0E2] text-[#032445]"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — overlay + side panel */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{ background: "rgba(32, 32, 32, 0.40)" }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        {/* Side panel */}
        <div
          className={`fixed top-0 right-0 bottom-0 z-50 w-[329px] bg-[#DBEAFF] overflow-hidden transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Floating bubbles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[
              { size: 88,  left: 86,  duration: 12, delay: -2,  wobble: 3   },
              { size: 94,  left: -22, duration: 15, delay: -7,  wobble: 2.5 },
              { size: 130, left: 84,  duration: 10, delay: -4,  wobble: 4   },
              { size: 66,  left: 38,  duration: 13, delay: -9,  wobble: 3.2 },
              { size: 50,  left: 18,  duration: 11, delay: -5,  wobble: 3.8 },
              { size: 40,  left: 60,  duration: 14, delay: -11, wobble: 2.8 },
            ].map((b, i) => (
              <div key={i} className="bubble-container" style={{ left: `${b.left}%`, animation: `floatUp ${b.duration}s linear ${b.delay}s infinite` }}>
                <div
                  className="bubble"
                  style={{ width: b.size, height: b.size, animation: `wobble ${b.wobble}s ease-in-out infinite alternate` }}
                />
              </div>
            ))}
          </div>

          {/* Panel content */}
          <div className="relative z-10 flex flex-col h-full p-6 gap-16">
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#032445] text-[14px] leading-[21px]">
                <svg width="16" height="16" viewBox="0 0 12.5 17.4992" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 5.97656C0 2.64896 2.82899 0 6.25 0C9.67101 0 12.5 2.64896 12.5 5.97656C12.5 7.85252 11.4857 10.1735 10.3746 12.1796C9.24688 14.2158 7.94812 16.0503 7.25162 16.9909C7.1367 17.148 6.98642 17.2759 6.81292 17.3642C6.63854 17.4529 6.44565 17.4992 6.25 17.4992C6.05434 17.4992 5.86146 17.4529 5.68708 17.3642C5.51356 17.2759 5.36327 17.148 5.24834 16.9908C4.55187 16.0499 3.2531 14.2147 2.12536 12.1783C1.01432 10.172 0 7.85119 0 5.97656ZM6.25 1.25C3.46007 1.25 1.25 3.39713 1.25 5.97656C1.25 7.50037 2.11068 9.57155 3.21888 11.5727C4.30739 13.5383 5.5682 15.3216 6.25 16.243C6.93177 15.3221 8.1926 13.5394 9.28114 11.574C10.3893 9.57318 11.25 7.50177 11.25 5.97656C11.25 3.39713 9.03993 1.25 6.25 1.25Z" fill="#0666C6" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5ZM3.75 6.25C3.75 4.86929 4.86929 3.75 6.25 3.75C7.63071 3.75 8.75 4.86929 8.75 6.25C8.75 7.63071 7.63071 8.75 6.25 8.75C4.86929 8.75 3.75 7.63071 3.75 6.25Z" fill="#0666C6" />
                </svg>
                Berlin &amp; Surrounding Areas
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-[#032445]">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-6">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[16px] font-[590] leading-6 text-[#032445] hover:text-[#0666c6] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/contact"
                className="flex items-center gap-2 text-[16px] font-[590] leading-6 text-[#0666c6]"
                onClick={() => setOpen(false)}
              >
                Contact Us
                <svg className="size-[18px]" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.91612 0.33309C5.07336 0.456583 5.24996 0.622727 5.45313 0.823403C5.88842 1.25181 6.39341 1.9382 6.82673 2.59713C7.26492 3.26344 7.67094 3.96488 7.89852 4.45309C8.02751 4.73049 8.14407 4.98249 8.22579 5.2028C8.30878 5.42653 8.37775 5.67263 8.3782 5.94118C8.37913 6.50333 8.07401 6.93719 7.7801 7.33736C7.69566 7.45232 7.62392 7.54652 7.56209 7.62772C7.4288 7.80273 7.34143 7.91747 7.27148 8.05016C7.20325 8.17959 7.18334 8.27304 7.21563 8.42348C7.2622 8.64041 7.46465 9.11525 7.85777 9.73643C8.23795 10.3372 8.75848 11.0148 9.38042 11.6347C10.0022 12.2546 10.669 12.7614 11.2578 13.1281C11.8645 13.506 12.3317 13.7 12.5549 13.7476C12.7102 13.7807 12.8072 13.76 12.9369 13.6924C13.0737 13.6212 13.1954 13.5283 13.3847 13.3838C13.459 13.327 13.5439 13.2623 13.6441 13.1877L13.6519 13.182C14.0534 12.8837 14.4995 12.5522 15.065 12.5528C15.3444 12.5531 15.5952 12.632 15.816 12.7221C16.0269 12.8082 16.2693 12.9303 16.5351 13.0642L16.5574 13.0754C17.0234 13.3104 17.7162 13.7085 18.3869 14.1424C19.0458 14.5687 19.741 15.0662 20.1739 15.5024C20.3751 15.7057 20.5423 15.8829 20.6661 16.0401C20.7859 16.1922 20.9175 16.3891 20.973 16.6339C21.0354 16.9097 20.9788 17.1391 20.9207 17.2982C20.8945 17.37 20.8637 17.4388 20.8415 17.4881C20.838 17.4958 20.8347 17.5033 20.8314 17.5106C20.8108 17.5563 20.7928 17.5962 20.7737 17.6418L20.7732 17.6429L20.7728 17.644C20.5769 18.1086 20.3385 18.5542 20.0608 18.975L20.06 18.9763L20.0592 18.9776C19.5166 19.7928 19.0061 20.3254 18.2126 20.695C17.8003 20.887 17.2111 21.081 16.2956 20.9668C15.4149 20.857 14.2692 20.4671 12.7055 19.5914C10.2033 18.188 8.46667 16.9779 6.22697 14.7445C3.99384 12.5176 2.8962 11.0642 1.35859 8.27085C-0.189357 5.45878 -0.18714 3.72466 0.254916 2.78004C0.626077 1.98691 1.16404 1.47881 1.97652 0.939015L1.97812 0.937952L1.97973 0.936897C2.40104 0.660088 2.84682 0.422444 3.31148 0.226941L3.31301 0.226297L3.31454 0.225659C3.36053 0.206551 3.40075 0.188521 3.44673 0.167906C3.45394 0.164674 3.4613 0.161378 3.46884 0.158004C3.51825 0.135892 3.58716 0.105151 3.65885 0.0791072C3.81777 0.0213811 4.04675 -0.0350065 4.32202 0.0270621C4.56676 0.0822472 4.76365 0.213338 4.91612 0.33309ZM3.89179 1.61014C3.51264 1.76977 3.14886 1.96369 2.80498 2.18948C2.11861 2.64568 1.82437 2.96524 1.61351 3.41582C1.47338 3.71527 1.21403 4.89771 2.67265 7.54751C4.1416 10.2161 5.15334 11.5555 7.28614 13.6823C9.41226 15.8025 11.0332 16.9336 13.4385 18.2826C14.9105 19.107 15.8648 19.4015 16.4812 19.4784C17.0627 19.5509 17.3677 19.4338 17.5792 19.3353C18.0333 19.1237 18.3543 18.8315 18.8098 18.1475C19.0361 17.8043 19.2305 17.4409 19.3903 17.0621C19.4118 17.0105 19.433 16.9629 19.4509 16.9231C19.3809 16.8401 19.2738 16.7253 19.109 16.5588C18.7974 16.245 18.2192 15.8204 17.5721 15.4018C16.9368 14.9908 16.291 14.6211 15.8823 14.4149C15.5872 14.2663 15.3983 14.1718 15.2491 14.1109C15.104 14.0516 15.0618 14.0528 15.0634 14.0528C15.077 14.0528 15.0306 14.0263 14.5388 14.3917C14.4886 14.429 14.4343 14.4707 14.3768 14.5147C14.1577 14.6827 13.8923 14.8861 13.6294 15.023C13.2366 15.2275 12.7856 15.3305 12.242 15.2146C11.7663 15.1131 11.1246 14.8123 10.4648 14.4013C9.78696 13.9791 9.02949 13.4029 8.32145 12.6971C7.61354 11.9914 7.02454 11.2248 6.59027 10.5386C6.16893 9.8728 5.85201 9.21796 5.74904 8.73832C5.63181 8.19219 5.73869 7.74119 5.94456 7.35066C6.07723 7.099 6.27555 6.83898 6.43877 6.62497C6.48679 6.562 6.53178 6.50302 6.57116 6.44941C6.88645 6.02011 6.87905 5.95168 6.87824 5.94422C6.87822 5.94397 6.87824 5.94434 6.87824 5.94422C6.87822 5.92977 6.87484 5.87384 6.81943 5.72448C6.76277 5.57173 6.67456 5.37841 6.53875 5.08637C6.35329 4.68861 5.98975 4.05436 5.57345 3.42131C5.15232 2.78093 4.71796 2.20436 4.40057 1.8921L4.3995 1.89104C4.23202 1.72561 4.11684 1.6184 4.03368 1.54861C3.99327 1.56667 3.94458 1.58818 3.89179 1.61014Z" fill="#0666C6" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>

     {/* Fixed bottom CTA bar — mobile only, hidden on /contact */}
{pathname !== "/contact" && (
  <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fafcff] border-t border-[#DFE0E2] px-4 pt-4 pb-5">
    <div className="flex items-center gap-2">
      <Link
        href="/contact"
        onClick={() => setOpen(false)}
        className="flex-1 h-12 bg-[#0666c6] rounded-xl flex items-center justify-center text-[#EAEBEC] text-sm font-[510] leading-[21px] active:opacity-90 transition-opacity"
      >
        Book a cleaning
      </Link>
      <a
        href="tel:+4916343250808"
        className="w-12 h-12 shrink-0 bg-[#fafcff] rounded-xl outline outline-2 outline-[#0666c6] flex items-center justify-center active:bg-[#ebf5ff] transition-colors"
        aria-label="Call us"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.41515 1.83309C6.57239 1.95658 6.74898 2.12273 6.95216 2.3234C7.38744 2.75181 7.89243 3.4382 8.32576 4.09713C8.76394 4.76344 9.16997 5.46488 9.39754 5.95309C9.52654 6.23049 9.64309 6.48249 9.72481 6.7028C9.80781 6.92653 9.87678 7.17263 9.87722 7.44118C9.87815 8.00333 9.57303 8.43719 9.27913 8.83736C9.19469 8.95232 9.12295 9.04652 9.06111 9.12772C8.92783 9.30273 8.84045 9.41747 8.7705 9.55016C8.70227 9.67959 8.68236 9.77304 8.71466 9.92348C8.76122 10.1404 8.96368 10.6152 9.35679 11.2364C9.73698 11.8372 10.2575 12.5148 10.8794 13.1347C11.5012 13.7546 12.1681 14.2614 12.7568 14.6281C13.3635 15.006 13.8307 15.2 14.0539 15.2476C14.2092 15.2807 14.3062 15.26 14.4359 15.1924C14.5727 15.1212 14.6944 15.0283 14.8837 14.8838C14.9581 14.827 15.0429 14.7623 15.1432 14.6877L15.1509 14.682C15.5524 14.3837 15.9985 14.0522 16.564 14.0528C16.8434 14.0531 17.0942 14.132 17.315 14.2221C17.526 14.3082 17.7683 14.4303 18.0342 14.5642L18.0564 14.5754C18.5224 14.8104 19.2152 15.2085 19.8859 15.6424C20.5448 16.0687 21.24 16.5662 21.6729 17.0024C21.8741 17.2057 22.0413 17.3829 22.1651 17.5401C22.285 17.6922 22.4165 17.8891 22.472 18.1339C22.5345 18.4097 22.4778 18.6391 22.4197 18.7982C22.3936 18.87 22.3627 18.9388 22.3405 18.9881C22.3371 18.9958 22.3337 19.0033 22.3304 19.0106C22.3098 19.0563 22.2918 19.0962 22.2727 19.1418L22.2723 19.1429L22.2718 19.144C22.0759 19.6086 21.8376 20.0542 21.5599 20.475L21.559 20.4763L21.5582 20.4776C21.0156 21.2928 20.5051 21.8254 19.7116 22.195C19.2993 22.387 18.7102 22.581 17.7946 22.4668C16.9139 22.357 15.7682 21.9671 14.2046 21.0914C11.7023 19.688 9.9657 18.4779 7.72599 16.2445C5.49286 14.0176 4.39522 12.5642 2.85761 9.77085C1.30967 6.95878 1.31188 5.22466 1.75394 4.28004C2.1251 3.48691 2.66307 2.97881 3.47555 2.43901L3.47715 2.43795L3.47875 2.4369C3.90007 2.16009 4.34584 1.92244 4.8105 1.72694L4.81203 1.7263L4.81357 1.72566C4.85955 1.70655 4.89977 1.68852 4.94576 1.66791C4.95297 1.66467 4.96032 1.66138 4.96786 1.658C5.01727 1.63589 5.08618 1.60515 5.15788 1.57911C5.3168 1.52138 5.54578 1.46499 5.82104 1.52706C6.06578 1.58225 6.26267 1.71334 6.41515 1.83309ZM5.39082 3.11014C5.01166 3.26977 4.64788 3.46369 4.304 3.68948C3.61763 4.14568 3.3234 4.46524 3.11253 4.91582C2.9724 5.21527 2.71306 6.39771 4.17168 9.04751C5.64062 11.7161 6.65236 13.0555 8.78517 15.1823C10.9113 17.3025 12.5322 18.4336 14.9375 19.7826C16.4095 20.607 17.3638 20.9015 17.9802 20.9784C18.5617 21.0509 18.8667 20.9338 19.0783 20.8353C19.5324 20.6237 19.8534 20.3315 20.3088 19.6475C20.5352 19.3043 20.7295 18.9409 20.8893 18.5621C20.9109 18.5105 20.932 18.4629 20.9499 18.4231C20.8799 18.3401 20.7728 18.2253 20.608 18.0588C20.2964 17.745 19.7182 17.3204 19.0711 16.9018C18.4358 16.4908 17.7901 16.1211 17.3813 15.9149C17.0862 15.7663 16.8973 15.6718 16.7481 15.6109C16.603 15.5516 16.5608 15.5528 16.5624 15.5528C16.576 15.5528 16.5297 15.5263 16.0379 15.8917C15.9876 15.929 15.9333 15.9707 15.8758 16.0147C15.6567 16.1827 15.3914 16.3861 15.1285 16.523C14.7356 16.7275 14.2846 16.8305 13.741 16.7146C13.2653 16.6131 12.6237 16.3123 11.9638 15.9013C11.286 15.4791 10.5285 14.9029 9.82047 14.1971C9.11256 13.4914 8.52356 12.7248 8.08929 12.0386C7.66795 11.3728 7.35103 10.718 7.24807 10.2383C7.13083 9.69219 7.23772 9.24119 7.44359 8.85066C7.57625 8.599 7.77457 8.33898 7.93779 8.12497C7.98582 8.062 8.0308 8.00302 8.07019 7.94941C8.38547 7.52011 8.37807 7.45168 8.37727 7.44422C8.37724 7.44397 8.37727 7.44434 8.37727 7.44422C8.37724 7.42977 8.37386 7.37384 8.31846 7.22448C8.26179 7.07173 8.17358 6.87841 8.03778 6.58637C7.85232 6.18861 7.48878 5.55436 7.07247 4.92131C6.65135 4.28093 6.21699 3.70436 5.8996 3.3921L5.89852 3.39104C5.73104 3.22561 5.61586 3.1184 5.5327 3.04861C5.4923 3.06667 5.44361 3.08818 5.39082 3.11014ZM22.472 18.1339L22.472 18.1339Z" fill="#0666C6"/>
        </svg>
      </a>
    </div>
  </div>
)}
    </>
  );
}
