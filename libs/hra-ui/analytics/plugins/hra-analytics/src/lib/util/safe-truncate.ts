/** Options for safely truncating a query string */
export interface SafeTruncateOptions {
  /** Suffix to append to truncated values */
  suffix?: string;
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

  const { suffix = '... [truncated]', minValueLength = 100 } = options;
  const encodedSuffix = encodeURIComponent(suffix);
  const pairs = queryString.split('&');
  // Sort from shortest to longest and use Array#pop to process each pair
  const pairsByLength = [...pairs].sort((a, b) => a.length - b.length);
  let length = queryString.length;

  while (length > maxLength) {
    const current = pairsByLength.pop();
    if (!current) {
      throw new Error(`Unable to truncate query string to length ${maxLength}`);
    }

    const [key, value] = current.split('=');
    if (!value || value.length <= minValueLength + encodedSuffix.length) {
      throw new Error(`Unable to truncate any more values to minimum length ${minValueLength}`);
    }

    const newValue = safeTruncateQueryValue(value, minValueLength, length - maxLength, encodedSuffix);
    const newPair = `${key}=${newValue}`;
    const index = pairs.indexOf(current);
    pairs[index] = newPair;
    length -= current.length - newPair.length;
  }

  return pairs.join('&');
}

/**
 * Safely truncate a query string value to a maximum length by ensuring that URL-encoded characters are not cut in half.
 *
 * @param value The original value (URL-encoded)
 * @param minLength Minimum length of the truncated value (excluding suffix)
 * @param truncateLength Desired length to truncate to (excluding suffix)
 * @param suffix Suffix to append to the truncated value (URL-encoded)
 * @returns A safely truncated value with the suffix appended
 */
function safeTruncateQueryValue(value: string, minLength: number, truncateLength: number, suffix: string): string {
  const candidateLength = Math.max(minLength, value.length - suffix.length - truncateLength);
  const lastEncodedIndex = value.lastIndexOf('%', candidateLength);
  let length: number;
  if (lastEncodedIndex < 0 || candidateLength - lastEncodedIndex > 2) {
    length = candidateLength;
  } else if (candidateLength === minLength) {
    length = lastEncodedIndex + 3;
  } else {
    length = lastEncodedIndex;
  }

  return value.slice(0, length) + suffix;
}
