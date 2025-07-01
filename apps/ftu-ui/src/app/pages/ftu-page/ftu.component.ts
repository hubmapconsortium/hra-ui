import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dispatch, injectDestroy$, selectSnapshot } from '@hra-ui/cdk/injectors';
import {
  BiomarkerDetailsComponent,
  FooterBehaviorComponent,
  MedicalIllustrationBehaviorComponent,
} from '../../ftu-components/behavioral/src';
import { FullscreenContainerComponent, FullscreenContentComponent } from '../../ftu-components/molecules/src';
import { ActiveFtuActions, ScreenModeSelectors } from '@hra-ui/state';
import { takeUntil } from 'rxjs';

/** Main FTU page */
@Component({
  selector: 'ftu-ftu-page',
  imports: [
    CommonModule,
    BiomarkerDetailsComponent,
    FooterBehaviorComponent,
    FullscreenContainerComponent,
    FullscreenContentComponent,
    MedicalIllustrationBehaviorComponent,
  ],
  templateUrl: './ftu.component.html',
  styleUrls: ['./ftu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuComponent {
  /** Whether the FTU is in fullscreen mode */
  readonly isFullscreen = selectSnapshot(ScreenModeSelectors.isFullScreen);

  /** Set the illustration from the id query parameter */
  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams.pipe(takeUntil(injectDestroy$()));
    const setUriFromIri = dispatch(ActiveFtuActions.Load);
    queryParams$.subscribe((queryParams) => setUriFromIri(queryParams['id']));
  }
}
