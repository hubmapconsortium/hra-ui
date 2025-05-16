import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { ActionCardOutlineDefaultListSchema } from '../types/action-card-outline-default.schema';
import { ActionCardOutlineDefaultListComponent } from './action-card-outline-default-list.component';

/** Content template definition for ActionCardOutlineDefaultListComponent */
export const ActionCardOutlineDefaultListDef: ContentTemplateDef<ActionCardOutlineDefaultListComponent> = {
  component: ActionCardOutlineDefaultListComponent,
  spec: ActionCardOutlineDefaultListSchema,
};
