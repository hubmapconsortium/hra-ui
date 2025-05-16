import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { ButtonComponent } from '../button.component';
import { ButtonSchema } from './button.schema';

/** Content template definition for DataViewerComponent */
export const ButtonDef: ContentTemplateDef<ButtonComponent> = {
  component: ButtonComponent,
  spec: ButtonSchema,
};
