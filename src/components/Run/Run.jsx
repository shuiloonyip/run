import RunList from "../RunList/RunList";

const DUMMYDATA = [
  {
    id: crypto.randomUUID(),
    date: new Date(),
    distance: 5,
    time: 30,
    type: "long",
  },
  {
    id: crypto.randomUUID(),
    date: new Date(),
    distance: 5,
    time: 30,
    type: "long",
  },
  {
    id: crypto.randomUUID(),
    date: new Date(),
    distance: 5,
    time: 30,
    type: "long",
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
