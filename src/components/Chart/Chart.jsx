import styles from "./Chart.module.css";

function Chart({ data }) {
  const max = data.reduce((prev, curr) => (prev.y > curr.y ? prev : curr)).y;

  return (
    <div className={styles.chart}>
      {data.map((data, i) => {
        const heightPercent = Math.round((data.y / max) * 100);
        return (
          <div key={i} className={styles.section}>
            <div className={styles.bar}>
              <div
                className={styles.value}
                style={{ height: `${heightPercent}%` }}
              />
            </div>
            <div className={styles.label}>{data.label}</div>
          </div>
        );
      })}
    </div>
  );
}
export default Chart;
