import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '@hra-ui/cde-visualization';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { PredictionsService } from '../services/predictions.service';
import { EmbeddedRuiComponent } from './rui/embedded-rui.component';

/** Tooltip Content */
const TOOLTIP_CONTENT = `An extraction site defines the 3D spatial size, translation, rotation, reference organ (with laterality and sex)
and metadata (creator name, creation date) for a tissue block. Importantly, an extraction site also contains a
list of anatomical structures that a tissue block collides with, either via bounding-box or mesh-based
collision detection. Extraction sites are generated using the Registration User Interface (RUI).`;

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
    EmbeddedRuiComponent,
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

  /** Whether to show RUI form */
  protected ruiOpen = false;

  /** Supported organs */
  protected supportedOrgans = <string[]>[];

  /** Tooltip Position */
  protected readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /** Tooltip content */
  protected readonly tooltip: TooltipContent[] = [
    {
      description: TOOLTIP_CONTENT,
    },
  ];

  /** Predictions Service */
  protected readonly predictionsService = inject(PredictionsService);

  constructor() {
    effect(() => {
      this.predictionsService.loadSupportedReferenceOrgans().subscribe((organs) => {
        this.supportedOrgans = organs;
      });
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.predictionsService.setFile(this.file);
    }
  }

  onFileCreated(file: File): void {
    this.file = file;
    this.predictionsService.setFile(file);
  }

  onUseSampleClicked(): void {
    this.predictionsService.setSampleFile();
    this.file = this.predictionsService.getFile();
  }
}
