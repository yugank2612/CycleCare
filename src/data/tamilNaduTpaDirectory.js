import snapshot from "./tamilNaduTpaFacilities.json";

export const TAMIL_NADU_TPA_METADATA = snapshot.metadata;
export const TAMIL_NADU_TPA_RECORDS = snapshot.records;

export const TAMIL_NADU_FACILITY_GROUPS = [
  "hospital",
  "primary-care",
  "diagnostics",
  "specialized-support",
  "non-hospital-support",
  "review-required"
];

function normalize(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("en-IN")
    .trim()
    .replace(/\s+/g, " ");
}

function containsText(value, query) {
  const q = normalize(query);
  return !q || normalize(value).includes(q);
}

export function searchTamilNaduTpaFacilities(options = {}) {
  const {
    query = "",
    district = "",
    facilityType = "all",
    directoryGroup = "all",
    ownership = "all",
    tpa = "all",
    specialty = "",
    hospitalOnly = false,
    includeReview = false,
    includeNonFacilitySupport = false,
    sortBy = "name",
    sortOrder = "asc",
    limit = null
  } = options || {};

  let results = TAMIL_NADU_TPA_RECORDS.filter(record => {
    if (!includeReview && !record.directoryImportCandidate) {
      return false;
    }

    if (
      !includeNonFacilitySupport &&
      record.directoryGroup === "non-hospital-support"
    ) {
      return false;
    }

    if (hospitalOnly && !record.hospitalCandidate) {
      return false;
    }

    if (
      district &&
      normalize(record.district) !== normalize(district)
    ) {
      return false;
    }

    if (
      facilityType !== "all" &&
      record.facilityType !== facilityType
    ) {
      return false;
    }

    if (
      directoryGroup !== "all" &&
      record.directoryGroup !== directoryGroup
    ) {
      return false;
    }

    if (
      ownership !== "all" &&
      record.ownership !== ownership
    ) {
      return false;
    }

    if (
      tpa !== "all" &&
      normalize(record.sourceTpa) !== normalize(tpa)
    ) {
      return false;
    }

    if (
      !containsText(
        [
          record.name,
          record.entityCode,
          record.address,
          record.district,
          record.sourceCategory,
          record.sourceDirectorate
        ].filter(Boolean).join(" "),
        query
      )
    ) {
      return false;
    }

    if (specialty) {
      const match = (record.listedSpecialties || []).some(
        item => normalize(item).includes(normalize(specialty))
      );
      if (!match) return false;
    }

    return true;
  });

  const sortable = ["name", "district", "facilityType", "ownership", "sourceTpa"];

  if (sortable.includes(sortBy)) {
    const direction = sortOrder === "desc" ? -1 : 1;

    results = [...results].sort((a, b) =>
      normalize(a[sortBy]).localeCompare(
        normalize(b[sortBy]),
        "en",
        { numeric: true, sensitivity: "base" }
      ) * direction
    );
  }

  if (Number.isInteger(limit) && limit >= 0) {
    results = results.slice(0, limit);
  }

  return results;
}

export function getTamilNaduTpaRecordByEntityCode(entityCode) {
  const sought = normalize(entityCode);

  return TAMIL_NADU_TPA_RECORDS.find(
    record => normalize(record.entityCode) === sought
  ) || null;
}

export function getTamilNaduTpaReviewQueue() {
  return TAMIL_NADU_TPA_RECORDS.filter(
    record => record.needsManualReview
  );
}

export function getTamilNaduTpaDistrictSummary() {
  const summary = new Map();

  for (const record of TAMIL_NADU_TPA_RECORDS) {
    if (!record.district) continue;

    if (!summary.has(record.district)) {
      summary.set(record.district, {
        district: record.district,
        totalRecords: 0,
        hospitalCandidates: 0,
        primaryCare: 0,
        diagnostics: 0,
        reviewRequired: 0
      });
    }

    const item = summary.get(record.district);
    item.totalRecords += 1;

    if (record.hospitalCandidate) item.hospitalCandidates += 1;
    if (record.directoryGroup === "primary-care") item.primaryCare += 1;
    if (record.directoryGroup === "diagnostics") item.diagnostics += 1;
    if (record.needsManualReview) item.reviewRequired += 1;
  }

  return [...summary.values()].sort((a, b) =>
    a.district.localeCompare(b.district)
  );
}

export function getTamilNaduTpaStatistics() {
  const total = TAMIL_NADU_TPA_RECORDS.length;
  const reviewCount = TAMIL_NADU_TPA_RECORDS.filter(
    record => record.needsManualReview
  ).length;

  const countBy = field => {
    const result = {};

    for (const record of TAMIL_NADU_TPA_RECORDS) {
      const key = record[field] || "unknown";
      result[key] = (result[key] || 0) + 1;
    }

    return result;
  };

  return {
    totalSourceRows: total,
    directoryImportCandidates: TAMIL_NADU_TPA_RECORDS.filter(
      record => record.directoryImportCandidate
    ).length,
    manualReviewRequired: reviewCount,
    districtsCovered: new Set(
      TAMIL_NADU_TPA_RECORDS.map(record => record.district).filter(Boolean)
    ).size,
    ownership: countBy("ownership"),
    facilityTypes: countBy("facilityType"),
    directoryGroups: countBy("directoryGroup"),
    tpa: countBy("sourceTpa")
  };
}
