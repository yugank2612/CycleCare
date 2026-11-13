
export const TAMIL_NADU_DIRECTORY_CONFIG = {
  state: "Tamil Nadu",
  country: "India",
  scope: "Statewide",
  districts: 38,
  initialReviewDate: "2026-11-13",

  policy: {
    requireSourceReference: true,
    requireUniqueFacilityId: true,
    requireFacilityClassification: true,
    preserveImportHistory: true,
    autoMergeDuplicates: false,
    publishUnverifiedRecords: false,
    deleteMissingRecordsAutomatically: false
  }
};

export const TAMIL_NADU_DIRECTORY_SOURCES = [
  {
    id: "tn-clinical-establishment-gazette",
    name: "Tamil Nadu Clinical Establishment Registration",
    authority: "Tamil Nadu Health and Family Welfare Department",
    url: "https://www.stationeryprinting.tn.gov.in/gazette.php",
    sourceType: "government-gazette",
    coverage: [
      "private-hospital",
      "nursing-home",
      "maternity-hospital",
      "clinic",
      "diagnostic-centre"
    ],
    priority: "primary",
    accessStatus: "annual-publication-and-registry-access-to-confirm",
    automationReady: false,
    notes:
      "Primary legal-registration source to investigate. " +
      "Identify the latest applicable registered-establishment list."
  },

  {
    id: "tn-cmchis-hospital-empanelment",
    name: "Tamil Nadu CMCHIS Empanelled Hospitals",
    authority: "Tamil Nadu Health Systems Project",
    url: "https://cmchistn.com/empanelment",
    sourceType: "government-empanelment-portal",
    coverage: [
      "government-hospital",
      "private-hospital",
      "phc",
      "uphc",
      "other-empanelled-healthcare-entities"
    ],
    priority: "primary-supplement",
    publishedRecordCount: 2157,
    recordCountMeaning:
      "Portal-listed empanelment records, not 2,157 verified hospitals.",
    accessStatus: "public-directory-with-excel-export",
    automationReady: false,
    notes:
      "Classify each entity before importing. " +
      "Exclude administrative and non-facility entries from hospital records."
  },

  {
    id: "tn-cmchis-speciality",
    name: "CMCHIS Speciality-wise Hospital List",
    authority: "Tamil Nadu Health Systems Project",
    url:
      "https://www.cmchistn.com/empanelment/speciality-wise-hospital-list",
    sourceType: "government-empanelment-portal",
    coverage: [
      "government-hospital",
      "private-hospital",
      "specialty-hospital"
    ],
    priority: "secondary-cross-check",
    accessStatus: "public-directory-with-excel-export",
    automationReady: false,
    notes:
      "Use as a speciality and ownership cross-check. " +
      "Do not count these records again when they match CMCHIS master IDs."
  },

  {
    id: "tn-cmchis-medical-colleges",
    name: "CMCHIS Medical College Hospitals",
    authority: "Tamil Nadu Health Systems Project",
    url: "https://cmchistn.com/ppt/hospitals",
    sourceType: "government-directory",
    coverage: [
      "medical-college",
      "teaching-hospital"
    ],
    priority: "secondary-cross-check",
    accessStatus: "public-directory-with-excel-export",
    automationReady: false,
    notes:
      "Cross-check institutional names and associated hospitals."
  },

  {
    id: "tn-dme-hospitals",
    name: "Directorate of Medical Education — Hospitals",
    authority: "Tamil Nadu Directorate of Medical Education",
    url: "https://www.tnhealth.org/tngovin/dme/dme.php",
    sourceType: "government-directorate-directory",
    coverage: [
      "medical-college",
      "teaching-hospital",
      "specialty-hospital",
      "government-dispensary"
    ],
    priority: "primary-government",
    accessStatus: "public-directory",
    automationReady: false,
    notes:
      "Contains government teaching institutions, hospitals, " +
      "associated hospitals and dispensaries."
  },

  {
    id: "tn-dms-hospitals",
    name: "Directorate of Medical and Rural Health Services",
    authority: "Tamil Nadu DMS",
    url: "https://www.tnhealth.org/policynote/dms.htm",
    sourceType: "government-directorate-directory",
    coverage: [
      "district-headquarters-hospital",
      "taluk-hospital",
      "non-taluk-hospital",
      "women-and-children-hospital",
      "tb-hospital",
      "dispensary"
    ],
    priority: "primary-government",
    accessStatus: "public-policy-source",
    automationReady: false,
    notes:
      "Use current official lists for individual facility records. " +
      "Do not treat historical category counts as current facility data."
  },

  {
    id: "tn-nhm-primary-care",
    name: "National Health Mission Tamil Nadu — Primary Care",
    authority: "National Health Mission Tamil Nadu",
    url: "https://nhm.tn.gov.in/universal-health-coverage-uhc/",
    sourceType: "government-health-network",
    coverage: [
      "phc",
      "uphc",
      "chc",
      "health-and-wellness-centre",
      "health-sub-centre"
    ],
    priority: "primary-primary-care",
    accessStatus: "public-network-information",
    automationReady: false,
    notes:
      "Use separate facility categories. Network totals alone do not create individual address records."
  },

  {
    id: "tn-nhm-district-records",
    name: "NHM Tamil Nadu — District Records",
    authority: "National Health Mission Tamil Nadu",
    url: "https://nhm.tn.gov.in/district/",
    sourceType: "district-government-records",
    coverage: [
      "district-health-infrastructure",
      "district-programme-records"
    ],
    priority: "supplementary",
    accessStatus: "public-district-records",
    automationReady: false,
    notes:
      "Use district-wise approved records to cross-check facility coverage."
  },

  {
    id: "abdm-health-facility-registry",
    name: "Ayushman Bharat Digital Mission — Health Facility Registry",
    authority: "National Health Authority",
    url: "https://facility.ndhm.gov.in/",
    sourceType: "national-health-facility-registry",
    coverage: [
      "government-hospital",
      "private-hospital",
      "clinic",
      "diagnostic-centre",
      "other-health-facility"
    ],
    priority: "primary-cross-state",
    accessStatus: "public-registry-access-and-api-permissions-to-confirm",
    automationReady: false,
    notes:
      "Use official facility identifiers where permitted. " +
      "Do not assume unrestricted bulk export or API access."
  }
];

export function getTamilNaduDirectorySource(sourceId) {
  return (
    TAMIL_NADU_DIRECTORY_SOURCES.find(
      source => source.id === sourceId
    ) || null
  );
}

export function getTamilNaduSourcesByPriority(priority) {
  return TAMIL_NADU_DIRECTORY_SOURCES.filter(
    source => source.priority === priority
  );
}

export function getTamilNaduSourcesByCoverage(category) {
  return TAMIL_NADU_DIRECTORY_SOURCES.filter(
    source => source.coverage.includes(category)
  );
}

export function getTamilNaduSourceSummary() {
  return {
    totalSources: TAMIL_NADU_DIRECTORY_SOURCES.length,

    primarySources:
      TAMIL_NADU_DIRECTORY_SOURCES.filter(
        source => source.priority.startsWith("primary")
      ).length,

    automationReady:
      TAMIL_NADU_DIRECTORY_SOURCES.filter(
        source => source.automationReady
      ).length,

    pendingAccessConfirmation:
      TAMIL_NADU_DIRECTORY_SOURCES.filter(
        source => !source.automationReady
      ).length
  };
}
