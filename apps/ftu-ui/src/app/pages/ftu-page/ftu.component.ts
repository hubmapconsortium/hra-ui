import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dispatch, injectDestroy$ } from '@hra-ui/cdk/injectors';
import {
  BiomarkerDetailsComponent,
  MedicalIllustrationBehaviorComponent,
} from '@hra-ui/ftu-ui-components/src/lib/behavioral';
import { FullscreenContainerComponent } from '@hra-ui/ftu-ui-components/src/lib/molecules';
import { ActiveFtuActions } from '@hra-ui/state';
import { takeUntil } from 'rxjs';
import { FtuFullScreenService } from '../../services/ftu-fullscreen.service';

/** Main FTU page */
@Component({
  selector: 'ftu-ftu-page',
  imports: [
    CommonModule,
    BiomarkerDetailsComponent,
    FullscreenContainerComponent,
    MedicalIllustrationBehaviorComponent,
  ],
  templateUrl: './ftu.component.html',
  styleUrls: ['./ftu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuComponent {
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
   * Source list template of ftu component
   */
  sourceListTemplate: TemplateRef<unknown> | null = null;

  /**
   * Closes the fullscreen mode
   */
  closefullscreen() {
    this.fullscreenService.isFullscreen.set(false);
  }

  /**
   * Sets the source list template
   * @param ref Template ref to source list
   */
  setSourceList(ref: TemplateRef<unknown>) {
    this.sourceListTemplate = ref;
  }

  /** Set the illustration from the id query parameter */
  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams.pipe(takeUntil(injectDestroy$()));
    const setUriFromIri = dispatch(ActiveFtuActions.Load);
    queryParams$.subscribe((queryParams) => setUriFromIri(queryParams['id']));
  }
}
