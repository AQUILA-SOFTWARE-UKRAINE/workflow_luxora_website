"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "/#why-us",  label: "Чому ми?" },
  { href: "/#services", label: "Послуги" },
  { href: "/#faq",     label: "FAQ" },
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
      className={`sticky top-0 z-50 transition-shadow duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-[#fafcff]"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 h-[92px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <span className="size-11 rounded-[10px] bg-blue flex items-center justify-center shrink-0">
            <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-extrabold text-white text-lg leading-none select-none">
              L
            </span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-extrabold text-navy text-[20px] tracking-[-0.2px]">
              Luxora
            </span>
            <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-navy text-[12px] tracking-[-0.12px]">
              Хімчистка
            </span>
          </span>
        </Link>

        {/* Centre: location */}
        <div className="hidden lg:flex items-center gap-1.5 text-navy text-sm">
          <svg className="size-5 shrink-0 text-body" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
          </svg>
          Вся Україна
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[16px] font-semibold text-navy hover:text-blue transition-colors"
            >
              {l.label}
            </a>
          ))}
          {/* Contact Us with phone icon */}
          <a
            href="/contact"
            className="flex items-center gap-1.5 text-[16px] font-semibold text-blue hover:text-blue/80 transition-colors"
          >
            Зв&apos;язатись
            <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
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
        <div className="md:hidden border-t border-border bg-white">
          <nav className="px-6 py-5 flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-base font-semibold text-navy hover:text-blue"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              className="mt-1 inline-flex items-center justify-center gap-2 bg-blue text-white text-sm font-medium px-5 py-3 rounded-xl"
              onClick={() => setOpen(false)}
            >
              Зв&apos;язатись
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
