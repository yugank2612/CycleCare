export function parseLocalDate(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}
export function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
export function cycleSummary(lastPeriod, cycleLength, periodLength) {
  if (!lastPeriod) return null;
  const start = parseLocalDate(lastPeriod);
  const today = new Date(); today.setHours(0,0,0,0);
  const day = Math.floor((today - start) / 86400000) + 1;
  const next = addDays(start, Number(cycleLength || 28));
  return {
    day,
    nextDate: dateKey(next),
    inPeriod: day > 0 && day <= Number(periodLength || 5),
    daysUntil: Math.ceil((next - today) / 86400000)
  };
}
export function monthCells(year, month) {
  const first = new Date(year, month, 1);
  const count = new Date(year, month + 1, 0).getDate();
  return [...Array(first.getDay()).fill(null), ...Array.from({length: count}, (_, i) => new Date(year, month, i + 1))];
}
