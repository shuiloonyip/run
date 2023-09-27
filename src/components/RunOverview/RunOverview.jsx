import Card from "../../ui/Card/Card";
import styles from "./RunOverview.module.css";

function RunOverview({ runs }) {
  const filteredRun = runs.filter((run) => {
    const todayDateStr = new Date().toISOString().split("T")[0];
    const start = new Date(todayDateStr);
    start.setDate(start.getDate() - 7);
    const end = new Date(todayDateStr);
    const date = run.date;
    return start < date && date <= end;
  });

  const totalMiles = filteredRun.reduce((acc, curr) => acc + curr.distance, 0);

  return (
    <div>
      <div className={styles.header}>
        <h1>Activity</h1>
        <button>+</button>
      </div>
      <Card>
        <div>
          <div className={styles.timeperiod}>This Week</div>
          <div className={styles.miles}>{totalMiles}</div>
          <div className={styles.label}>Miles</div>
        </div>
      </Card>
    </div>
  );
}
export default RunOverview;
