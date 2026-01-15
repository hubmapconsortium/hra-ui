import ContentPageSchema, {
  ActionCardSchema,
  ApiCommandSchema,
  ButtonSchema,
  ClassesSchema,
  DataViewerSchema,
  DataViewerWithQueryParamsSchema,
  FlexContainerSchema,
  GridContainerSchema,
  IconSchema,
  ImageSchema,
  MarkdownSchema,
  PageSectionSchema,
  PageTableSchema,
  ProfileCardSchema,
  ReleaseNotesVersionSelectorSchema,
  StylesSchema,
  SummaryStatisticsTableSchema,
  TextHyperlinkSchema,
  VersionedDataTableSchema,
  YouTubePlayerSchema,
} from './content-page.schema';

describe('ContentPageSchema', () => {
  it('should export ActionCardSchema', () => {
    expect(ActionCardSchema).toBeDefined();
  });

  it('should export ApiCommandSchema', () => {
    expect(ApiCommandSchema).toBeDefined();
  });

  it('should export ButtonSchema', () => {
    expect(ButtonSchema).toBeDefined();
  });

  it('should export ClassesSchema', () => {
    expect(ClassesSchema).toBeDefined();
  });

  it('should export DataViewerSchema', () => {
    expect(DataViewerSchema).toBeDefined();
  });

  it('should export DataViewerWithQueryParamsSchema', () => {
    expect(DataViewerWithQueryParamsSchema).toBeDefined();
  });

  it('should export FlexContainerSchema', () => {
    expect(FlexContainerSchema).toBeDefined();
  });

  it('should export GridContainerSchema', () => {
    expect(GridContainerSchema).toBeDefined();
  });

  it('should export IconSchema', () => {
    expect(IconSchema).toBeDefined();
  });

  it('should export ImageSchema', () => {
    expect(ImageSchema).toBeDefined();
  });

  it('should export MarkdownSchema', () => {
    expect(MarkdownSchema).toBeDefined();
  });

  it('should export PageSectionSchema', () => {
    expect(PageSectionSchema).toBeDefined();
  });

  it('should export PageTableSchema', () => {
    expect(PageTableSchema).toBeDefined();
  });

  it('should export ProfileCardSchema', () => {
    expect(ProfileCardSchema).toBeDefined();
  });

  it('should export ReleaseNotesVersionSelectorSchema', () => {
    expect(ReleaseNotesVersionSelectorSchema).toBeDefined();
  });

  it('should export StylesSchema', () => {
    expect(StylesSchema).toBeDefined();
  });

  it('should export SummaryStatisticsTableSchema', () => {
    expect(SummaryStatisticsTableSchema).toBeDefined();
  });

  it('should export TextHyperlinkSchema', () => {
    expect(TextHyperlinkSchema).toBeDefined();
  });

  it('should export VersionedDataTableSchema', () => {
    expect(VersionedDataTableSchema).toBeDefined();
  });

  it('should export YouTubePlayerSchema', () => {
    expect(YouTubePlayerSchema).toBeDefined();
  });

  it('should export default schema that returns ContentPageDataSchema', () => {
    expect(ContentPageSchema).toBeDefined();
    expect(ContentPageSchema._def).toBeDefined();
  });

  it('should parse valid content page data', () => {
    const validData = {
      $schema: '',
      title: 'Test Page',
      subtitle: 'Test Subtitle',
      content: [],
    };

    const result = ContentPageSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid content page data', () => {
    const invalidData = {
      title: 'Test Page',
    };

    const result = ContentPageSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
