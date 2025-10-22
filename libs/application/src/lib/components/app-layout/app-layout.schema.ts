import { ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { IconListSchema } from '@hra-ui/design-system/icons';
import { z } from 'zod';

/** App layout data type */
export type AppLayoutData = z.infer<typeof AppLayoutDataSchema>;

/** Schema for app layout data */
export const AppLayoutDataSchema = z.object({
  $schema: z.string(),
  banner: z
    .object({
      title: z.string(),
      imgSrc: z.string().optional(),
    })
    .optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  icons: IconListSchema.optional(),
  action: z
    .object({
      label: z.string(),
      url: z.string(),
    })
    .optional(),
  headerContent: ProjectedContentTemplateSchema.optional(),
  content: ProjectedContentTemplateSchema,
});
