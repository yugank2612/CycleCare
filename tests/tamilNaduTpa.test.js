
import test from "node:test";
import assert from "node:assert/strict";

import {
  TAMIL_NADU_TPA_METADATA,
  TAMIL_NADU_TPA_RECORDS,
  TAMIL_NADU_FACILITY_GROUPS,
  searchTamilNaduTpaFacilities,
  getTamilNaduTpaRecordByEntityCode,
  getTamilNaduTpaReviewQueue,
  getTamilNaduTpaDistrictSummary,
  getTamilNaduTpaStatistics
} from "../src/data/tamilNaduTpaDirectory.js";

const EXPECTED_RECORDS = 2157;
const EXPECTED_DISTRICTS = 38;


// ============================================================
// 1. DATASET INTEGRITY
// ============================================================

test("TPA snapshot contains expected source record count", () => {
  assert.equal(TAMIL_NADU_TPA_RECORDS.length, EXPECTED_RECORDS);
  assert.equal(TAMIL_NADU_TPA_METADATA.recordCount, EXPECTED_RECORDS);
});

test("all 38 districts are represented", () => {
  const districts = new Set(
    TAMIL_NADU_TPA_RECORDS.map(record => record.district)
  );

  assert.equal(districts.size, EXPECTED_DISTRICTS);
  assert.equal(
    TAMIL_NADU_TPA_METADATA.districtCount,
    EXPECTED_DISTRICTS
  );
});

test("record IDs are unique", () => {
  const ids = TAMIL_NADU_TPA_RECORDS.map(record => record.id);

  assert.equal(new Set(ids).size, ids.length);
});

test("source entity codes are unique", () => {
  const codes = TAMIL_NADU_TPA_RECORDS.map(
    record => record.entityCode
  );

  assert.equal(new Set(codes).size, codes.length);

  assert.equal(
    TAMIL_NADU_TPA_METADATA.uniqueEntityCodes,
    EXPECTED_RECORDS
  );
});

test("every record has essential fields", () => {
  for (const record of TAMIL_NADU_TPA_RECORDS) {
    assert.ok(record.id);
    assert.ok(record.entityCode);
    assert.ok(record.name);
    assert.ok(record.district);
    assert.ok(record.sourceId);

    assert.ok(Array.isArray(record.listedSpecialties));
    assert.ok(Array.isArray(record.reviewFlags));
  }
});

test("current operational status is not falsely verified", () => {
  assert.ok(
    TAMIL_NADU_TPA_RECORDS.every(record =>
      record.sourceListedStatus ===
      "current-operational-status-not-provided"
    )
  );
});


// ============================================================
// 2. OWNERSHIP AND CATEGORY COUNTS
// ============================================================

test("ownership totals match the source snapshot", () => {
  const stats = getTamilNaduTpaStatistics();

  assert.deepEqual(stats.ownership, {
    private: 1210,
    government: 944,
    unknown: 3
  });
});

test("facility type counts match the snapshot", () => {
  const stats = getTamilNaduTpaStatistics();

  assert.equal(stats.facilityTypes.hospital, 1000);
  assert.equal(stats.facilityTypes.uphc, 121);
  assert.equal(stats.facilityTypes.phc, 330);
  assert.equal(stats.facilityTypes.chc, 46);

  assert.equal(
    stats.facilityTypes["diagnostic-centre"],
    151
  );

  assert.equal(
    stats.facilityTypes["sub-district-hospital"],
    266
  );

  assert.equal(
    stats.facilityTypes["district-hospital"],
    38
  );
});

test("directory groups preserve separate categories", () => {
  assert.deepEqual(TAMIL_NADU_FACILITY_GROUPS, [
    "hospital",
    "primary-care",
    "diagnostics",
    "specialized-support",
    "non-hospital-support",
    "review-required"
  ]);
});

