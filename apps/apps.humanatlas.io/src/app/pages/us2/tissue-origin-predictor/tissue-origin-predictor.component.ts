import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';
import { PredictionsService } from '../../us1/services/predictions.service';
import { TissueOriginService } from '../services/tissue-origin.service';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  templateUrl: './tissue-origin-predictor.component.html',
  styleUrl: './tissue-origin-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueOriginPredictorComponent {
  /** CSV File */
  protected file = signal<File | null>(null);

  /** Predictions Service */
  protected readonly predictionsService = inject(PredictionsService);

  /** Tissue Origin Service */
  protected readonly tissueOriginService = inject(TissueOriginService);

  /** Supported organs */
  protected supportedOrgans = toSignal(this.predictionsService.loadSupportedReferenceOrgans(), {
    initialValue: [],
  });

  /** Supported tools */
  protected supportedTools = toSignal(this.tissueOriginService.loadSupportedTools(), {
    initialValue: [],
  });

  /** Supported organ value */
  protected supportedOrgan = '';

  /** Supported tool value */
  protected supportedTool = '';

  /** Use sample CSV File */
  async onUseSampleClicked(): Promise<void> {
    if (this.tissueOriginService.getFile() === null) {
      await this.tissueOriginService.setSampleFile();
    }
    this.file.set(this.tissueOriginService.getFile());
  }

  /** Triggered when user uploads a file */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file.set(input.files[0]);
      this.tissueOriginService.setFile(input.files[0]);
    }
  }
}
