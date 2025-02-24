import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';

@Component({
  selector: 'hra-tissue-origin-predictor',
  standalone: true,
  imports: [
    CommonModule,
    ProductHeaderComponent,
    WorkflowCardModule,
    ButtonsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MicroTooltipDirective,
    ErrorIndicatorComponent,
  ],
  templateUrl: './tissue-origin-predictor.component.html',
  styleUrl: './tissue-origin-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueOriginPredictorComponent {}
