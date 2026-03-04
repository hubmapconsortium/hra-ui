import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dispatch, injectDestroy$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { HraCommonModule } from '@hra-ui/common';
import { FtuFullScreenService, EmptyBiomarkerComponent } from '@hra-ui/ftu-ui-components';
import {
  BiomarkerDetailsComponent,
  MedicalIllustrationBehaviorComponent,
} from '@hra-ui/ftu-ui-components/src/lib/behavioral';
import { FullscreenContainerComponent, SourceListComponent } from '@hra-ui/ftu-ui-components/src/lib/molecules';
import { ActiveFtuActions, SourceRefsActions, SourceRefsSelectors } from '@hra-ui/state';
import { takeUntil } from 'rxjs';

/** Main FTU page */
@Component({
  selector: 'ftu-ftu-page',
  imports: [
    HraCommonModule,
    BiomarkerDetailsComponent,
    FullscreenContainerComponent,
    MedicalIllustrationBehaviorComponent,
    SourceListComponent,
    EmptyBiomarkerComponent,
  ],
  templateUrl: './ftu.component.html',
  styleUrl: './ftu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuComponent {
  /** List of sources with titles and links displayed to the user */
  readonly sources = selectSnapshot(SourceRefsSelectors.sourceReferences);

  /** List of selected sources */
  readonly selectedSources = selectSnapshot(SourceRefsSelectors.selectedSourceReferences);

  /** Action to set selected sources */
  readonly setSelectedSources = dispatch(SourceRefsActions.SetSelectedSources);

  /**
   * Fullscreen service of ftu component
   */
  private readonly fullscreenService = inject(FtuFullScreenService);

  /**
   * Determines whether fullscreen mode is on or off
   */
  isFullscreen = this.fullscreenService.isFullscreen;
  /**
   * Fullscreentab index of ftu component
   */
  fullscreentabIndex = this.fullscreenService.fullscreentabIndex;

  /**
   * Closes the fullscreen mode
   */
  closefullscreen() {
    this.fullscreenService.isFullscreen.set(false);
  }

  /** Set the illustration from the id query parameter */
  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams.pipe(takeUntil(injectDestroy$()));
    const setUriFromIri = dispatch(ActiveFtuActions.Load);
    queryParams$.subscribe((queryParams) => setUriFromIri(queryParams['id']));
  }
}
