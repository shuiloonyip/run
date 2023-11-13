import { useState } from "react";
import Card from "../../ui/Card/Card";
import { HHMMSSToSec } from "../../utils/time";
import styles from "./RunForm.module.css";

function RunForm({ onAddRun, onCloseForm }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [distance, setDistance] = useState("0");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  function handleDistanceChange(event) {
    setDistance(event.target.value);
  }

  function handleHoursChange(event) {
    setHours(event.target.value);
  }

  function handleMinutesChange(event) {
    setMinutes(event.target.value);
  }

  function handleSecondsChange(event) {
    setSeconds(event.target.value);
  }

  function handleCloseForm() {
    onCloseForm();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const totalSeconds = HHMMSSToSec(hours, minutes, seconds);

    onAddRun({
      id: crypto.randomUUID(),
      date: new Date(date),
      distance: Number(distance),
      seconds: totalSeconds,
    });

    onCloseForm();
  }

  return (
    <Card bg="purple">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Add run</h2>
        <div>
          <label>Date</label>
          <input
            type="date"
            onChange={handleDateChange}
            value={date}
            required
          />
        </div>
        <div>
          <label>Distance</label>
          <input
            type="number"
            onChange={handleDistanceChange}
            value={distance}
            required
          />
        </div>
        <div className={styles.time}>
          <div>
            <label>Hours</label>
            <input
              type="number"
              onChange={handleHoursChange}
              value={hours}
              step={1}
              min={0}
              max={24}
              required
            />
          </div>
          <div>
            <label>Minutes</label>
            <input
              type="number"
              onChange={handleMinutesChange}
              value={minutes}
              step={1}
              min={0}
              max={59}
              required
            />
          </div>
          <div>
            <label>Seconds</label>
            <input
              type="number"
              onChange={handleSecondsChange}
              value={seconds}
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
