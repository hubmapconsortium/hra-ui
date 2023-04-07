import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';
import { MedicalIllustrationActions, MedicalIllustrationSelectors } from '@hra-ui/state';

@Component({
  selector: 'ftu-medical-illustration-behavior',
  standalone: true,
  imports: [CommonModule, InteractiveSvgComponent],
  templateUrl: './medical-illustration-behavior.component.html',
  styleUrls: ['./medical-illustration-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalIllustrationBehaviorComponent {
  readonly currentUrl = selectSnapshot(MedicalIllustrationSelectors.url);

  readonly getMapping = selectSnapshot(MedicalIllustrationSelectors.mapping);

  readonly updateNode = dispatch(MedicalIllustrationActions.SetActiveNode);

  readonly setMapping = dispatch(MedicalIllustrationActions.SetMapping);
}
