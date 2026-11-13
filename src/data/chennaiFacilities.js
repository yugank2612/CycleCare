
import {
  CHENNAI_HOSPITAL_SUPPLEMENT
} from "./chennaiHospitalSupplement.js";

// ============================================================
// CYCLECARE — CHENNAI HEALTHCARE DIRECTORY
// Advanced directory data, search, filtering and validation.
//
// IMPORTANT:
// - This is an initial directory, not a complete district list.
// - Records are based on published official directory sources.
// - Facility operations, contacts and departments require
//   direct reconfirmation before public use.
// - No doctor affiliation is assumed.
// - No patient health information is stored here.
// ============================================================


// ------------------------------------------------------------
// 1. DIRECTORY METADATA
// ------------------------------------------------------------

export const CHENNAI_DIRECTORY_META = {
  district: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  pilot: true,
  scope: "Initial one-district healthcare directory prototype",
  lastChecked: "2026-11-13",

  disclaimer:
    "Directory information is based on published sources. " +
    "Facility operations, contact details, departments, " +
    "timings and availability must be confirmed directly " +
    "with the facility before visiting.",

  verificationPolicy:
    "A listing in an official directory does not itself " +
    "confirm current operations or service availability.",

  distancePolicy:
    "Exact distance and nearest-facility claims are not " +
    "available because verified coordinates are not yet present."
};


// ------------------------------------------------------------
// 2. OFFICIAL DIRECTORY SOURCES
// ------------------------------------------------------------

export const CHENNAI_DIRECTORY_SOURCES = [
  {
    id: "district-hospitals-1",
    name: "Chennai District Administration — Hospitals",
    url: "https://chennai.nic.in/public-utility-category/hospitals/",
    sourceType: "government-directory",
    publishedDate: "2026-11-11"
  },
  {
    id: "district-hospitals-2",
    name: "Chennai District Administration — Hospitals, Page 2",
    url: "https://chennai.nic.in/public-utility-category/hospitals/page/2/",
    sourceType: "government-directory",
    publishedDate: "2026-10-23"
  },
  {
    id: "gcc-government-hospitals",
    name: "Greater Chennai Corporation — Government Hospitals",
    url: "https://chennaicorporation.gov.in/gcc/covid-vaccine/govt-hospital/",
    sourceType: "municipal-government-directory"
  },
  {
    id: "gcc-uphc",
    name: "Greater Chennai Corporation — Urban Primary Health Centres",
    url: "https://chennaicorporation.gov.in/gcc/covid-vaccine/uphc/",
    sourceType: "municipal-government-directory"
  },
  {
    id: "tn-health-dme",
    name: "Tamil Nadu Directorate of Medical Education",
    url: "https://www.tnhealth.org/tngovin/dme/dme.php",
    sourceType: "state-government-directory"
  }
];


// ------------------------------------------------------------
// 3. BASE CHENNAI FACILITY RECORDS
// ------------------------------------------------------------

