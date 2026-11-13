
// CycleCare — Tamil Nadu DME institutional snapshot
// Source: Tamil Nadu Directorate of Medical Education
// https://www.tnhealth.org/tngovin/dme/dme.php
//
// Source checked: 2026-11-13
//
// IMPORTANT:
// This is a source-transcription dataset, not a verified
// operational hospital directory.
// The source page does not provide complete addresses,
// PIN codes, phone numbers or current service availability.
// Do not publish missing information as verified.
// DME institutional rows are kept separate from private
// hospital imports and other directorate datasets.

export const TN_DME_SOURCE = {
  id: "tn-dme-hospitals",
  name: "Tamil Nadu Directorate of Medical Education",
  url: "https://www.tnhealth.org/tngovin/dme/dme.php",
  sourceCheckedOn: "2026-11-13",
  sourcePublicationDate: null,
  authority: "Government of Tamil Nadu",
  sourceNote:
    "The DME page states 50 hospitals and 13 dispensaries. " +
    "Its numbered institutional table has 51 rows, including " +
    "entries that need category reconciliation. Preserve all " +
    "source rows and do not assume every row is a hospital."
};


// ============================================================
// 1. OFFICIAL TAMIL NADU DISTRICT INDEX
// Source: NHM Tamil Nadu district-wise ROP page.
// ============================================================

export const TAMIL_NADU_DISTRICTS = [
  "Ariyalur",
  "Chennai",
  "Chengalpattu",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kancheepuram",
  "Kanniyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivagangai",
  "Tenkasi",
  "Thanjavur",
  "Tirupattur",
  "The Nilgiris",
  "Theni",
  "Thiruvallur",
  "Thiruvarur",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tiruppur",
  "Tiruvannamalai",
  "Vellore",
  "Villupuram",
  "Virudhunagar"
];


// ============================================================
// 2. OFFICIAL NHM PUBLIC PRIMARY-CARE SNAPSHOT
// Source: 51st Executive Committee Meeting, 17 July 2026.
// These are aggregate counts, NOT individual facility records.
// 46 HUDs are health-unit districts, not 46 civil districts.
// ============================================================

export const TN_NHM_PRIMARY_CARE_SNAPSHOT_2026 = {
  sourceName:
    "NHM Tamil Nadu — 51st Executive Committee Meeting, Part A",

  sourceUrl:
    "https://nhm.tn.gov.in/wp-content/uploads/2026/51st_EC-Part-A-Final.pdf",

  sourceDate: "2026-07-17",

  healthUnitDistricts: 46,

  counts: {
    blockPHCandCHC: 388,
    urbanCHC: 39,
    ruralPHC: 1443,
    urbanPHC: 466,
    total: 2336
  },

  recordType: "aggregate-infrastructure-count",

  importAsFacilityRecords: false,

  note:
    "The report provides aggregated health infrastructure " +
    "counts by HUD. It does not provide 2,336 named " +
    "individual facilities in this table."
};


// ============================================================
// 3. DME INSTITUTIONAL DIRECTORY SNAPSHOT
//
// Tuple format:
// [sourceSerial, idSuffix, name, district, locality, type]
//
// type:
// teaching-hospital
// hospital
// specialty-hospital
// specialty-institute
// allied-health-college
// public-health-collection-centre
// ============================================================

