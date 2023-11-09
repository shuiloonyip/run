export function isSameDate(dateOne, dateTwo) {
  return (
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth() &&
    dateOne.getDate() === dateTwo.getDate()
  );
}

export function isSameMonth(dateOne, dateTwo) {
  return (
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth()
  );
}

export function getMonthEndDate(date) {
  const d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return d.getDate();
}

export function getPeriodStart(period) {
  const todayDateStr = new Date().toISOString().split("T")[0];
  const curr = new Date(todayDateStr);

  let start;

  if (period === "week") {
    start = new Date(
      curr.setDate(
        curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1)
      )
    );
  } else if (period === "month") {
    start = new Date(curr.getFullYear(), curr.getMonth(), 1);
  } else if (period === "year") {
    start = new Date(curr.getFullYear(), 0, 1);
  }

  return start;
}

export function getPeriodEnd(period) {
  const todayDateStr = new Date().toISOString().split("T")[0];
  const curr = new Date(todayDateStr);

  let end;

  if (period === "week") {
    end = new Date(
      curr.setDate(
        curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? 1 : 8)
      )
    );
  } else if (period === "month") {
    end = new Date(curr.getFullYear(), curr.getMonth() + 1, 1);
  } else if (period === "year") {
    end = new Date(curr.getFullYear() + 1, 0, 1);
  }

  return end;
}
