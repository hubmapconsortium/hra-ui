import ReleaseNotesVersionsSchema, { ReleaseNotesVersions } from './release-notes-version.schema';

describe('ReleaseNotesVersionsSchema', () => {
  it('should parse valid release notes versions data', () => {
    const validData: ReleaseNotesVersions = {
      $schema: '',
      versions: [
        {
          version: 'v1.2.3',
          label: 'Version 1.2.3',
          date: '2024-01-15',
        },
        {
          version: 'v1.2.2',
          label: 'Version 1.2.2',
          date: '2024-01-01',
        },
      ],
    };

    const result = ReleaseNotesVersionsSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
