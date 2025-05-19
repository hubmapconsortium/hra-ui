import { AnyContentTemplateDef } from '@hra-ui/cdk/content-template';

import { FlexContainerComponent } from '../flex-container.component';
import { FlexContainerSchema } from '../types/flex-container.schema';

/** FlexContainer content template definition */
export const FlexContainerDef: AnyContentTemplateDef = {
  component: FlexContainerComponent,
  spec: FlexContainerSchema,
  projectedProperties: {
    '*': 'content',
  },
};
