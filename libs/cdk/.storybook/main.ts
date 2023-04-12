import type { StorybookConfig } from '@storybook/types';

export default {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: [
    {
      from: '../src/assets',
      to: '/assets',
    },
  ],
} satisfies StorybookConfig;
