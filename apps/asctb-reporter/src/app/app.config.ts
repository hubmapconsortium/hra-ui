import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideDesignSystem } from '@hra-ui/design-system';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { provideStore } from '@ngxs/store';
import { provideMarkdown } from 'ngx-markdown';
import { withNgxsResetPlugin } from 'ngxs-reset-plugin';
import { environment } from '../environments/environment';
import { ConfigService } from './app-config.service';
import { appRoutes } from './app.routes';
import { AnalyticsModule } from './services/analytics.module';
import { LogsState } from './store/logs.state';
import { SheetState } from './store/sheet.state';
import { TreeState } from './store/tree.state';
import { UIState } from './store/ui.state';

export function initializeApp(configService: ConfigService): () => Promise<void> {
  return () =>
    Promise.all([configService.sheetConfiguration$.toPromise(), configService.config$.toPromise()]).then(
      () => undefined,
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideDesignSystem(),
    provideRouter(appRoutes),
    ConfigService,
    provideAppInitializer(() => {
      const initializerFn = initializeApp(inject(ConfigService));
      return initializerFn();
    }),
    provideHttpClient(withInterceptorsFromDi()),
    withNgxsResetPlugin(),
    provideDesignSystem(),
    provideStore(
      [SheetState, TreeState, UIState, LogsState],
      withNgxsLoggerPlugin({ disabled: environment.production }),
    ),
    importProvidersFrom(AnalyticsModule.forRoot({ gaToken: environment.googleAnalyticsId, appName: 'reporter' })),
    provideMarkdown(),
  ],
};
