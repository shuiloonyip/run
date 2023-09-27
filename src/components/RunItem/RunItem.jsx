import Card from "../../ui/Card/Card";
import Stat from "../Stat/Stat";
import styles from "./RunItem.module.css";

function RunItem({ date, distance, seconds }) {
  function toHHMMSS(sec) {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    return { hours, minutes, seconds };
  }

  const hours = toHHMMSS(seconds).hours;
  const minutes = toHHMMSS(seconds).minutes;
  const secs = toHHMMSS(seconds).seconds;

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
