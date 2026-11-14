
export const TN_NUHM_SOURCE = {
  id: "tn-nhm-nuhm-urban-health",
  name: "NHM Tamil Nadu — National Urban Health Mission",
  url: "https://nhm.tn.gov.in/ta/nuhm-copy/",
  sourceCheckedOn: "2026-11-14"
};

// Counts from the published NHM table.
// These are aggregate counts, not individual facility records.

export const TN_NUHM_URBAN_INFRASTRUCTURE = [
  {
    areaGroup: "Greater Chennai Corporation",
    uphc: 140,
    uchc: 16,
    maternityCentres: 3,
    uhwc: 200,
    total: 359
  },
  {
    areaGroup: "Rest of Tamil Nadu — Corporations",
    uphc: 206,
    uchc: 22,
    maternityCentres: 0,
    uhwc: 410,
    total: 638
  },
  {
    areaGroup: "Rest of Tamil Nadu — Municipalities",
    uphc: 117,
    uchc: 1,
    maternityCentres: 0,
    uhwc: 98,
    total: 216
  }
];

export const TN_NUHM_TABLE_TOTALS = {
  uphc: 463,
  uchc: 39,
  maternityCentres: 3,
  uhwc: 708,
  total: 1213
};

// The same source page separately reports 485 UPHCs.
// Preserve both figures until the authority confirms the correct total.

export const TN_NUHM_NARRATIVE_TOTALS = {
  uphc: 485,
  municipalities: 138,
  corporations: 25
};

export const TN_NUHM_RECONCILIATION = {
  metric: "UPHC",
  tableCount: 463,
  narrativeCount: 485,
  difference: 22,
  status: "needs-official-reconfirmation",
  publishSingleTotal: false
};

export const TN_NUHM_SNAPSHOT_META = {
  recordType: "aggregate-only",
  individualFacilitiesIncluded: false,
  importAsFacilityRecords: false,
  districtWiseAddressesIncluded: false,
  operationalStatusVerified: false
};

export function validateTamilNaduNuhmSnapshot() {
  const calculated = TN_NUHM_URBAN_INFRASTRUCTURE.reduce(
    (result, row) => ({
      uphc: result.uphc + row.uphc,
      uchc: result.uchc + row.uchc,
      maternityCentres:
        result.maternityCentres + row.maternityCentres,
      uhwc: result.uhwc + row.uhwc,
      total: result.total + row.total
    }),
    { uphc: 0, uchc: 0, maternityCentres: 0, uhwc: 0, total: 0 }
  );

  const errors = [];

  for (const key of Object.keys(calculated)) {
    if (calculated[key] !== TN_NUHM_TABLE_TOTALS[key]) {
      errors.push(`Incorrect aggregate total: ${key}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    calculated,
    reconciliation: TN_NUHM_RECONCILIATION
  };
}
