import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';
import {
  MedicalIllustrationActions,
  MedicalIllustrationSelectors,
  SourceListActions,
  SourceListSelectors,
} from '@hra-ui/state';

/**
 * Behavior component for medical illustration component
 */
@Component({
  selector: 'ftu-medical-illustration-behavior',
  standalone: true,
  imports: [CommonModule, InteractiveSvgComponent],
  templateUrl: './medical-illustration-behavior.component.html',
  styleUrls: ['./medical-illustration-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalIllustrationBehaviorComponent {
  /**
   * Current illustration url
   */
  readonly currentUrl = selectSnapshot(MedicalIllustrationSelectors.url);

  /**
   * Current mapping file
   */
  readonly getMapping = selectSnapshot(MedicalIllustrationSelectors.mapping);

  /**
   * Updates the active node on node hover
   */
  readonly updateNode = dispatch(MedicalIllustrationActions.SetActiveNode);

  readonly getSources = selectSnapshot(SourceListSelectors.getSourceList);

  readonly updateSources = dispatch(SourceListActions.Set);
}
