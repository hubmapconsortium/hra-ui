import { Preview } from '@storybook/angular';

const preview: Preview = {
  tags: ['autodocs', 'autodocs'],
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
};

export default preview;