const BASE_CHENNAI_FACILITIES = [

  // ==========================================================
  // GOVERNMENT HOSPITALS
  // ==========================================================

  {
    id: "chn-govt-general",
    name: "Government General Hospital",
    facilityType: "hospital",
    ownership: "government",
    locality: "Park Town",
    address:
      "Poonamallee High Road, Park Town, Chennai - 600003",
    postalCode: "600003",
    phone: "044-25305000",
    departments: [],
    coordinates: null,
    sourceIds: ["district-hospitals-1"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-kilpauk",
    name: "Government Kilpauk Hospital",
    facilityType: "hospital",
    ownership: "government",
    locality: "Kilpauk",
    address: "Kilpauk, Chennai - 600010",
    postalCode: "600010",
    phone: "044-28364951",
    departments: [],
    coordinates: null,
    sourceIds: ["district-hospitals-1"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-kasturba",
    name: "Government Kasturba Hospital for Women",
    facilityType: "hospital",
    ownership: "government",
    locality: "Triplicane",
    address: "Triplicane, Chennai - 600005",
    postalCode: "600005",
    phone: "044-28545449",
    departments: [],
    coordinates: null,
    sourceIds: [
      "district-hospitals-1",
      "gcc-government-hospitals"
    ],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-omandurar",
    name: "Government Multi Super Speciality Hospital",
    facilityType: "hospital",
    ownership: "government",
    locality: "Omandurar",
    address: "Omandurar Government Estate, Chennai - 600002",
    postalCode: "600002",
    phone: "044-25666000",
    departments: [],
    coordinates: null,
    sourceIds: ["district-hospitals-1"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-royapettah",
    name: "Government Royapettah Hospital",
    facilityType: "hospital",
    ownership: "government",
    locality: "Royapettah",
    address: "No. 1, West Cott Road, Chennai - 600014",
    postalCode: "600014",
    phone: "044-28483051",
    departments: [],
    coordinates: null,
    sourceIds: [
      "district-hospitals-2",
      "gcc-government-hospitals"
    ],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-stanley",
    name: "Government Stanley Hospital",
    facilityType: "hospital",
    ownership: "government",
    locality: "Royapuram",
    address: "Old Jail Road, Chennai - 600001",
    postalCode: "600001",
    phone: "044-25281347",
    departments: [],
    coordinates: null,
    sourceIds: [
      "district-hospitals-2",
      "gcc-government-hospitals"
    ],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-iog-egmore",
    name: "Government Institute of Obstetrics and Gynaecology",
    facilityType: "specialty-hospital",
    ownership: "government",
    locality: "Egmore",
    address: "Halls Road, Egmore, Chennai - 600008",
    postalCode: "600008",
    phone: null,
    departments: ["Obstetrics and Gynaecology"],
    coordinates: null,
    sourceIds: [
      "gcc-government-hospitals",
      "tn-health-dme"
    ],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-rsrm",
    name: "R.S.R.M. Lying-In Hospital",
    facilityType: "hospital",
    ownership: "government",
    locality: "Royapuram",
    address: "Cemetery Road, Chennai - 600013",
    postalCode: "600013",
    phone: "044-25902961",
    departments: [],
    coordinates: null,
    sourceIds: ["district-hospitals-2"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },


  // ==========================================================
  // PRIVATE HOSPITALS
  // ==========================================================

  {
    id: "chn-apollo-greams",
    name: "Apollo Hospital",
    facilityType: "hospital",
    ownership: "private",
    locality: "Greams Road",
    address: "No. 21, Greams Lane, Chennai - 600006",
    postalCode: "600006",
    phone: "044-28290200",
    departments: [],
    coordinates: null,
    sourceIds: ["district-hospitals-1"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-billroth",
    name: "Billroth Hospital",
    facilityType: "hospital",
    ownership: "private",
    locality: "Shenoy Nagar",
    address:
      "No. 43, Lakshmi Talkies Road, Shenoy Nagar, Chennai - 600030",
    postalCode: "600030",
    phone: "26641777",
    departments: [],
    coordinates: null,
    sourceIds: ["district-hospitals-1"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-csi-kalyani",
    name: "C.S.I. Kalyani Hospital",
    facilityType: "hospital",
    ownership: "private",
    locality: "Mylapore",
    address:
      "No. 15, Dr. Radhakrishan Salai, Mylapore, Chennai - 600004",
    postalCode: "600004",
    phone: "28476433",
    departments: [],
    coordinates: null,
    sourceIds: ["district-hospitals-1"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-fortis-malar",
    name: "Fortis Malar Hospital",
    facilityType: "hospital",
    ownership: "private",
    locality: "Adyar",
    address:
      "No. 52, 1st Main Road, Gandhi Nagar, Adyar, Chennai - 600020",
    postalCode: "600020",
    phone: "044-42892222",
    departments: [],
    coordinates: null,
    sourceIds: ["district-hospitals-1"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },


  // ==========================================================
  // GREATER CHENNAI CORPORATION UPHC RECORDS
  // ==========================================================

  {
    id: "chn-uphc-triplicane",
    name: "Triplicane Urban Primary Health Centre",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    locality: "Triplicane",
    address: "No. 3, Dr. Besant Road, Triplicane, Chennai",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-royapettah",
    name: "Royapettah Urban Primary Health Centre",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    locality: "Royapettah",
    address: "35, Ammaiappan Lane, Royapettah, Chennai",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-mylapore",
    name: "Mylapore Urban Primary Health Centre",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    locality: "Mylapore",
    address:
      "22, Mundakanniamman Koil Street, Mylapore, Chennai",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-ashok-nagar",
    name: "Ashok Nagar Urban Primary Health Centre",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    locality: "Ashok Nagar",
    address: "34, 35th Street, Ashok Nagar, Chennai",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-adyar",
    name: "Adyar Urban Primary Health Centre",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    locality: "Adyar",
    address: "Vannandurai Road, Besant Nagar, Chennai",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-teynampet",
    name: "Teynampet Urban Primary Health Centre",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    locality: "Teynampet",
    address: "40, K.B. Dasan Road, Teynampet, Chennai",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-chetpet",
    name: "Chetpet Urban Primary Health Centre",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    locality: "Chetpet",
    address: "1, Jagannathapuram 2nd Street, Chetpet, Chennai",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  }
];


// ------------------------------------------------------------
// 4. COMBINE BASE DIRECTORY + SUPPLEMENT
// ------------------------------------------------------------

export const CHENNAI_FACILITIES = [
  ...BASE_CHENNAI_FACILITIES,
  ...CHENNAI_HOSPITAL_SUPPLEMENT
];


// ------------------------------------------------------------
// 5. SEARCH AND FILTER CONSTANTS
// ------------------------------------------------------------

export const CHENNAI_OWNERSHIP_OPTIONS = [
  { value: "all", label: "All ownership types" },
  { value: "government", label: "Government" },
  { value: "private", label: "Private" },
  { value: "unknown", label: "Not confirmed" }
];

export const CHENNAI_FACILITY_TYPE_OPTIONS = [
  { value: "all", label: "All facility types" },
  { value: "hospital", label: "Hospital" },
  { value: "specialty-hospital", label: "Specialty hospital" },
  { value: "uphc", label: "Urban Primary Health Centre" }
];

export const CHENNAI_SORT_OPTIONS = [
  { value: "name", label: "Name (A–Z)" },
  { value: "locality", label: "Locality (A–Z)" },
  { value: "ownership", label: "Ownership" },
  { value: "facilityType", label: "Facility type" }
];


// ------------------------------------------------------------
// 6. NORMALIZATION HELPERS
// ------------------------------------------------------------

export function normalizeSearchValue(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("en-IN")
    .trim()
    .replace(/\s+/g, " ");
}

function includesNormalized(value, search) {
  const normalizedValue = normalizeSearchValue(value);
  const normalizedSearch = normalizeSearchValue(search);

  if (!normalizedSearch) {
    return true;
  }

  return normalizedValue.includes(normalizedSearch);
}

function getSearchableText(facility) {
  return normalizeSearchValue([
    facility.name,
    facility.locality,
    facility.address,
    facility.postalCode,
    facility.administrativeArea,
    facility.ownership,
    facility.facilityType
  ].filter(Boolean).join(" "));
}

function matchesAllQueryTokens(facility, query) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return true;
  }

  const searchableText = getSearchableText(facility);
  const tokens = normalizedQuery.split(" ").filter(Boolean);

  return tokens.every(token => searchableText.includes(token));
}


// ------------------------------------------------------------
// 7. ADVANCED FACILITY SEARCH
//
// Supported filters:
// query          : name, address, locality, PIN code
// ownership      : government, private, unknown, all
// ownerships     : multiple ownership values
// facilityType   : hospital, specialty-hospital, uphc, all
// facilityTypes  : multiple facility types
// locality       : locality search
// postalCode     : PIN code search
// department     : only listed department data
// hasPhone       : true / false / null
// recordStatus   : exact record status or all
// verifiedOnly   : only records marked "verified"
// includeUnknownOwnership : true / false
// sortBy         : name, locality, ownership, facilityType
// sortOrder      : asc / desc
// limit          : maximum result count
// ------------------------------------------------------------

export function searchChennaiFacilities(
  records = CHENNAI_FACILITIES,
  options = {}
) {
  if (!Array.isArray(records)) {
    return [];
  }

  const safeOptions =
    options && typeof options === "object"
      ? options
      : {};

  const {
    query = "",
    ownership = "all",
    ownerships = null,
    facilityType = "all",
    facilityTypes = null,
    locality = "",
    postalCode = "",
    department = "",
    hasPhone = null,
    recordStatus = "all",
    verifiedOnly = false,
    includeUnknownOwnership = true,
    sortBy = "name",
    sortOrder = "asc",
    limit = null
  } = safeOptions;

  const allowedOwnerships = Array.isArray(ownerships)
    ? ownerships
    : ownership !== "all"
      ? [ownership]
      : null;

  const allowedFacilityTypes = Array.isArray(facilityTypes)
    ? facilityTypes
    : facilityType !== "all"
      ? [facilityType]
      : null;

  let results = records.filter(facility => {
    if (!facility || typeof facility !== "object") {
      return false;
    }

    // General text search.
    if (!matchesAllQueryTokens(facility, query)) {
      return false;
    }

    // Ownership filter.
    if (
      allowedOwnerships &&
      !allowedOwnerships.includes(facility.ownership)
    ) {
      return false;
    }

    if (
      !includeUnknownOwnership &&
      facility.ownership === "unknown"
    ) {
      return false;
    }

    // Facility type filter.
    if (
      allowedFacilityTypes &&
      !allowedFacilityTypes.includes(facility.facilityType)
    ) {
      return false;
    }

    // Locality filter.
    if (!includesNormalized(facility.locality, locality)) {
      return false;
    }

    // PIN code filter.
    if (!includesNormalized(facility.postalCode, postalCode)) {
      return false;
    }

    // Department filter. Only uses recorded department fields.
    if (department) {
      const departments = Array.isArray(facility.departments)
        ? facility.departments
        : [];

      const departmentMatch = departments.some(item =>
        includesNormalized(item, department)
      );

      if (!departmentMatch) {
        return false;
      }
    }

    // Phone availability filter.
    if (typeof hasPhone === "boolean") {
      const phoneExists =
        Boolean(facility.phone) &&
        String(facility.phone).trim().length > 0;

      if (phoneExists !== hasPhone) {
        return false;
      }
    }

    // Exact record status filter.
    if (
      recordStatus !== "all" &&
      facility.recordStatus !== recordStatus
    ) {
      return false;
    }

    // Strict verification filter.
    if (
      verifiedOnly &&
      facility.recordStatus !== "verified"
    ) {
      return false;
    }

    return true;
  });

  // Sorting.
  const direction = sortOrder === "desc" ? -1 : 1;

  const sortableFields = [
    "name",
    "locality",
    "ownership",
    "facilityType"
  ];

  if (sortableFields.includes(sortBy)) {
    results = [...results].sort((a, b) => {
      const first = normalizeSearchValue(a[sortBy]);
      const second = normalizeSearchValue(b[sortBy]);

      return first.localeCompare(
        second,
        "en",
        { sensitivity: "base", numeric: true }
      ) * direction;
    });
  }

  // Result limit.
  if (
    Number.isInteger(limit) &&
    limit >= 0
  ) {
    results = results.slice(0, limit);
  }

  return results;
}


// ------------------------------------------------------------
// 8. SIMPLE SEARCH WRAPPER
// ------------------------------------------------------------

export function searchChennaiDirectory(options = {}) {
  return searchChennaiFacilities(
    CHENNAI_FACILITIES,
    options
  );
}


// ------------------------------------------------------------
// 9. PAGINATION
//
// Example:
// paginateChennaiFacilities({
//   query: "Adyar",
//   page: 1,
//   pageSize: 10
// });
//
// Returns:
// {
//   items: [],
//   total: 0,
//   page: 1,
//   pageSize: 10,
//   totalPages: 0
// }
// ------------------------------------------------------------

export function paginateChennaiFacilities(options = {}) {
  const {
    page = 1,
    pageSize = 10,
    ...searchOptions
  } = options || {};

  const safePage = Number.isInteger(page) && page > 0
    ? page
    : 1;

  const safePageSize =
    Number.isInteger(pageSize) &&
    pageSize > 0
      ? Math.min(pageSize, 100)
      : 10;

  const allResults = searchChennaiFacilities(
    CHENNAI_FACILITIES,
    searchOptions
  );

  const total = allResults.length;
  const totalPages = Math.ceil(total / safePageSize);

  const startIndex = (safePage - 1) * safePageSize;

  return {
    items: allResults.slice(
      startIndex,
      startIndex + safePageSize
    ),
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages
  };
}


// ------------------------------------------------------------
// 10. GET FACILITY BY ID
// ------------------------------------------------------------

export function getFacilityById(
  facilityId,
  records = CHENNAI_FACILITIES
) {
  if (
    !facilityId ||
    !Array.isArray(records)
  ) {
    return null;
  }

  return records.find(
    facility => facility?.id === facilityId
  ) || null;
}


// ------------------------------------------------------------
// 11. DIRECTORY STATISTICS
// ------------------------------------------------------------

export function getChennaiDirectoryStats(
  records = CHENNAI_FACILITIES
) {
  if (!Array.isArray(records)) {
    return {
      total: 0,
      hospitals: 0,
      specialtyHospitals: 0,
      uphcs: 0,
      government: 0,
      private: 0,
      unknownOwnership: 0,
      withPhone: 0,
      withoutPhone: 0,
      needingReconfirmation: 0,
      verified: 0
    };
  }

  return {
    total: records.length,

    hospitals: records.filter(
      item => item.facilityType === "hospital"
    ).length,

    specialtyHospitals: records.filter(
      item => item.facilityType === "specialty-hospital"
    ).length,

    uphcs: records.filter(
      item => item.facilityType === "uphc"
    ).length,

    government: records.filter(
      item => item.ownership === "government"
    ).length,

    private: records.filter(
      item => item.ownership === "private"
    ).length,

    unknownOwnership: records.filter(
      item => item.ownership === "unknown"
    ).length,

    withPhone: records.filter(
      item => Boolean(item.phone)
    ).length,

    withoutPhone: records.filter(
      item => !item.phone
    ).length,

    needingReconfirmation: records.filter(
      item =>
        item.recordStatus ===
        "officially-listed-needs-reconfirmation"
    ).length,

    verified: records.filter(
      item => item.recordStatus === "verified"
    ).length
  };
}


// ------------------------------------------------------------
// 12. VALIDATE DIRECTORY DATA
//
// Returns errors and warnings.
// Warnings do not mean a facility is invalid.
// They identify information requiring further checking.
// ------------------------------------------------------------

export function validateChennaiDirectory(
  records = CHENNAI_FACILITIES
) {
  const errors = [];
  const warnings = [];

  if (!Array.isArray(records)) {
    return {
      valid: false,
      errors: ["Directory records must be an array."],
      warnings,
      total: 0
    };
  }

  const knownSourceIds = new Set(
    CHENNAI_DIRECTORY_SOURCES.map(source => source.id)
  );

  const seenIds = new Set();

  records.forEach((facility, index) => {
    const label = facility?.id || `record-${index + 1}`;

    if (!facility || typeof facility !== "object") {
      errors.push(`${label}: record must be an object.`);
      return;
    }

    if (!facility.id) {
      errors.push(`${label}: missing facility ID.`);
    } else if (seenIds.has(facility.id)) {
      errors.push(`${label}: duplicate facility ID.`);
    } else {
      seenIds.add(facility.id);
    }

    if (!facility.name?.trim()) {
      errors.push(`${label}: missing facility name.`);
    }

    if (!facility.locality?.trim()) {
      errors.push(`${label}: missing locality.`);
    }

    if (!facility.address?.trim()) {
      errors.push(`${label}: missing address.`);
    }

    if (
      !["government", "private", "unknown"].includes(
        facility.ownership
      )
    ) {
      errors.push(`${label}: invalid ownership value.`);
    }

    if (
      ![
        "hospital",
        "specialty-hospital",
        "uphc"
      ].includes(facility.facilityType)
    ) {
      errors.push(`${label}: invalid facility type.`);
    }

    if (!Array.isArray(facility.departments)) {
      errors.push(`${label}: departments must be an array.`);
    }

    if (
      !Array.isArray(facility.sourceIds) ||
      facility.sourceIds.length === 0
    ) {
      errors.push(`${label}: at least one source ID is required.`);
    } else {
      facility.sourceIds.forEach(sourceId => {
        if (!knownSourceIds.has(sourceId)) {
          errors.push(
            `${label}: unknown source ID "${sourceId}".`
          );
        }
      });
    }

    if (!facility.phone) {
      warnings.push(`${label}: phone number is not listed.`);
    }

    if (!facility.coordinates) {
      warnings.push(`${label}: verified coordinates are not available.`);
    }

    if (
      facility.recordStatus !== "verified"
    ) {
      warnings.push(
        `${label}: facility details require reconfirmation.`
      );
    }

    if (
      facility.doctorDirectoryStatus !== "verified"
    ) {
      warnings.push(
        `${label}: doctor directory is not verified or integrated.`
      );
    }

    if (facility.ownership === "unknown") {
      warnings.push(
        `${label}: ownership requires confirmation.`
      );
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    total: records.length
  };
}


// ------------------------------------------------------------
// 13. FILTER DROPDOWN OPTIONS
// ------------------------------------------------------------

export function getChennaiDirectoryFilterOptions(
  records = CHENNAI_FACILITIES
) {
  if (!Array.isArray(records)) {
    return {
      localities: [],
      departments: [],
      ownerships: [],
      facilityTypes: []
    };
  }

  const uniqueSorted = values =>
    [...new Set(values.filter(Boolean))]
      .sort((a, b) =>
        String(a).localeCompare(String(b), "en", {
          sensitivity: "base"
        })
      );

  const departments = records.flatMap(item =>
    Array.isArray(item.departments)
      ? item.departments
      : []
  );

  return {
    localities: uniqueSorted(
      records.map(item => item.locality)
    ),

    departments: uniqueSorted(departments),

    ownerships: uniqueSorted(
      records.map(item => item.ownership)
    ),

    facilityTypes: uniqueSorted(
      records.map(item => item.facilityType)
    )
  };
}


// ------------------------------------------------------------
// 14. SOURCE LINKS FOR A FACILITY
// ------------------------------------------------------------

export function getFacilitySourceLinks(
  facility,
  sources = CHENNAI_DIRECTORY_SOURCES
) {
  if (
    !facility ||
    !Array.isArray(facility.sourceIds) ||
    !Array.isArray(sources)
  ) {
    return [];
  }

  const sourceMap = new Map(
    sources.map(source => [source.id, source])
  );

  return facility.sourceIds
    .map(sourceId => sourceMap.get(sourceId))
    .filter(Boolean);
}


// ------------------------------------------------------------
// 15. GOOGLE MAPS SEARCH LINK
//
// This creates a search link, not a verified GPS coordinate.
// It must not be used to claim exact distance or nearest status.
// ------------------------------------------------------------

export function getFacilityMapUrl(facility) {
  if (
    !facility ||
    !facility.name ||
    !facility.address?.trim()
  ) {
    return null;
  }

  const searchText = [
    facility.name,
    facility.address,
    "Chennai",
    "Tamil Nadu",
    "India"
  ].join(", ");

  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(searchText)
  );
}


// ------------------------------------------------------------
// 16. GOOGLE MAPS DIRECTIONS LINK
// ------------------------------------------------------------

export function getFacilityDirectionsUrl(facility) {
  if (
    !facility ||
    !facility.name ||
    !facility.address?.trim()
  ) {
    return null;
  }

  const destination = [
    facility.name,
    facility.address,
    "Chennai",
    "Tamil Nadu",
    "India"
  ].join(", ");

  return (
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(destination)
  );
}


// ------------------------------------------------------------
// 17. PHONE CALL LINK
// ------------------------------------------------------------

export function getFacilityPhoneUrl(facility) {
  if (!facility?.phone) {
    return null;
  }

  const safePhone = String(facility.phone)
    .trim()
    .replace(/[^\d+]/g, "");

  if (!safePhone) {
    return null;
  }

  return `tel:${safePhone}`;
}


// ------------------------------------------------------------
// 18. DISPLAY STATUS
// ------------------------------------------------------------

export function getFacilityDisplayStatus(facility) {
  if (!facility) {
    return "Facility information unavailable";
  }

  if (facility.recordStatus === "verified") {
    return "Verified — check directly before visiting";
  }

  if (
    facility.recordStatus ===
    "officially-listed-needs-reconfirmation"
  ) {
    return "Listed in an official directory — reconfirm before visiting";
  }

  return "Verification status not confirmed";
}


// ------------------------------------------------------------
// 19. DIRECTORY EXPORT SUMMARY
// ------------------------------------------------------------

export const CHENNAI_DIRECTORY_SUMMARY =
  getChennaiDirectoryStats(CHENNAI_FACILITIES);
