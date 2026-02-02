import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { CopyEmailButtonComponent } from './copy-email-button.component';
import { CopyEmailButtonSchema } from './copy-email-button.schema';

/** Content template definition for CopyEmailButtonComponent */
export const CopyEmailButtonDef: ContentTemplateDef<CopyEmailButtonComponent> = {
  component: CopyEmailButtonComponent,
  spec: CopyEmailButtonSchema,
};
