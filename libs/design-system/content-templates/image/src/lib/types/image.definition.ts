import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { ImageComponent } from '../image.component';
import { ImageSchema } from './image.schema';

/** Content template definition for ImageComponent */
export const ImageDef: ContentTemplateDef<ImageComponent> = {
  component: ImageComponent,
  spec: ImageSchema,
};
