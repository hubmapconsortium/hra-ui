import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideDesignSystem } from '@hra-ui/design-system';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { DataViewerDef } from '@hra-ui/design-system/data-viewer';
import { provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideMarkdown(),
    provideContentTemplateDefs([DataViewerDef, MarkdownDef, PageSectionDef]),
  ],
};
