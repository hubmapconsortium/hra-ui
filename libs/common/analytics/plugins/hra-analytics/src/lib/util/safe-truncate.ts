/** Options for safely truncating a query string */
export interface SafeTruncateOptions {
  /** Suffix to append to truncated values (URL-encoded) */
  truncatedSuffix?: string;
  /** Minimum length of truncated values (excluding suffix) */
  minValueLength?: number;
}

/**
 * Safely truncates a query string to a maximum length by truncating individual values.
 * The input query string is assumed to be URL-encoded.
 *
 * @param queryString The original query string
 * @param maxLength Maximum length of the query string
 * @param options Additional options for truncation
 * @returns A safely truncated query string
 * @throws Error if the query string cannot be truncated to the desired length
 */
export function safeTruncateQueryString(
  queryString: string,
  maxLength: number,
  options: SafeTruncateOptions = {},
): string {
  if (queryString.length <= maxLength) {
    return queryString;
  }

  const { truncatedSuffix = encodeURIComponent('... [truncated]'), minValueLength = 100 } = options;
  const pairs = queryString.split('&');
  const pairsByLength = [...pairs].sort((a, b) => b.length - a.length);
  let length = queryString.length;

  while (length > maxLength) {
    const current = pairsByLength.shift();
    if (!current) {
      throw new Error(`Unable to truncate query string to length ${maxLength}`);
    }

    const [key, value] = current.split('=');
    if (value.length <= minValueLength + truncatedSuffix.length) {
      throw new Error(`Unable to truncate any more values to minimum length ${minValueLength}`);
    }

    const newLength = Math.max(minValueLength, value.length - truncatedSuffix.length - (length - maxLength));
    const newValue = value.slice(0, newLength) + truncatedSuffix;
    const newPair = `${key}=${newValue}`;
    const index = pairs.indexOf(current);
    pairs[index] = newPair;
    length -= current.length - newPair.length;
  }

  return pairs.join('&');
}
