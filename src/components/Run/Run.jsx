import { useState } from "react";
import RunOverview from "../RunOverview/RunOverview";
import RunList from "../RunList/RunList";
import RunFormModal from "../RunFormModal/RunFormModal";
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
  const [showForm, setShowForm] = useState(false);

  function handleAddRun(run) {
    setRuns((prevState) => {
      const arr = [...prevState, run];
      arr.sort(function (a, b) {
        return b.date - a.date;
      });
      return arr;
    });
  }

  function handleOpenForm() {
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
  }

  return (
    <div className={styles.container}>
      {showForm === true ? (
        <RunFormModal onAddRun={handleAddRun} onCloseForm={handleCloseForm} />
      ) : null}
      <RunOverview runs={runs} onOpenForm={handleOpenForm} />
      <RunList runs={runs} />
    </div>
  );
}

export default Run;
