import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, model, output, signal, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dispatch, injectDestroy$, selectSnapshot } from '@hra-ui/cdk/injectors';
import {
  BiomarkerDetailsComponent,
  FooterBehaviorComponent,
  MedicalIllustrationBehaviorComponent,
} from '../../ftu-components/behavioral/src';
import {
  FullscreenContainerComponent,
  FullscreenContentComponent,
  SourceListComponent,
} from '../../ftu-components/molecules/src';
import { ActiveFtuActions, ScreenModeSelectors } from '@hra-ui/state';
import { takeUntil } from 'rxjs';

export enum FullscreenTab {
  Illustration = 0,
  BiomarkerDetails = 1,
  SourceList = 2,
}

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
    SourceListComponent,
  ],
  templateUrl: './ftu.component.html',
  styleUrls: ['./ftu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuComponent {
  readonly isFullscreen = signal(false);

  readonly fullscreentabIndex = model<FullscreenTab>(0);

  isFullscreenenabled(tab: FullscreenTab) {
    this.isFullscreen.set(true);
    this.fullscreentabIndex.set(tab);
    console.log('fullscreen enabled');
  }

  sourceListTemplate: TemplateRef<any> | null = null;

  setSourceList(ref: TemplateRef<any>) {
    this.sourceListTemplate = ref;
  }
  closefullscreen() {
    this.isFullscreen.set(false);
  }

  /** Set the illustration from the id query parameter */
  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams.pipe(takeUntil(injectDestroy$()));
    const setUriFromIri = dispatch(ActiveFtuActions.Load);
    queryParams$.subscribe((queryParams) => setUriFromIri(queryParams['id']));
  }
}
