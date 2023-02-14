import { moduleMetadata } from '@storybook/angular';
import { MarkdownModule } from 'ngx-markdown';

import { ThemingModule } from '../libs/shared/theming/src';

export const decorators = [
  moduleMetadata({
    imports: [ThemingModule, MarkdownModule.forRoot()],
  }),
];
