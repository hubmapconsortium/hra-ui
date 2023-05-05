import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dispatch, injectDestroy$ } from '@hra-ui/cdk/injectors';
import {
  BiomarkerDetailsComponent,
  FooterBehaviorComponent,
  MedicalIllustrationBehaviorComponent,
} from '@hra-ui/components/behavioral';
import { FullscreenContainerComponent, FullscreenContentComponent } from '@hra-ui/components/molecules';
import { MedicalIllustrationActions } from '@hra-ui/state';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'ftu-ftu-page',
  standalone: true,
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
  constructor() {
    const queryParams$ = inject(ActivatedRoute).queryParams.pipe(takeUntil(injectDestroy$()));
    const setUriFromIri = dispatch(MedicalIllustrationActions.SetUriFromIRI);
    queryParams$.subscribe((queryParams) => setUriFromIri(queryParams['id']));
  }
}
