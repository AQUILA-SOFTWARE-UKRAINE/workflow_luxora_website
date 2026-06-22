import Image from "next/image";
import Link from "next/link";
import { HERO_BULLETS } from "@/data/home";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.section}>

      {/* ── Mobile layout (< 744px): text stacked above image, bullets overlaying image ── */}
      <div className={styles.mobile}>
        
        <div className={styles.mobileTextBlock}>
          <div className={styles.location}>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" viewBox="0 0 13 18" fill="none" className="shrink-0">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 5.97656C0 2.64896 2.82899 0 6.25 0C9.67101 0 12.5 2.64896 12.5 5.97656C12.5 7.85252 11.4857 10.1735 10.3746 12.1796C9.24688 14.2158 7.94812 16.0503 7.25162 16.9909C7.1367 17.148 6.98642 17.2759 6.81292 17.3642C6.63854 17.4529 6.44565 17.4992 6.25 17.4992C6.05434 17.4992 5.86146 17.4529 5.68708 17.3642C5.51356 17.2759 5.36327 17.148 5.24834 16.9908C4.55187 16.0499 3.2531 14.2147 2.12536 12.1783C1.01432 10.172 0 7.85119 0 5.97656ZM6.25 1.25C3.46007 1.25 1.25 3.39713 1.25 5.97656C1.25 7.50037 2.11068 9.57155 3.21888 11.5727C4.30739 13.5383 5.5682 15.3216 6.25 16.243C6.93177 15.3221 8.1926 13.5394 9.28114 11.574C10.3893 9.57318 11.25 7.50177 11.25 5.97656C11.25 3.39713 9.03993 1.25 6.25 1.25Z" fill="#0666C6" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6.25 5C5.55964 5 5 5.55964 5 6.25C5 6.94036 5.55964 7.5 6.25 7.5C6.94036 7.5 7.5 6.94036 7.5 6.25C7.5 5.55964 6.94036 5 6.25 5ZM3.75 6.25C3.75 4.86929 4.86929 3.75 6.25 3.75C7.63071 3.75 8.75 4.86929 8.75 6.25C8.75 7.63071 7.63071 8.75 6.25 8.75C4.86929 8.75 3.75 7.63071 3.75 6.25Z" fill="#0666C6" />
            </svg>
            Berlin &amp; Surrounding Areas
          </div>
          <h1 className={styles.mobileH1}>
            Professional{" "}
            <br />
            <span className={styles.mobileH1Accent}>Home Cleaning</span>
            <br />
            You Can Trust
          </h1>
          <p className={styles.mobilePara}>
            From sofas and windows to full apartments, driveways and car
            interiors. Professional cleaning at your door across Berlin
          </p>
        </div>

        <div className={styles.mobileImage}>
          <Image
            src="/images/hero-bg.png"
            alt="Professional cleaning service"
            fill
            priority
            quality={90}
            className="object-cover object-[85%_80%]"
            sizes="100vw"
          />
          <div className={styles.mobileBullets}>
            {HERO_BULLETS.map((b) => (
              <div key={b} className={styles.mobileBullet}>
                <svg className={styles.bulletIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {b}
              </div>
            ))}
          </div>
        </div>
        
      </div>

      {/* ── Desktop/Tablet layout (>= 744px): full-bleed image with overlay ── */}
      <div className={styles.desktop}>
        <Image
          src="/images/hero-bg.png"
          alt="Professional cleaning service"
          fill
          priority
          quality={90}
          className={styles.desktopImg}
          sizes="100vw"
        />
        <div className={styles.desktopOverlay} />
        <div className={styles.desktopInner}>
          <div className={styles.desktopContentBlock}>
            <div className={styles.desktopTextBlock}>
              <h1 className={styles.desktopH1}>
                Professional
                <br />
                <span className={styles.desktopH1Accent}>Home Cleaning</span>
                <br />
                You Can Trust
              </h1>
              <p className={styles.desktopPara}>
                From sofas and windows to full apartments, driveways and car
                interiors. Professional cleaning at your door across Berlin
              </p>
            </div>
            <div className={styles.desktopActionsBlock}>
              <div className={styles.desktopBullets}>
                {HERO_BULLETS.map((b) => (
                  <div key={b} className={styles.desktopBullet}>
                    <svg className={styles.desktopBulletIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {b}
                  </div>
                ))}
              </div>
              <Link href="/contact" className={styles.cta}>
                Request a Free Estimate
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}