const DME_INSTITUTION_ROWS = [

  [1, "rgggh", "Rajiv Gandhi Government General Hospital",
    "Chennai", "Chennai", "teaching-hospital"],

  [2, "stanley", "Government Stanley Hospital",
    "Chennai", "Chennai", "teaching-hospital"],

  [3, "kilpauk", "Kilpauk Medical College Hospital",
    "Chennai", "Kilpauk", "teaching-hospital"],

  [4, "chengalpattu", "Chengalpattu Medical College Hospital",
    "Chengalpattu", "Chengalpattu", "teaching-hospital"],

  [5, "thanjavur-mch", "Thanjavur Medical College Hospital",
    "Thanjavur", "Thanjavur", "teaching-hospital"],

  [6, "raja-mirasdar", "Government Raja Mirasdar Hospital",
    "Thanjavur", "Thanjavur", "hospital"],

  [7, "rajaji", "Government Rajaji Hospital",
    "Madurai", "Madurai", "teaching-hospital"],

  [8, "coimbatore-mch", "Coimbatore Medical College Hospital",
    "Coimbatore", "Coimbatore", "teaching-hospital"],

  [9, "tirunelveli-mch", "Tirunelveli Medical College Hospital",
    "Tirunelveli", "Tirunelveli", "teaching-hospital"],

  [10, "salem-mch", "Mohan Kumaramangalam Medical College Hospital",
    "Salem", "Salem", "teaching-hospital"],

  [11, "mgm-trichy", "Mahatma Gandhi Memorial Hospital",
    "Tiruchirappalli", "Tiruchirappalli", "teaching-hospital"],

  [12, "thoothukudi-mch", "Thoothukudi Medical College Hospital",
    "Thoothukudi", "Thoothukudi", "teaching-hospital"],

  [13, "vellore-mch", "Vellore Medical College Hospital",
    "Vellore", "Vellore", "teaching-hospital"],

  [14, "kanyakumari-mch", "Kanyakumari Medical College Hospital",
    "Kanniyakumari", "Asaripallam", "teaching-hospital"],

  [15, "theni-mch", "Theni Medical College Hospital",
    "Theni", "Theni", "teaching-hospital"],

  [16, "dharmapuri-mch", "Dharmapuri Medical College Hospital",
    "Dharmapuri", "Dharmapuri", "teaching-hospital"],

  [17, "villupuram-mch", "Villupuram Medical College Hospital",
    "Villupuram", "Mundiyambakkam", "teaching-hospital"],

  [18, "thiruvarur-mch", "Thiruvarur Medical College Hospital",
    "Thiruvarur", "Thiruvarur", "teaching-hospital"],

  [19, "sivaganga-mch", "Sivaganga Medical College Hospital",
    "Sivagangai", "Sivagangai", "teaching-hospital"],

  [20, "tiruvannamalai-mch", "Thiruvannamalai Medical College Hospital",
    "Tiruvannamalai", "Tiruvannamalai", "teaching-hospital"],

  [21, "karur-mch", "Government Medical College Hospital, Karur",
    "Karur", "Karur", "teaching-hospital"],

  [22, "pudukkottai-mch", "Government Medical College Hospital, Pudukkottai",
    "Pudukkottai", "Pudukkottai", "teaching-hospital"],

  [23, "royapettah-ncd", "Institute of Non Communicable Diseases and Government Royapettah Hospital",
    "Chennai", "Royapettah", "specialty-hospital"],

  [24, "iog-egmore", "Institute of Obstetrics and Gynaecology and Government Hospital for Women and Children",
    "Chennai", "Egmore", "specialty-hospital"],

  [25, "ich-egmore", "Institute of Child Health and Hospital for Children",
    "Chennai", "Egmore", "specialty-hospital"],

  [26, "ophthalmic-chennai", "Regional Institute of Ophthalmology and Government Ophthalmic Hospital",
    "Chennai", "Chennai", "specialty-hospital"],

  [27, "mental-health-chennai", "Institute of Mental Health",
    "Chennai", "Chennai", "specialty-institute"],

  [28, "kasturba-chennai", "Institute of Social Obstetrics and Government Kasturba Gandhi Hospital for Women and Children",
    "Chennai", "Triplicane", "specialty-hospital"],

  [29, "rsrm-chennai", "Government RSRM Lying-in Hospital",
    "Chennai", "Royapuram", "specialty-hospital"],

  [30, "thoracic-tambaram", "Government Hospital for Thoracic Medicine",
    "Chengalpattu", "Tambaram", "specialty-hospital"],

  [31, "thiruotteeswarar", "Government Thiruotteeswarar Hospital for Thoracic Medicine",
    "Chennai", "Otteri", "specialty-hospital"],

  [32, "thoracic-chetpet", "Institute of Thoracic Medicine",
    "Chennai", "Chetpet", "specialty-institute"],

  [33, "peripheral-anna-nagar", "Government Peripheral Hospital, Anna Nagar",
    "Chennai", "Anna Nagar", "hospital"],

  [34, "peripheral-kk-nagar", "Government Peripheral Hospital, K.K. Nagar",
    "Chennai", "K.K. Nagar", "hospital"],

  [35, "peripheral-tondiarpet", "Government Peripheral Hospital, Tondiarpet",
    "Chennai", "Tondiarpet", "hospital"],

  [36, "peripheral-periyar-nagar", "Government Peripheral Hospital, Periyar Nagar",
    "Chennai", "Periyar Nagar", "hospital"],

  [37, "rehabilitation-kk-nagar", "Government Institute of Rehabilitation Medicine",
    "Chennai", "K.K. Nagar", "specialty-institute"],

  [38, "dental-college-chennai", "Tamil Nadu Government Dental College and Hospital",
    "Chennai", "Chennai", "teaching-hospital"],

  [39, "cancer-institute-kancheepuram", "A.A.M. Cancer Institute",
    "Kancheepuram", "Kancheepuram", "specialty-institute"],

  [40, "cancer-hospital-karapettai", "A.A.M. Cancer Hospital",
    "Kancheepuram", "Karapettai", "specialty-hospital"],

  [41, "physiotherapy-trichy", "College of Physiotherapy",
    "Tiruchirappalli", "Tiruchirappalli", "allied-health-college"],

  [42, "rajaji-tb-trichy", "Government Rajaji TB Hospital",
    "Tiruchirappalli", "Tiruchirappalli", "specialty-hospital"],

  [43, "balarengapuram", "Government Hospital, Balarengapuram",
    "Madurai", "Balarengapuram", "hospital"],

  [44, "thoracic-thoppur", "Government Hospital of Thoracic Medicine",
    "Madurai", "Thoppur", "specialty-hospital"],

  [45, "cholera-thoppur", "Cholera Collection Centre",
    "Madurai", "Thoppur", "public-health-collection-centre"],

  [46, "infectious-thoppur", "Infectious Diseases Hospital",
    "Madurai", "Thoppur", "specialty-hospital"],

  [47, "ramasamy-kandiaperi", "P.A. Ramasamy Memorial Government Hospital",
    "Tirunelveli", "Kandiaperi", "hospital"],

  [48, "multi-super-speciality-omandurar", "Tamil Nadu Government Multi Super Speciality Hospital",
    "Chennai", "Omandurar Government Estate", "specialty-hospital"],

  [49, "omandurar-mch", "Government Medical College Hospital, Omandurar",
    "Chennai", "Omandurar Government Estate", "teaching-hospital"],

  [50, "esi-coimbatore", "Government Medical College and ESI Hospital",
    "Coimbatore", "Coimbatore", "teaching-hospital"],

  [51, "irt-perundurai", "IRT Perundurai Medical College and Hospital",
    "Erode", "Perundurai", "teaching-hospital"]
];


