
import React, { useMemo, useState } from "react";

import {
  Search,
  MapPin,
  Phone,
  ExternalLink,
  Navigation,
  Hospital,
  Building2,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Info,
  SlidersHorizontal,
  ClipboardList
} from "lucide-react";

import {
  CHENNAI_DIRECTORY_META,
  CHENNAI_DIRECTORY_SOURCES,
  CHENNAI_DIRECTORY_SUMMARY,
  CHENNAI_OWNERSHIP_OPTIONS,
  CHENNAI_FACILITY_TYPE_OPTIONS,
  CHENNAI_SORT_OPTIONS,
  paginateChennaiFacilities,
  getChennaiDirectoryFilterOptions,
  getFacilityMapUrl,
  getFacilityDirectionsUrl,
  getFacilityPhoneUrl,
  getFacilitySourceLinks,
  getFacilityDisplayStatus
} from "../data/chennaiFacilities";


// ============================================================
// HEALTHCARE FINDER — COMPONENT STYLES
// ============================================================

const finderStyles = `
.cc-dir {
  --cc-primary: #a65f80;
  --cc-primary-dark: #86506d;
  --cc-text: #403442;
  --cc-muted: #8c808c;
  --cc-border: #eee5eb;
  --cc-bg: #fffafd;
  color: var(--cc-text);
  width: 100%;
}

.cc-dir * {
  box-sizing: border-box;
}

.cc-dir-hero {
  border-radius: 18px;
  padding: 23px;
  margin-bottom: 17px;
  background: linear-gradient(120deg, #fbf0f6, #f8f3fb);
  border: 1px solid #f0e1eb;
}

.cc-dir-eyebrow {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--cc-primary);
}

.cc-dir-hero h2 {
  font-size: clamp(23px, 3vw, 32px);
  line-height: 1.2;
  margin: 10px 0 8px;
  color: var(--cc-text);
}

.cc-dir-hero p {
  font-size: 11px;
  line-height: 1.8;
  max-width: 650px;
  color: #847784;
  margin: 0;
}

.cc-dir-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 17px;
}

.cc-dir-stat {
  padding: 14px;
  border-radius: 13px;
  background: white;
  border: 1px solid var(--cc-border);
}

.cc-dir-stat strong {
  display: block;
  font-size: 22px;
  color: var(--cc-primary-dark);
  margin-bottom: 4px;
}

.cc-dir-stat span {
  font-size: 9px;
  line-height: 1.5;
  color: var(--cc-muted);
}

.cc-dir-panel {
  background: white;
  border: 1px solid var(--cc-border);
  border-radius: 15px;
  padding: 17px;
  margin-bottom: 16px;
}

.cc-dir-panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.cc-dir-panel-title h3 {
  font-size: 14px;
  margin: 0;
}

.cc-dir-panel-title svg {
  color: var(--cc-primary);
}

.cc-dir-search {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #eadde6;
  background: #fffafd;
  border-radius: 11px;
  padding: 0 13px;
  min-height: 45px;
  margin-bottom: 13px;
}

.cc-dir-search svg {
  flex-shrink: 0;
  color: var(--cc-primary);
}

.cc-dir-search input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  font: inherit;
  font-size: 11px;
  color: var(--cc-text);
}

.cc-dir-search input::placeholder {
  color: #b2a4b1;
}

.cc-dir-filters {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 11px;
}

.cc-dir-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.cc-dir-field label {
  font-size: 9px;
  font-weight: 700;
  color: #837582;
}

.cc-dir-field select {
  width: 100%;
  height: 39px;
  border: 1px solid var(--cc-border);
  border-radius: 9px;
  padding: 0 9px;
  background: white;
  color: var(--cc-text);
  font-size: 10px;
  outline-color: #c98dac;
}

.cc-dir-extra-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 13px;
  margin-top: 14px;
  padding-top: 13px;
  border-top: 1px solid #f3edf2;
}

.cc-dir-check {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 10px;
  color: #786c79;
}

.cc-dir-check input {
  accent-color: var(--cc-primary);
}

.cc-dir-reset {
  border: 1px solid #eadde6;
  border-radius: 8px;
  padding: 8px 11px;
  background: white;
  color: var(--cc-primary-dark);
  font-size: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.cc-dir-reset:hover {
  background: #fbf2f7;
}

.cc-dir-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 17px 0 12px;
  flex-wrap: wrap;
}

.cc-dir-count {
  font-size: 11px;
  color: var(--cc-muted);
}

.cc-dir-count strong {
  color: var(--cc-text);
  font-size: 14px;
}

.cc-dir-sort {
  display: flex;
  align-items: center;
  gap: 7px;
}

.cc-dir-sort label {
  font-size: 9px;
  color: var(--cc-muted);
}

.cc-dir-sort select {
  height: 34px;
  border: 1px solid var(--cc-border);
  border-radius: 8px;
  padding: 0 8px;
  background: white;
  font-size: 10px;
  color: var(--cc-text);
}

.cc-dir-results {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px;
}

.cc-dir-card {
  background: white;
  border: 1px solid var(--cc-border);
  border-radius: 14px;
  padding: 16px;
  min-width: 0;
}

.cc-dir-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 9px;
}

.cc-dir-card-icon {
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: #fbf1f6;
  display: grid;
  place-items: center;
  color: var(--cc-primary);
  flex-shrink: 0;
}

.cc-dir-card h3 {
  font-size: 13px;
  line-height: 1.5;
  margin: 11px 0 8px;
  color: var(--cc-text);
}

.cc-dir-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.cc-dir-badge {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 20px;
  background: #f7f1f5;
  color: #85637a;
  font-size: 8px;
  font-weight: 700;
}

.cc-dir-badge.gov {
  background: #edf5ef;
  color: #527d60;
}

.cc-dir-badge.private {
  background: #f0eff9;
  color: #6c6095;
}

.cc-dir-badge.unknown {
  background: #f5f1e9;
  color: #8b7951;
}

.cc-dir-detail {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin-top: 11px;
  font-size: 10px;
  line-height: 1.65;
  color: #857a87;
  overflow-wrap: anywhere;
}

.cc-dir-detail svg {
  flex-shrink: 0;
  margin-top: 1px;
  color: #b17a9a;
}

.cc-dir-detail b {
  color: #665969;
}

.cc-dir-status {
  margin-top: 12px;
  padding: 9px 10px;
  border-radius: 9px;
  background: #fff8e9;
  color: #927747;
  font-size: 9px;
  line-height: 1.6;
  display: flex;
  align-items: flex-start;
  gap: 7px;
}

.cc-dir-status svg {
  flex-shrink: 0;
}

.cc-dir-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 13px;
}

.cc-dir-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  border-radius: 8px;
  padding: 8px 10px;
  border: 1px solid #eadce5;
  color: var(--cc-primary-dark);
  font-size: 9px;
  font-weight: 700;
  background: white;
}

.cc-dir-action:hover {
  background: #fbf2f7;
}

.cc-dir-action.primary {
  color: white;
  background: var(--cc-primary);
  border-color: var(--cc-primary);
}

.cc-dir-sources {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #f2edf1;
}

.cc-dir-sources summary {
  cursor: pointer;
  color: #907b8e;
  font-size: 9px;
  font-weight: 700;
}

.cc-dir-sources a {
  display: block;
  font-size: 9px;
  color: var(--cc-primary-dark);
  text-decoration: underline;
  margin-top: 8px;
  overflow-wrap: anywhere;
}

.cc-dir-empty {
  grid-column: 1 / -1;
  padding: 30px 18px;
  text-align: center;
  border: 1px dashed #e8dce5;
  border-radius: 13px;
  color: var(--cc-muted);
}

.cc-dir-empty svg {
  color: #bd90a9;
}

.cc-dir-empty h3 {
  font-size: 14px;
  color: var(--cc-text);
}

.cc-dir-empty p {
  font-size: 10px;
  line-height: 1.7;
}

.cc-dir-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 20px 0;
}

.cc-dir-pagination button {
  border: 1px solid var(--cc-border);
  background: white;
  color: var(--cc-primary-dark);
  border-radius: 8px;
  padding: 8px 11px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
}

.cc-dir-pagination button:disabled {
  opacity: .4;
  cursor: not-allowed;
}

.cc-dir-pagination span {
  font-size: 10px;
  color: var(--cc-muted);
}

.cc-dir-notice {
  padding: 13px 15px;
  background: #f5f2fb;
  border: 1px solid #e9e3f2;
  border-radius: 11px;
  color: #756b83;
  font-size: 10px;
  line-height: 1.7;
  margin: 15px 0;
}

.cc-dir-source-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.cc-dir-source-list a {
  border: 1px solid var(--cc-border);
  background: white;
  padding: 11px;
  border-radius: 10px;
  color: var(--cc-primary-dark);
  text-decoration: none;
  font-size: 9px;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.cc-dir-source-list a:hover {
  background: #fff7fb;
}

.cc-dir-footer {
  font-size: 9px;
  line-height: 1.7;
  color: #998b98;
  margin-top: 14px;
}

@media (max-width: 850px) {
  .cc-dir-filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .cc-dir-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .cc-dir-hero {
    padding: 18px;
  }
  .cc-dir-results {
    grid-template-columns: 1fr;
  }
  .cc-dir-filters {
    grid-template-columns: 1fr;
  }
  .cc-dir-source-list {
    grid-template-columns: 1fr;
  }
  .cc-dir-panel {
    padding: 13px;
  }
}
`;


