
export const TN_CLINICAL_ESTABLISHMENT_SOURCE_META = {
  state: "Tamil Nadu",
  authority: "Ministry of Health and Family Welfare, Government of India",
  sourceName: "Tamil Nadu Clinical Establishments",
  sourceIndexUrl:
    "https://clinicalestablishments.mohfw.gov.in/en/node/1390",

  webpageSubmissionDate: "2026-09-30",
  dataAsOf: "2025-06",
  partCount: 6,
  totalPdfPages: 2703,

  recordCount: null,
  recordCountNote:
    "The source index does not publish a consolidated record count. " +
    "Count only after extracting and validating all six parts.",

  sourceStatus:
    "published-registry-snapshot-needs-current-reconfirmation",

  disclaimer:
    "The listed inspection status and establishment information " +
    "reflect the source snapshot dated June 2025. They do not " +
    "prove that a facility is currently operational."
};


// ============================================================
// 1. ALL SIX OFFICIAL PDF PARTS
// ============================================================

export const TN_CLINICAL_ESTABLISHMENT_PDF_PARTS = [
  {
    id: "tn-ce-part-1",
    part: 1,
    name: "Tamil Nadu Clinical Establishments — Part 1",
    url:
      "https://clinicalestablishments.mohfw.gov.in/sites/default/files/2026-10/tamil%20page1%20data_with%20date.pdf",
    pageCount: 350
  },
  {
    id: "tn-ce-part-2",
    part: 2,
    name: "Tamil Nadu Clinical Establishments — Part 2",
    url:
      "https://clinicalestablishments.mohfw.gov.in/sites/default/files/2026-10/tamil%20page2_with_date.pdf",
    pageCount: 367
  },
  {
    id: "tn-ce-part-3",
    part: 3,
    name: "Tamil Nadu Clinical Establishments — Part 3",
    url:
      "https://clinicalestablishments.mohfw.gov.in/sites/default/files/2026-10/tamil%20page3_with_date.pdf",
    pageCount: 694
  },
  {
    id: "tn-ce-part-4",
    part: 4,
    name: "Tamil Nadu Clinical Establishments — Part 4",
    url:
      "https://clinicalestablishments.mohfw.gov.in/sites/default/files/2026-10/tamil%20page4_with_date.pdf",
    pageCount: 1027
  },
  {
    id: "tn-ce-part-5",
    part: 5,
    name: "Tamil Nadu Clinical Establishments — Part 5",
    url:
      "https://clinicalestablishments.mohfw.gov.in/sites/default/files/2026-10/tamil%20page5_with_date.pdf",
    pageCount: 150
  },
  {
    id: "tn-ce-part-6",
    part: 6,
    name: "Tamil Nadu Clinical Establishments — Part 6",
    url:
      "https://clinicalestablishments.mohfw.gov.in/sites/default/files/2026-10/tamil%20page6_with_date.pdf",
    pageCount: 115
  }
];


// ============================================================
// 2. SOURCE FIELD MAPPING
// ============================================================

export const TN_CLINICAL_ESTABLISHMENT_FIELDS = {
  sourceSerialNumber: "S.No",
  facilityName: "Name of Clinical Establishment",
  sourceInspectionStatus: "Inspection details",
  registeredAddress: "Address",
  sector: "Sector",
  systemOfMedicine: "System of Medicine",
  medicineSpeciality: "System of Medicine (Specify)",
  establishmentType: "Type of Establishment",
  establishmentSubtype: "Specify Establishment",
  numberOfBeds: "No of Beds",
  applicationDate: "Applied Date",

  excludedFromPublicDirectory: [
    "Register Email",
    "Register Mobile"
  ]
};


// ============================================================
// 3. SAFE PUBLIC DIRECTORY CLASSIFICATION
// ============================================================

export const TN_CLINICAL_ESTABLISHMENT_TYPES = [
  {
    value: "hospital",
    label: "Hospital"
  },
  {
    value: "clinic",
    label: "Clinic"
  },
  {
    value: "centre",
    label: "Centre"
  },
  {
    value: "nursing-home",
    label: "Nursing home"
  },
  {
    value: "maternity-home",
    label: "Maternity home"
  },
  {
    value: "diagnostic-centre",
    label: "Diagnostic centre"
  },
  {
    value: "dispensary",
    label: "Dispensary"
  },
  {
    value: "primary-health-centre",
    label: "Primary health centre"
  },
  {
    value: "other",
    label: "Other / review required"
  }
];

export const TN_SOURCE_INSPECTION_STATUSES = [
  "Verified",
  "Pending",
  "Rejected",
  "Unknown"
];


// ============================================================
// 4. IMPORT SAFETY RULES
// ============================================================

export const TN_CLINICAL_ESTABLISHMENT_IMPORT_POLICY = {
  keepOriginalSourceStatus: true,

  doNotConvertSourceVerifiedToCurrentOperational: true,

  doNotPublishRejectedAsVerified: true,

  doNotPublishPendingAsVerified: true,

  excludePersonalRegistrationEmail: true,

  excludeRegisteredPersonalMobile: true,

  requireDistrict: true,

  requireSourcePartReference: true,

  requireSourcePageReference: true,

  automaticDuplicateMerge: false,

  keepSourceHistory: true,

  requireManualReviewForAmbiguousCategory: true,

  requireCurrentReconfirmationBeforePublicVerifiedBadge: true
};


// ============================================================
// 5. SOURCE ACCESS HELPERS
// ============================================================

export function getTamilNaduClinicalEstablishmentPart(partNumber) {
  return (
    TN_CLINICAL_ESTABLISHMENT_PDF_PARTS.find(
      item => item.part === Number(partNumber)
    ) || null
  );
}

export function getTamilNaduClinicalEstablishmentTotalPages() {
  return TN_CLINICAL_ESTABLISHMENT_PDF_PARTS.reduce(
    (total, item) => total + item.pageCount,
    0
  );
}

export function validateTamilNaduClinicalEstablishmentSources() {
  const errors = [];
  const ids = new Set();

  for (const part of TN_CLINICAL_ESTABLISHMENT_PDF_PARTS) {
    if (ids.has(part.id)) {
      errors.push(`Duplicate source part ID: ${part.id}`);
    }

    ids.add(part.id);

    if (!part.url.startsWith("https://")) {
      errors.push(`Invalid source URL: ${part.id}`);
    }

    if (!Number.isInteger(part.pageCount) || part.pageCount <= 0) {
      errors.push(`Invalid page count: ${part.id}`);
    }
  }

  const totalPages =
    getTamilNaduClinicalEstablishmentTotalPages();

  if (totalPages !== TN_CLINICAL_ESTABLISHMENT_SOURCE_META.totalPdfPages) {
    errors.push("PDF page total does not match source metadata.");
  }

  return {
    valid: errors.length === 0,
    errors,
    totalParts: TN_CLINICAL_ESTABLISHMENT_PDF_PARTS.length,
    totalPages
  };
}
