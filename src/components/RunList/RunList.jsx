import RunItem from "../RunItem/RunItem";
import styles from "./RunList.module.css";

function RunList({ runs }) {
  return (
    <div>
      {runs.map((item) => (
        <RunItem
          key={item.id}
          id={item.id}
          date={item.date.toLocaleDateString()}
          distance={item.distance}
          time={item.time}
        />
      ))}
    </div>
  );
}

export default RunList;
