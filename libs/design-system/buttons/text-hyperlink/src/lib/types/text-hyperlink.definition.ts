import { ContentTemplateDef } from '@hra-ui/cdk/content-template';

import { TextHyperlinkComponent } from '../text-hyperlink.component';
import { TextHyperlinkSchema } from './text-hyperlink.schema';

/**
 * Text hyperlink component definition
 */
export const TextHyperlinkDef: ContentTemplateDef<TextHyperlinkComponent> = {
  component: TextHyperlinkComponent,
  spec: TextHyperlinkSchema,
};
