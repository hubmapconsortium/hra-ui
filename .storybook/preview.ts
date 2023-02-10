import { moduleMetadata } from '@storybook/angular';
import { MarkdownModule } from 'ngx-markdown';

export const decorators = [
  moduleMetadata({
    imports: [MarkdownModule.forRoot()],
  }),
];