test("import candidates and manual review counts match metadata", () => {
  const stats = getTamilNaduTpaStatistics();

  assert.equal(stats.directoryImportCandidates, 2008);
  assert.equal(stats.manualReviewRequired, 149);

  assert.equal(
    TAMIL_NADU_TPA_METADATA.importableWithoutClassificationReview,
    2008
  );

  assert.equal(
    TAMIL_NADU_TPA_METADATA.classificationReviewCount,
    149
  );
});

test("review queue contains only flagged records", () => {
  const queue = getTamilNaduTpaReviewQueue();

  assert.equal(queue.length, 149);

  assert.ok(
    queue.every(record => record.needsManualReview === true)
  );
});


// ============================================================
// 3. DEFAULT SEARCH BEHAVIOUR
// ============================================================

test("default search returns 2,008 import candidates", () => {
  const results = searchTamilNaduTpaFacilities();

  assert.equal(results.length, 2008);

  assert.ok(
    results.every(
      record => record.directoryImportCandidate === true
    )
  );
});

test("default search excludes non-hospital support records", () => {
  const results = searchTamilNaduTpaFacilities();

  assert.ok(
    results.every(
      record => record.directoryGroup !== "non-hospital-support"
    )
  );
});

test("explicit inclusion exposes the complete source snapshot", () => {
  const results = searchTamilNaduTpaFacilities({
    includeReview: true,
    includeNonFacilitySupport: true
  });

  assert.equal(results.length, EXPECTED_RECORDS);
});


// ============================================================
// 4. DISTRICT, OWNERSHIP AND CATEGORY FILTERS
// ============================================================

test("Chennai filter returns Chennai records only", () => {
  const results = searchTamilNaduTpaFacilities({
    district: "Chennai"
  });

  assert.equal(results.length, 161);

  assert.ok(
    results.every(record => record.district === "Chennai")
  );
});

test("private ownership filter works", () => {
  const results = searchTamilNaduTpaFacilities({
    ownership: "private"
  });

  assert.ok(results.length > 0);

  assert.ok(
    results.every(record => record.ownership === "private")
  );
});

test("government ownership filter works", () => {
  const results = searchTamilNaduTpaFacilities({
    ownership: "government"
  });

  assert.ok(results.length > 0);

  assert.ok(
    results.every(record => record.ownership === "government")
  );
});

test("PHC filter returns 330 records", () => {
  const results = searchTamilNaduTpaFacilities({
    facilityType: "phc"
  });

  assert.equal(results.length, 330);

  assert.ok(
    results.every(record => record.facilityType === "phc")
  );
});

test("UPHC filter returns 121 records", () => {
  const results = searchTamilNaduTpaFacilities({
    facilityType: "uphc"
  });

  assert.equal(results.length, 121);

  assert.ok(
    results.every(record => record.facilityType === "uphc")
  );
});

test("hospitalOnly excludes primary-care and diagnostic facilities", () => {
  const results = searchTamilNaduTpaFacilities({
    hospitalOnly: true
  });

  assert.equal(results.length, 1363);

  assert.ok(
    results.every(record => record.hospitalCandidate === true)
  );
});

test("diagnostic-centre group remains separate", () => {
  const results = searchTamilNaduTpaFacilities({
    directoryGroup: "diagnostics"
  });

  assert.equal(results.length, 148);

  assert.ok(
    results.every(record => record.directoryGroup === "diagnostics")
  );
});


// ============================================================
// 5. TEXT, ENTITY CODE, TPA AND SPECIALTY SEARCH
// ============================================================

test("text search finds A.S Imaging Centre", () => {
  const results = searchTamilNaduTpaFacilities({
    query: "A.S Imaging Centre"
  });

  assert.ok(
    results.some(record => record.entityCode === "H_18230")
  );
});

test("entity-code lookup finds the correct record", () => {
  const record = getTamilNaduTpaRecordByEntityCode("H_18230");

  assert.ok(record);

  assert.equal(
    record.name,
    "A.S Imaging Centre Pvt Ltd, Ariyalur TN."
  );
});

