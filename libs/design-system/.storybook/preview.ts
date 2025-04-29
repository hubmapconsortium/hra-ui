import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig, componentWrapperDecorator, Preview } from '@storybook/angular';
import { provideDesignSystem } from '../src/index';
import compodocJson from './compodoc/documentation.json';

@Component({
  selector: 'hra-dummy-component',
  template: '',
})
class DummyComponent {}

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
      providers: [provideDesignSystem(), provideRouter([{ path: '**', component: DummyComponent }])],
    }),
    componentWrapperDecorator((story) => `<div class="hra-app">${story}</div>`),
  ],
};

setCompodocJson(compodocJson);

export default preview;
