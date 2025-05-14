import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { APICommandComponent } from '../api-command.component';
import { APICommandSchema } from './api-command.schema';

/** Content template definition for APICommandComponent */
export const APICommandDef: ContentTemplateDef<APICommandComponent> = {
  component: APICommandComponent,
  spec: APICommandSchema,
};
