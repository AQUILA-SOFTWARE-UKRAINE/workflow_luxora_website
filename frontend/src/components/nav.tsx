"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LogoMark, MessageIcon, LocationPinIcon, ChevronDownIcon } from "@/components/ui/icons";
import BubblesLayer from "@/components/BubblesLayer";
import styles from "./nav.module.css";

const LANGUAGES = [
  { code: "de" as const, label: "Deutsch",  flag: "🇩🇪", flagImg: "/images/flag-de.webp" },
  { code: "en" as const, label: "English",  flag: "🇬🇧", flagImg: "/images/flag-en.svg" },
  { code: "ru" as const, label: "Русский",  flag: "🇷🇺", flagImg: "/images/flag-ru.svg" },
];
type LangCode = "de" | "en" | "ru";

const DRAWER_BUBBLES = [
  { size: 88,  left: 86,  duration: 12, delay: -2,  wobble: 3   },
  { size: 94,  left: -22, duration: 15, delay: -7,  wobble: 2.5 },
  { size: 130, left: 84,  duration: 10, delay: -4,  wobble: 4   },
  { size: 66,  left: 38,  duration: 13, delay: -9,  wobble: 3.2 },
  { size: 50,  left: 18,  duration: 11, delay: -5,  wobble: 3.8 },
  { size: 40,  left: 60,  duration: 14, delay: -11, wobble: 2.8 },
];

const DROPDOWN_BUBBLES = [
  { size: 54,  left: 82,  duration: 11, delay: -3,  wobble: 3   },
  { size: 38,  left: 8,   duration: 14, delay: -7,  wobble: 2.5 },
  { size: 46,  left: 50,  duration: 10, delay: -5,  wobble: 4   },
  { size: 30,  left: 28,  duration: 13, delay: -10, wobble: 3.5 },
  { size: 24,  left: 68,  duration: 12, delay: -1,  wobble: 2.8 },
];

