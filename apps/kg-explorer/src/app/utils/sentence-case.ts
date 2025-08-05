export function sentenceCase(value: string | null): string {
  if (!value) {
    return '';
  }
  const processedValue = value.trim().toLowerCase();
  return processedValue.charAt(0).toUpperCase() + processedValue.slice(1);
}
