import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Kicker from "@/components/ui/Kicker";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICE_CARD_ASSETS } from "@/data/home";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./ServicesSection.module.css";

export default async function ServicesSection() {
  const t = await getTranslations("services");

  const cards = SERVICE_CARD_ASSETS.map((asset) => ({
    id: asset.id,
    img: asset.img,
    price: asset.price,
    name: t(`cards.${asset.id}.name`),
    bullets: t.raw(`cards.${asset.id}.bullets`) as string[],
    footnote: asset.hasFootnote ? t(`cards.${asset.id}.footnote`) : undefined,
    priceLabel: t("priceLabel"),
  }));

  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Kicker>{t("kicker")}</Kicker>
          <h2 className={styles.heading}>
            <span className={styles.accent}>{t("heading1")}</span>
            <span className={styles.navy}>{t("heading2")}</span>
          </h2>
          <p className={styles.subtext}>{t("subtext")}</p>
        </div>

        <div className={styles.cardGrid}>
          {cards.map((c) => (
            <div key={c.id} className={styles.cardWrapper}>
              <ServiceCard {...c} />
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footnoteText}>
            <span className={styles.footnoteAccent}>*</span>
            {" "}{t("footnoteText")}
          </p>
          <Link href="/contact" className={styles.cta}>
            {t("cta")}
            <ArrowRightIcon className={styles.ctaArrow} />
          </Link>
        </div>
      </div>
    </section>
  );
}
