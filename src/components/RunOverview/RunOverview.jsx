import { useState } from "react";
import Stat from "../Stat/Stat";
import Chart from "../Chart/Chart";
import Card from "../../ui/Card/Card";
import RadioButtonGroup from "../../ui/RadioButtonGroup/RadioButtonGroup";
import RadioButton from "../../ui/RadioButton/RadioButton";
import { calcPace, secToHHMMSS } from "../../utils/time";
import {
  isSameDate,
  isSameMonth,
  getMonthEndDate,
  getPeriodStart,
  getPeriodEnd,
} from "../../utils/date";
import styles from "./RunOverview.module.css";

function RunOverview({ runs }) {
  const initialPeriod = "week";
  const periodLabel = {
    week: "This week",
    month: "This month",
    year: "This year",
  };

  const [period, setPeriod] = useState(initialPeriod);

  function filterRun(runs, period) {
    const start = getPeriodStart(period);
    const end = getPeriodEnd(period);

    return runs.filter((run) => start <= run.date && run.date < end);
  }

  function getDatapointLabel(period) {
    if (period === "week") {
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    } else if (period === "month") {
      const month = [];
      const days = getMonthEndDate(new Date());
      for (let i = 0; i < days; i++) {
        month.push((i + 1).toString());
      }
      return month;
    } else if (period === "year") {
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    }
  }

  function mapRunsToBarData(runs, period) {
    const startDate = getPeriodStart(period);
    const datapoints = getDatapointLabel(period);
    let filterRuns;

    const barData = datapoints.map((datapoint, i) => {
      if (period === "week" || period === "month") {
        const start = new Date(startDate);
        const date = new Date(start.setDate(start.getDate() + i));
        filterRuns = runs.filter((run) => isSameDate(run.date, date));
      } else if (period === "year") {
        const start = new Date(startDate);
        const date = new Date(start.setMonth(start.getMonth() + i));
        filterRuns = runs.filter((run) => isSameMonth(run.date, date));
      }

      const value = filterRuns.reduce((acc, curr) => acc + curr.distance, 0);

      return {
        label: datapoint,
        y: value,
      };
    });

    return barData;
  }

  const filteredRun = filterRun(runs, period);

  const totalMiles = filteredRun.reduce((acc, curr) => acc + curr.distance, 0);
  const totalSec = filteredRun.reduce((acc, curr) => acc + curr.seconds, 0);
  const totalMilesRound = +totalMiles.toFixed(1); // .toFixed() returns string, + changes string to number
  const totalRuns = filteredRun.length;
  const avgPace = calcPace(totalSec, totalMiles);
  const totalTime = secToHHMMSS(totalSec);

  const data = mapRunsToBarData(filteredRun, period);

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
        <Chart data={data} />
      </Card>
    </>
  );
}
export default RunOverview;
