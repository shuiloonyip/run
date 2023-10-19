import styles from "./RadioButton.module.css";

function RadioButton({ value, label, name, checked, onChange }) {
  return (
    <>
      <input
        className={styles.radioInput}
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        type="radio"
      />
      <label className={styles.radioLabel} htmlFor={value}>
        {label}
      </label>
    </>
  );
}

export default RadioButton;
