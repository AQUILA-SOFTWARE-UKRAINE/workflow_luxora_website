import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { REWARD_BUBBLES } from "@/data/home";
import BubblesLayer from "@/components/BubblesLayer";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./RewardsSection.module.css";

export default async function RewardsSection() {
  const t = await getTranslations("rewards");

  return (
    <section id="discounts" className={styles.section}>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />

      <div className={styles.bubblesLayer}>
        <BubblesLayer bubbles={REWARD_BUBBLES} />
      </div>

      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <p className={styles.kicker}>{t("kicker")}</p>
          <h2 className={styles.heading}>
            <span className={styles.accent}>{t("heading1")}</span>
            <br />
            <span className={styles.navy}>{t("heading2")}</span>
          </h2>
        </div>

        <div className={styles.inner}>
          {/* ── Cards grid ── */}
          <div className={styles.cardGrid}>
            {/* Featured – New Client */}
            <div className={styles.featuredCard}>
              <p className={styles.featuredTitle}>{t("newClient.title")}</p>
              <p className={styles.featuredDesc}>{t("newClient.desc")}</p>
              <p className={styles.promoCode}>&ldquo;{t("newClient.promoCode")}&rdquo;</p>
              <div className={styles.badgeRow}>
                <span className={styles.badge}>−20%</span>
                <span className={styles.orLabel}>OR</span>
                <span className={styles.giftBadge}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 12v10H4V12" stroke="#032445" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 7H2v5h20V7z" stroke="#032445" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22V7" stroke="#032445" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" stroke="#032445" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="#032445" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            {/* 2 Services at Once */}
            <div className={styles.whiteCard}>
              <div className={styles.whiteCardBody}>
                <p className={styles.cardTitle}>{t("twoServices.title")}</p>
                <p className={styles.cardDesc}>{t("twoServices.desc")}</p>
              </div>
              <span className={styles.badge}>−30%</span>
            </div>

            {/* 3 Services at Once */}
            <div className={styles.whiteCard}>
              <div className={styles.whiteCardBody}>
                <p className={styles.cardTitle}>{t("threeServices.title")}</p>
                <p className={styles.cardDesc}>{t("threeServices.desc")}</p>
              </div>
              <span className={styles.badge}>−50%</span>
            </div>
          </div>

          <p className={styles.footnote}>{t("discountFootnote")}</p>

          {/* ── Review banner ── */}
          <div className={styles.reviewBanner}>
            <span className={styles.reviewBadge}>−10%</span>
            <div className={styles.reviewBody}>
              <p className={styles.reviewTitle}>
                <span className={styles.reviewAccent}>{t("review.title1")} </span>
                <span className={styles.reviewNavy}>{t("review.title2")}</span>
              </p>
              <p className={styles.reviewDesc}>{t("review.desc")}</p>
            </div>
            <a
              href="https://maps.app.goo.gl/W1utgtK8RQDZk2PF6"
              target="_blank"
              rel="noreferrer"
              className={styles.reviewBtn}
            >
              {t("review.btn")}
            </a>
          </div>

          {/* ── CTA ── */}
          <div className={styles.ctaContainer}>
            <Link href="/contact" className={styles.ctaButton}>
              {t("cta")}
              <ArrowRightIcon className={styles.ctaArrow} />
            </Link>
            <p className={styles.ctaSubtext}>{t("ctaSubtext")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
