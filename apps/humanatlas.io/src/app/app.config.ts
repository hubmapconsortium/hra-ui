import { HttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideContentTemplateControllers, provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonDef } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkDef } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardDef } from '@hra-ui/design-system/cards/action-card';
import { ProfileCardDef } from '@hra-ui/design-system/cards/profile-card';
import { ApiCommandDef } from '@hra-ui/design-system/content-templates/api-command';
import { FlexContainerDef } from '@hra-ui/design-system/content-templates/flex-container';
import { ImageDef } from '@hra-ui/design-system/content-templates/image';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { VersionedDataTableDef } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { YouTubePlayerDef } from '@hra-ui/design-system/content-templates/youtube-player';
import { DataViewerDef } from '@hra-ui/design-system/data-viewer';
import { IconDef } from '@hra-ui/design-system/icons';
import { PageTableDef } from '@hra-ui/design-system/table';
import { provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';
import { ReleaseNotesVersionSelectorDef } from './components/release-notes-version-selector/release-notes-version-selector.definition';
import { SummaryStatisticsTableDef } from './components/summary-statistics-table/summary-statistics-table.definition';
import { VersionedTableParamSyncControllerService } from './controllers/versioned-table-param-sync/versioned-table-param-sync.service';
import { DataViewerParamSyncControllerService } from './controllers/data-viewer-param-sync/data-viewer-param-sync.service';
import { DataViewerWithQueryParamsDef } from './components/data-viewer-with-query-params/data-viewer-with-query-params.definition';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideContentTemplateControllers([VersionedTableParamSyncControllerService, DataViewerParamSyncControllerService]),
    provideContentTemplateDefs([
      ActionCardDef,
      ApiCommandDef,
      ButtonDef,
      DataViewerDef,
      DataViewerWithQueryParamsDef,
      FlexContainerDef,
      IconDef,
      ImageDef,
      MarkdownDef,
      PageSectionDef,
      PageTableDef,
      ProfileCardDef,
      ReleaseNotesVersionSelectorDef,
      SummaryStatisticsTableDef,
      TextHyperlinkDef,
      VersionedDataTableDef,
      YouTubePlayerDef,
    ]),
    provideDesignSystem(),
    provideZonelessChangeDetection(),
    provideMarkdown({ loader: HttpClient }),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'disabled', scrollPositionRestoration: 'disabled' }),
    ),
  ],
};
