import Image from "next/image";
import { Link } from "@/i18n/navigation";
import styles from "./ServiceCard.module.css";

type Props = {
  id: string;
  img: string;
  name: string;
  price: string;
  priceLabel: string;
  bullets: string[];
  footnote?: string;
};

export default function ServiceCard({ id, img, name, price, priceLabel, bullets, footnote }: Props) {
  return (
    <Link href={`/contact?service=${id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image src={img} alt={name} fill className="object-cover" sizes="(max-width: 744px) 100vw, (max-width: 1024px) 50vw, 33vw" />
        <span className={styles.aiLabel}>AI-generated</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>{price}</span>
        </div>
        <div className={styles.divider} />
        <ul className={styles.bullets}>
          {bullets.map((b) => (
            <li key={b} className={styles.bullet}>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none" className={styles.bulletIcon}>
                <path fillRule="evenodd" clipRule="evenodd" d="M10.8293 0.123719C11.0371 0.30556 11.0581 0.621441 10.8763 0.829259L3.87629 8.82926C3.78516 8.9334 3.65495 8.99513 3.51664 8.99973C3.37833 9.00434 3.2443 8.95141 3.14645 8.85356L0.146447 5.85356C-0.0488155 5.6583 -0.0488155 5.34172 0.146447 5.14645C0.341709 4.95119 0.658291 4.95119 0.853553 5.14645L3.47564 7.76855L10.1237 0.170755C10.3056 -0.0370638 10.6214 -0.0581225 10.8293 0.123719Z" fill="#0666C6" />
              </svg>
              {b}
            </li>
          ))}
        </ul>
        {footnote && (
          <div className={styles.footnote}>
            <span className={styles.footnoteAsterisk}>*</span>
            <span className={styles.footnoteText}>{footnote.replace(/^\*\s?/, "")}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