// ============================================================
// 4. NORMALIZED DME INSTITUTION RECORDS
// ============================================================

function makeDmeRecord(row) {
  const [
    serial,
    slug,
    name,
    district,
    locality,
    facilityType
  ] = row;

  const isHospitalCandidate = [
    "hospital",
    "teaching-hospital",
    "specialty-hospital"
  ].includes(facilityType);

  return {
    id: `tn-dme-${slug}`,
    sourceSerialNo: serial,

    name,
    state: "Tamil Nadu",
    district,
    locality,

    facilityType,
    ownership: "government",
    controllingDirectorate: "DME",

    // Not present in the source row.
    address: null,
    postalCode: null,
    phone: null,
    website: null,
    coordinates: null,

    departments: [],
    sourceIds: [TN_DME_SOURCE.id],
    sourceName: TN_DME_SOURCE.name,
    sourceUrl: TN_DME_SOURCE.url,

    recordStatus: "officially-listed-needs-reconfirmation",
    verificationDate: null,
    sourceCheckedOn: TN_DME_SOURCE.sourceCheckedOn,

    hospitalCandidate: isHospitalCandidate,
    classificationNeedsReview: !isHospitalCandidate,

    notes:
      "Transcribed from the DME institutional directory. " +
      "Confirm current name, classification, location and operation."
  };
}

