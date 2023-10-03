import Card from "../../ui/Card/Card";
import Stat from "../Stat/Stat";
import { secToHHMMSS, calcPace } from "../../utils/time";
import styles from "./RunItem.module.css";

function RunItem({ date, distance, seconds }) {
  const time = secToHHMMSS(seconds);
  const pace = calcPace(seconds, distance);

  return (
    <Card>
      <div className={styles.containerTop}>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.containerBottom}>
        <Stat stat={distance} label={"Distance"} />
        <Stat stat={pace} label={"Pace"} />
        <Stat stat={time} label={"Time"} />
      </div>
    </Card>
  );
}

export default RunItem;
