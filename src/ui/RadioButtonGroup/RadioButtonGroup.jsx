import React, { useState } from "react";
import styles from "./RadioButtonGroup.module.css";

function RadioButtonGroup({
  name,
  defaultValue,
  onChange,
  children,
  className,
}) {
  const [value, setValue] = useState(defaultValue);

  function handleChange(event) {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  return (
    <div className={[styles.radioGroup, className].join(" ")}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          checked: value === child.props.value,
          name: name,
          onChange: handleChange,
        });
      })}
    </div>
  );
}

export default RadioButtonGroup;
