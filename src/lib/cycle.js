// CycleCare — Date and Cycle Utilities

/**
 * Parse a YYYY-MM-DD date as a local calendar date.
 * Returns null if the input is invalid.
 */
export function parseLocalDate(value) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (year < 1000 || year > 9999) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  // Reject impossible dates instead of normalizing them.
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  date.setHours(0, 0, 0, 0);

  return date;
}

/**
 * Format a valid Date as YYYY-MM-DD using local date fields.
 */
export function dateKey(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("A valid Date object is required.");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Return a new Date shifted by a whole number of calendar days.
 */
export function addDays(date, days) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("A valid Date object is required.");
  }

  if (!Number.isInteger(days)) {
    throw new TypeError("Days must be an integer.");
  }

  const next = new Date(date);
  next.setDate(next.getDate() + days);

  return next;
}

/**
 * Calculate an approximate cycle summary.
 *
 * referenceDate is optional and useful for deterministic tests.
 * Estimates are informational and must not be used for diagnosis
 * or contraception.
 */
export function cycleSummary(
  lastPeriod,
  cycleLength = 28,
  periodLength = 5,
  referenceDate = new Date()
) {
  const start = parseLocalDate(lastPeriod);

  const cycle = Number(cycleLength);
  const period = Number(periodLength);

  if (!start) return null;

  if (
    !Number.isInteger(cycle) ||
    cycle < 15 ||
    cycle > 45
  ) {
    return null;
  }

  if (
    !Number.isInteger(period) ||
    period < 1 ||
    period > 10
  ) {
    return null;
  }

  if (
    !(referenceDate instanceof Date) ||
    Number.isNaN(referenceDate.getTime())
  ) {
    return null;
  }

  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  // Convert calendar dates to UTC day numbers.
  // This avoids daylight-saving time affecting day calculations.
  const toDayNumber = (date) =>
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ) / 86400000;

  const elapsedDays = toDayNumber(today) - toDayNumber(start);

  // A future last-period date is invalid.
  if (elapsedDays < 0) return null;

  const cycleDay = (elapsedDays % cycle) + 1;
  const daysSinceCycleStart = elapsedDays % cycle;

  // Find the next estimated cycle start, including older cycles.
  const daysUntilNext = cycle - daysSinceCycleStart;

  const completedCycles = Math.floor(elapsedDays / cycle);

  const nextDate = addDays(
    start,
    (completedCycles + 1) * cycle
  );

  return {
    day: cycleDay,
    nextDate: dateKey(nextDate),
    inPeriod: cycleDay <= period,
    daysUntil: daysUntilNext
  };
}

/**
 * Generate calendar cells for a month.
 * Sunday is the first day of the week.
 * Month is zero-based (January = 0).
 */
export function monthCells(year, month) {
  if (
    !Number.isInteger(year) ||
    year < 1000 ||
    year > 9999 ||
    !Number.isInteger(month) ||
    month < 0 ||
    month > 11
  ) {
    return [];
  }

  const firstDay = new Date(year, month, 1);

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const leadingBlanks = firstDay.getDay();

  return [
    ...Array(leadingBlanks).fill(null),

    ...Array.from(
      { length: daysInMonth },
      (_, index) =>
        new Date(year, month, index + 1)
    )
  ];
}
