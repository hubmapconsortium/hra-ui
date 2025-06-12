import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { CodeBlockSchema } from './code-block.schema';
import { CodeBlockComponent } from './code-block.component';

/** Content template definition for MarkdownComponent */
export const CodeBlockDef: ContentTemplateDef<CodeBlockComponent> = {
  component: CodeBlockComponent,
  spec: CodeBlockSchema,
};
