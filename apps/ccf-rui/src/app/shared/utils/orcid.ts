/**
 * Base URL for ORCID identifiers.
 */
const ORCID_BASE_URL = 'https://orcid.org/';

/**
 * Adds the ORCID base URL to a given value if it does not already start with it.
 * @param value - The value to which the ORCID base URL should be added.
 * @returns The value with the ORCID base URL prepended if it was not already present.
 */
export function addOrcidBaseUrl(value: string): string {
  return value.startsWith(ORCID_BASE_URL) ? value : ORCID_BASE_URL + value;
}

/**
 * Removes the ORCID base URL from a given value if it starts with it.
 * @param value - The value from which the ORCID base URL should be removed.
 * @returns The value without the ORCID base URL.
 */
export function removeOrcidBaseUrl(value: string): string {
  value = value.trim().toLowerCase();
  if (value.startsWith(ORCID_BASE_URL)) {
    return value.slice(ORCID_BASE_URL.length);
  }

  return value;
}

/**
 * Normalizes an ORCID identifier by removing the base URL and hyphens,
 * then reformatting it with hyphens and adding the base URL back.
 * @param value - The ORCID identifier to be normalized.
 * @returns The normalized ORCID identifier with the base URL, or undefined if the input is invalid.
 */
export function normalizeOrcid(value: string): string | undefined {
  value = removeOrcidBaseUrl(value);
  value = value.replace(/-/g, '');
  if (value.length !== 16) {
    return undefined;
  }

  value = value.replace(/(\w{4})(?!$)/g, '$1-');
  return addOrcidBaseUrl(value);
}
