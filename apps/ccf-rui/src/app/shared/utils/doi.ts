/** doi url base */
const DOI_BASE_URL = 'https://doi.org/';
/** doi id prefix */
const DOI_PREFIX = 'doi:';

/** Adds the doi base if not already present */
export function addDoiBaseUrl(value: string): string {
  return value.startsWith(DOI_BASE_URL) ? value : DOI_BASE_URL + value;
}

/** Removes the doi base and prefix */
export function removeDoiBase(value: string): string {
  value = value.trim().toLowerCase();
  if (value.startsWith(DOI_BASE_URL)) {
    return value.slice(DOI_BASE_URL.length);
  } else if (value.startsWith(DOI_PREFIX)) {
    return value.slice(DOI_PREFIX.length);
  }

  return value;
}

/** Normalizes a doi id */
export function normalizeDoi(value: string): string | undefined {
  return addDoiBaseUrl(removeDoiBase(value));
}
