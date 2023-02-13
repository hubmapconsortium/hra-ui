import { setCompodocJson } from '@storybook/addon-docs/angular';
import { moduleMetadata } from '@storybook/angular';

import { ThemingModule } from '../libs/shared/theming/src';

export const decorators = [
  moduleMetadata({
    imports: [ThemingModule],
  }),
];

export function setDocs(library: string): void {
  const docs = require(`../dist/compodoc/${library}/documentation.json`);
  setCompodocJson(docs);
}
