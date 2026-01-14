import LandingPageDataSchema, { LandingPageData } from './landing-page.schema';

describe('LandingPageDataSchema', () => {
  it('should be defined', () => {
    expect(LandingPageDataSchema).toBeDefined();
  });

  it('should parse valid landing page data', () => {
    const validData: LandingPageData = {
      $schema: '',
      carouselItems: [
        {
          tagline: 'Test Carousel',
          description: 'Test description',
          imageSrc: '/test.png',
          action: 'Learn More',
          link: { url: 'https://example.com' },
        },
      ],
      countInfo: [
        {
          count: 100,
          label: 'Datasets',
          icon: 'database',
        },
      ],
      sectionCardInfo: [
        {
          tagline: 'Explore',
          icon: 'explore',
          action: 'View',
        },
      ],
    };

    const result = LandingPageDataSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
