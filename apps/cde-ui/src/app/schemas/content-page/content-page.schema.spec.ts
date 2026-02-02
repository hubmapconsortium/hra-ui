import ContentPageSchema, {
  AnyContentTemplateSchema,
  ApiCommandSchema,
  ButtonSchema,
  ClassesSchema,
  FlexContainerSchema,
  GridContainerSchema,
  IconSchema,
  ImageSchema,
  MarkdownSchema,
  PageSectionSchema,
  PageTableSchema,
  StylesSchema,
  TextHyperlinkSchema,
} from './content-page.schema';

describe('ContentPageSchema', () => {
  it('should export AnyContentTemplateSchema', () => {
    expect(AnyContentTemplateSchema).toBeDefined();
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

  it('should export StylesSchema', () => {
    expect(StylesSchema).toBeDefined();
  });

  it('should export TextHyperlinkSchema', () => {
    expect(TextHyperlinkSchema).toBeDefined();
  });

  it('should export ContentPageSchema as default', () => {
    expect(ContentPageSchema).toBeDefined();
  });
});
