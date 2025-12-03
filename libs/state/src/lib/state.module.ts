import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { EmptyObject } from 'type-fest';
import { ActiveFtuState } from './active-ftu';
import { CellSummaryState } from './cell-summary';
import { DownloadState } from './download';
import { IllustratorState } from './illustrator';
import { ScreenModeState } from './screen-mode';
import { SourceRefsState } from './source-refs';
import { TissueLibraryState } from './tissue-library';

/** Interface for providing options for the hra state module */
export type HraStateModuleOptions = EmptyObject;

/** Provides all states */
@NgModule({
  imports: [
    NgxsModule.forFeature([
      ActiveFtuState,
      CellSummaryState,
      DownloadState,
      IllustratorState,
      ScreenModeState,
      SourceRefsState,
      TissueLibraryState,
    ]),
  ],
})
export class HraStateModule {}
