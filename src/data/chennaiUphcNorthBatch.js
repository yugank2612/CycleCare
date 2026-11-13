
// CycleCare — Chennai UPHC Expansion
// Batch 1: Northern Chennai source-listed UPHC records.
//
// Source: Greater Chennai Corporation — List of Urban
// Primary Health Centres:
// https://chennaicorporation.gov.in/gcc/covid-vaccine/uphc/
//
// IMPORTANT:
// These are directory-listed records, not independently
// verified operational facilities.
// Phone numbers and full PIN codes were not supplied
// in these source entries.
// Health Posts, Unit Offices and ambiguous PHC entries
// are intentionally excluded from this batch.

export const CHENNAI_UPHC_NORTH_BATCH_META = {
  district: "Chennai",
  state: "Tamil Nadu",
  batch: "North Chennai — Batch 1",
  sourceId: "gcc-uphc",
  sourceUrl:
    "https://chennaicorporation.gov.in/gcc/covid-vaccine/uphc/",
  sourceCheckedOn: "2026-11-13",
  recordCount: 20,
  verificationStatus: "officially-listed-needs-reconfirmation",
  disclaimer:
    "Records are transcribed from a Greater Chennai Corporation " +
    "directory. Confirm current operation, address and services " +
    "directly before public use."
};

export const CHENNAI_UPHC_NORTH_BATCH = [

  // ==========================================
  // THIRUVOTTIYUR ZONE
  // ==========================================

  {
    id: "chn-uphc-kathivakkam",
    name: "Kathivakkam UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Thiruvottiyur",
    division: "2",
    sourceSerialNo: "1",
    locality: "Kathivakkam",
    address:
      "No. 3/392, Kathivakkam High Road, Ennore, Chennai - 57",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-ernavoor",
    name: "Ernavoor UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Thiruvottiyur",
    division: "4",
    sourceSerialNo: "2",
    locality: "Ernavoor",
    address:
      "B.No. 63, All Indio Radio Nagar, Tsunami Quarters, Ernavoor, Chennai - 57",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-kuppam",
    name: "Kuppam UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Thiruvottiyur",
    division: "6",
    sourceSerialNo: "3",
    locality: "Jothi Nagar",
    address:
      "No. 1, School Street, Jothi Nagar, Chennai - 19",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-thiruvottiyur",
    name: "Thiruvottiyur UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Thiruvottiyur",
    division: "11",
    sourceSerialNo: "4",
    locality: "Thiruvottiyur",
    address:
      "No. 945, Thiruvottiyur High Road, Chennai - 19",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-sathangadu",
    name: "Sathangadu UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Thiruvottiyur",
    division: "12",
    sourceSerialNo: "5",
    locality: "Kaladipet",
    address:
      "No. 9A, Balakrishna Naidu Colony, 2nd Street, Kaladipet, Thiruvottiyur, Chennai - 19",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-thaangal",
    name: "Thaangal UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Thiruvottiyur",
    division: "14",
    sourceSerialNo: "6",
    locality: "Kaladipet",
    address:
      "No. 3/2, Poongavanapuram Main Street, Kaladipet, Chennai - 19",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },


  // ==========================================
  // MANALI ZONE
  // ==========================================

  {
    id: "chn-uphc-manali",
    name: "Manali UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Manali",
    division: "21",
    sourceSerialNo: "8",
    locality: "Manali",
    address:
      "No. 1, Nedunchezhian Salai, Manali, Chennai - 68",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-puzhal",
    name: "Puzhal UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Manali",
    division: "22",
    sourceSerialNo: "9",
    locality: "Puzhal",
    address:
      "Gandhi Main Road, Puzhal, Chennai - 66",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-madhavaram",
    name: "Madhavaram UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Manali",
    division: "26",
    sourceSerialNo: "10",
    locality: "Madhavaram",
    address:
      "Swamy Nagar, Madhavaram, Chennai - 60",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },


  // ==========================================
  // MADHAVARAM ZONE
  // ==========================================

  {
    id: "chn-uphc-kannabiran",
    name: "Kannabiran UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Madhavaram",
    division: "31",
    sourceSerialNo: "11",
    locality: "Madhavaram",
    address:
      "Kannabiran Koil Street, Madhavaram, Chennai - 60",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-lakshmipuram",
    name: "Lakshmipuram UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Madhavaram",
    division: "32",
    sourceSerialNo: "12",
    locality: "Lakshmipuram",
    address:
      "Gangaiamman Koil Street, Lakshmipuram, Chennai - 99",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-vivekanandha",
    name: "Vivekanandha UPHC (Kodungaiyur II)",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Madhavaram",
    division: "35",
    sourceSerialNo: "14",
    locality: "Vivekananda Nagar",
    address:
      "No. 39, Appar Street, Vivekananda Nagar, Kodungaiyur, Chennai - 118",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-sharma-nagar",
    name: "Sharma Nagar UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Madhavaram",
    division: "36",
    sourceSerialNo: "15",
    locality: "Vyasarpadi",
    address:
      "No. 66, S.A. Colony, 8th Street, Vyasarpadi, Chennai - 39",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-vyasarpadi",
    name: "Vyasarpadi UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Madhavaram",
    division: "37",
    sourceSerialNo: "16",
    locality: "Vyasarpadi",
    address:
      "No. 155A, 14th Cross Street, MKB Nagar, Vyasarpadi, Chennai - 39",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-rk-nagar",
    name: "R.K. Nagar UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Madhavaram",
    division: "38",
    sourceSerialNo: "17",
    locality: "Tondiarpet",
    address:
      "No. 140, Annai Sandhya Nagar, 1st Street, Tondiarpet, Chennai - 81",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-new-washermenpet",
    name: "New Washermenpet UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Madhavaram",
    division: "39",
    sourceSerialNo: "18",
    locality: "New Washermenpet",
    address:
      "No. 4, Cheriyan Nagar, 4th Street, New Washermenpet, Chennai - 81",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-voc-nagar",
    name: "V.O.C. Nagar (Jeeva Nagar) UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Madhavaram",
    division: "40",
    sourceSerialNo: "19",
    locality: "Tondiarpet",
    address:
      "No. 1, Chelliamman Koil Street, Tondiarpet, Chennai - 81",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },


  // ==========================================
  // TONDIARPET ZONE
  // ==========================================

  {
    id: "chn-uphc-korukkupet",
    name: "Korukkupet UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Tondiarpet",
    division: "41",
    sourceSerialNo: "20",
    locality: "Korukkupet",
    address:
      "No. 15, Amman Koil Street, Sivaji Nagar, Korukkupet, Chennai - 21",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-jeeva-nagar",
    name: "Jeeva Nagar UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Tondiarpet",
    division: "42",
    sourceSerialNo: "21",
    locality: "Tondiarpet",
    address:
      "No. 602, T.H. Road, Tondiarpet, Chennai - 81",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  },

  {
    id: "chn-uphc-tondiarpet",
    name: "Tondiarpet UPHC",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    zone: "Tondiarpet",
    division: "43",
    sourceSerialNo: "22",
    locality: "Tondiarpet",
    address:
      "52, Kasima Nagar, 3rd Street, Chennai - 13",
    postalCode: null,
    phone: null,
    departments: [],
    coordinates: null,
    sourceIds: ["gcc-uphc"],
    recordStatus: "officially-listed-needs-reconfirmation",
    doctorDirectoryStatus: "not-integrated"
  }

];
