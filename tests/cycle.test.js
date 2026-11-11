import test from "node:test";
import assert from "node:assert/strict";

import {
  addDays,
  cycleSummary,
  dateKey,
  monthCells,
  parseLocalDate
} from "../src/lib/cycle.js";

// 1. Valid leap-year date
test("parseLocalDate accepts valid leap dates", () => {
  const result = parseLocalDate("2024-02-29");

  assert.ok(result instanceof Date);
  assert.equal(dateKey(result), "2024-02-29");
});

// 2. Invalid dates
test("parseLocalDate rejects invalid dates", () => {
  assert.equal(parseLocalDate("2023-02-29"), null);
  assert.equal(parseLocalDate("2024-13-01"), null);
  assert.equal(parseLocalDate("not-a-date"), null);
  assert.equal(parseLocalDate(""), null);
});

// 3. Date formatting
test("dateKey formats dates correctly", () => {
  assert.equal(
    dateKey(new Date(2024, 1, 9)),
    "2024-02-09"
  );
});

// 4. Add days across leap date
test("addDays handles leap-year boundaries", () => {
  assert.equal(
    dateKey(addDays(new Date(2024, 1, 28), 1)),
    "2024-02-29"
  );

  assert.equal(
    dateKey(addDays(new Date(2024, 1, 29), 1)),
    "2024-03-01"
  );
});

// 5. Initial cycle calculation
test("cycleSummary calculates the initial cycle", () => {
  const result = cycleSummary(
    "2024-01-01",
    28,
    5,
    new Date(2024, 0, 1)
  );

  assert.equal(result.day, 1);
  assert.equal(result.nextDate, "2024-01-29");
  assert.equal(result.daysUntil, 28);
  assert.equal(result.inPeriod, true);
});

// 6. Exact cycle boundary
test("cycleSummary handles exact cycle boundary", () => {
  const result = cycleSummary(
    "2024-01-01",
    28,
    5,
    new Date(2024, 0, 29)
  );

  assert.equal(result.day, 1);
  assert.equal(result.nextDate, "2024-01-29");
  assert.equal(result.daysUntil, 0);
  assert.equal(result.inPeriod, true);
});

// 7. Day after cycle boundary
test("cycleSummary advances after a cycle boundary", () => {
  const result = cycleSummary(
    "2024-01-01",
    28,
    5,
    new Date(2024, 0, 30)
  );

  assert.equal(result.day, 2);
  assert.equal(result.daysUntil, 27);
  assert.equal(result.nextDate, "2024-02-26");
});

// 8. Reject invalid cycle information
test("cycleSummary rejects invalid inputs", () => {
  const today = new Date(2024, 0, 1);

  assert.equal(
    cycleSummary("2024-01-02", 28, 5, today),
    null
  );

  assert.equal(
    cycleSummary("invalid", 28, 5, today),
    null
  );

  assert.equal(
    cycleSummary("2024-01-01", 10, 5, today),
    null
  );

  assert.equal(
    cycleSummary("2024-01-01", 28, 0, today),
    null
  );
});

// 9. Calendar generation
test("monthCells creates leap February correctly", () => {
  const cells = monthCells(2024, 1);

  assert.equal(cells.length, 33);

  assert.equal(
    cells.filter(date => date instanceof Date).length,
    29
  );

  assert.deepEqual(
    cells.slice(0, 4),
    [null, null, null, null]
  );

  assert.equal(
    monthCells(2024, 12).length,
    0
  );
});
