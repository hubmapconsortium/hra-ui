import { HttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideRouterExt } from '@hra-ui/common/router-ext';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideBrandLogos } from '@hra-ui/design-system/brand/logo';
import { ButtonDef } from '@hra-ui/design-system/buttons/button';
import { TextHyperlinkDef } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardDef } from '@hra-ui/design-system/cards/action-card';
import { ProfileCardDef } from '@hra-ui/design-system/cards/profile-card';
import { ApiCommandDef } from '@hra-ui/design-system/content-templates/api-command';
import { FlexContainerDef } from '@hra-ui/design-system/content-templates/flex-container';
import { GoogleMapsDef } from '@hra-ui/design-system/content-templates/google-maps';
import { GridContainerDef } from '@hra-ui/design-system/content-templates/grid-container';
import { ImageDef } from '@hra-ui/design-system/content-templates/image';
import { MarkdownDef } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionDef } from '@hra-ui/design-system/content-templates/page-section';
import { YouTubePlayerDef } from '@hra-ui/design-system/content-templates/youtube-player';
import { IconDef } from '@hra-ui/design-system/icons';
import { PageTableDef } from '@hra-ui/design-system/table';
import { provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideAppConfiguration({
      name: 'cns-website',
      version: '1.0.0',
      url: 'https://cns.iu.edu/',
    }),
    provideBrandLogos([
      {
        size: 'regular',
        src: 'assets/brand/logo/cns-regular.svg',
        width: 140,
        height: 47,
      },
      {
        size: 'small',
        src: 'assets/brand/logo/cns-small.svg',
        width: 84,
        height: 28,
      },
    ]),
    provideContentTemplateDefs([
      ActionCardDef,
      ApiCommandDef,
      ButtonDef,
      FlexContainerDef,
      GridContainerDef,
      IconDef,
      ImageDef,
      MarkdownDef,
      PageSectionDef,
      PageTableDef,
      ProfileCardDef,
      TextHyperlinkDef,
      YouTubePlayerDef,
      GoogleMapsDef,
    ]),
    provideDesignSystem(),
    provideMarkdown({ loader: HttpClient }),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideRouterExt(),
    provideZonelessChangeDetection(),
  ],
};
