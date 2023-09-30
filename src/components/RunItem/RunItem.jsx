import Card from "../../ui/Card/Card";
import Stat from "../Stat/Stat";
import { secToHHMMSS } from "../../utils/time";
import styles from "./RunItem.module.css";

function RunItem({ date, distance, seconds }) {
  const hours = secToHHMMSS(seconds).hours;
  const minutes = secToHHMMSS(seconds).minutes;
  const secs = secToHHMMSS(seconds).seconds;

  return (
    <Card>
      <div className={styles.containerTop}>
        <div className={styles.date}>{date}</div>
      </div>
      <div className={styles.containerBottom}>
        <Stat stat={distance} label={"Distance"} />
        <Stat stat={"11\"00'"} label={"Pace"} />
        <Stat
          stat={`${hours}` + "h" + `${minutes}` + "m" + `${secs}` + "s"}
          label={"Time"}
        />
      </div>
    </Card>
  );
}

export default RunItem;
