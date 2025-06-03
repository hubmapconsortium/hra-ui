import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { MarkdownComponent } from './markdown.component';
import { MarkdownSchema } from './markdown.schema';

/** Content template definition for MarkdownComponent */
export const MarkdownDef: ContentTemplateDef<MarkdownComponent> = {
  component: MarkdownComponent,
  spec: MarkdownSchema,
};
