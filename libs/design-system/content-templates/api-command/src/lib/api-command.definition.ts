import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { ApiCommandComponent } from '../api-command.component';
import { ApiCommandSchema } from './api-command.schema';

/** Content template definition for ApiCommandComponent */
export const ApiCommandDef: ContentTemplateDef<ApiCommandComponent> = {
  component: ApiCommandComponent,
  spec: ApiCommandSchema,
};
