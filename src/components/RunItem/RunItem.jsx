function RunItem({ date, distance, time, type }) {
  return (
    <div>
      <div>{date}</div>
      <div>{distance}</div>
      <div>{time}</div>
      <div>{type}</div>
    </div>
  );
}

export default RunItem;
