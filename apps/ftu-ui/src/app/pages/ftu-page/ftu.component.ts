import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BiomarkerDetailsComponent,
  FooterBehaviorComponent,
  MedicalIllustrationBehaviorComponent,
} from '@hra-ui/components/behavioral';
import { FullscreenContainerComponent, FullscreenContentComponent } from '@hra-ui/components/molecules';

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
export class FtuComponent {}
