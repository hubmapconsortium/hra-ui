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
export class MedicalIllustrationBehaviorComponent implements OnInit {
  readonly currentUrl = selectSnapshot(MedicalIllustrationSelectors.getUrl);

  readonly getMapping = selectSnapshot(MedicalIllustrationSelectors.getMapping);

  readonly updateNode = dispatch(MedicalIllustrationActions.SetActiveNode);

  readonly setMapping = dispatch(MedicalIllustrationActions.SetMapping);

  ngOnInit(): void {
    this.setMapping('assets/TEMP/mapping.csv');
  }
}
