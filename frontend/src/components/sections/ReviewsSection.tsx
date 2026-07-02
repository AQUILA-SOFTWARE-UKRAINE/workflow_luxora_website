import { getTranslations } from "next-intl/server";
import ReviewsCarousel from "@/components/reviews-carousel";
import Kicker from "@/components/ui/Kicker";
import { REVIEWS } from "@/data/home";
import styles from "./ReviewsSection.module.css";

export default async function ReviewsSection() {
  const t = await getTranslations("reviews");
  const items = t.raw("items") as { text: string }[];

  const reviews = REVIEWS.map((r, i) => ({
    ...r,
    text: items[i]?.text ?? "",
  }));

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.header}>
        <Kicker>{t("kicker")}</Kicker>
        <h2 className={styles.heading}>
          <span className={styles.navy}>{t("heading1")} </span>
          <span className={styles.accent}>{t("headingAccent")}</span>
          <span className={styles.navy}> {t("heading2")}</span>
        </h2>
        <p className={styles.subtext}>{t("subtext")}</p>
      </div>
      <div className={styles.carouselWrapper}>
        <ReviewsCarousel reviews={reviews} />
      </div>
    </section>
  );
}
