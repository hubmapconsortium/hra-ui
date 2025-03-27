import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig, componentWrapperDecorator, Preview } from '@storybook/angular';
import { provideDesignSystem } from '../src/index';
import compodocJson from './compodoc/documentation.json';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#4b4b5e',
        },
      ],
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    componentWrapperDecorator((story) => `<div class="hra-app">${story}</div>`),
  ],
};

setCompodocJson(compodocJson);

export default preview;
