import BeforeAfterSlider from "@/components/before-after-slider";
import { BEFORE_AFTER_SLIDES } from "@/data/home";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import styles from "./BeforeAfterSection.module.css";

export default function BeforeAfterSection() {
  return (
    <section id="results" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.kicker}>Before &amp; After</p>
          <h2 className={styles.heading}>
            <span className={styles.accent}>The Results Speak</span>
            <br />
            <span className={styles.navy}>For Themselves</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {BEFORE_AFTER_SLIDES.map((s) => (
            <BeforeAfterSlider key={s.title} {...s} />
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Want to see our work in detail?<br />
            Follow us to see before-and-after cleaning results
          </p>
          <div className={styles.ctaButtons}>
            <a href="#" className={styles.socialBtn}>
              Our Facebook
              <FacebookIcon className={styles.socialIcon} />
            </a>
            <a href="#" className={styles.socialBtn}>
              Our Instagram
              <InstagramIcon className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
