import { getTranslations } from "next-intl/server";
import BeforeAfterSlider from "@/components/before-after-slider";
import { BEFORE_AFTER_ASSETS } from "@/data/home";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import styles from "./BeforeAfterSection.module.css";

export default async function BeforeAfterSection() {
  const t = await getTranslations("beforeAfter");

  const beforeLabel = t("before");
  const afterLabel = t("after");

  const slides = BEFORE_AFTER_ASSETS.map((asset) => ({
    before: asset.before,
    after: asset.after,
    title: t(`slides.${asset.id}.title`),
    location: t(`slides.${asset.id}.location`),
    beforeLabel,
    afterLabel,
  }));

  return (
    <section id="results" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.kicker}>{t("kicker")}</p>
          <h2 className={styles.heading}>
            <span className={styles.accent}>{t("heading1")}</span>
            <br />
            <span className={styles.navy}>{t("heading2")}</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {slides.map((s) => (
            <BeforeAfterSlider key={s.title} {...s} />
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            {t("ctaText").split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <div className={styles.ctaButtons}>
            <a href="https://www.facebook.com/profile.php?id=61588783384456" target="_blank" rel="noreferrer" className={styles.socialBtn}>
              {t("facebook")}
              <FacebookIcon className={styles.socialIcon} />
            </a>
            <a href="https://www.instagram.com/luxora.reinigung?igsh=Nms2ZnpyZGd0Y3V1&utm_source=qr" target="_blank" rel="noreferrer" className={styles.socialBtn}>
              {t("instagram")}
              <InstagramIcon className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