export const TAMIL_NADU_DME_INSTITUTIONS =
  DME_INSTITUTION_ROWS.map(makeDmeRecord);


// ============================================================
// 5. DME DISPENSARIES — SEPARATE FROM HOSPITALS
// ============================================================

const DME_DISPENSARY_ROWS = [
  ["secretariat", "Government Secretariat Dispensary", "Chennai", "Chennai"],
  ["mla-hostel", "Government MLA Hostel Dispensary", "Chennai", "Chennai"],
  ["rajbhavan", "Government Raj Bhavan Dispensary", "Chennai", "Guindy"],
  ["high-court-chennai", "Government High Court Dispensary", "Chennai", "Chennai"],
  ["queen-marys", "Government Dispensary, Queen Mary's College", "Chennai", "Chennai"],
  ["foreshore", "Government Foreshore Estate Dispensary", "Chennai", "Foreshore Estate"],
  ["modern-medicine", "Modern Medicine Dispensary", "Chennai", "Chennai"],
  ["todhunter", "Todhunter Nagar Dispensary", "Chennai", "Todhunter Nagar"],
  ["press", "Government Press Dispensary", "Chennai", "Chennai"],
  ["chepauk", "Chepauk Dispensary", "Chennai", "Chepauk"],
  ["dpi", "DPI Complex Dispensary", "Chennai", "Chennai"],
  ["lady-willington", "Government Lady Willington Dispensary", "Chennai", "Chennai"],
  ["high-court-madurai", "Government High Court Dispensary", "Madurai", "Madurai"]
];

export const TAMIL_NADU_DME_DISPENSARIES =
  DME_DISPENSARY_ROWS.map(
    ([slug, name, district, locality], index) => ({
      id: `tn-dme-dispensary-${slug}`,
      sourceSerialNo: index + 1,
      name,
      state: "Tamil Nadu",
      district,
      locality,
      facilityType: "dispensary",
      ownership: "government",
      controllingDirectorate: "DME",
      address: null,
      postalCode: null,
      phone: null,
      coordinates: null,
      departments: [],
      sourceIds: [TN_DME_SOURCE.id],
      sourceName: TN_DME_SOURCE.name,
      sourceUrl: TN_DME_SOURCE.url,
      recordStatus: "officially-listed-needs-reconfirmation",
      verificationDate: null,
      sourceCheckedOn: TN_DME_SOURCE.sourceCheckedOn
    })
  );


// ============================================================
// 6. OTHER DME INSTITUTION — NOT A HOSPITAL
// ============================================================

export const TAMIL_NADU_DME_OTHER_INSTITUTIONS = [
  {
    id: "tn-dme-king-institute",
    name: "King Institute of Preventive Medicine",
    state: "Tamil Nadu",
    district: "Chennai",
    locality: "Guindy",
    facilityType: "public-health-institute",
    ownership: "government",
    controllingDirectorate: "DME",
    address: null,
    postalCode: null,
    phone: null,
    coordinates: null,
    departments: [],
    sourceIds: [TN_DME_SOURCE.id],
    sourceName: TN_DME_SOURCE.name,
    sourceUrl: TN_DME_SOURCE.url,
    recordStatus: "officially-listed-needs-reconfirmation",
    verificationDate: null,
    sourceCheckedOn: TN_DME_SOURCE.sourceCheckedOn
  }
];


