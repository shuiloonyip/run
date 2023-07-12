import styles from "./Stat.module.css";

function Stat({ stat, label }) {
  return (
    <div className={styles.stat}>
      <div className={styles.number}>{stat}</div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default Stat;
