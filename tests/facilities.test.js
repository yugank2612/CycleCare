
import test from "node:test";
import assert from "node:assert/strict";

import {
  CHENNAI_FACILITIES,
  CHENNAI_DIRECTORY_SOURCES,
  CHENNAI_DIRECTORY_SUMMARY,
  searchChennaiFacilities,
  searchChennaiDirectory,
  paginateChennaiFacilities,
  getFacilityById,
  getChennaiDirectoryStats,
  validateChennaiDirectory,
  getChennaiDirectoryFilterOptions,
  getFacilitySourceLinks,
  getFacilityMapUrl,
  getFacilityDirectionsUrl,
  getFacilityPhoneUrl,
  getFacilityDisplayStatus
} from "../src/data/chennaiFacilities.js";


// ============================================================
// 1. DIRECTORY BASIC TESTS
// ============================================================

test("directory contains 28 prototype records", () => {
  assert.equal(CHENNAI_FACILITIES.length, 28);
});

test("directory IDs are unique", () => {
  const ids = CHENNAI_FACILITIES.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("every facility has required fields", () => {
  for (const facility of CHENNAI_FACILITIES) {
    assert.ok(facility.id);
    assert.ok(facility.name);
    assert.ok(facility.locality);
    assert.ok(facility.address);
    assert.ok(facility.ownership);

    assert.ok(Array.isArray(facility.departments));
    assert.ok(Array.isArray(facility.sourceIds));
    assert.ok(facility.sourceIds.length > 0);

    assert.ok(facility.recordStatus);
  }
});

test("every source reference points to a known source", () => {
  const sourceIds = new Set(
    CHENNAI_DIRECTORY_SOURCES.map(source => source.id)
  );

  for (const facility of CHENNAI_FACILITIES) {
    for (const sourceId of facility.sourceIds) {
      assert.ok(sourceIds.has(sourceId));
    }
  }
});


// ============================================================
// 2. FACILITY TYPE AND OWNERSHIP TESTS
// ============================================================

test("directory contains 20 regular hospitals", () => {
  const results = searchChennaiDirectory({
    facilityType: "hospital"
  });

  assert.equal(results.length, 20);
});

test("directory contains one specialty hospital", () => {
  const results = searchChennaiDirectory({
    facilityType: "specialty-hospital"
  });

  assert.equal(results.length, 1);
});

test("directory contains seven UPHC records", () => {
  const results = searchChennaiDirectory({
    facilityType: "uphc"
  });

  assert.equal(results.length, 7);
});

test("government filter returns only government facilities", () => {
  const results = searchChennaiDirectory({
    ownership: "government"
  });

  assert.ok(results.length > 0);
  assert.ok(
    results.every(item => item.ownership === "government")
  );
});

test("private filter returns only private facilities", () => {
  const results = searchChennaiDirectory({
    ownership: "private"
  });

  assert.ok(results.length > 0);
  assert.ok(
    results.every(item => item.ownership === "private")
  );
});

test("unknown ownership can be filtered separately", () => {
  const results = searchChennaiDirectory({
    ownership: "unknown"
  });

  assert.ok(
    results.every(item => item.ownership === "unknown")
  );
});

test("unknown ownership can be excluded", () => {
  const results = searchChennaiDirectory({
    includeUnknownOwnership: false
  });

  assert.ok(
    results.every(item => item.ownership !== "unknown")
  );
});


// ============================================================
// 3. SEARCH TESTS
// ============================================================

test("search finds Apollo Hospital", () => {
  const results = searchChennaiDirectory({
    query: "apollo"
  });

  assert.ok(
    results.some(item => item.id === "chn-apollo-greams")
  );
});

test("search finds Adyar facilities", () => {
  const results = searchChennaiDirectory({
    query: "Adyar"
  });

  assert.ok(results.length > 0);
});

test("search finds hospital using PIN code", () => {
  const results = searchChennaiDirectory({
    query: "600003"
  });

  assert.ok(
    results.some(item => item.id === "chn-govt-general")
  );
});

test("search is case insensitive", () => {
  const lower = searchChennaiDirectory({
    query: "apollo"
  });

  const upper = searchChennaiDirectory({
    query: "APOLLO"
  });

  assert.deepEqual(
    lower.map(item => item.id),
    upper.map(item => item.id)
  );
});

test("multi-word search finds Government General Hospital", () => {
  const results = searchChennaiDirectory({
    query: "government general"
  });

  assert.ok(
    results.some(item => item.id === "chn-govt-general")
  );
});

test("department search uses listed department information", () => {
  const results = searchChennaiDirectory({
    department: "Obstetrics"
  });

  assert.ok(
    results.some(item => item.id === "chn-iog-egmore")
  );
});


// ============================================================
// 4. ADVANCED FILTER TESTS
// ============================================================

test("multiple ownership values can be selected", () => {
  const results = searchChennaiDirectory({
    ownerships: ["government", "private"]
  });

  assert.ok(results.length > 0);

  assert.ok(
    results.every(item =>
      ["government", "private"].includes(item.ownership)
    )
  );
});

test("multiple facility types can be selected", () => {
  const results = searchChennaiDirectory({
    facilityTypes: ["hospital", "specialty-hospital"]
  });

  assert.equal(results.length, 21);
});

test("phone available filter returns only records with phone", () => {
  const results = searchChennaiDirectory({
    hasPhone: true
  });

  assert.ok(results.length > 0);
  assert.ok(results.every(item => Boolean(item.phone)));
});

test("phone unavailable filter returns records without phone", () => {
  const results = searchChennaiDirectory({
    hasPhone: false
  });

  assert.ok(results.length > 0);
  assert.ok(results.every(item => !item.phone));
});

test("verified-only filter excludes unverified records", () => {
  const results = searchChennaiDirectory({
    verifiedOnly: true
  });

  assert.ok(
    results.every(item => item.recordStatus === "verified")
  );

  assert.equal(results.length, 0);
});

test("exact record status filter works", () => {
  const results = searchChennaiDirectory({
    recordStatus: "officially-listed-needs-reconfirmation"
  });

  assert.equal(results.length, 28);
});


// ============================================================
// 5. SORTING TESTS
// ============================================================

test("name sorting works in ascending order", () => {
  const results = searchChennaiDirectory({
    sortBy: "name",
    sortOrder: "asc"
  });

  const names = results.map(item =>
    item.name.toLowerCase()
  );

  const sorted = [...names].sort((a, b) =>
    a.localeCompare(b, "en", { numeric: true })
  );

  assert.deepEqual(names, sorted);
});

test("locality sorting works", () => {
  const results = searchChennaiDirectory({
    sortBy: "locality",
    sortOrder: "asc"
  });

  const localities = results.map(item =>
    item.locality.toLowerCase()
  );

  const sorted = [...localities].sort((a, b) =>
    a.localeCompare(b, "en", { numeric: true })
  );

  assert.deepEqual(localities, sorted);
});

test("descending sort reverses name order", () => {
  const ascending = searchChennaiDirectory({
    sortBy: "name",
    sortOrder: "asc"
  });

  const descending = searchChennaiDirectory({
    sortBy: "name",
    sortOrder: "desc"
  });

  assert.deepEqual(
    descending.map(item => item.id),
    [...ascending].reverse().map(item => item.id)
  );
});


// ============================================================
// 6. PAGINATION TESTS
// ============================================================

test("pagination returns ten results on first page", () => {
  const result = paginateChennaiFacilities({
    page: 1,
    pageSize: 10
  });

  assert.equal(result.items.length, 10);
  assert.equal(result.total, 28);
  assert.equal(result.totalPages, 3);
  assert.equal(result.hasPreviousPage, false);
  assert.equal(result.hasNextPage, true);
});

test("pagination returns ten results on second page", () => {
  const result = paginateChennaiFacilities({
    page: 2,
    pageSize: 10
  });

  assert.equal(result.items.length, 10);
  assert.equal(result.hasPreviousPage, true);
  assert.equal(result.hasNextPage, true);
});

test("last pagination page returns remaining records", () => {
  const result = paginateChennaiFacilities({
    page: 3,
    pageSize: 10
  });

  assert.equal(result.items.length, 8);
  assert.equal(result.hasNextPage, false);
});

test("pagination retains search filters", () => {
  const result = paginateChennaiFacilities({
    query: "Adyar",
    page: 1,
    pageSize: 10
  });

  assert.ok(result.items.length > 0);

  assert.ok(
    result.items.every(item =>
      item.locality.toLowerCase().includes("adyar") ||
      item.name.toLowerCase().includes("adyar") ||
      item.address.toLowerCase().includes("adyar")
    )
  );
});


// ============================================================
// 7. LOOKUP AND STATISTICS
// ============================================================

test("facility can be found by ID", () => {
  const facility = getFacilityById("chn-govt-general");

  assert.equal(
    facility.name,
    "Government General Hospital"
  );
});

test("unknown facility ID returns null", () => {
  assert.equal(
    getFacilityById("unknown-id"),
    null
  );
});

test("directory statistics match current data", () => {
  const stats = getChennaiDirectoryStats();

  assert.equal(stats.total, 28);
  assert.equal(stats.hospitals, 20);
  assert.equal(stats.specialtyHospitals, 1);
  assert.equal(stats.uphcs, 7);
  assert.equal(stats.unknownOwnership, 1);
  assert.equal(stats.verified, 0);
});

test("exported directory summary matches statistics", () => {
  assert.equal(
    CHENNAI_DIRECTORY_SUMMARY.total,
    CHENNAI_FACILITIES.length
  );
});


// ============================================================
// 8. DATA VALIDATION
// ============================================================

test("current directory passes structural validation", () => {
  const result = validateChennaiDirectory();

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
  assert.equal(result.total, 28);
});

test("validation detects duplicate facility IDs", () => {
  const duplicateRecords = [
    CHENNAI_FACILITIES[0],
    CHENNAI_FACILITIES[0]
  ];

  const result = validateChennaiDirectory(duplicateRecords);

  assert.equal(result.valid, false);

  assert.ok(
    result.errors.some(error =>
      error.includes("duplicate facility ID")
    )
  );
});

test("validation detects unknown source IDs", () => {
  const invalidRecord = {
    ...CHENNAI_FACILITIES[0],
    sourceIds: ["missing-source"]
  };

  const result = validateChennaiDirectory([invalidRecord]);

  assert.equal(result.valid, false);

  assert.ok(
    result.errors.some(error =>
      error.includes("unknown source ID")
    )
  );
});

test("validation warns about unconfirmed facilities", () => {
  const result = validateChennaiDirectory();

  assert.ok(result.warnings.length > 0);
});


// ============================================================
// 9. FILTER DROPDOWN OPTIONS
// ============================================================

test("filter options include known localities", () => {
  const options = getChennaiDirectoryFilterOptions();

  assert.ok(options.localities.includes("Adyar"));
  assert.ok(options.localities.includes("Mylapore"));
});

test("filter options include facility types", () => {
  const options = getChennaiDirectoryFilterOptions();

  assert.ok(options.facilityTypes.includes("hospital"));
  assert.ok(options.facilityTypes.includes("uphc"));
  assert.ok(options.facilityTypes.includes("specialty-hospital"));
});


// ============================================================
// 10. SOURCE, MAP AND CONTACT LINKS
// ============================================================

test("facility source links resolve correctly", () => {
  const facility = getFacilityById("chn-govt-general");

  const links = getFacilitySourceLinks(facility);

  assert.ok(links.length > 0);
  assert.ok(
    links.every(link => link.url.startsWith("https://"))
  );
});

test("map URL is valid", () => {
  const facility = getFacilityById("chn-govt-general");

  const url = getFacilityMapUrl(facility);
  const parsed = new URL(url);

  assert.equal(parsed.hostname, "www.google.com");
  assert.ok(parsed.searchParams.get("query").includes("Chennai"));
});

test("directions URL is valid", () => {
  const facility = getFacilityById("chn-govt-general");

  const url = getFacilityDirectionsUrl(facility);
  const parsed = new URL(url);

  assert.equal(parsed.hostname, "www.google.com");
  assert.ok(parsed.searchParams.has("destination"));
});

test("phone URL is created when a phone exists", () => {
  const facility = getFacilityById("chn-govt-general");

  assert.ok(
    getFacilityPhoneUrl(facility).startsWith("tel:")
  );
});

test("phone URL returns null when phone is missing", () => {
  const facility = getFacilityById("chn-uphc-triplicane");

  assert.equal(getFacilityPhoneUrl(facility), null);
});

test("facility display status does not claim verification", () => {
  const facility = getFacilityById("chn-govt-general");

  assert.match(
    getFacilityDisplayStatus(facility),
    /reconfirm before visiting/i
  );
});


// ============================================================
// 11. INVALID INPUT SAFETY
// ============================================================

test("search handles invalid records safely", () => {
  assert.deepEqual(
    searchChennaiFacilities(null, { query: "Adyar" }),
    []
  );
});

test("pagination handles invalid page values safely", () => {
  const result = paginateChennaiFacilities({
    page: -5,
    pageSize: 0
  });

  assert.equal(result.page, 1);
  assert.equal(result.pageSize, 10);
});

test("empty facility map input returns null", () => {
  assert.equal(getFacilityMapUrl(null), null);
  assert.equal(getFacilityMapUrl({}), null);
});

test("empty facility directions input returns null", () => {
  assert.equal(getFacilityDirectionsUrl(null), null);
});

test("empty facility source input returns empty array", () => {
  assert.deepEqual(getFacilitySourceLinks(null), []);
});
