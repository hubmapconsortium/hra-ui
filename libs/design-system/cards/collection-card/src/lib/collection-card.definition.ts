import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { CollectionCardComponent } from './collection-card.component';
import { CollectionCardSchema } from './collection-card.schema';

/** Content template definition for collection card */
export const CollectionCardDef: ContentTemplateDef<CollectionCardComponent> = {
  component: CollectionCardComponent,
  spec: CollectionCardSchema,
  projectedProperties: {
    '*': 'content',
    "hra-collection-card-action:not([alignment='right'])": 'actionsLeft',
    "hra-collection-card-action[alignment='right']": 'actionsRight',
  },
};
