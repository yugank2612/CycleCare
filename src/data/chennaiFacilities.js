// CycleCare — Chennai Healthcare Pilot
// Source-backed initial facility directory.
//
// IMPORTANT:
// This is an initial seed dataset, not a complete directory.
// Confirm operational status, contact numbers and services
// with each facility before public use.
//
// No patient health information is stored in this module.

export const CHENNAI_DIRECTORY_META = {
  district: "Chennai",
  state: "Tamil Nadu",
  pilot: true,
  scope: "Initial one-district prototype",
  lastChecked: "2026-11-13",

  disclaimer:
    "Directory information is based on published sources. " +
    "Confirm current services, contact details and availability " +
    "directly with the facility."
};

// Official directory sources.

export const CHENNAI_DIRECTORY_SOURCES = [
  {
    id: "district-hospitals-1",
    name: "Chennai District Administration — Hospitals",
    url: "https://chennai.nic.in/public-utility-category/hospitals/",
    publishedDate: "2026-11-11"
  },
  {
    id: "district-hospitals-2",
    name: "Chennai District Administration — Hospitals, Page 2",
    url: "https://chennai.nic.in/public-utility-category/hospitals/page/2/",
    publishedDate: "2026-10-23"
  },
  {
    id: "gcc-government-hospitals",
    name: "Greater Chennai Corporation — Government Hospitals",
    url: "https://chennaicorporation.gov.in/gcc/covid-vaccine/govt-hospital/"
  },
  {
    id: "gcc-uphc",
    name: "Greater Chennai Corporation — Urban Primary Health Centres",
    url: "https://chennaicorporation.gov.in/gcc/covid-vaccine/uphc/"
  },
  {
    id: "tn-health-dme",
    name: "Tamil Nadu Directorate of Medical Education",
    url: "https://www.tnhealth.org/tngovin/dme/dme.php"
  }
];

// Initial hospital and health-centre records.

export const CHENNAI_FACILITIES = [

  // =====================================
  // GOVERNMENT HOSPITALS
  // =====================================

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
    name:
      "Government Institute of Obstetrics and Gynaecology",
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

  // =====================================
  // PRIVATE HOSPITALS
  // =====================================

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

  // =====================================
  // GREATER CHENNAI CORPORATION UPHCs
  // =====================================

  {
    id: "chn-uphc-triplicane",
    name: "Triplicane Urban Primary Health Centre",
    facilityType: "uphc",
    ownership: "government",
    administrativeArea: "Greater Chennai Corporation",
    locality: "Triplicane",
    address:
      "No. 3, Dr. Besant Road, Triplicane, Chennai",
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
    address:
      "35, Ammaiappan Lane, Royapettah, Chennai",
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
    address:
      "Vannandurai Road, Besant Nagar, Chennai",
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

// Search utility: name, locality, address and PIN code.

function normalizeSearchValue(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .trim();
}

export function searchChennaiFacilities(
  records = CHENNAI_FACILITIES,
  {
    query = "",
    ownership = "all",
    facilityType = "all",
    department = ""
  } = {}
) {
  const normalizedQuery = normalizeSearchValue(query);
  const normalizedDepartment =
    normalizeSearchValue(department);

  if (!Array.isArray(records)) {
    return [];
  }

  return records.filter(facility => {
    const ownershipMatches =
      ownership === "all" ||
      facility.ownership === ownership;

    const typeMatches =
      facilityType === "all" ||
      facility.facilityType === facilityType;

    const searchableText = normalizeSearchValue([
      facility.name,
      facility.locality,
      facility.address,
      facility.postalCode,
      facility.administrativeArea
    ].filter(Boolean).join(" "));

    const queryMatches =
      !normalizedQuery ||
      searchableText.includes(normalizedQuery);

    const departmentMatches =
      !normalizedDepartment ||
      (facility.departments || []).some(item =>
        normalizeSearchValue(item).includes(
          normalizedDepartment
        )
      );

    return (
      ownershipMatches &&
      typeMatches &&
      queryMatches &&
      departmentMatches
    );
  });
}

// Open a map search without claiming an exact distance.

export function getFacilityMapUrl(facility) {
  if (!facility || !facility.address) {
    return null;
  }

  const searchText = [
    facility.name,
    facility.address,
    "Chennai Tamil Nadu India"
  ].join(", ");

  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(searchText)
  );
}
