import { ModuleWithProviders, NgModule, importProvidersFrom } from '@angular/core';
import { NGXS_PLUGINS, NgxsModule } from '@ngxs/store';
import { ActiveFtuState } from './active-ftu';
import { CellSummaryState } from './cell-summary';
import { ContactState } from './contact';
import { DownloadState } from './download';
import { IllustratorState } from './illustrator';
import { ScreenModeState } from './screen-mode';
import { SourceRefsState } from './source-refs';
import { StateAnalyticsPluginService } from './state-analytics-plugin';
import { TissueLibraryState } from './tissue-library';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';

export interface HraStateModuleOptions {
  googleAnalyticsToken: string;
}

/** Provides all states */
@NgModule({
  imports: [
    NgxsModule.forFeature([
      ActiveFtuState,
      CellSummaryState,
      ContactState,
      DownloadState,
      IllustratorState,
      ScreenModeState,
      SourceRefsState,
      TissueLibraryState,
    ]),
    NgxGoogleAnalyticsModule,
  ],
  providers: [
    {
      provide: NGXS_PLUGINS,
      useExisting: StateAnalyticsPluginService,
      multi: true,
    },
  ],
})
export class HraStateModule {
  static forRoot(options: HraStateModuleOptions): ModuleWithProviders<HraStateModule> {
    const analyticsProviders = importProvidersFrom(NgxGoogleAnalyticsModule.forRoot(options.googleAnalyticsToken));
    return {
      ngModule: HraStateModule,
      providers: [analyticsProviders],
    };
  }
}
