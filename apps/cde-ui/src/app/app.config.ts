import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
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
import { OmicsFeaturedStudyCardDef } from './components/omics-featured-study-card';

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
    provideNothrowPlatformLocation(),
    provideRouter(
      ROUTES,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withViewTransitions(),
    ),
    provideRouterExt(),
    provideAnimations(),
    provideHttpClient(),
    provideIcons(),
    provideDesignSystem(),
    provideMarkdown(),
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
      OmicsFeaturedStudyCardDef,
    ]),
  ],
};
