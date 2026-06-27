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

          <div className={styles.discountGroup}>
            <div className={styles.discountRow}>
              <div className={styles.discountCardFeatured}>
                <div className={styles.discountCardBody}>
                  <p className={styles.discountTitleLight}>{t("newClient.title")}</p>
                  <p className={styles.discountDescLight}>{t("newClient.desc")}</p>
                </div>
                <span className={styles.badge}>−20%</span>
              </div>
              <div className={styles.discountCard}>
                <div className={styles.discountCardBody}>
                  <p className={styles.discountTitle}>{t("twoServices.title")}</p>
                  <p className={styles.discountDesc}>{t("twoServices.desc")}</p>
                </div>
                <span className={styles.badge}>−30%</span>
              </div>
              <div className={styles.discountCard}>
                <div className={styles.discountCardBody}>
                  <p className={styles.discountTitle}>{t("threeServices.title")}</p>
                  <p className={styles.discountDesc}>{t("threeServices.desc")}</p>
                </div>
                <span className={styles.badge}>−50%</span>
              </div>
            </div>
            <p className={styles.discountFootnote}>{t("discountFootnote")}</p>
          </div>

          <div className={styles.bottomSection}>
            <div className={styles.referralGroup}>
              <div className={styles.referralRow}>
                <span className={styles.referralBadge}>−20%</span>
                <div className={styles.referralBody}>
                  <p className={styles.referralTitle}>
                    <span className={styles.referralTitleAccent}>{t("referral.title1")} </span>
                    <span className={styles.referralTitleNavy}>{t("referral.title2")}</span>
                  </p>
                  <p className={styles.referralDesc}>{t("referral.desc")}</p>
                </div>
                <button className={styles.referralBtn}>{t("referral.btn")}</button>
              </div>
              <div className={styles.referralRow}>
                <span className={styles.referralBadge}>−10%</span>
                <div className={styles.referralBody}>
                  <p className={styles.referralTitle}>
                    <span className={styles.referralTitleAccent}>{t("review.title1")} </span>
                    <span className={styles.referralTitleNavy}>{t("review.title2")}</span>
                  </p>
                  <p className={styles.referralDesc}>{t("review.desc")}</p>
                </div>
                <button className={styles.referralBtn}>{t("review.btn")}</button>
              </div>
            </div>

            <div className={styles.ctaContainer}>
              <Link href="/contact" className={styles.ctaButton}>
                {t("cta")}
                <ArrowRightIcon className={styles.ctaArrow} />
              </Link>
              <p className={styles.ctaSubtext}>{t("ctaSubtext")}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
