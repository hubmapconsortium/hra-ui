import PublicationsPageDataSchema, { PublicationsPageData } from './publications-page.schema';

describe('PublicationsPageDataSchema', () => {
  it('should parse valid publications data', () => {
    const validData: PublicationsPageData = {
      '2024': ['<a href="/docs/publications/test1">Test Publication 2024</a>'],
      '2023': ['<a href="#">Author</a> - Title'],
    };

    const result = PublicationsPageDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
