import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ActionCardOutlineDefaultListDef } from '@hra-ui/design-system/cards/action-card-outline-default/';
import { ActionCardOutlineLargeImageListDef } from '@hra-ui/design-system/cards/action-card-outline-large-image/';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { DataViewerDef } from '@hra-ui/design-system/data-viewer';
import { provideMarkdown } from 'ngx-markdown';

import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
    provideRouter(appRoutes, withComponentInputBinding(), withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideMarkdown(),
    provideContentTemplateDefs([
      DataViewerDef,
      MarkdownDef,
      PageSectionDef,
      ActionCardOutlineDefaultListDef,
      ActionCardOutlineLargeImageListDef,
    ]),
  ],
};
