import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Luxora — Професійна хімчистка | Виїзд та оцінка безкоштовно",
  description:
    "Luxora — хімчистка, прання, догляд за шкірою, килимами та шторами по всій Україні. Залиш заявку онлайн — спеціаліст приїде на особистий огляд. Ціни від ₴40.",
};

/* ── Shared icon helper ───────────────────────────────────────── */
function Icon({ d, className = "size-5" }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

/* ── Section kicker label ─────────────────────────────────────── */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-blue text-[14px] font-medium tracking-[-0.28px] uppercase mb-3">
      {children}
    </p>
  );
}

/* ── Checkmark icon ───────────────────────────────────────────── */
const CHECK = "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
const ARROW = "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3";

/* ── Data ─────────────────────────────────────────────────────── */
const BENEFITS = [
  {
    title: "Виїзд у зручний для вас час",
    desc: "Забираємо речі та повертаємо після чищення прямо до дверей у зручний для вас час.",
    d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
  },
  {
    title: "Пунктуально та надійно",
    desc: "Підтверджуємо кожен виїзд і тримаємо в курсі. Наші спеціалісти приїжджають вчасно.",
    d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Досвідчені фахівці",
    desc: "Наша команда працює з делікатними тканинами — шовком, кашеміром, шкірою, замшею та вишивкою.",
    d: "M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5",
  },
  {
    title: "Безпечно та уважно",
    desc: "Засоби підбираємо за типом тканини та доглядовим ярликом. Дотримуємось рекомендацій виробника.",
    d: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
];

const SERVICES = [
  {
    name: "Хімчистка",
    from: "₴150",
    bullets: ["Костюми, пальто, сукні, вечірній одяг", "Розчинники — безпечні для ніжних тканин", "Особистий огляд перед чищенням"],
  },
  {
    name: "Прання",
    from: "₴80 /кг",
    bullets: ["Повсякденний одяг і текстиль", "Делікатні та стандартні програми", "Прасування за бажанням"],
  },
  {
    name: "Прасування",
    from: "₴40 /шт",
    bullets: ["Сорочки, блузи, брюки, спідниці", "Точний контроль температури", "Повернення на плічках"],
  },
  {
    name: "Шкіра та замша",
    from: "₴300",
    bullets: ["Куртки, сумки, ремені, взуття", "Спеціалізований кондиціонуючий догляд", "Ціна підтверджується після огляду"],
  },
  {
    name: "Чищення килимів",
    from: "₴200 /м²",
    bullets: ["Будь-який розмір — забираємо та повертаємо", "Глибоке екстракційне чищення", "Сушка включена"],
  },
];

const REVIEWS = [
  {
    name: "Олена К.",
    location: "Київ",
    text: "Моє зимове пальто виглядає як нове після хімчистки Luxora. Спеціаліст пояснив кожен крок до початку роботи. Справді профі.",
  },
  {
    name: "Марія С.",
    location: "Львів",
    text: "Здала весільну сукню після 5 років у шафі. Впорались з делікатним мереживом ідеально. Кожна гривня варта свого.",
  },
  {
    name: "Андрій М.",
    location: "Одеса",
    text: "Великий східний килим — забрали, почистили, привезли за два дні. Результат вражаючий. Дуже рекомендую.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Як визначається точна ціна?",
    a: "Мінімальні ціни на сайті — лише орієнтир. Кожну річ потрібно оглянути особисто. Спеціаліст приїжджає, перевіряє тканину, стан та розмір плями і називає фіксовану ціну. Ви вирішуєте, чи продовжувати, — ми нічого не забираємо без вашої згоди.",
  },
  {
    q: "Скільки часу займає хімчистка?",
    a: "Більшість речей готова через 3–5 робочих днів. Сильно забруднені речі, шкіра або килими можуть вимагати більше часу. Орієнтовну дату повернення повідомляємо при забиранні.",
  },
  {
    q: "Ви забираєте та повертаєте речі додому?",
    a: "Так — завжди. Після підтвердження заявки узгоджуємо час виїзду. Речі після чищення повертаємо безпосередньо до вас. Не потрібно їхати до пункту прийому.",
  },
  {
    q: "Чи є знижка для нових клієнтів?",
    a: "Так! Перше замовлення у Luxora — зі знижкою 20%. Залиште заявку, і ми зв'яжемося, щоб обговорити деталі та підтвердити знижку.",
  },
  {
    q: "Чи обов'язково прикріплювати фото в формі?",
    a: "Ні, це необов'язково. Фото допомагає менеджеру скласти попереднє враження про річ до виїзду, що прискорює процес. Для незвичних речей або помітних плям фото настійно рекомендується.",
  },
  {
    q: "Чи безпечні ваші засоби для ніжних тканин?",
    a: "Так. Засоби підбираємо залежно від типу тканини та ярлика догляду. Шовком, кашеміром, вовною, шкірою та замшею займаються фахівці, які спеціалізуються саме на цих матеріалах.",
  },
  {
    q: "Що, якщо я незадоволений результатом?",
    a: "Зв'яжіться з нами протягом 48 годин після доставки. Ми розглянемо ситуацію і, якщо результат не відповідає тому, що було обговорено при огляді, — переробимо безкоштовно.",
  },
];

/* ── Stars ────────────────────────────────────────────────────── */
function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="size-4 text-star fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Google G ─────────────────────────────────────────────────── */
function GoogleG() {
  return (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[560px] md:h-[816px] overflow-hidden bg-sky">
        {/* Background photo */}
        <Image
          src="/images/hero-bg.jpg"
          alt="Фахівець Luxora виконує хімчистку дивана"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay — white from left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.65) 55%, rgba(255,255,255,0.15) 75%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-[147px] h-full flex items-center">
          <div className="max-w-[586px] py-16 md:py-24">
            <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold leading-[1.1] text-navy mb-4">
              Професійна{" "}
              <span className="text-blue">Хімчистка</span>{" "}
              якій можна довіряти
            </h1>
            <p className="text-[16px] text-navy/80 leading-relaxed mb-8 max-w-[477px]">
              Від суконь і пальто до килимів та штор. Фахова хімчистка з виїздом до вас — кожна ціна підтверджується після особистого огляду.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
              {[
                "Знижка для нових клієнтів",
                "Відповідь за 10 хв",
                "500+ клієнтів",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-[16px] text-navy">
                  <Icon d={CHECK} className="size-5 text-blue shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue text-white font-medium text-[18px] pl-10 pr-9 h-[53px] rounded-[12px] hover:bg-blue/90 transition-colors"
            >
              Залишити заявку
              <Icon d={ARROW} className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — WHY CHOOSE US
      ═══════════════════════════════════════════════════════ */}
      <section id="why-us" className="bg-white py-20 md:py-28 border-t border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: 2×2 photo grid */}
            <div className="relative grid grid-cols-2 gap-3">
              {["bg-sky", "bg-blue/10", "bg-blue/10", "bg-sky"].map((bg, i) => (
                <div key={i} className={`${bg} rounded-[20px] aspect-square flex items-end p-4`}>
                  <p className="text-blue/30 text-[10px]">Фото {i + 1}</p>
                </div>
              ))}
              {/* Floating badge */}
              <div className="absolute -top-4 -left-4 bg-navy text-white rounded-[20px] px-5 py-4 shadow-xl">
                <p className="text-[32px] font-bold leading-none">500+</p>
                <p className="text-xs text-white/60 mt-1">Задоволених клієнтів</p>
              </div>
            </div>

            {/* Right: content */}
            <div>
              <Kicker>Чому клієнти обирають нас</Kicker>
              <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-navy leading-[1.2] mb-4">
                Ми не просто чистимо.{" "}
                <span className="text-blue">Ми дбаємо про ваші речі</span>
              </h2>
              <p className="text-body text-[16px] leading-relaxed mb-10">
                Перевірені фахівці, стабільна якість і увага до кожної деталі —
                ваш гардероб отримає той догляд, якого він заслуговує.
              </p>

              <div className="flex flex-col gap-6">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <div className="size-11 rounded-full bg-blue/10 flex items-center justify-center shrink-0">
                      <Icon d={b.d} className="size-5 text-blue" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy mb-1">{b.title}</p>
                      <p className="text-body2 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-2 bg-blue text-white font-medium text-[18px] pl-10 pr-9 h-[53px] rounded-[12px] hover:bg-blue/90 transition-colors"
              >
                Замовити чищення
                <Icon d={ARROW} className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — SERVICES / PRICING
      ═══════════════════════════════════════════════════════ */}
      <section id="services" className="bg-white py-20 md:py-28 border-t border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Header */}
          <div className="text-center mb-4">
            <Kicker>Наші послуги</Kicker>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-navy mb-3">
              Простий запит.{" "}
              <span className="text-blue">Бездоганний результат</span>
            </h2>
            <p className="text-body text-[16px]">
              Заповніть форму → Передзвонимо за 10 хв → Ціна фіксується після огляду
            </p>
          </div>

          {/* Row 1: 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {SERVICES.slice(0, 3).map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>

          {/* Row 2: 2 cards centered */}
          <div className="grid md:grid-cols-2 gap-6 mt-6 md:w-2/3 mx-auto">
            {SERVICES.slice(3).map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-body2 mt-8">
            * Фінальна ціна залежить від розміру та стану речі. ПДВ включено: виїзд, засоби, обладнання.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — CTA STRIP
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white py-10 border-t border-border">
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue text-white font-medium text-[18px] pl-10 pr-9 h-[53px] rounded-[12px] hover:bg-blue/90 transition-colors"
          >
            Залишити заявку
            <Icon d={ARROW} className="size-5" />
          </Link>
          <p className="text-xs text-body2">Займає 1 хвилину. Без зобов&apos;язань</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — BEFORE & AFTER
      ═══════════════════════════════════════════════════════ */}
      <section id="results" className="bg-white py-20 md:py-28 border-t border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-14">
            <Kicker>До та після</Kicker>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-navy">
              Результати говорять{" "}
              <span className="text-blue">самі за себе</span>
            </h2>
          </div>

          {/* 3 before/after cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-[20px] border border-border overflow-hidden">
                {/* Two halves */}
                <div className="grid grid-cols-2 h-52">
                  <div className="bg-sky/80 flex flex-col items-center justify-end pb-3">
                    <span className="text-xs font-semibold text-body2 bg-white/80 px-2 py-0.5 rounded">До</span>
                  </div>
                  <div className="bg-blue/10 flex flex-col items-center justify-end pb-3">
                    <span className="text-xs font-semibold text-blue bg-white/80 px-2 py-0.5 rounded">Після</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-body2 text-center">Приклад роботи {n} — фото додасте пізніше</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-body text-[16px] leading-relaxed mb-6">
              Хочете побачити більше наших робіт? Стежте за нами або залиште заявку.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 border-2 border-blue text-blue font-medium px-6 h-12 rounded-[12px] hover:bg-blue/5 transition-colors text-sm"
              >
                Instagram
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue text-white font-medium px-6 h-12 rounded-[12px] hover:bg-blue/90 transition-colors text-sm"
              >
                Залишити заявку
                <Icon d={ARROW} className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — REVIEWS
      ═══════════════════════════════════════════════════════ */}
      <section id="reviews" className="bg-white py-20 md:py-28 border-t border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <Kicker>Відгуки клієнтів</Kicker>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-navy mb-3">
              Що кажуть{" "}
              <span className="text-blue">наші клієнти</span>
            </h2>
            <p className="text-body text-[16px]">Реальні відгуки від реальних людей по всій Україні</p>
          </div>

          {/* Review cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-[20px] border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-blue flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">{r.name}</p>
                      <p className="text-body2 text-xs">{r.location}</p>
                    </div>
                  </div>
                  <GoogleG />
                </div>
                <Stars />
                <p className="text-body2 text-sm leading-relaxed mt-4">{r.text}</p>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-6 h-1.5 rounded-full bg-blue" />
            <div className="size-1.5 rounded-full bg-blue/30" />
            <div className="size-1.5 rounded-full bg-blue/30" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — DISCOUNT / REWARDS
      ═══════════════════════════════════════════════════════ */}
      <section id="discount" className="bg-block py-20 md:py-28 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -bottom-44 -left-24 size-[400px] rounded-full bg-fade pointer-events-none" />
        <div className="absolute -top-56 -right-48 size-[600px] rounded-full bg-fade pointer-events-none" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <Kicker>Програма лояльності</Kicker>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.2]">
              <span className="text-blue">Економте більше</span>
              <br />
              з кожним чищенням
            </h2>
          </div>

          {/* 3 discount cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-[980px] mx-auto">
            {/* Card 1 — blue (new client) */}
            <div className="bg-blue rounded-[20px] p-8 flex flex-col items-center justify-between h-[255px]">
              <div className="text-center flex flex-col gap-3">
                <p className="font-bold text-[24px] text-white">Новий клієнт</p>
                <p className="text-[14px] text-blue/30 leading-relaxed" style={{ color: "#c2ddfd" }}>
                  Перше замовлення у Luxora? Отримайте 20% знижки. Поширюється на будь-яку послугу.
                </p>
              </div>
              <span className="bg-label text-navy font-semibold text-[20px] px-5 py-1.5 rounded-[12px]">
                −20%
              </span>
            </div>

            {/* Card 2 — white */}
            <div className="bg-white rounded-[20px] p-8 flex flex-col items-center justify-between h-[255px]">
              <div className="text-center flex flex-col gap-3">
                <p className="font-bold text-[24px] text-navy">2 послуги за раз</p>
                <p className="text-[14px] text-body2 leading-relaxed">
                  Замовте 2 послуги під час одного виїзду і отримайте 30% на третю послугу.
                </p>
              </div>
              <span className="bg-label text-navy font-semibold text-[20px] px-5 py-1.5 rounded-[12px]">
                −30%
              </span>
            </div>

            {/* Card 3 — white */}
            <div className="bg-white rounded-[20px] p-8 flex flex-col items-center justify-between h-[255px]">
              <div className="text-center flex flex-col gap-3">
                <p className="font-bold text-[24px] text-navy">3 послуги за раз</p>
                <p className="text-[14px] text-body2 leading-relaxed">
                  Замовте 3 послуги під час одного виїзду і отримайте 50% на четверту.
                </p>
              </div>
              <span className="bg-label text-navy font-semibold text-[20px] px-5 py-1.5 rounded-[12px]">
                −50%
              </span>
            </div>
          </div>

          <p className="text-center text-[16px] text-body2 mt-6 max-w-[980px] mx-auto">
            Економте більше, замовляючи кілька послуг за один виїзд
          </p>

          {/* Refer cards */}
          <div className="flex flex-col gap-4 mt-10 max-w-[980px] mx-auto">
            {/* Refer friend */}
            <div className="bg-white rounded-[20px] p-6 flex flex-wrap md:flex-nowrap items-center gap-4">
              <span className="bg-label text-navy font-semibold text-[20px] px-5 py-1.5 rounded-[12px] shrink-0">
                −20%
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[20px] leading-relaxed">
                  <span className="text-blue">Запроси друга</span>
                  {" "}&amp;{" "}
                  <span className="text-navy">Отримай бонус</span>
                </p>
                <p className="text-[14px] text-body2 leading-relaxed mt-0.5">
                  Порадьте нас знайомому. Ви отримаєте 15% на наступне замовлення, а друг — 20% на перше.
                </p>
              </div>
              <button className="border-2 border-blue text-blue font-medium text-[14px] px-6 h-12 rounded-[12px] hover:bg-blue/5 transition-colors shrink-0">
                Поділитись
              </button>
            </div>

            {/* Leave review */}
            <div className="bg-white rounded-[20px] p-6 flex flex-wrap md:flex-nowrap items-center gap-4">
              <span className="bg-label text-navy font-semibold text-[20px] px-5 py-1.5 rounded-[12px] shrink-0">
                −10%
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[20px] leading-relaxed">
                  <span className="text-blue">Залиш відгук</span>
                  {" "}&amp;{" "}
                  <span className="text-navy">Отримай знижку</span>
                </p>
                <p className="text-[14px] text-body2 leading-relaxed mt-0.5">
                  Задоволені результатом? Залиште короткий відгук у Google або Instagram і отримайте 10% на наступну послугу.
                </p>
              </div>
              <button className="border-2 border-blue text-blue font-medium text-[14px] px-6 h-12 rounded-[12px] hover:bg-blue/5 transition-colors shrink-0">
                Написати відгук
              </button>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-3 mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue text-white font-medium text-[18px] pl-10 pr-9 h-[53px] rounded-[12px] hover:bg-blue/90 transition-colors"
            >
              Залишити заявку
              <Icon d={ARROW} className="size-5" />
            </Link>
            <p className="text-xs text-body2">Займає 1 хвилину. Без зобов&apos;язань</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8 — FAQ
      ═══════════════════════════════════════════════════════ */}
      <section id="faq" className="bg-white py-20 md:py-28 border-t border-border">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-12">
            <Kicker>FAQ</Kicker>
            <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-navy mb-3">
              Є питання?{" "}
              <span className="text-blue">Маємо відповіді</span>
            </h2>
            <p className="text-body text-[16px]">
              Не знайшли відповідь? Пишіть — відповідаємо за 10 хвилин.
            </p>
          </div>

          <div className="border-t border-border">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="group border-b border-border">
                <summary className="py-5 flex items-center justify-between cursor-pointer gap-4 list-none">
                  <span className="font-semibold text-navy text-[16px]">{item.q}</span>
                  <span className="size-7 rounded-full bg-blue/10 flex items-center justify-center shrink-0 text-blue font-bold text-xl group-open:rotate-45 transition-transform duration-200 select-none">
                    +
                  </span>
                </summary>
                <p className="pb-6 text-body2 text-[16px] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 9 — FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-20 size-[130px] rounded-full bg-blue/20 pointer-events-none" />
        <div className="absolute -bottom-24 -left-16 size-[195px] rounded-full bg-blue/20 pointer-events-none" />
        <div className="absolute -top-40 right-[8%] size-[352px] rounded-full bg-blue/20 pointer-events-none" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <p className="text-blue text-[14px] font-medium tracking-[-0.28px] uppercase mb-4">
            Зробіть перший крок
          </p>
          <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-white leading-[1.2] mb-6">
            Перше чищення{" "}
            <span className="text-blue">зі знижкою 20%</span>
          </h2>
          <p className="text-white/70 text-[16px] leading-relaxed mb-8 max-w-[478px] mx-auto">
            Вперше у Luxora? Новим клієнтам — 20% знижки. Залиште заявку, і ми зв&apos;яжемося, щоб обговорити деталі.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Без передоплати", "Фіксована ціна", "Виїзд по всій Україні"].map((b) => (
              <span key={b} className="flex items-center gap-1.5 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full">
                <Icon d={CHECK} className="size-4 text-blue shrink-0" />
                {b}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-blue text-white font-medium text-[18px] pl-10 pr-9 h-[53px] rounded-[12px] hover:bg-blue/90 transition-colors"
            >
              Залишити заявку
              <Icon d={ARROW} className="size-5" />
            </Link>
            <a
              href="tel:+380XXXXXXXXX"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-medium text-[18px] px-8 h-[53px] rounded-[12px] hover:bg-white/10 transition-colors"
            >
              <Icon d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" className="size-5" />
              Зателефонувати
            </a>
          </div>
          <p className="text-white/40 text-xs mt-4">Без передоплати. Скасування до 24 годин — безкоштовно.</p>
        </div>
      </section>
    </>
  );
}

/* ── Service Card sub-component ────────────────────────────────── */
function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <div className="rounded-[20px] border border-border overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {/* Photo placeholder */}
      <div className="bg-sky aspect-[3/2] flex items-end p-4">
        <p className="text-blue/30 text-xs">Фото послуги</p>
      </div>
      <div className="p-6">
        <span className="inline-block bg-blue/10 text-blue text-xs font-semibold px-3 py-1 rounded-full mb-3">
          від {service.from}
        </span>
        <h3 className="font-bold text-navy text-lg mb-4">{service.name}</h3>
        <ul className="flex flex-col gap-2 mb-5">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-body2">
              <Icon d={CHECK} className="size-4 text-blue shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
        <a href="/contact" className="text-blue text-sm font-semibold hover:underline">
          Дізнатись більше →
        </a>
      </div>
    </div>
  );
}
