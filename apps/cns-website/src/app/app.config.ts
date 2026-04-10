import { HttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZonelessChangeDetection, signal } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withNavigationErrorHandler,
} from '@angular/router';
import { provideContentTemplateDefs } from '@hra-ui/cdk/content-template';
import { provideAnalytics, withErrorHandler, withRouterEvents } from '@hra-ui/common/analytics';
import { provideTelemetryEndpoint } from '@hra-ui/common/analytics/plugins/hra-analytics';
import { provideAppConfiguration } from '@hra-ui/common/injectors';
import { provideRouterExt } from '@hra-ui/common/router-ext';
import { provideDesignSystem } from '@hra-ui/design-system';
import { provideBrandLogos } from '@hra-ui/design-system/brand/logo';
import { ButtonDef } from '@hra-ui/design-system/buttons/button';
import { provideSocials } from '@hra-ui/design-system/buttons/social-media-button';
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
import { VenuesTableDef } from '@hra-ui/design-system/content-templates/venues-table';
import { YouTubePlayerDef } from '@hra-ui/design-system/content-templates/youtube-player';
import { IconDef } from '@hra-ui/design-system/icons';
import { PageTableDef } from '@hra-ui/design-system/table';
import { provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';
import { CNS_SOCIALS } from './components/static-data/parsed';
import { handleNavigationError } from './utils/navigation-error-handler';

/** Application configuration */
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnalytics(withRouterEvents(), withErrorHandler()),
    provideAppConfiguration({
      name: 'cns-website',
      version: '1.0.0',
      url: 'https://cns.iu.edu/',
    }),
    provideBrandLogos({
      label: 'CNS Website',
      url: 'https://cns.iu.edu',
      logos: [
        {
          size: 'regular',
          src: 'assets/brand/logo/cns-regular.svg',
          width: 140,
          height: 47,
        },
        {
          size: 'small',
          src: 'assets/brand/logo/cns-full-small.svg',
          width: 228,
          height: 39,
        },
      ],
    }),
    provideContentTemplateDefs([
      ActionCardDef,
      ApiCommandDef,
      ButtonDef,
      FlexContainerDef,
      GoogleMapsDef,
      GridContainerDef,
      IconDef,
      ImageDef,
      MarkdownDef,
      PageSectionDef,
      PageTableDef,
      ProfileCardDef,
      TextHyperlinkDef,
      VenuesTableDef,
      YouTubePlayerDef,
    ]),
    provideDesignSystem(),
    provideMarkdown({ loader: HttpClient }),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
      withNavigationErrorHandler(handleNavigationError),
    ),
    provideRouterExt(),
    provideSocials(CNS_SOCIALS),
    provideTelemetryEndpoint(signal(`https://cns.iu.edu/tr${isDevMode() ? '-dev' : ''}`), true),
    provideZonelessChangeDetection(),
  ],
};
