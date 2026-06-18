"use client";

import { useState } from "react";
import styles from "./FaqItem.module.css";

type Props = { q: string; a: string; defaultOpen?: boolean };

export default function FaqItem({ q, a, defaultOpen = false }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.wrapperOpen : ""}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
      >
        <span className={styles.question}>{q}</span>
        <span className={styles.iconWrap}>
          <svg
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ""}`}>
        <div className={styles.bodyInner}>
          <p className={styles.answer}>{a}</p>
        </div>
      </div>
    </div>
  );
}
