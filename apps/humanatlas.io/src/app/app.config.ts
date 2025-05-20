import { HttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonDef } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkDef } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardOutlineDefaultListDef } from '@hra-ui/design-system/cards/action-card-outline-default';
import { ActionCardOutlineLargeImageListDef } from '@hra-ui/design-system/cards/action-card-outline-large-image';
import { ProfileCardDef } from '@hra-ui/design-system/cards/profile-card';
import { ApiCommandDef } from '@hra-ui/design-system/content-templates/api-command';
import { FlexContainerDef } from '@hra-ui/design-system/content-templates/flex-container';
import { ImageDef } from '@hra-ui/design-system/content-templates/image';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { VersionedDataTableDef } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { DataViewerDef } from '@hra-ui/design-system/data-viewer';
import { PageTableDef } from '@hra-ui/design-system/table';
import { provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideContentTemplateDefs([
      ActionCardOutlineDefaultListDef,
      ActionCardOutlineLargeImageListDef,
      ApiCommandDef,
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