function LangDropdownList({
  lang,
  langOpen,
  onSelect,
}: {
  lang: LangCode;
  langOpen: boolean;
  onSelect: (code: LangCode) => void;
}) {
  return (
    <div className={`${styles.langDropdown} ${langOpen ? styles.langDropdownVisible : styles.langDropdownHidden}`}>
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          onClick={() => onSelect(l.code)}
          className={`${styles.langOption} ${lang === l.code ? styles.langOptionActive : ""}`}
        >
          <span className={styles.flagEmoji}>{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale() as LangCode;
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langDesktopRef = useRef<HTMLDivElement>(null);
  const langMobileRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const handleLangSelect = (code: LangCode) => {
    const p = pathname || "/";
    window.location.href = code === "de" ? p : `/${code}${p === "/" ? "" : p}`;
    setLangOpen(false);
  };

  const LINKS = [
    { href: "/#why-us",    label: t("links.whyUs") },
    { href: "/#services",  label: t("links.services") },
    { href: "/#results",   label: t("links.results") },
    { href: "/#reviews",   label: t("links.reviews") },
    { href: "/#discounts", label: t("links.discounts") },
    { href: "/#faq",       label: t("links.faq") },
  ];

  useEffect(() => {
    const onScroll = () => {
      setHeroPassed(window.scrollY > 380);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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

  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      const tgt = e.target as Node;
      if (!langDesktopRef.current?.contains(tgt) && !langMobileRef.current?.contains(tgt)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>

          {/* Logo */}
          <Link href="/" className={styles.logoLink}>
            <LogoMark />
          </Link>

          {/* Location — tablet S+ */}
          <div className={styles.locationBadge}>
            <div className={styles.locationIcon}>
              <LocationPinIcon className={styles.locationPinSvg} />
            </div>
            {t("location")}
          </div>

          {/* Language picker — tablet S+ */}
          <div className={styles.languageDesktop} ref={langDesktopRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className={`${styles.langBtn} ${langOpen ? styles.langBtnOpen : ""}`}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <span
                className={styles.flagCircle}
                style={currentLang.flagImg ? { backgroundImage: `url(${currentLang.flagImg})` } : undefined}
              >
                {!currentLang.flagImg && currentLang.flag}
              </span>
              <span className={styles.languageText}>{locale.toUpperCase()}</span>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`${styles.langChevron} ${langOpen ? styles.langChevronOpen : ""}`}
              />
            </button>
            <LangDropdownList lang={locale} langOpen={langOpen} onSelect={handleLangSelect} />
          </div>

          {/* Desktop nav */}
          <nav className={styles.desktopNav}>
            <Link href="/contact" className={styles.contactLink}>
              {t("contact")}
              <MessageIcon className={styles.phoneIcon} />
            </Link>

            <div className={styles.menuWrapper} ref={menuRef}>
              <button
                className={`${styles.desktopHamburger} ${menuOpen ? styles.desktopHamburgerActive : ""}`}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>

              <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownVisible : styles.dropdownHidden}`}>
                <div className={styles.dropdownBubbles}>
                  <div className={styles.dropdownCircle} style={{ width: 150, height: 150, top: -65, right: -55 }} />
                  <div className={styles.dropdownCircle} style={{ width: 100, height: 100, bottom: -40, left: -30 }} />
                  <div className={styles.dropdownCircle} style={{ width: 70,  height: 70,  bottom: 100, right: -20 }} />
                  <BubblesLayer bubbles={DROPDOWN_BUBBLES} />
                </div>
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={styles.dropdownItem}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <Link href="/contact" className={styles.tabletContactLink}>
            {t("contact")}
            <MessageIcon className={styles.phoneIcon} />
          </Link>

          <div className={styles.mobileControls}>
            <div className={styles.mobileFlag} ref={langMobileRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className={styles.mobileLangBtn}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                <span
                  className={styles.flagCircle}
                  style={currentLang.flagImg ? { backgroundImage: `url(${currentLang.flagImg})` } : undefined}
                >
                  {!currentLang.flagImg && currentLang.flag}
                </span>
                <span className={styles.mobileFlagText}>{locale.toUpperCase()}</span>
              </button>
              <LangDropdownList lang={locale} langOpen={langOpen} onSelect={handleLangSelect} />
            </div>
            <button
              className={styles.hamburgerBtn}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet drawer */}
      <div className={styles.drawerWrapper}>
        <div
          className={`${styles.backdrop} ${open ? styles.backdropVisible : styles.backdropHidden}`}
          style={{ background: "rgba(32, 32, 32, 0.40)" }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div className={`${styles.drawer} ${open ? styles.drawerOpen : styles.drawerClosed}`}>
          <div className={styles.drawerBubbles}>
            <div className={styles.drawerCircle} style={{ width: 220, height: 220, top: -100, right: -100 }} />
            <div className={styles.drawerCircle} style={{ width: 160, height: 160, bottom: 390, left: -55 }} />
            <div className={styles.drawerCircle} style={{ width: 120, height: 120, bottom: 220, left: 85 }} />
            <div className={styles.drawerCircle} style={{ width: 180, height: 180, bottom: -10, right: -100 }} />
            <BubblesLayer bubbles={DRAWER_BUBBLES} />
          </div>

          <div className={styles.drawerContent}>
            <div className={styles.drawerTopBar}>
              <div className={styles.drawerLocation}>
                <LocationPinIcon className={styles.drawerPinSvg} />
                {t("location")}
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className={styles.closeBtn}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className={styles.drawerNav}>
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={styles.drawerNavLink}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={styles.drawerContactLink}
                onClick={() => setOpen(false)}
              >
                {t("contact")}
                <MessageIcon className={styles.phoneIcon} />
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {pathname !== "/contact" && (
        <div className={styles.bottomCtaBar}>
          <div className={styles.bottomCtaInner}>
            <Link href="/contact" onClick={() => setOpen(false)} className={styles.bottomCtaBtn}>
              {t("bookCleaning")}
            </Link>
            <a href="https://wa.me/4915147409329" target="_blank" rel="noreferrer" className={styles.bottomCallBtn} aria-label="Write us on WhatsApp">
              <MessageIcon className={styles.callBtnIcon} />
            </a>
          </div>
        </div>
      )}

      {pathname !== "/contact" && heroPassed && (
        <div className={styles.tabletCtaBar}>
          <div className={styles.tabletCtaInner}>
            <Link href="/contact" className={styles.tabletCtaBtn}>
              {t("requestEstimate")}
            </Link>
            <a href="https://wa.me/4915147409329" target="_blank" rel="noreferrer" className={styles.tabletCallBtn}>
              {t("orderCall")}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.1173 2.242C11.6741 0.796961 9.75465 0.000752673 7.70951 0C3.49536 0 0.0656331 3.42936 0.0641579 7.64463C0.0634353 8.99216 0.415717 10.3074 1.08472 11.4666L0 15.4286L4.05291 14.3655C5.16948 14.9748 6.42684 15.2955 7.70623 15.2959H7.70951C11.923 15.2959 15.3531 11.8662 15.3545 7.65087C15.3552 5.60796 14.5609 3.68744 13.1173 2.242ZM7.70951 14.0048H7.70695C6.56686 14.0045 5.44845 13.6979 4.47263 13.1191L4.24059 12.9813L1.83547 13.6122L2.47735 11.2672L2.3263 11.0267C1.69029 10.015 1.35415 8.84554 1.35487 7.64503C1.35635 4.1416 4.20687 1.29108 7.7121 1.29108C9.40932 1.29183 11.0047 1.95352 12.2045 3.15479C13.4043 4.35569 14.0645 5.95253 14.0638 7.65014C14.0623 11.1539 11.2118 14.0045 7.70951 14.0045V14.0048ZM11.1949 9.24587C11.0039 9.15019 10.0648 8.68829 9.88956 8.62449C9.71433 8.5607 9.58716 8.52884 9.45993 8.72017C9.33273 8.91156 8.96654 9.34191 8.85508 9.46908C8.74363 9.59668 8.6322 9.61245 8.4412 9.51674C8.25023 9.42106 7.63473 9.21947 6.90488 8.56877C6.33706 8.06216 5.95359 7.43681 5.84219 7.24542C5.73074 7.05409 5.83045 6.9507 5.92574 6.85574C6.01151 6.77 6.11674 6.63253 6.21242 6.52107C6.3081 6.40962 6.33962 6.32974 6.40338 6.20251C6.46721 6.07492 6.4353 5.96355 6.38767 5.86781C6.33998 5.77216 5.95801 4.83186 5.79854 4.44953C5.64346 4.07711 5.48588 4.12769 5.36894 4.12146C5.25745 4.11595 5.13028 4.11487 5.00272 4.11487C4.87516 4.11487 4.66838 4.1625 4.49316 4.35388C4.31794 4.54518 3.82451 5.00748 3.82451 5.94735C3.82451 6.88729 4.50894 7.79607 4.60462 7.92364C4.70027 8.0512 5.95175 9.98048 7.86788 10.8082C8.32354 11.0051 8.67947 11.2107 9.4145 11.3562C9.83091 11.3357 10.1601 11.2866 10.5271 11.2316C11.2903 10.8243 11.4494 10.3782 11.6084 9.93207C11.6084 9.54938 11.5608 9.46981C11.5132 9.39029 11.3856 9.34224 11.1946 9.24659L11.1949 9.24587Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  );
}