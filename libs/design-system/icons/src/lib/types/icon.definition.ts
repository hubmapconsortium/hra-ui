import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { IconComponent } from '../icon/icon.component';
import { IconSchema } from './icon.schema';

/** Icon content template definition */
export const IconDef: ContentTemplateDef<IconComponent> = {
  component: IconComponent,
  spec: IconSchema,
};
