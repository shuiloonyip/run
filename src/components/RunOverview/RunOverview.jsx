import { useState } from "react";
import Stat from "../Stat/Stat";
import Card from "../../ui/Card/Card";
import RadioButtonGroup from "../../ui/RadioButtonGroup/RadioButtonGroup";
import RadioButton from "../../ui/RadioButton/RadioButton";
import { calcPace, secToHHMMSS } from "../../utils/time";
import styles from "./RunOverview.module.css";

function RunOverview({ runs }) {
  const initialPeriod = "week";
  const periodLabel = {
    week: "This week",
    month: "This month",
    year: "This year",
    all: "All time",
  };

  const [period, setPeriod] = useState(initialPeriod);

  function filterRun(runs, period) {
    const todayDateStr = new Date().toISOString().split("T")[0];
    const curr = new Date(todayDateStr);

    let start;
    let end;

    if (period === "week") {
      start = new Date(
        curr.setDate(
          curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1)
        )
      );
      end = new Date(
        curr.setDate(
          curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? 0 : 7)
        )
      );
    } else if (period === "month") {
      start = new Date(curr.getFullYear(), curr.getMonth(), 1);
      end = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
    } else if (period === "year") {
      start = new Date(curr.getFullYear(), 0, 1);
      end = new Date(curr.getFullYear(), 11, 31);
    } else if (period === "all") {
      return runs;
    }

    return runs.filter((run) => start <= run.date && run.date <= end);
  }

  const filteredRun = filterRun(runs, period);

  const totalMiles = filteredRun.reduce((acc, curr) => acc + curr.distance, 0);
  const totalSec = filteredRun.reduce((acc, curr) => acc + curr.seconds, 0);

  // .toFixed() returns string, + changes string to number
  const totalMilesRound = +totalMiles.toFixed(1);
  const totalRuns = filteredRun.length;
  const avgPace = calcPace(totalSec, totalMiles);
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
          <div className={styles.period}>{periodLabel[period]}</div>
          <div className={styles.number}>{totalMilesRound}</div>
          <div className={styles.label}>Miles</div>
        </div>
        <div className={styles.stat}>
          <Stat stat={totalRuns} label="Runs"></Stat>
          <Stat stat={avgPace} label="Pace"></Stat>
          <Stat stat={totalTime} label="Time"></Stat>
        </div>
      </Card>
    </>
  );
}
export default RunOverview;
