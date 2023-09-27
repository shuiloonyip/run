import { useState } from "react";
import RunOverview from "../RunOverview/RunOverview";
import RunForm from "../RunForm/RunForm";
import RunList from "../RunList/RunList";
import styles from "./Run.module.css";

const DUMMYDATA = [
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-10"),
    distance: 3.1,
    seconds: 1800,
  },
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-12"),
    distance: 6,
    seconds: 3600,
  },
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-14"),
    distance: 4,
    seconds: 1210,
  },
];

function Run() {
  const [runs, setRuns] = useState(DUMMYDATA);

  function handleAddRun(run) {
    setRuns((prevState) => [...prevState, run]);
  }

  return (
    <div className={styles.container}>
      <RunOverview runs={runs} />
      <RunForm onAddRun={handleAddRun} />
      <RunList runs={runs} />
    </div>
  );
}

export default Run;
