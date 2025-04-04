import { CommonModule, Location } from '@angular/common';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { APP_ASSETS_HREF } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';
import {
  HraPopPredictionsService,
  TissuePredictionData,
} from '../../../services/hra-pop-predictions/hra-pop-predictions.service';

/** Sample CSV file URL */
export const SAMPLE_FILE_URL = new InjectionToken<string>('Sample file url', {
  providedIn: 'root',
  factory: () => 'assets/sample-data/tissue-origin-sample.csv',
});

/** Sample CSV file */
export const SAMPLE_FILE = new InjectionToken('Sample file', {
  providedIn: 'root',
  factory: loadSampleFileFactory,
});

/**
 * Loads a sample CSV file from the configured assets URL and wraps it in a File object.
 * @returns A HttpResourceRef that resolves to a File or undefined
 */
function loadSampleFileFactory(): HttpResourceRef<File | undefined> {
  const assetsHref = inject(APP_ASSETS_HREF);
  const fileUrl = inject(SAMPLE_FILE_URL);
  const url = Location.joinWithSlash(assetsHref(), fileUrl);
  return httpResource.text(url, {
    parse: (content) => new File([content], 'sample.csv', { type: 'text/csv' }),
  });
}

/**
 * Tissue Origin Predictions Page
 */
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
  /** HRA POP predictions service */
  private readonly predictionsService = inject(HraPopPredictionsService);

  /** Router */
  private readonly router = inject(Router);

  /** Supported organs */
  protected readonly supportedOrgans = this.predictionsService.supportedOrgans.value.asReadonly();

  /** Supported tools */
  protected readonly supportedTools = this.predictionsService.supportedTools.value.asReadonly();

  /** Sample file */
  private readonly sampleFile = inject(SAMPLE_FILE).value.asReadonly();

  /** File */
  protected file?: File = undefined;

  /** Supported organ value */
  protected organ?: string = undefined;

  /** Supported tool value */
  protected tool?: string = undefined;

  /** Use sample CSV File */
  onUseSampleClicked(): void {
    this.file = this.sampleFile();
  }

  /** Triggered when user uploads a file */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  /** Triggered when user click the predict button */
  onPredictClicked(): void {
    const { file, organ, tool } = this;

    if (file) {
      this.router.navigate(['us2/result'], {
        info: { file, organ, tool, date: new Date() } satisfies TissuePredictionData,
      });
    }
  }
}
