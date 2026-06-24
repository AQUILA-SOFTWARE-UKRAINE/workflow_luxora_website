import styles from "./Kicker.module.css";

export default function Kicker({ children }: { children: React.ReactNode }) {
  return <p className={styles.kicker}>{children}</p>;
}
