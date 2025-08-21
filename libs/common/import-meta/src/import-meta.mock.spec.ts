import { getImportMeta, getImportMetaUrl } from './import-meta.mock';

describe('ImportMeta Mock', () => {
  it('should provide mocked import.meta with url and resolve', () => {
    const importMeta = getImportMeta();

    expect(importMeta.url).toBe('file://import-meta.mock.ts');
    expect(importMeta.resolve).toBeInstanceOf(Function);
    expect(importMeta.resolve('test.js')).toBe('file://import-meta.mock.ts/test.js');
  });
});
