import { HttpClient, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { applicationConfig, componentWrapperDecorator } from '@storybook/angular';
import { MarkdownModule } from 'ngx-markdown';

import { ThemingModule } from '../libs/shared/theming/src';
import { addState } from './decorators/state';
import { fixArgTypes } from './fixes/arg-types';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
};

export const argTypesEnhancers = [fixArgTypes()];

export const decorators = [
  applicationConfig({
    providers: [
      importProvidersFrom(
        BrowserAnimationsModule,
        HttpClientModule,
        NgxsModule.forRoot([], { developmentMode: true }),
        NgxsLoggerPluginModule.forRoot(),
        MarkdownModule.forRoot({
          loader: HttpClient,
        }),
        ThemingModule,
      ),
    ],
  }),
  componentWrapperDecorator(
    (story) => `
      <div class="mat-typography">${story}</div>
      <div class="backdrop-filler" style="position: absolute; inset: 0; z-index: -1;"></div>
    `,
  ),
  addState(),
];
