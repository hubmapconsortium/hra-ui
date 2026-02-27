import { PublicationDataSchema, PublicationData } from './publications-page.schema';

describe('PublicationsPageDataSchema', () => {
  it('should parse valid publications data', () => {
    const validData: PublicationData = [
      {
        dateStart: new Date('2024-01-01'),
        description: 'Test Publication 2024',
      },
      {
        dateStart: new Date('2023-01-01'),
        description: 'Test Publication 2023 by Author',
      },
    ];

    const result = PublicationDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
