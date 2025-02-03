import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { OverlayModule } from '@angular/cdk/overlay';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '@hra-ui/cde-visualization';
import SAMPLE_DATA from './sample-data.json';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { RouterModule } from '@angular/router';

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
    ButtonsModule,
    MatIconModule,
    WorkflowCardModule,
    TooltipCardComponent,
    OverlayModule,
    DeleteFileButtonComponent,
    RouterModule,
  ],
  templateUrl: './cell-population-predictor.component.html',
  styleUrl: './cell-population-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictorComponent {
  /** File */
  protected file?: File;

  /** Whether to show upload info tooltip */
  protected uploadInfoOpen = false;

  /** Whether to show create info tooltip   */
  protected createInfoOpen = false;

  /** Tooltip Position */
  protected readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Tooltip content */
  protected readonly tooltip: TooltipContent[] = [
    {
      description:
        'An extraction site defines the 3D spatial size, translation, rotation, reference organ (with laterality and sex) and metadata (creator name, creation date) for a tissue block. Importantly, an extraction site also contains a list of anatomical structures that a tissue block collides with, either via bounding-box or mesh-based collision detection. Extraction sites are generated using the Registration User Interface (RUI).',
    },
  ];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      console.log('Selected file:', this.file.name);
    }
  }

  cancelLoad(): void {
    this.file = undefined;
  }

  onUseSample() {
    const blob = new Blob([JSON.stringify(SAMPLE_DATA)], { type: 'application/json' });
    this.file = new File([blob], 'sample.json', { type: 'application/json' });
  }
}
