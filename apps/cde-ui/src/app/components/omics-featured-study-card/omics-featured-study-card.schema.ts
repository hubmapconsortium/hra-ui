import { ContentTemplateSchema, ProjectedContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Content template omics featured study card data */
export type OmicsFeaturedStudyCard = z.infer<typeof OmicsFeaturedStudyCardSchema>;

/** Schema for content template omics featured study card data */
export const OmicsFeaturedStudyCardSchema = ContentTemplateSchema.extend({
  component: z.literal('OmicsFeaturedStudyCard'),
  tagline: z.string(),
  taglineChips: z.array(z.string()).optional(),
  image: z.string().optional(),
  label: z.string().optional(),
  supportingText: z.string().optional(),
  tags: z.array(z.record(z.string(), z.string())).optional(),
  content: ProjectedContentTemplateSchema.optional(),
}).meta({ id: 'OmicsFeaturedStudyCard' });
