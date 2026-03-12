import { safeTruncateQueryString } from './safe-truncate';

describe('safeTruncateQueryString', () => {
  const longValue = 'a'.repeat(500);
  const mediumValue = 'b'.repeat(300);
  const shortValue = 'c'.repeat(50);
  const suffix = encodeURIComponent('... [truncated]');

  it('should return unchanged string when already under max length', () => {
    const queryString = `key1=${shortValue}&key2=${mediumValue}`;
    const result = safeTruncateQueryString(queryString, 1000);
    expect(result).toEqual(queryString);
  });

  it('should truncate values to meet max length requirement', () => {
    const queryString = `key1=${longValue}&key2=${shortValue}`;
    const result = safeTruncateQueryString(queryString, 400);
    expect(result.length).toBeLessThanOrEqual(400);
    expect(result).toMatch(new RegExp(`key1=a+${suffix}`));
    expect(result).toContain(`key2=${shortValue}`);
  });

  it('should prioritize truncating longest values first', () => {
    const queryString = `a=${shortValue}&b=${longValue}&c=${mediumValue}`;
    const result = safeTruncateQueryString(queryString, 600);
    expect(result.length).toBeLessThanOrEqual(600);
    expect(result).toContain(`a=${shortValue}`);
    expect(result).toMatch(new RegExp(`b=a+${suffix}`));
    expect(result).toContain(`c=${mediumValue}`);
  });

  it('should handle multiple value truncations', () => {
    const queryString = `key1=${longValue}&key2=${longValue}&key3=${longValue}`;
    const result = safeTruncateQueryString(queryString, 800);
    const truncatedCount = result.match(new RegExp(suffix, 'g'))?.length ?? 0;
    expect(result.length).toBeLessThanOrEqual(800);
    expect(truncatedCount).toBeGreaterThanOrEqual(2);
  });

  it('should use a custom suffix for truncated values', () => {
    const queryString = `key=${longValue}`;
    const customSuffix = '[...]';
    const result = safeTruncateQueryString(queryString, 200, {
      suffix: customSuffix,
    });
    expect(result.length).toBeLessThanOrEqual(200);
    expect(result).toMatch(new RegExp(`key=a+${encodeURIComponent(customSuffix)}`));
  });

  it('should not truncate values below minimum length', () => {
    const queryString = `key=${longValue}`;
    const minValueLength = 400;
    const length = minValueLength + 4 + suffix.length;
    const result = safeTruncateQueryString(queryString, length, { minValueLength });
    expect(result.length).toBeLessThanOrEqual(length);
    expect(result).toMatch(new RegExp(`key=a{${minValueLength}}${suffix}`));
  });

  it('should throw error when unable to reach target length', () => {
    const queryString = `key=${longValue}`;
    const targetLength = 10;
    expect(() => safeTruncateQueryString(queryString, targetLength)).toThrow(
      `Unable to truncate query string to length ${targetLength}`,
    );
  });

  it('should throw error when unable to reach target length due to minValueLength', () => {
    const queryString = `key=${longValue}`;
    const minValueLength = 1000;
    expect(() => safeTruncateQueryString(queryString, 100, { minValueLength })).toThrow(
      `Unable to truncate any more values to minimum length ${minValueLength}`,
    );
  });

  it('should not truncate in the middle of a percent-encoded character', () => {
    const queryString = `key=${encodeURIComponent(' '.repeat(300))}`;
    const minValueLength = 50;
    for (let offset = 0; offset < 3; offset++) {
      const result = safeTruncateQueryString(queryString, 200 + offset, { minValueLength });
      expect(result.length).toBeLessThanOrEqual(200 + offset);
      expect(result).not.toMatch(/%\w?$/);
    }
  });
});
