import type { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
  core: { builder: 'webpack5' },
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  staticDirs: [{ from: '../src/assets', to: '/assets' }],
};

module.exports = config;
