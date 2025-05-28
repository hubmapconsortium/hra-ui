import { MatIcon } from '@angular/material/icon';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { IconSchema } from './icon.schema';

export const IconDef: ContentTemplateDef<MatIcon> = {
  component: MatIcon,
  spec: IconSchema,
};
