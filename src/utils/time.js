export function secToHHMMSS(sec) {
  const _sec = parseInt(sec, 10);
  const hours = Math.floor(_sec / 3600);
  const minutes = Math.floor((_sec % 3600) / 60);
  const seconds = _sec % 60;

  return toTimeStr(hours, minutes, seconds);
}

export function HHMMSSToSec(hour, min, sec) {
  const _hour = parseInt(hour, 10);
  const _min = parseInt(min, 10);
  const _sec = parseInt(sec, 10);
  return _hour * 3600 + _min * 60 + _sec;
}

export function calcPace(sec, miles) {
  const _sec = parseInt(sec, 10);
  // .toFixed(2) returns string => "1.50"
  // + changes string to number => 1.5
  const _miles = +parseFloat(miles).toFixed(2);
  const pace = _miles !== 0 ? Math.round(_sec / _miles) : 0;

  const pace_hour = Math.floor(pace / 3600);
  const pace_min = Math.floor((pace % 3600) / 60);
  const pace_sec = pace % 60;

  return toTimeStr(pace_hour, pace_min, pace_sec);
}

// Does not display 00 hour
// 10:10:10 => 10:10:10
// 00:10:10 => 10:10
// 00:00:10 => 00:10
function toTimeStr(hour, min, sec) {
  return [hour, min, sec]
    .map((t) => (t < 10 ? "0" + t : t))
    .filter((t, i) => i > 0 || t !== "00")
    .join(":");
}
