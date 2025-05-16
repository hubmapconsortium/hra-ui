import { HttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonDef } from '@hra-ui/design-system/buttons/button';
import { ImageDef } from '@hra-ui/design-system/content-templates/image';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { VersionedDataTableDef } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { DataViewerDef } from '@hra-ui/design-system/data-viewer';
import { PageTableDef } from '@hra-ui/design-system/table';
import { TextHyperlinkDef } from '@hra-ui/design-system/buttons/text-hyperlink';
import { provideMarkdown } from 'ngx-markdown';

import { appRoutes } from './app.routes';
import { FlexContainerDef } from '@hra-ui/design-system/content-templates/flex-container';
import { ProfileCardDef } from '@hra-ui/design-system/cards/profile-card';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideContentTemplateDefs([
      ButtonDef,
      DataViewerDef,
      FlexContainerDef,
      ImageDef,
      MarkdownDef,
      PageSectionDef,
      PageTableDef,
      ProfileCardDef,
      TextHyperlinkDef,
      VersionedDataTableDef,
    ]),
    provideDesignSystem(),
    provideMarkdown({ loader: HttpClient }),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
