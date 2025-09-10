import { AnyContentTemplateDef } from '@hra-ui/cdk/content-template';

import { GridContainerComponent } from '../grid-container.component';
import { GridContainerSchema } from './grid-container.schema';

/** GridContainer content template definition */
export const GridContainerDef: AnyContentTemplateDef = {
  component: GridContainerComponent,
  spec: GridContainerSchema,
  projectedProperties: {
    '*': 'content',
  },
};
