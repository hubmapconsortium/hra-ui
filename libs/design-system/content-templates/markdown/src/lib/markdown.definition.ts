import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { MarkdownComponent } from 'ngx-markdown';
import { HraMarkdownComponent } from './markdown.component';
import { HraMarkdownSchema, MarkdownSchema } from './markdown.schema';

/** Content template definition for MarkdownComponent */
export const MarkdownDef: ContentTemplateDef<MarkdownComponent> = {
  component: MarkdownComponent,
  spec: MarkdownSchema,
};

/** Content template definition for HraMarkdownComponent */
export const HraMarkdownDef: ContentTemplateDef<HraMarkdownComponent> = {
  component: HraMarkdownComponent,
  spec: HraMarkdownSchema,
};
