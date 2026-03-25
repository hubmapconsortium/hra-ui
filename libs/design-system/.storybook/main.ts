import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  stories: ['../**/*.@(mdx|stories.@(ts|tsx))'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-designs',
    'storybook-addon-pseudo-states',
    '@storybook/addon-docs',
  ],
  staticDirs: [{ from: '../assets', to: 'assets' }],
  core: {
    disableTelemetry: true,
  },
  docs: {},
};

export default config;
