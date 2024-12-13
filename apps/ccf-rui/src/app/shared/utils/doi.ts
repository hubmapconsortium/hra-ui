const DOI_BASE_URL = 'https://doi.org/';
const DOI_PREFIX = 'doi:';

export function addDoiBaseUrl(value: string): string {
  return value.startsWith(DOI_BASE_URL) ? value : DOI_BASE_URL + value;
}

export function removeDoiBase(value: string): string {
  value = value.trim().toLowerCase();
  if (value.startsWith(DOI_BASE_URL)) {
    return value.slice(DOI_BASE_URL.length);
  } else if (value.startsWith(DOI_PREFIX)) {
    return value.slice(DOI_PREFIX.length);
  }

  return value;
}

export function normalizeDoi(value: string): string | undefined {
  return addDoiBaseUrl(removeDoiBase(value));
}
