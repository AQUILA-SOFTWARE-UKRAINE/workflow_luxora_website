import Image from "next/image";
import Link from "next/link";
import { HERO_BULLETS } from "@/data/home";
import { LocationPinIcon, CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.section}>

      {/* ── Mobile layout (< 744px): text stacked above image, bullets overlaying image ── */}
      <div className={styles.mobile}>

        <div className={styles.mobileTextBlock}>
          <div className={styles.location}>
            <LocationPinIcon className={styles.locationPin} />
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
            quality={100}
            className={styles.mobileImg}
            sizes="100vw"
          />
          <div className={styles.mobileBullets}>
            {HERO_BULLETS.map((b) => (
              <div key={b} className={styles.mobileBullet}>
                <CheckIcon className={styles.bulletIcon} />
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
                    <CheckIcon className={styles.desktopBulletIcon} />
                    {b}
                  </div>
                ))}
              </div>
              <Link href="/contact" className={styles.cta}>
                Request a Free Estimate
                <ArrowRightIcon className={styles.ctaArrow} />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
