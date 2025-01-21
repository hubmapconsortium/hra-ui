import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { ButtonModule } from '@hra-ui/design-system/button';
import { MatIconModule } from '@angular/material/icon';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

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
  ],
  templateUrl: './cell-population-predictor.component.html',
  styleUrl: './cell-population-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictorComponent {}
