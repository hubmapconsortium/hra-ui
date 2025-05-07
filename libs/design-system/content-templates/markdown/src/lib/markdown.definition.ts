import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { MarkdownComponent } from 'ngx-markdown';
import { MarkdownSchema } from './markdown.schema';

export const MarkdownDef: ContentTemplateDef<MarkdownComponent> = {
  component: MarkdownComponent,
  spec: MarkdownSchema,
};
