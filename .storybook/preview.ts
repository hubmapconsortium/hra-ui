import { HttpClient, HttpClientModule } from '@angular/common/http';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { moduleMetadata } from '@storybook/angular';
import { MarkdownModule } from 'ngx-markdown';

import { ThemingModule } from '../libs/shared/theming/src';

export const decorators = [
  moduleMetadata({
    imports: [
      HttpClientModule,
      MarkdownModule.forRoot({
        loader: HttpClient,
      }),
      ThemingModule,
    ],
  }),
];

export function setDocs(library: string): void {
  const docs = require(`../dist/compodoc/${library}/documentation.json`);
  setCompodocJson(docs);
}
