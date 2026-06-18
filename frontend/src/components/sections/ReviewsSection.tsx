import ReviewsCarousel from "@/components/reviews-carousel";
import Kicker from "@/components/ui/Kicker";
import styles from "./ReviewsSection.module.css";

export default function ReviewsSection() {
  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.header}>
        <Kicker>CLIENT REVIEWS</Kicker>
        <h2 className={styles.heading}>
          <span className={styles.navy}>What Our </span>
          <span className={styles.accent}>Clients</span>
          <span className={styles.navy}> Say</span>
        </h2>
        <p className={styles.subtext}>Real feedback from real people across Berlin and surrounding areas</p>
      </div>
      <div className={styles.carouselWrapper}>
        <ReviewsCarousel />
      </div>
    </section>
  );
}
