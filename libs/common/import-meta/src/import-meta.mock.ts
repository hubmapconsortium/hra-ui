/**
 * Get a mocked version of `import.meta`
 *
 * @returns Mocked import.meta
 */
export function getImportMeta(): ImportMeta {
  return {
    url: getImportMetaUrl(),
    resolve: (path) => new URL(path, getImportMetaUrl()).toString(),
  } as ImportMeta;
}

/**
 * Get a mocked version of `import.meta.url`
 *
 * @returns Mocked import.meta.url
 */
export function getImportMetaUrl(): string {
  return 'file://import-meta.mock.ts';
}
