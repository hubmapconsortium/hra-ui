import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/angular';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],

  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-designs'),
    getAbsolutePath('storybook-addon-pseudo-states'),
    getAbsolutePath('@storybook/addon-docs'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },

  staticDirs: [{ from: '../assets', to: 'assets' }],

  core: {
    disableTelemetry: true,
  },

  docs: {},
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
