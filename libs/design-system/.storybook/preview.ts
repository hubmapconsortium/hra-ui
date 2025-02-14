import { provideDesignSystem } from '../src/index';
import { applicationConfig, componentWrapperDecorator, Preview } from '@storybook/angular';

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

export default preview;
