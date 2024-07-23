import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  fontBase: 'Metropolis',

  brandTitle: 'HRA Design System',
  brandUrl: 'https://humanatlas.io',
  brandImage: 'logo/hra_logo.svg',
  brandTarget: '_self',

  colorPrimary: '#e00d3a',
  colorSecondary: '#e00d3a',

  appBg: '#fcfcfc',
  appContentBg: '#ffffff',
  appPreviewBg: '#fffff',
  appBorderColor: '#d5dbe3',
  appBorderRadius: 8,

  textColor: '#201e3d',
  textInverseColor: '#ffffff',

  barTextColor: '#4b4b5e',
  barSelectedColor: '#e00d3a',
  barHoverColor: '#b20a2f',
  barBg: '#fcfcfc',

  inputBg: '#ffffff',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
});
