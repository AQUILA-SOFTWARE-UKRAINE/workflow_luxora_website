import Link from "next/link";

const NAV_LINKS = [
  { href: "/#why-us",   label: "Чому ми?" },
  { href: "/#services", label: "Послуги" },
  { href: "/#discount", label: "Знижки" },
  { href: "/#faq",      label: "FAQ" },
  { href: "/contact",   label: "Контакти" },
];

const SERVICES = [
  { href: "/#services", label: "Хімчистка" },
  { href: "/#services", label: "Прання" },
  { href: "/#services", label: "Шкіра та замша" },
  { href: "/#services", label: "Чищення килимів" },
  { href: "/#services", label: "Прасування" },
];

export default function Footer() {
  return (
    <footer className="bg-footer text-white/60">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-4 shrink-0">
            <span className="size-11 rounded-[10px] bg-blue flex items-center justify-center shrink-0">
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-extrabold text-white text-lg leading-none select-none">
                L
              </span>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-extrabold text-white text-[20px] tracking-[-0.2px]">
                Luxora
              </span>
              <span className="font-[family-name:var(--font-plus-jakarta-sans)] font-semibold text-white/60 text-[12px] tracking-[-0.12px]">
                Хімчистка
              </span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Професійна хімчистка та прання по всій Україні.
            Кожну річ оцінюємо особисто.
          </p>
          <div className="flex gap-3">
            {[
              {
                label: "Instagram",
                path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
              },
              {
                label: "Facebook",
                path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
              },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="size-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Навігація</p>
          <nav className="flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((l) => (
              <a key={l.href + l.label} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Послуги</p>
          <nav className="flex flex-col gap-3 text-sm">
            {SERVICES.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Контакти</p>
          <div className="flex flex-col gap-3 text-sm">
            {[
              {
                icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
                text: "+380 XX XXX XX XX",
              },
              {
                icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
                text: "hello@luxora.ua",
              },
              {
                icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
                text: "Пн–Сб: 9:00 – 19:00",
              },
              {
                icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z",
                text: "Вся Україна",
              },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-2.5">
                <svg className="size-4 text-blue shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Luxora. Всі права захищені.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">
              Політика конфіденційності
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
