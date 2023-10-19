import { useState } from "react";
import Card from "../../ui/Card/Card";
import Stat from "../Stat/Stat";
import RadioButtonGroup from "../../ui/RadioButtonGroup/RadioButtonGroup";
import RadioButton from "../../ui/RadioButton/RadioButton";
import { calcPace, secToHHMMSS } from "../../utils/time";
import styles from "./RunOverview.module.css";

function RunOverview({ runs }) {
  const initialPeriod = "week";
  const [period, setPeriod] = useState(initialPeriod);

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

  function handlePeriodChange(str) {
    setPeriod(str);
  }

  return (
    <>
      <div className={styles.header}>
        <h1>Activity</h1>
        <button>+</button>
      </div>
      <Card>
        <RadioButtonGroup
          name="period"
          defaultValue={initialPeriod}
          onChange={handlePeriodChange}
          className={styles.periodButton}
        >
          <RadioButton value="week" label="Week" />
          <RadioButton value="month" label="Month" />
          <RadioButton value="year" label="Year" />
          <RadioButton value="all" label="All" />
        </RadioButtonGroup>

        <div className={styles.miles}>
          <div className={styles.period}>{period}</div>
          <div className={styles.number}>{totalMiles}</div>
          <div className={styles.label}>Miles</div>
        </div>
        <div className={styles.stat}>
          <Stat stat={totalRuns} label="Runs"></Stat>
          <Stat stat={pace} label="Pace"></Stat>
          <Stat stat={totalTime} label="Time"></Stat>
        </div>
      </Card>
    </>
  );
}
export default RunOverview;
