import { AnyContentTemplateDef } from '@hra-ui/cdk/content-template';
import { StudiesGridComponent } from '../studies-grid.component';
import { StudiesGridSchema } from './studies-grid.schema';

/** Content template definition for StudiesGrid */
export const StudiesGridDef: AnyContentTemplateDef = {
  component: StudiesGridComponent,
  spec: StudiesGridSchema,
};
