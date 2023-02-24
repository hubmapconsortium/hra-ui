import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { MarkdownModule } from 'ngx-markdown';

import { ThemingModule } from '../libs/shared/theming/src';
import { fixArgTypes } from './fixes/arg-types';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
};

export const argTypesEnhancers = [fixArgTypes()];

export const decorators = [
  moduleMetadata({
    imports: [
      BrowserAnimationsModule,
      HttpClientModule,
      MarkdownModule.forRoot({
        loader: HttpClient,
      }),
      ThemingModule,
    ],
  }),
  componentWrapperDecorator((story) => `<div class="mat-typography">${story}</div>`),
];

export function setDocs(library: string): void {
  const docs = require(`../dist/compodoc/${library}/documentation.json`);
  setCompodocJson(docs);
}
