import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideNothrowPlatformLocation } from '@hra-ui/cdk/platform-location';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideRouterExt } from '@hra-ui/common/router-ext';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonDef } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkDef } from '@hra-ui/design-system/buttons/text-hyperlink';
import { CopyEmailButtonDef } from '@hra-ui/design-system/content-templates/copy-email';
import { FlexContainerDef } from '@hra-ui/design-system/content-templates/flex-container';
import { GridContainerDef } from '@hra-ui/design-system/content-templates/grid-container';
import { ImageDef } from '@hra-ui/design-system/content-templates/image';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { IconDef, provideIcons } from '@hra-ui/design-system/icons';
import { PageTableDef } from '@hra-ui/design-system/table';
import { provideMarkdown } from 'ngx-markdown';
import { ROUTES } from './app.routes';
import { StudiesGridDef } from './components/studies-grid';

/**
 * Set of config options available during the application bootstrap operation.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAppConfiguration({
      name: 'cde-ui',
      version: '1.0.0',
      url: 'https://apps.humanatlas.io/cde/',
    }),
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideContentTemplateDefs([
      ButtonDef,
      FlexContainerDef,
      GridContainerDef,
      IconDef,
      ImageDef,
      MarkdownDef,
      PageSectionDef,
      PageTableDef,
      TextHyperlinkDef,
      CopyEmailButtonDef,
      StudiesGridDef,
    ]),
    provideDesignSystem(),
    provideHttpClient(),
    provideIcons(),
    provideMarkdown(),
    provideNothrowPlatformLocation(),
    provideRouter(
      ROUTES,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideRouterExt(),
    provideZonelessChangeDetection(),
  ],
};
