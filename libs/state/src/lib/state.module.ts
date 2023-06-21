import { NgModule } from '@angular/core';
import { NgxsModule, NGXS_PLUGINS } from '@ngxs/store';
import { CellSummaryState } from './cell-summary';
import { ContactState } from './contact';
import { DownloadState } from './download';
import { IllustratorState } from './illustrator';
import { ScreenModeState } from './screen-mode';
import { SourceRefsState } from './source-refs';
import { StateAnalyticsPluginService } from './state-analytics-plugin';
import { TissueLibraryState } from './tissue-library';

/** Provides all states */
@NgModule({
  imports: [
    NgxsModule.forFeature([
      CellSummaryState,
      ContactState,
      DownloadState,
      IllustratorState,
      ScreenModeState,
      SourceRefsState,
      TissueLibraryState,
    ]),
  ],
  providers: [
    {
      provide: NGXS_PLUGINS,
      useExisting: StateAnalyticsPluginService,
      multi: true,
    },
  ],
})
export class HraStateModule {}
