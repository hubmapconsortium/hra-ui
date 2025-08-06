/**
 * Converts a string to sentence case
 * @param value String to convert
 * @returns String in sentence case
 */
export function sentenceCase(value: string): string {
  const processedValue = value.trim().toLowerCase();
  return processedValue.charAt(0).toUpperCase() + processedValue.slice(1);
}
