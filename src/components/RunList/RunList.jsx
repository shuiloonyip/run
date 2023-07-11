import RunItem from "../RunItem/RunItem";

function RunList({ runData }) {
  return (
    <div>
      {runData.map((item) => (
        <RunItem
          key={item.id}
          id={item.id}
          date={item.date.toString()}
          distance={item.distance}
          time={item.time}
          type={item.type}
        />
      ))}
    </div>
  );
}

export default RunList;
