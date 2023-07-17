import { useState } from "react";
import RunList from "../RunList/RunList";
import RunForm from "../RunForm/RunForm";
import styles from "./Run.module.css";

const DUMMYDATA = [
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-10"),
    distance: 3,
    time: { hours: 0, minutes: 30, seconds: 0 },
    title: "Base run",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-12"),
    distance: 6,
    time: { hours: 1, minutes: 0, seconds: 0 },
    title: "Long run",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-14"),
    distance: 4,
    time: { hours: 0, minutes: 20, seconds: 10 },
    title: "Tempo run",
  },
];

function Run() {
  const [runs, setRuns] = useState(DUMMYDATA);

  function handleAddRun(run) {
    setRuns((prevState) => [...prevState, run]);
  }

  return (
    <div>
      <RunForm onAddRun={handleAddRun} />
      <RunList runs={runs} />
    </div>
  );
}

export default Run;
