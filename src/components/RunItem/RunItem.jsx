import Card from "../../ui/Card/Card";
import Stat from "../Stat/Stat";
import styles from "./RunItem.module.css";

function RunItem({ date, distance, time }) {
  return (
    <Card>
      <div className={styles.containerTop}>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.containerBottom}>
        <Stat stat={distance} label={"Distance"} />
        <Stat stat={"11\"00'"} label={"Pace"} />
        <Stat
          stat={
            `${time.hours}` +
            "h" +
            `${time.minutes}` +
            "m" +
            `${time.seconds}` +
            "s"
          }
          label={"Time"}
        />
      </div>
    </Card>
  );
}

export default RunItem;