// ============================================================
// HELPER: DISPLAY LABELS
// ============================================================

function getOwnershipLabel(ownership) {
  if (ownership === "government") return "Government";
  if (ownership === "private") return "Private";
  return "Ownership not confirmed";
}

function getFacilityTypeLabel(type) {
  if (type === "uphc") return "Urban Primary Health Centre";
  if (type === "specialty-hospital") return "Specialty hospital";
  return "Hospital";
}

function getOwnershipClass(ownership) {
  if (ownership === "government") return "gov";
  if (ownership === "private") return "private";
  return "unknown";
}


// ============================================================
// FACILITY CARD
// ============================================================

function FacilityCard({ facility }) {
  const sourceLinks = getFacilitySourceLinks(facility);

  const mapUrl = getFacilityMapUrl(facility);
  const directionsUrl = getFacilityDirectionsUrl(facility);
  const phoneUrl = getFacilityPhoneUrl(facility);

  const status = getFacilityDisplayStatus(facility);

  const departments = Array.isArray(facility.departments)
    ? facility.departments
    : [];

  return (
    <article className="cc-dir-card">

      <div className="cc-dir-card-head">
        <div className="cc-dir-card-icon">
          {facility.facilityType === "uphc"
            ? <Building2 size={20}/>
            : <Hospital size={20}/>
          }
        </div>

        <div className="cc-dir-badges">
          <span className={`cc-dir-badge ${getOwnershipClass(facility.ownership)}`}>
            {getOwnershipLabel(facility.ownership)}
          </span>

          <span className="cc-dir-badge">
            {getFacilityTypeLabel(facility.facilityType)}
          </span>
        </div>
      </div>

      <h3>{facility.name}</h3>

      <div className="cc-dir-detail">
        <MapPin size={14}/>
        <span>
          <b>Address:</b> {facility.address}
        </span>
      </div>

      <div className="cc-dir-detail">
        <MapPin size={14}/>
        <span>
          <b>Locality:</b> {facility.locality}
          {facility.postalCode
            ? ` · PIN ${facility.postalCode}`
            : " · PIN not listed"
          }
        </span>
      </div>

      <div className="cc-dir-detail">
        <ClipboardList size={14}/>
        <span>
          <b>Departments:</b>{" "}
          {departments.length > 0
            ? departments.join(", ") + " (reconfirm)"
            : "Not specified in this record"
          }
        </span>
      </div>

      <div className="cc-dir-detail">
        <Phone size={14}/>
        <span>
          <b>Contact:</b>{" "}
          {facility.phone || "Not listed in current record"}
        </span>
      </div>

      <div className="cc-dir-status">
        <Info size={14}/>
        <span>{status}. Please contact the facility before visiting.</span>
      </div>

      <div className="cc-dir-actions">
        {phoneUrl && (
          <a className="cc-dir-action primary" href={phoneUrl}>
            <Phone size={13}/>
            Call
          </a>
        )}

        {mapUrl && (
          <a
            className="cc-dir-action"
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={13}/>
            View map
          </a>
        )}

        {directionsUrl && (
          <a
            className="cc-dir-action"
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Navigation size={13}/>
            Directions
          </a>
        )}
      </div>

      {sourceLinks.length > 0 && (
        <details className="cc-dir-sources">
          <summary>
            View official listing sources ({sourceLinks.length})
          </summary>

          {sourceLinks.map(source => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              {source.name}
              <ExternalLink size={11}/>
            </a>
          ))}
        </details>
      )}

    </article>
  );
}


