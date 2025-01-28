import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { ButtonModule } from '@hra-ui/design-system/button';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { OverlayModule } from '@angular/cdk/overlay';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '@hra-ui/cde-visualization';

/**
 * Cell Population Predictor Page Component
 */
@Component({
  selector: 'hra-cell-population-predictor',
  standalone: true,
  imports: [
    CommonModule,
    AssetUrlPipe,
    SoftwareStatusIndicatorComponent,
    ButtonModule,
    MatIconModule,
    WorkflowCardModule,
    TooltipCardComponent,
    OverlayModule,
  ],
  templateUrl: './cell-population-predictor.component.html',
  styleUrl: './cell-population-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictorComponent {
  /** Whether to show upload info tooltip */
  uploadInfoOpen = false;

  /** Whether to show create info tooltip   */
  createInfoOpen = false;

  protected readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Tooltip content */
  readonly tooltip: TooltipContent[] = [
    {
      description:
        'An extraction site defines the 3D spatial size, translation, rotation, reference organ (with laterality and sex) and metadata (creator name, creation date) for a tissue block. Importantly, an extraction site also contains a list of anatomical structures that a tissue block collides with, either via bounding-box or mesh-based collision detection. Extraction sites are generated using the Registration User Interface (RUI).',
    },
  ];
}
