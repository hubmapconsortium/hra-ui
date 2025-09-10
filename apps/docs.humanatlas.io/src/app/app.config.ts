import { HttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ActionCardDef } from '@hra-ui/design-system/cards/action-card';
import { ButtonDef } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkDef } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ProfileCardDef } from '@hra-ui/design-system/cards/profile-card';
import { ApiCommandDef } from '@hra-ui/design-system/content-templates/api-command';
import { FlexContainerDef } from '@hra-ui/design-system/content-templates/flex-container';
import { GridContainerDef } from '@hra-ui/design-system/content-templates/grid-container';
import { ImageDef } from '@hra-ui/design-system/content-templates/image';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { VersionedDataTableDef } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { YouTubePlayerDef } from '@hra-ui/design-system/content-templates/youtube-player';
import { DataViewerDef } from '@hra-ui/design-system/data-viewer';
import { IconDef } from '@hra-ui/design-system/icons';
import { PageTableDef } from '@hra-ui/design-system/table';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';
import { CodeBlockDef } from '@hra-ui/design-system/code-block';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideContentTemplateDefs([
      ActionCardDef,
      ApiCommandDef,
      ButtonDef,
      DataViewerDef,
      FlexContainerDef,
      GridContainerDef,
      IconDef,
      ImageDef,
      MarkdownDef,
      PageSectionDef,
      PageTableDef,
      ProfileCardDef,
      TextHyperlinkDef,
      VersionedDataTableDef,
      YouTubePlayerDef,
      CodeBlockDef,
    ]),
    provideDesignSystem(),
    provideZonelessChangeDetection(),
    provideMarkdown({ loader: HttpClient, markedOptions: { provide: MARKED_OPTIONS, useValue: { gfm: true } } }),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
