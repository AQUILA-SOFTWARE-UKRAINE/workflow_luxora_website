import { REWARD_BUBBLES } from "@/data/home";
import styles from "./RewardsSection.module.css";

export default function RewardsSection() {
  return (
    <section id="discounts" className={styles.section}>
      <div className={styles.circle1} />
      <div className={styles.circle2} />
      <div className={styles.circle3} />

      <div className={styles.bubblesLayer}>
        {REWARD_BUBBLES.map((b, i) => (
          <div
            key={i}
            className="bubble-container"
            style={{ left: `${b.left}%`, animation: `floatUp ${b.duration}s linear ${b.delay}s infinite` }}
          >
            <div
              className="bubble"
              style={{ width: `${b.size}px`, height: `${b.size}px`, animation: `wobble ${b.wobble}s ease-in-out infinite alternate` }}
            />
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.titleBlock}>
          <p className={styles.kicker}>Rewards Program</p>
          <h2 className={styles.heading}>
            <span className={styles.accent}>Save More</span>
            <br />
            <span className={styles.navy}>With Every Cleaning</span>
          </h2>
        </div>

        <div className={styles.inner}>

          {/* Discount cards */}
          <div className={styles.discountGroup}>
            <div className={styles.discountRow}>
              <div className={styles.discountCardFeatured}>
                <div className={styles.discountCardBody}>
                  <p className={styles.discountTitleLight}>New Client</p>
                  <p className={styles.discountDescLight}>
                    First time booking with us? Your first booking is 20% off. Applies to any service, taken off before you pay
                  </p>
                </div>
                <span className={styles.badge}>−20%</span>
              </div>
              <div className={styles.discountCard}>
                <div className={styles.discountCardBody}>
                  <p className={styles.discountTitle}>2 Services at Once</p>
                  <p className={styles.discountDesc}>
                    Book 2 services during the same visit and receive 30% off your third service during the appointment
                  </p>
                </div>
                <span className={styles.badge}>−30%</span>
              </div>
              <div className={styles.discountCard}>
                <div className={styles.discountCardBody}>
                  <p className={styles.discountTitle}>3 Services at Once</p>
                  <p className={styles.discountDesc}>
                    Book 3 services during the same visit and get 50% off your fourth service appointment
                  </p>
                </div>
                <span className={styles.badge}>−50%</span>
              </div>
            </div>
            <p className={styles.discountFootnote}>Save more when booking multiple services in one visit</p>
          </div>

          {/* Referral rows */}
          <div className={styles.referralGroup}>
            <div className={styles.referralRow}>
              <span className={styles.referralBadge}>−20%</span>
              <div className={styles.referralBody}>
                <p className={styles.referralTitle}>
                  <span className={styles.referralTitleAccent}>Invite Friends </span>
                  <span className={styles.referralTitleNavy}>&amp; Earn Rewards</span>
                </p>
                <p className={styles.referralDesc}>
                  Know someone whose home could use a good clean? Send them our way. You get 15% off your next booking. They get 20% off their first.
                </p>
              </div>
              <button className={styles.referralBtn}>Share With a Friend</button>
            </div>
            <div className={styles.referralRow}>
              <span className={styles.referralBadge}>−10%</span>
              <div className={styles.referralBody}>
                <p className={styles.referralTitle}>
                  <span className={styles.referralTitleAccent}>Leave a Review </span>
                  <span className={styles.referralTitleNavy}>&amp; Get Discount</span>
                </p>
                <p className={styles.referralDesc}>
                  Loved your cleaning? Leave a quick review on Google or Instagram and receive 10% off your next service.
                </p>
              </div>
              <button className={styles.referralBtn}>Leave a Review</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
