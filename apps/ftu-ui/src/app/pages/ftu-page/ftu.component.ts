import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { dispatch, injectDestroy$ } from '@hra-ui/cdk/injectors';
import {
  BiomarkerDetailsComponent,
  FooterBehaviorComponent,
  MedicalIllustrationBehaviorComponent,
} from '@hra-ui/components/behavioral';
import {
  FullscreenContainerComponent,
  FullscreenContentComponent,
  ScreenSizeNoticeComponent,
} from '@hra-ui/components/molecules';
import { MedicalIllustrationActions } from '@hra-ui/state';
import { takeUntil } from 'rxjs';

/** Main FTU page */
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
    ScreenSizeNoticeComponent,
    MatDialogModule,
  ],
  templateUrl: './ftu.component.html',
  styleUrls: ['./ftu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuComponent implements OnInit {
  /** Set the illustration from the id query parameter */
  constructor(private dialog: MatDialog) {
    const queryParams$ = inject(ActivatedRoute).queryParams.pipe(takeUntil(injectDestroy$()));
    const setUriFromIri = dispatch(MedicalIllustrationActions.SetUriFromIRI);
    queryParams$.subscribe((queryParams) => setUriFromIri(queryParams['id']));
  }

  ngOnInit(): void {
    this.openModalIfViewportLessThan480px();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.openModalIfViewportLessThan480px();
  }

  openModalIfViewportLessThan480px(): void {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 480) {
      this.dialog.open(ScreenSizeNoticeComponent, {
        width: '500px',
      });
    }
  }
}
