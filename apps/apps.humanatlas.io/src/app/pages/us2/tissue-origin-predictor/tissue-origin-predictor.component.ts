import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { toSignal } from '@angular/core/rxjs-interop';
import { PredictionsService } from '../../us1/services/predictions.service';

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
    DeleteFileButtonComponent,
  ],
  templateUrl: './tissue-origin-predictor.component.html',
  styleUrl: './tissue-origin-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueOriginPredictorComponent implements OnInit {
  /** CSV File */
  protected file: File | null = null;

  /** Supported organs */
  protected readonly predictionService = inject(PredictionsService);

  /** Supported organs */
  protected supportedOrgans = toSignal(this.predictionService.loadSupportedReferenceOrgans(), {
    initialValue: [],
  });

  /** Use sample CSV File */
  onUseSampleClicked(): void {
    // TODO
  }

  /** Truggered when user uploads a file */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      // this.predictionsService.setFile(this.file);
    }
  }

  ngOnInit() {
    console.log(this.supportedOrgans());
  }
}
