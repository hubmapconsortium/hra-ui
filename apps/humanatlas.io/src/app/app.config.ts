import { HttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideDesignSystem } from '@hra-ui/design-system';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { provideMarkdown } from 'ngx-markdown';

import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
    provideMarkdown({ loader: HttpClient }),
    provideRouter(appRoutes, withComponentInputBinding(), withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideContentTemplateDefs([PageSectionDef]),
  ],
};
