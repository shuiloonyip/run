export function secToHHMMSS(sec) {
  const _sec = parseInt(sec, 10);
  const hours = Math.floor(_sec / 3600);
  const minutes = Math.floor((_sec % 3600) / 60);
  const seconds = _sec % 60;

  return { hours, minutes, seconds };
}

export function HHMMSSToSec(hour, min, sec) {
  const _hour = parseInt(hour, 10);
  const _min = parseInt(min, 10);
  const _sec = parseInt(sec, 10);
  return _hour * 3600 + _min * 60 + _sec;
}
