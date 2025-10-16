import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { dispatch, selectSnapshot } from '@hra-ui/cdk/injectors';
import { InteractiveSvgComponent } from '../../../../molecules/src';
import { ActiveFtuSelectors, IllustratorActions, IllustratorSelectors, TissueLibrarySelectors } from '@hra-ui/state';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Behavior component for medical illustration component
 */
@Component({
  selector: 'ftu-medical-illustration-behavior',
  imports: [
    ButtonsModule,
    HraCommonModule,
    MatButtonModule,
    MatIconModule,
    InteractiveSvgComponent,
    PlainTooltipDirective,
  ],
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

  /**
   * Curent highlighted cell id
   */
  readonly highlightId = selectSnapshot(IllustratorSelectors.highlightedCell);

  /**
   * Iri  of medical illustration behavior component
   */
  readonly iri = selectSnapshot(ActiveFtuSelectors.iri);

  /**
   * Get all tissues
   */
  readonly tissues = selectSnapshot(TissueLibrarySelectors.tissues);

  /**
   * Whether the illustration is in fullscreen mode
   */
  readonly isFullscreen = model(false);

  /**
   * Gets tissue title from the list of tissues
   */
  get tissueTitle(): string {
    const iri = this.iri();
    const tissues = this.tissues();
    return iri && tissues ? tissues[iri].label : '';
  }

  /**
   * Updates the active node on node hover
   */
  readonly updateNodeOnHover = dispatch(IllustratorActions.SetHover);

  /**
   * Updates the active node on node click
   */
  readonly updateNodeOnClicked = dispatch(IllustratorActions.SetClicked);
}
