import { HttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideDesignSystem } from '@hra-ui/design-system';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { DataViewerDef } from '@hra-ui/design-system/data-viewer';
import { PageTableDef } from '@hra-ui/design-system/table';
import { VersionedDataTableDef } from '@hra-ui/design-system/content-templates/versioned-data-table';
import { provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding(), withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    provideDesignSystem(),  
    provideMarkdown({ loader: HttpClient }),
    provideContentTemplateDefs([DataViewerDef, MarkdownDef, PageSectionDef, PageTableDef, VersionedDataTableDef]),
  ],
};
