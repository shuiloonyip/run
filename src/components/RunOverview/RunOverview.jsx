import { useState } from "react";
import Stat from "../Stat/Stat";
import Chart from "../Chart/Chart";
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

  function getPeriodStart(period) {
    const todayDateStr = new Date().toISOString().split("T")[0];
    const curr = new Date(todayDateStr);

    let start;

    if (period === "week") {
      start = new Date(
        curr.setDate(
          curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1)
        )
      );
    } else if (period === "month") {
      start = new Date(curr.getFullYear(), curr.getMonth(), 1);
    } else if (period === "year") {
      start = new Date(curr.getFullYear(), 0, 1);
    }

    return start;
  }

  function getPeriodEnd(period) {
    const todayDateStr = new Date().toISOString().split("T")[0];
    const curr = new Date(todayDateStr);

    let end;

    if (period === "week") {
      end = new Date(
        curr.setDate(
          curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? 1 : 8)
        )
      );
    } else if (period === "month") {
      end = new Date(curr.getFullYear(), curr.getMonth() + 1, 1);
    } else if (period === "year") {
      end = new Date(curr.getFullYear() + 1, 0, 1);
    }

    return end;
  }

  function filterRun(runs, period) {
    const start = getPeriodStart(period);
    const end = getPeriodEnd(period);

    return runs.filter((run) => start <= run.date && run.date < end);
  }

  const filteredRun = filterRun(runs, period);

  const totalMiles = filteredRun.reduce((acc, curr) => acc + curr.distance, 0);
  const totalSec = filteredRun.reduce((acc, curr) => acc + curr.seconds, 0);

  // .toFixed() returns string, + changes string to number
  const totalMilesRound = +totalMiles.toFixed(1);
  const totalRuns = filteredRun.length;
  const avgPace = calcPace(totalSec, totalMiles);
  const totalTime = secToHHMMSS(totalSec);

  const data = mapRunsToBarData(filteredRun, period);

  function isSameDate(dateOne, dateTwo) {
    return (
      dateOne.getFullYear() === dateTwo.getFullYear() &&
      dateOne.getMonth() === dateTwo.getMonth() &&
      dateOne.getDate() === dateTwo.getDate()
    );
  }

  function isSameMonth(dateOne, dateTwo) {
    return (
      dateOne.getFullYear() === dateTwo.getFullYear() &&
      dateOne.getMonth() === dateTwo.getMonth()
    );
  }

  function getMonthEndDate(date) {
    const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return d.getDate();
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
        <Chart data={data} />
      </Card>
    </>
  );
}
export default RunOverview;
