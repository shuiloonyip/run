import styles from "./Card.module.css";

function Card({ children, bg = "white" }) {
  return <div className={styles.card + " " + styles[bg]}>{children}</div>;
}

export default Card;
