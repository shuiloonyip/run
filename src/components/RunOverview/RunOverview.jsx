import Card from "../../ui/Card/Card";
import Stat from "../Stat/Stat";
import { calcPace, secToHHMMSS } from "../../utils/time";
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
  const totalSec = filteredRun.reduce((acc, curr) => acc + curr.seconds, 0);

  const totalRuns = filteredRun.length;
  const pace = calcPace(totalSec, totalMiles);
  const totalTime = secToHHMMSS(totalSec);

  return (
    <div>
      <div className={styles.header}>
        <h1>Activity</h1>
        <button>+</button>
      </div>
      <Card>
        <div className={styles.miles}>
          <div className={styles.period}>This Week</div>
          <div className={styles.number}>{totalMiles}</div>
          <div className={styles.label}>Miles</div>
        </div>
        <div className={styles.stat}>
          <Stat stat={totalRuns} label="Runs"></Stat>
          <Stat stat={pace} label="Pace"></Stat>
          <Stat stat={totalTime} label="Time"></Stat>
        </div>
      </Card>
    </div>
  );
}
export default RunOverview;
