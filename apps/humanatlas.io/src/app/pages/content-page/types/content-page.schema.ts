import { AnyContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { toCategoryLogoId } from '@hra-ui/design-system/brand/category-logo';
import { toOrganLogoId } from '@hra-ui/design-system/brand/organ-logo';
import { toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { z } from 'zod';

/** Content page type */
export type ContentPageData = z.infer<typeof ContentPageDataSchema>;

/** Schema for content page data */
export const ContentPageDataSchema = z.object({
  // schema: z.string().optional(),
  title: z.string(),
  subtitle: z.string(),
  category: z.string().transform(toCategoryLogoId).optional(),
  product: z.string().transform(toProductLogoId).optional(),
  organ: z.string().transform(toOrganLogoId).optional(),
  actionUrl: z.string().url().optional(),
  actionName: z.string().optional(),
  content: AnyContentTemplateSchema.array(),
});
