import { AnyContentTemplateDef, ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { StudiesGridComponent } from './studies-grid.component';
import * as z from 'zod';

/** Schema for StudiesGrid component */
export const StudiesGridSchema = ContentTemplateSchema.extend({
  component: z.literal('StudiesGrid'),
  yamlUrl: z.string().describe('URL to YAML file containing studies data'),
}).meta({ id: 'StudiesGrid' });

/** Content template definition for StudiesGrid */
export const StudiesGridDef: AnyContentTemplateDef = {
  component: StudiesGridComponent,
  spec: StudiesGridSchema,
};
