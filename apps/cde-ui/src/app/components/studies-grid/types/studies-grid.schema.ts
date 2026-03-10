import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Schema for StudiesGrid component */
export const StudiesGridSchema = ContentTemplateSchema.extend({
  component: z.literal('StudiesGrid'),
}).meta({ id: 'StudiesGrid' });
