import RunList from "../RunList/RunList";
import styles from "./Run.module.css";

const DUMMYDATA = [
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-10"),
    distance: 5,
    time: { hours: 0, minutes: 30, seconds: 0 },
    type: "Base run",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-12"),
    distance: 4,
    time: { hours: 0, minutes: 25, seconds: 0 },
    type: "Tempo run",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-14"),
    distance: 5,
    time: { hours: 0, minutes: 30, seconds: 0 },
    type: "Base run",
  },
  {
    id: crypto.randomUUID(),
    date: new Date("2023-07-16"),
    distance: 10,
    time: { hours: 1, minutes: 0, seconds: 0 },
    type: "Long run",
  },
];

function Run() {
  return (
    <div>
      <RunList runData={DUMMYDATA} />
    </div>
  );
}

export default Run;
