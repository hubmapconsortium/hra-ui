import { moduleMetadata } from '@storybook/angular';

import { ThemingModule } from '../libs/shared/theming/src';

export const decorators = [
  moduleMetadata({
    imports: [ThemingModule],
  }),
];
