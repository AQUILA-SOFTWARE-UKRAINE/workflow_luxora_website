import Link from "next/link";
import Kicker from "@/components/ui/Kicker";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICE_CARDS } from "@/data/home";
import styles from "./ServicesSection.module.css";

export default function ServicesSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Kicker>OUR SERVICES</Kicker>
          <h2 className={styles.heading}>
            <span className={styles.accent}>Easy Booking.</span>
            <span className={styles.navy}>Spotless Results</span>
          </h2>
          <p className={styles.subtext}>
            Fill the form → We call you within 10 min → You get a fixed price
          </p>
        </div>

        {/* Універсальний flex-контейнер для всіх карток */}
        <div className={styles.cardGrid}>
          {SERVICE_CARDS.map((c) => (
            <div key={c.name} className={styles.cardWrapper}>
              <ServiceCard {...c} />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footnoteText}>
            <span className={styles.footnoteAccent}>*</span>
            {" "}Final price depends on size and condition. VAT Includes: travel, cleaning products, all equipment
          </p>
          <Link href="/contact" className={styles.cta}>
            Request a Free Estimate
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}