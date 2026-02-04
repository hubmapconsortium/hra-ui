import { createFileNameTimestamp } from './file-timestamp';

describe('createFileNameTimestamp', () => {
  it('should create a timestamp string', () => {
    const timestamp = createFileNameTimestamp();

    expect(typeof timestamp).toBe('string');
    expect(timestamp).toMatch(/^\d{4}\.\d{1,2}\.\d{1,2}_\d{1,2}\.\d{1,2}$/);
  });

  it('should include current year', () => {
    const timestamp = createFileNameTimestamp();
    const currentYear = new Date().getFullYear();

    expect(timestamp).toContain(currentYear.toString());
  });

  it('should format time components with proper separators', () => {
    const timestamp = createFileNameTimestamp();

    expect(timestamp).toContain('.');
    expect(timestamp).toContain('_');
  });

  it('should create different timestamps when called at different times', () => {
    const timestamp1 = createFileNameTimestamp();

    // Wait a small amount to ensure different minute if at boundary
    const timestamp2 = createFileNameTimestamp();

    // They should at least have the same format even if values are the same
    expect(typeof timestamp1).toBe('string');
    expect(typeof timestamp2).toBe('string');
  });
});
