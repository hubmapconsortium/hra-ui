import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { ActionCardComponent } from './action-card.component';
import { ActionCardSchema } from './action-card.schema';

/** Content template definition for action card */
export const ActionCardDef: ContentTemplateDef<ActionCardComponent> = {
  component: ActionCardComponent,
  spec: ActionCardSchema,
  projectedProperties: {
    '*': 'content',
    "hra-action-card-action:not([alignment='right'])": 'actionsLeft',
    "hra-action-card-action[alignment='right']": 'actionsRight',
  },
};
