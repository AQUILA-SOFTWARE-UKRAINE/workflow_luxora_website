import { getTranslations } from "next-intl/server";
import FaqItem from "@/components/ui/FaqItem";
import styles from "./FaqSection.module.css";

export default async function FaqSection() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.kicker}>{t("kicker")}</p>
          <h2 className={styles.heading}>
            <span className={styles.navy}>{t("heading1")} </span>
            <span className={styles.accent}>{t("headingAccent")}</span>
            <span className={styles.navy}><br />{t("heading2")}</span>
          </h2>
          <p className={styles.subtext}>{t("subtext")}</p>
        </div>
        <div className={styles.list}>
          {items.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
