import { createReleaseNotesContentResolver } from './release-notes-content.resolver';

describe('createReleaseNotesContentResolver', () => {
  it('should create a resolver function', () => {
    const resolver = createReleaseNotesContentResolver('https://example.com');

    expect(typeof resolver).toBe('function');
  });
});