// ============================================================
// MAIN HEALTHCARE FINDER
// ============================================================

export default function HealthcareFinder() {

  // Search and filter state.
  const [query, setQuery] = useState("");
  const [ownership, setOwnership] = useState("all");
  const [facilityType, setFacilityType] = useState("all");
  const [locality, setLocality] = useState("");
  const [department, setDepartment] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Sorting and pagination.
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const filterOptions = useMemo(
    () => getChennaiDirectoryFilterOptions(),
    []
  );

  const stats = CHENNAI_DIRECTORY_SUMMARY;

  const hasPhone =
    phoneFilter === "all"
      ? null
      : phoneFilter === "yes";

  const pageData = useMemo(
    () => paginateChennaiFacilities({
      query,
      ownership,
      facilityType,
      locality,
      department,
      hasPhone,
      verifiedOnly,
      sortBy,
      sortOrder,
      page,
      pageSize
    }),
    [
      query,
      ownership,
      facilityType,
      locality,
      department,
      hasPhone,
      verifiedOnly,
      sortBy,
      sortOrder,
      page,
      pageSize
    ]
  );

  function resetFilters() {
    setQuery("");
    setOwnership("all");
    setFacilityType("all");
    setLocality("");
    setDepartment("");
    setPhoneFilter("all");
    setVerifiedOnly(false);
    setSortBy("name");
    setSortOrder("asc");
    setPage(1);
    setPageSize(8);
  }

  function updateFilter(setter, value) {
    setter(value);
    setPage(1);
  }

  return (
    <section className="cc-dir">

      <style>{finderStyles}</style>

      {/* PAGE HEADER */}

      <div className="cc-dir-hero">
        <span className="cc-dir-eyebrow">
          CYCLECARE · CHENNAI PILOT
        </span>

        <h2>Find healthcare support.</h2>

        <p>
          Search the initial Chennai healthcare directory
          by facility name, locality or PIN code. Explore
          government and private facilities and open their
          published source records.
        </p>
      </div>


      {/* DIRECTORY STATISTICS */}

      <div className="cc-dir-stats">

        <div className="cc-dir-stat">
          <strong>{stats.total}</strong>
          <span>Prototype directory records</span>
        </div>

        <div className="cc-dir-stat">
          <strong>{stats.government}</strong>
          <span>Government-listed records</span>
        </div>

        <div className="cc-dir-stat">
          <strong>{stats.private}</strong>
          <span>Private-listed records</span>
        </div>

        <div className="cc-dir-stat">
          <strong>{stats.withPhone}</strong>
          <span>Records with a phone number</span>
        </div>

      </div>


      {/* SEARCH AND FILTER PANEL */}

      <div className="cc-dir-panel">

        <div className="cc-dir-panel-title">
          <Search size={18}/>
          <h3>Search healthcare facilities</h3>
        </div>

        <label className="cc-dir-search">
          <Search size={17}/>

          <input
            type="search"
            value={query}
            onChange={event =>
              updateFilter(setQuery, event.target.value)
            }
            placeholder="Hospital name, locality or PIN code..."
            aria-label="Search facility name, locality or PIN code"
          />
        </label>

        <div className="cc-dir-filters">

          <div className="cc-dir-field">
            <label htmlFor="cc-ownership">
              Ownership
            </label>

            <select
              id="cc-ownership"
              value={ownership}
              onChange={event =>
                updateFilter(setOwnership, event.target.value)
              }
            >
              {CHENNAI_OWNERSHIP_OPTIONS.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>


          <div className="cc-dir-field">
            <label htmlFor="cc-facility-type">
              Facility type
            </label>

            <select
              id="cc-facility-type"
              value={facilityType}
              onChange={event =>
                updateFilter(setFacilityType, event.target.value)
              }
            >
              {CHENNAI_FACILITY_TYPE_OPTIONS.map(option => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>


          <div className="cc-dir-field">
            <label htmlFor="cc-locality">
              Locality
            </label>

            <select
              id="cc-locality"
              value={locality}
              onChange={event =>
                updateFilter(setLocality, event.target.value)
              }
            >
              <option value="">All localities</option>

              {filterOptions.localities.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>


          <div className="cc-dir-field">
            <label htmlFor="cc-department">
              Listed department
            </label>

            <select
              id="cc-department"
              value={department}
              onChange={event =>
                updateFilter(setDepartment, event.target.value)
              }
            >
              <option value="">All / not specified</option>

              {filterOptions.departments.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>


          <div className="cc-dir-field">
            <label htmlFor="cc-phone">
              Contact availability
            </label>

            <select
              id="cc-phone"
              value={phoneFilter}
              onChange={event =>
                updateFilter(setPhoneFilter, event.target.value)
              }
            >
              <option value="all">All records</option>
              <option value="yes">Phone listed</option>
              <option value="no">Phone not listed</option>
            </select>
          </div>


          <div className="cc-dir-field">
            <label htmlFor="cc-page-size">
              Results per page
            </label>

            <select
              id="cc-page-size"
              value={pageSize}
              onChange={event => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
            >
              <option value={8}>8 records</option>
              <option value={12}>12 records</option>
              <option value={20}>20 records</option>
            </select>
          </div>

        </div>


        <div className="cc-dir-extra-filters">

          <label className="cc-dir-check">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={event =>
                updateFilter(setVerifiedOnly, event.target.checked)
              }
            />
            Only independently verified records
          </label>

          <button
            type="button"
            className="cc-dir-reset"
            onClick={resetFilters}
          >
            <RotateCcw size={13}/>
            Reset filters
          </button>

        </div>

      </div>


      {/* RESULTS TOOLBAR */}

      <div className="cc-dir-toolbar">

        <div className="cc-dir-count">
          <strong>{pageData.total}</strong> matching records
          <br/>
          Showing {pageData.items.length} on this page
        </div>

        <div className="cc-dir-sort">
          <SlidersHorizontal size={14}/>

          <label htmlFor="cc-sort">
            Sort by
          </label>

          <select
            id="cc-sort"
            value={sortBy}
            onChange={event =>
              updateFilter(setSortBy, event.target.value)
            }
          >
            {CHENNAI_SORT_OPTIONS.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="cc-dir-reset"
            onClick={() =>
              setSortOrder(value =>
                value === "asc" ? "desc" : "asc"
              )
            }
            aria-label="Change sort direction"
            title="Change sort direction"
          >
            {sortOrder === "asc" ? "A–Z" : "Z–A"}
          </button>
        </div>

      </div>


      {/* FACILITY RESULTS */}

      <div className="cc-dir-results">

        {pageData.items.length > 0 ? (
          pageData.items.map(facility => (
            <FacilityCard
              key={facility.id}
              facility={facility}
            />
          ))
        ) : (
          <div className="cc-dir-empty">
            <Filter size={27}/>

            <h3>No matching facilities found</h3>

            <p>
              Try another hospital name, PIN code or locality,
              or reset filters to view the initial directory.
            </p>

            <button
              type="button"
              className="cc-dir-reset"
              onClick={resetFilters}
            >
              <RotateCcw size={13}/>
              Clear search
            </button>
          </div>
        )}

      </div>


      {/* PAGINATION */}

      {pageData.totalPages > 1 && (
        <div className="cc-dir-pagination">

          <button
            type="button"
            disabled={!pageData.hasPreviousPage}
            onClick={() =>
              setPage(value => Math.max(1, value - 1))
            }
          >
            <ChevronLeft size={14}/>
            Previous
          </button>

          <span>
            Page {pageData.page} of {pageData.totalPages}
          </span>

          <button
            type="button"
            disabled={!pageData.hasNextPage}
            onClick={() =>
              setPage(value =>
                Math.min(pageData.totalPages, value + 1)
              )
            }
          >
            Next
            <ChevronRight size={14}/>
          </button>

        </div>
      )}


      {/* DIRECTORY NOTICE */}

      <div className="cc-dir-notice">
        <ShieldCheck size={16}/>{" "}
        <strong>Directory transparency:</strong>{" "}
        {CHENNAI_DIRECTORY_META.disclaimer}
        No exact distance, doctor affiliation, department availability,
        OPD schedule or appointment availability is claimed by this
        prototype. Contact the facility directly before visiting.
      </div>


      {/* OFFICIAL SOURCES */}

      <div className="cc-dir-panel">

        <div className="cc-dir-panel-title">
          <ExternalLink size={17}/>
          <h3>Official directory sources</h3>
        </div>

        <div className="cc-dir-source-list">
          {CHENNAI_DIRECTORY_SOURCES.map(source => (
            <a
              key={source.id}
              href={source.url}
              target="_blank"
              rel="noreferrer"
            >
              {source.name}
              <br/>
              <span>Open source record ↗</span>
            </a>
          ))}
        </div>

        <p className="cc-dir-footer">
          Pilot district: {CHENNAI_DIRECTORY_META.district},{" "}
          {CHENNAI_DIRECTORY_META.state}. Directory review
          date: {CHENNAI_DIRECTORY_META.lastChecked}.
          Official listing does not establish current operational
          status or medical-service availability.
        </p>

      </div>

    </section>
  );
}
