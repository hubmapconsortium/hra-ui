import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@Component({
  selector: 'hra-tissue-origin-predictor',
  standalone: true,
  imports: [CommonModule, ProductHeaderComponent, WorkflowCardModule, ButtonsModule],
  templateUrl: './tissue-origin-predictor.component.html',
  styleUrl: './tissue-origin-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueOriginPredictorComponent {}
