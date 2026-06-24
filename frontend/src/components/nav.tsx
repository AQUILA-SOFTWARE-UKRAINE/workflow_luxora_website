"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LogoMark, PhoneIcon, LocationPinIcon, ChevronDownIcon } from "@/components/ui/icons";
import BubblesLayer from "@/components/BubblesLayer";
import styles from "./nav.module.css";

const LINKS = [
  { href: "/#why-us", label: "Why Choose Us?" },
  { href: "/#services", label: "Our Services" },
  { href: "/#results", label: "See Results" },
  { href: "/#reviews", label: "Client's Reviews" },
  { href: "/#discounts", label: "Discounts" },
  { href: "/#faq", label: "FAQ" },
];

const LANGUAGES = [
  { code: "de" as const, label: "German",  flag: "🇩🇪", flagImg: "/images/flag-de.png" },
  { code: "en" as const, label: "English", flag: "🇬🇧", flagImg: "/images/flag-en.svg" },
  { code: "ru" as const, label: "Russian", flag: "🇷🇺", flagImg: "/images/flag-ru.svg" },
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroPassed, setHeroPassed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("de");
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const langDesktopRef = useRef<HTMLDivElement>(null);
  const langMobileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  const handleLangSelect = (code: LangCode) => {
    setLang(code);
    setLangOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
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
      const t = e.target as Node;
      if (!langDesktopRef.current?.contains(t) && !langMobileRef.current?.contains(t)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.inner}>

          {/* Logo */}
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <LogoMark />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Luxora</span>
              <span className={styles.logoSub}>Reinigungsservice</span>
            </div>
          </Link>

          {/* Location — tablet S+ (744px+) */}
          <div className={styles.locationBadge}>
            <div className={styles.locationIcon}>
              <LocationPinIcon className={styles.locationPinSvg} />
            </div>
            Berlin &amp; Surrounding Areas
          </div>

          {/* Language picker — tablet S+ (744px+) */}
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
              <span className={styles.languageText}>{lang.toUpperCase()}</span>
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`${styles.langChevron} ${langOpen ? styles.langChevronOpen : ""}`}
              />
            </button>
            <LangDropdownList lang={lang} langOpen={langOpen} onSelect={handleLangSelect} />
          </div>

          {/* Desktop nav — visible from 1280px */}
          <nav className={styles.desktopNav}>
            <div className={styles.menuWrapper} ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ""}`}
              >
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                  <path d="M1 1h16M1 6.5h10M1 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <span>Menu</span>
                <ChevronDownIcon
                  strokeWidth={2.2}
                  className={`${styles.menuChevron} ${menuOpen ? styles.menuChevronOpen : ""}`}
                />
              </button>

              <div className={`${styles.dropdown} ${menuOpen ? styles.dropdownVisible : styles.dropdownHidden}`}>
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className={styles.dropdownItem}
                  >
                    <span className={styles.dropdownDot} />
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" className={styles.contactLink}>
              Contact Us
              <PhoneIcon className={styles.phoneIcon} />
            </Link>
          </nav>

          {/* Contact Us — tablet L only (1024px–1279px) */}
          <Link href="/contact" className={styles.tabletContactLink}>
            Contact Us
            <PhoneIcon className={styles.phoneIcon} />
          </Link>

          {/* Right-side group: mobile flag (< 744px) + hamburger (< 1280px) */}
          <div className={styles.mobileControls}>
            {/* Language picker: mobile only (< 744px) */}
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
                <span className={styles.mobileFlagText}>{lang.toUpperCase()}</span>
              </button>
              <LangDropdownList lang={lang} langOpen={langOpen} onSelect={handleLangSelect} />
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

      {/* Mobile / Tablet drawer — hidden >= 1280px */}
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
                Berlin &amp; Surrounding Areas
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
                Contact Us
                <PhoneIcon className={styles.phoneIcon} />
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA — mobile only (< 744px), hidden on /contact */}
      {pathname !== "/contact" && (
        <div className={styles.bottomCtaBar}>
          <div className={styles.bottomCtaInner}>
            <Link href="/contact" onClick={() => setOpen(false)} className={styles.bottomCtaBtn}>
              Book a cleaning
            </Link>
            <a href="tel:+4916343250808" className={styles.bottomCallBtn} aria-label="Call us">
              <PhoneIcon className={styles.callBtnIcon} />
            </a>
          </div>
        </div>
      )}

      {/* Fixed bottom CTA — Tablet S only (744px–1023px), appears after hero is scrolled past */}
      {pathname !== "/contact" && heroPassed && (
        <div className={styles.tabletCtaBar}>
          <div className={styles.tabletCtaInner}>
            <Link href="/contact" className={styles.tabletCtaBtn}>
              Request a Free Estimate
            </Link>
            <a href="tel:+4916343250808" className={styles.tabletCallBtn}>
              Order a call
              <PhoneIcon className={styles.phoneIconLg} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
