const ORCID_BASE_URL = 'https://orcid.org/';

export function addOrcidBaseUrl(value: string): string {
  return value.startsWith(ORCID_BASE_URL) ? value : ORCID_BASE_URL + value;
}

export function removeOrcidBaseUrl(value: string): string {
  value = value.trim().toLowerCase();
  if (value.startsWith(ORCID_BASE_URL)) {
    return value.slice(ORCID_BASE_URL.length);
  }

  return value;
}

export function normalizeOrcid(value: string): string | undefined {
  value = removeOrcidBaseUrl(value);
  value = value.replace(/-/g, '');
  if (value.length !== 16) {
    return undefined;
  }

  value = value.replace(/(\w{4})(?!$)/g, '$1-');
  return addOrcidBaseUrl(value);
}
