import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideDesignSystem } from '@hra-ui/design-system';

import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideContentTemplateDefs([PageSectionDef]),
  ],
};
