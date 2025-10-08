import { HraCommonModule } from '@hra-ui/common';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { assetUrl } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { AppLabelComponent } from '@hra-ui/design-system/content-templates/app-label';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/indicators/error-indicator';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import {
  HraPopPredictionsService,
  TissuePredictionData,
} from '../../../services/hra-pop-predictions/hra-pop-predictions.service';
import { isNavigating } from '../../../utils/navigation';

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
  const fileUrl = inject(SAMPLE_FILE_URL);
  const url = assetUrl(fileUrl);
  return httpResource.text(url, {
    parse: (content) => new File([content], 'sample.csv', { type: 'text/csv' }),
  });
}

/** View sample link URL */
const SAMPLE_URL_LINK =
  'https://github.com/x-atlas-consortia/hra-apps/blob/main/applications/us2-cell-to-spatial/heart-cell-summary.csv';

/**
 * Tissue Origin Predictions Page
 */
@Component({
  selector: 'hra-tissue-origin-predictor',
  standalone: true,
  imports: [
    HraCommonModule,
    ButtonsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    WorkflowCardModule,

    AppLabelComponent,
    DeleteFileButtonComponent,
    ErrorIndicatorComponent,
    MatInputModule,
    PlainTooltipDirective,
  ],
  templateUrl: './tissue-origin-predictor.component.html',
  styleUrl: './tissue-origin-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TissueOriginPredictorComponent {
  /** View sample data link */
  readonly sampleLink = input<string>();

  /** View sample data link with default value */
  protected readonly sampleLinkWithDefault = computed(() => this.sampleLink() ?? SAMPLE_URL_LINK);

  /** HRA POP predictions service */
  private readonly predictionsService = inject(HraPopPredictionsService);

  /** Supported organs */
  protected readonly supportedOrgans = this.predictionsService.supportedOrgans;

  /** Supported tools */
  protected readonly supportedTools = this.predictionsService.supportedTools;

  /** Sample file */
  private readonly sampleFile = inject(SAMPLE_FILE).value.asReadonly();

  /** File */
  protected file?: File = undefined;

  /** Supported organ value */
  protected organ?: string = undefined;

  /** Supported tool value */
  protected tool?: string = undefined;

  /** Router */
  private readonly router = inject(Router);

  /** Signal that determines the navigation status of the router */
  protected readonly isNavigating = isNavigating(0);

  /** Use sample CSV File */
  onUseSampleClicked(): void {
    this.file = this.sampleFile();
  }

  /** Triggered when user uploads a file */
  onFileSelected(event: Event): void {
    const ip = event.target as HTMLInputElement;
    if (ip.files && ip.files.length > 0) {
      this.file = ip.files[0];
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
