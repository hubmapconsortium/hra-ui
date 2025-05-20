import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { FilledIconComponent } from '../filled-icon.component';
import { FilledIconSchema } from './filled-icon.schema';

/**
 * Content template definition for FilledIconComponent
 */
export const FilledIconDef: ContentTemplateDef<FilledIconComponent> = {
  component: FilledIconComponent,
  spec: FilledIconSchema,
};
