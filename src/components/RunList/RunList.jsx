import RunItem from "../RunItem/RunItem";
import styles from "./RunList.module.css";

function RunList({ runData }) {
  return (
    <div>
      {runData.map((item) => (
        <RunItem
          key={item.id}
          id={item.id}
          date={item.date.toLocaleDateString()}
          distance={item.distance}
          time={item.time}
          type={item.type}
        />
      ))}
    </div>
  );
}

export default RunList;
