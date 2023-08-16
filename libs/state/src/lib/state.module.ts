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

/** Interface for providing options for the hra state module */
export interface HraStateModuleOptions {
  /** token string for google analytics*/
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
  /** Static method for configuring the module
   * Returns a configuration object with the module and the providers
   */
  static forRoot(options: HraStateModuleOptions): ModuleWithProviders<HraStateModule> {
    const analyticsProviders = importProvidersFrom(NgxGoogleAnalyticsModule.forRoot(options.googleAnalyticsToken));
    return {
      ngModule: HraStateModule,
      providers: [analyticsProviders],
    };
  }
}
