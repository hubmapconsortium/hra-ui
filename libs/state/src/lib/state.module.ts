import { NgModule } from '@angular/core';
import { NgxsModule, NGXS_PLUGINS } from '@ngxs/store';
import { CellSummaryState } from './cell-summary';
import { ContactState } from './contact';
import { DownloadState } from './download';
import { MedicalIllustrationState } from './medical-illustration';
import { ScreenModeState } from './screen-mode';
import { SourceListState } from './source-list';
import { StateAnalyticsPluginService } from './state-analytics-plugin';
import { TissueLibraryState } from './tissue-library';

/** Provides all states */
@NgModule({
  imports: [
    NgxsModule.forFeature([
      CellSummaryState,
      ContactState,
      DownloadState,
      MedicalIllustrationState,
      ScreenModeState,
      SourceListState,
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
