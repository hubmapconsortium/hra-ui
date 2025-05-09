import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { ActionCardOutlineLargeImageListSchema } from '../types/action-card-outline-large-image.schema';
import { ActionCardOutlineLargeImageListComponent } from './action-card-outline-large-image-list.component';

/** Content template definition for ActionCardOutlineLargeImageListComponent */
export const ActionCardOutlineLargeImageListDef: ContentTemplateDef<ActionCardOutlineLargeImageListComponent> = {
  component: ActionCardOutlineLargeImageListComponent,
  spec: ActionCardOutlineLargeImageListSchema,
};