// ============================================================
// 7. COMPLETE DME SOURCE SNAPSHOT
// These datasets remain separate by facility type.
// ============================================================

export const TAMIL_NADU_DME_ALL_RECORDS = [
  ...TAMIL_NADU_DME_INSTITUTIONS,
  ...TAMIL_NADU_DME_DISPENSARIES,
  ...TAMIL_NADU_DME_OTHER_INSTITUTIONS
];


// ============================================================
// 8. LOOKUP AND VALIDATION HELPERS
// ============================================================

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("en-IN")
    .trim()
    .replace(/\s+/g, " ");
}

export function normalizeTamilNaduDistrict(value) {
  const normalized = normalizeText(value);

  const aliases = {
    "chengalpet": "Chengalpattu",
    "chengalpet district": "Chengalpattu",
    "kanchipuram": "Kancheepuram",
    "kancheepuram": "Kancheepuram",
    "kanyakumari": "Kanniyakumari",
    "nagercoil": "Kanniyakumari",
    "nilgiris": "The Nilgiris",
    "ooty": "The Nilgiris",
    "trichy": "Tiruchirappalli",
    "tiruchirapalli": "Tiruchirappalli",
    "tuticorin": "Thoothukudi",
    "thoothukudi": "Thoothukudi",
    "ramnad": "Ramanathapuram",
    "pudukottai": "Pudukkottai",
    "sivaganga": "Sivagangai",
    "tirupattur": "Tirupattur",
    "thiruvallur": "Thiruvallur"
  };

  if (aliases[normalized]) {
    return aliases[normalized];
  }

  return (
    TAMIL_NADU_DISTRICTS.find(
      district => normalizeText(district) === normalized
    ) || null
  );
}

export function getTamilNaduDmeRecordsByDistrict(
  district,
  records = TAMIL_NADU_DME_ALL_RECORDS
) {
  const canonicalDistrict =
    normalizeTamilNaduDistrict(district);

  if (!canonicalDistrict || !Array.isArray(records)) {
    return [];
  }

  return records.filter(
    record => record.district === canonicalDistrict
  );
}

export function getTamilNaduDmeHospitalCandidates() {
  return TAMIL_NADU_DME_INSTITUTIONS.filter(
    record => record.hospitalCandidate === true
  );
}

export function getTamilNaduDmeReviewQueue() {
  return TAMIL_NADU_DME_INSTITUTIONS.filter(
    record => record.classificationNeedsReview
  );
}

export function validateTamilNaduDmeSnapshot() {
  const errors = [];
  const ids = new Set();

  for (const record of TAMIL_NADU_DME_ALL_RECORDS) {
    if (ids.has(record.id)) {
      errors.push(`Duplicate ID: ${record.id}`);
    }

    ids.add(record.id);

    if (!record.name) {
      errors.push(`Missing name: ${record.id}`);
    }

    if (!TAMIL_NADU_DISTRICTS.includes(record.district)) {
      errors.push(
        `Unknown district "${record.district}" in ${record.id}`
      );
    }

    if (!record.sourceIds?.includes(TN_DME_SOURCE.id)) {
      errors.push(`Missing DME source reference: ${record.id}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    totalDistricts: TAMIL_NADU_DISTRICTS.length,
    institutionRows: TAMIL_NADU_DME_INSTITUTIONS.length,
    dispensaryRows: TAMIL_NADU_DME_DISPENSARIES.length,
    otherInstitutionRows: TAMIL_NADU_DME_OTHER_INSTITUTIONS.length,
    allDmeRecords: TAMIL_NADU_DME_ALL_RECORDS.length,
    hospitalCandidates: getTamilNaduDmeHospitalCandidates().length,
    classificationReviewRequired: getTamilNaduDmeReviewQueue().length
  };
}
