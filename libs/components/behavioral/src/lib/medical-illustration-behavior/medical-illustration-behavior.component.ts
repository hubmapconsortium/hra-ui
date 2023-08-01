import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { LabelBoxComponent } from '@hra-ui/components/atoms';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';
import { ActiveFtuSelectors, IllustratorActions, IllustratorSelectors, TissueLibrarySelectors } from '@hra-ui/state';

/**
 * Behavior component for medical illustration component
 */
@Component({
  selector: 'ftu-medical-illustration-behavior',
  standalone: true,
  imports: [CommonModule, InteractiveSvgComponent, LabelBoxComponent],
  templateUrl: './medical-illustration-behavior.component.html',
  styleUrls: ['./medical-illustration-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalIllustrationBehaviorComponent {
  /**
   * Current illustration url
   */
  readonly currentUrl = selectSnapshot(IllustratorSelectors.url);

  /**
   * Current mapping file
   */
  readonly mapping = selectSnapshot(IllustratorSelectors.mapping);

  readonly iri = selectSnapshot(ActiveFtuSelectors.iri);

  readonly tissues = selectSnapshot(TissueLibrarySelectors.tissues);

  get tissueTitle(): string {
    const iri = this.iri();
    const tissues = this.tissues();
    return iri ? tissues[iri].label : '';
  }

  /**
   * Updates the active node on node hover
   */
  readonly updateNode = dispatch(IllustratorActions.SetSelection);
}