test("entity-code lookup is case insensitive", () => {
  const record =
    getTamilNaduTpaRecordByEntityCode("h_18230");

  assert.equal(record.entityCode, "H_18230");
});

test("unknown entity code returns null", () => {
  assert.equal(
    getTamilNaduTpaRecordByEntityCode("NOT-A-REAL-CODE"),
    null
  );
});

test("TPA filter returns the selected administrator", () => {
  const results = searchTamilNaduTpaFacilities({
    tpa: "MA"
  });

  assert.ok(results.length > 0);

  assert.ok(
    results.every(record => record.sourceTpa === "MA")
  );
});

test("cardiology specialty filter uses listed specialties", () => {
  const results = searchTamilNaduTpaFacilities({
    specialty: "cardiology"
  });

  assert.equal(results.length, 651);

  assert.ok(
    results.every(record =>
      record.listedSpecialties.some(
        item => item.includes("cardiology")
      )
    )
  );
});


// ============================================================
// 6. SORTING AND LIMITS
// ============================================================

test("name sorting works in ascending order", () => {
  const results = searchTamilNaduTpaFacilities({
    sortBy: "name",
    sortOrder: "asc"
  });

  const normalizeForSort = value =>
    String(value ?? "")
      .normalize("NFKC")
      .toLocaleLowerCase("en-IN")
      .trim()
      .replace(/\s+/g, " ");

  const names = results.map(
    record => normalizeForSort(record.name)
  );

  const expected = [...names].sort((a, b) =>
    a.localeCompare(
      b,
      "en",
      { numeric: true, sensitivity: "base" }
    )
  );

  assert.deepEqual(names, expected);
});

test("limit restricts search result count", () => {
  const results = searchTamilNaduTpaFacilities({
    limit: 5
  });

  assert.equal(results.length, 5);
});


// ============================================================
// 7. DISTRICT-WISE SUMMARY
// ============================================================

test("district summary covers all 38 districts", () => {
  const summary = getTamilNaduTpaDistrictSummary();

  assert.equal(summary.length, EXPECTED_DISTRICTS);
});

test("district totals reconcile to 2,157 records", () => {
  const summary = getTamilNaduTpaDistrictSummary();

  const total = summary.reduce(
    (sum, item) => sum + item.totalRecords,
    0
  );

  assert.equal(total, EXPECTED_RECORDS);
});

test("district summary contains category counters", () => {
  const summary = getTamilNaduTpaDistrictSummary();

  for (const item of summary) {
    assert.ok(item.district);

    assert.ok(Number.isInteger(item.totalRecords));
    assert.ok(Number.isInteger(item.hospitalCandidates));
    assert.ok(Number.isInteger(item.primaryCare));
    assert.ok(Number.isInteger(item.diagnostics));
    assert.ok(Number.isInteger(item.reviewRequired));
  }
});


// ============================================================
// 8. METADATA RECONCILIATION
// ============================================================

test("computed statistics agree with imported metadata", () => {
  const stats = getTamilNaduTpaStatistics();

  assert.equal(
    stats.totalSourceRows,
    TAMIL_NADU_TPA_METADATA.recordCount
  );

  assert.equal(
    stats.districtsCovered,
    TAMIL_NADU_TPA_METADATA.districtCount
  );

  assert.deepEqual(
    stats.ownership,
    TAMIL_NADU_TPA_METADATA.ownershipCounts
  );

  assert.deepEqual(
    stats.facilityTypes,
    TAMIL_NADU_TPA_METADATA.facilityTypeCounts
  );

  assert.deepEqual(
    stats.directoryGroups,
    TAMIL_NADU_TPA_METADATA.directoryGroupCounts
  );

  assert.deepEqual(
    stats.tpa,
    TAMIL_NADU_TPA_METADATA.tpaCounts
  );
});
