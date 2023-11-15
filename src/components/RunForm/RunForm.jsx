import { useState } from "react";
import Card from "../../ui/Card/Card";
import { HHMMSSToSec } from "../../utils/time";
import styles from "./RunForm.module.css";

function RunForm({ onAddRun, onCloseForm }) {
  const [value, setValue] = useState({
    date: new Date().toISOString().split("T")[0],
    distance: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  function handleChangeValue(e) {
    setValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleCloseForm() {
    onCloseForm();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const totalSeconds = HHMMSSToSec(value.hours, value.minutes, value.seconds);

    onAddRun({
      id: crypto.randomUUID(),
      date: new Date(value.date),
      distance: Number(value.distance),
      seconds: totalSeconds,
    });

    onCloseForm();
  }

  return (
    <Card bg="purple">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Add run</h2>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChangeValue}
            value={value.date}
            required
          />
        </div>
        <div>
          <label htmlFor="distance">Distance</label>
          <input
            type="number"
            id="distance"
            name="distance"
            onChange={handleChangeValue}
            value={value.distance}
            min={0}
            required
          />
        </div>
        <div className={styles.time}>
          <div>
            <label htmlFor="hours">Hours</label>
            <input
              type="number"
              id="hours"
              name="hours"
              onChange={handleChangeValue}
              value={value.hours}
              step={1}
              min={0}
              max={24}
              required
            />
          </div>
          <div>
            <label htmlFor="minutes">Minutes</label>
            <input
              type="number"
              id="minutes"
              name="minutes"
              onChange={handleChangeValue}
              value={value.minutes}
              step={1}
              min={0}
              max={59}
              required
            />
          </div>
          <div>
            <label htmlFor="seconds">Seconds</label>
            <input
              type="number"
              id="seconds"
              name="seconds"
              onChange={handleChangeValue}
              value={value.seconds}
              step={1}
              min={0}
              max={59}
              required
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Add</button>
          <button type="button" onClick={handleCloseForm}>
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}

export default RunForm;
