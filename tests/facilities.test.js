
import test from "node:test";
import assert from "node:assert/strict";

import {
  CHENNAI_FACILITIES,
  CHENNAI_DIRECTORY_SOURCES,
  searchChennaiFacilities,
  getFacilityMapUrl
} from "../src/data/chennaiFacilities.js";

// 1. Directory must contain records.
test("Chennai directory contains facility records", () => {
  assert.ok(CHENNAI_FACILITIES.length > 0);
});

// 2. Every facility must have a unique ID.
test("facility IDs are unique", () => {
  const ids = CHENNAI_FACILITIES.map(item => item.id);

  assert.equal(new Set(ids).size, ids.length);
});

// 3. Essential facility fields must be present.
test("every facility has required data fields", () => {
  for (const facility of CHENNAI_FACILITIES) {
    assert.ok(facility.id);
    assert.ok(facility.name);
    assert.ok(facility.facilityType);
    assert.ok(facility.ownership);
    assert.ok(facility.locality);
    assert.ok(facility.address);

    assert.ok(Array.isArray(facility.departments));
    assert.ok(Array.isArray(facility.sourceIds));
    assert.ok(facility.sourceIds.length > 0);

    assert.ok(facility.recordStatus);
    assert.ok(facility.doctorDirectoryStatus);
  }
});

// 4. Every source reference must exist.
test("all facility source IDs resolve to known sources", () => {
  const sourceIds = new Set(
    CHENNAI_DIRECTORY_SOURCES.map(source => source.id)
  );

  for (const facility of CHENNAI_FACILITIES) {
    for (const sourceId of facility.sourceIds) {
      assert.ok(
        sourceIds.has(sourceId),
        `Unknown source ID: ${sourceId}`
      );
    }
  }
});

// 5. Search must find facilities by name.
test("search finds Apollo Hospital", () => {
  const results = searchChennaiFacilities(
    CHENNAI_FACILITIES,
    { query: "apollo" }
  );

  assert.ok(
    results.some(item => item.name === "Apollo Hospital")
  );
});

// 6. Search must find facilities by locality.
test("search finds Adyar facilities", () => {
  const results = searchChennaiFacilities(
    CHENNAI_FACILITIES,
    { query: "Adyar" }
  );

  assert.ok(results.length > 0);

  assert.ok(
    results.some(item =>
      item.name === "Adyar Urban Primary Health Centre"
    )
  );
});

// 7. Search must support PIN codes.
test("search finds Government General Hospital by PIN code", () => {
  const results = searchChennaiFacilities(
    CHENNAI_FACILITIES,
    { query: "600003" }
  );

  assert.ok(
    results.some(item =>
      item.id === "chn-govt-general"
    )
  );
});

// 8. Government filter must exclude private facilities.
test("government filter returns only government facilities", () => {
  const results = searchChennaiFacilities(
    CHENNAI_FACILITIES,
    { ownership: "government" }
  );

  assert.ok(results.length > 0);

  assert.ok(
    results.every(item => item.ownership === "government")
  );
});

// 9. Private filter must exclude government facilities.
test("private filter returns only private facilities", () => {
  const results = searchChennaiFacilities(
    CHENNAI_FACILITIES,
    { ownership: "private" }
  );

  assert.ok(results.length > 0);

  assert.ok(
    results.every(item => item.ownership === "private")
  );
});

// 10. UPHC filter must return only UPHC records.
test("UPHC filter returns only UPHC facilities", () => {
  const results = searchChennaiFacilities(
    CHENNAI_FACILITIES,
    { facilityType: "uphc" }
  );

  assert.ok(results.length > 0);

  assert.ok(
    results.every(item => item.facilityType === "uphc")
  );
});

// 11. Department search must use listed department data.
test("department search finds listed gynaecology facility", () => {
  const results = searchChennaiFacilities(
    CHENNAI_FACILITIES,
    { department: "Obstetrics" }
  );

  assert.ok(
    results.some(item => item.id === "chn-iog-egmore")
  );
});

// 12. Map link must point to Google Maps.
test("map URL contains the facility and address", () => {
  const facility = CHENNAI_FACILITIES.find(
    item => item.id === "chn-govt-general"
  );

  const mapUrl = getFacilityMapUrl(facility);
  const parsedUrl = new URL(mapUrl);

  assert.equal(
    parsedUrl.hostname,
    "www.google.com"
  );

  assert.ok(
    parsedUrl.searchParams.get("query").includes(
      "Government General Hospital"
    )
  );
});

// 13. Invalid facility input must not create a map link.
test("map URL returns null for missing facility data", () => {
  assert.equal(getFacilityMapUrl(null), null);

  assert.equal(
    getFacilityMapUrl({
      name: "Unknown facility",
      address: ""
    }),
    null
  );
});

// 14. Invalid record collections must return empty results.
test("search handles invalid record collections safely", () => {
  assert.deepEqual(
    searchChennaiFacilities(null, { query: "Adyar" }),
    []
  );
});
