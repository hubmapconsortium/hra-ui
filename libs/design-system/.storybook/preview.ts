import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig, componentWrapperDecorator, Preview } from '@storybook/angular';
import { provideMarkdown } from 'ngx-markdown';
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
      options: {
        light: {
          name: 'Light',
          value: '#ffffff',
        },
        dark: {
          name: 'Dark',
          value: '#4b4b5e',
        },
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideDesignSystem(),
        provideMarkdown({ loader: HttpClient }),
        provideRouter(
          [{ path: '**', component: DummyComponent }],
          withInMemoryScrolling({ anchorScrolling: 'enabled' }),
        ),
      ],
    }),
    componentWrapperDecorator((story) => `<div class="hra-app">${story}</div>`),
  ],
};

setCompodocJson(compodocJson);

export default preview;
