import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { LocationPinIcon, CheckIcon, ArrowRightIcon } from "@/components/ui/icons";
import styles from "./HeroSection.module.css";

export default async function HeroSection() {
  const t = await getTranslations("hero");
  const bullets = t.raw("bullets") as string[];

  return (
    <section className={styles.section}>

      {/* ── Mobile layout (< 744px): text stacked above image, bullets overlaying image ── */}
      <div className={styles.mobile}>

        <div className={styles.mobileTextBlock}>
          <div className={styles.location}>
            <LocationPinIcon className={styles.locationPin} />
            {t("location")}
          </div>
          <h1 className={styles.mobileH1}>
            {t("h1Line1")}{" "}
            <br />
            <span className={styles.mobileH1Accent}>{t("h1Line2")}</span>
            <br />
            {t("h1Line3")}
          </h1>
          <p className={styles.mobilePara}>{t("para")}</p>
        </div>

        <div className={styles.mobileImage}>
          <Image
            src="/images/hero-bg.webp"
            alt="Professional cleaning service"
            fill
            priority
            quality={100}
            className={styles.mobileImg}
            sizes="100vw"
          />
          <div className={styles.mobileBullets}>
            {bullets.map((b) => (
              <div key={b} className={styles.mobileBullet}>
                <CheckIcon className={styles.bulletIcon} />
                {b}
              </div>
            ))}
          </div>
          <span className={styles.aiLabel}>AI-generated</span>
        </div>

      </div>

      {/* ── Desktop/Tablet layout (>= 744px): full-bleed image with overlay ── */}
      <div className={styles.desktop}>
        <Image
          src="/images/hero-bg.webp"
          alt="Professional cleaning service"
          fill
          priority
          quality={90}
          className={styles.desktopImg}
          sizes="100vw"
        />
        <div className={styles.desktopOverlay} />
        <span className={styles.aiLabel}>AI-generated</span>
        <div className={styles.desktopInner}>
          <div className={styles.desktopContentBlock}>
            <div className={styles.desktopTextBlock}>
              <h1 className={styles.desktopH1}>
                {t("h1Line1")}
                <br />
                <span className={styles.desktopH1Accent}>{t("h1Line2")}</span>
                <br />
                {t("h1Line3")}
              </h1>
              <p className={styles.desktopPara}>{t("para")}</p>
            </div>
            <div className={styles.desktopActionsBlock}>
              <div className={styles.desktopBullets}>
                {bullets.map((b) => (
                  <div key={b} className={styles.desktopBullet}>
                    <CheckIcon className={styles.desktopBulletIcon} />
                    {b}
                  </div>
                ))}
              </div>
              <Link href="/contact" className={styles.cta}>
                {t("cta")}
                <ArrowRightIcon className={styles.ctaArrow} />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
