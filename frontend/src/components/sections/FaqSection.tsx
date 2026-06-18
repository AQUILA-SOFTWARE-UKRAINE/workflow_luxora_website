import FaqItem from "@/components/ui/FaqItem";
import { FAQ_DATA } from "@/data/home";
import styles from "./FaqSection.module.css";

export default function FaqSection() {
  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.kicker}>FAQ</p>
          <h2 className={styles.heading}>
            <span className={styles.navy}>Got </span>
            <span className={styles.accent}>Questions?</span>
            <span className={styles.navy}><br />We Have Answers</span>
          </h2>
          <p className={styles.subtext}>
            Can&apos;t find your answer here? Write to us. We reply within 10 minutes
          </p>
        </div>
        <div className={styles.list}>
          {FAQ_DATA.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
