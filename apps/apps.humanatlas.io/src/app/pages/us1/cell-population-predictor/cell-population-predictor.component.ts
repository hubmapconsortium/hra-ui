import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, InjectionToken, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { APP_ASSETS_HREF } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';
import { EmbeddedRuiComponent } from './rui/embedded-rui.component';
import { HraPopPredictionsService } from '../../../services/hra-pop-predictions/hra-pop-predictions.service';

/** Tooltip Content */
const TOOLTIP_CONTENT = `An extraction site defines the 3D spatial size, translation, rotation, reference organ (with laterality and sex)
and metadata (creator name, creation date) for a tissue block. Importantly, an extraction site also contains a
list of anatomical structures that a tissue block collides with, either via bounding-box or mesh-based
collision detection. Extraction sites are generated using the Registration User Interface (RUI).`;

/** RUI script URL */
const SCRIPT_URL = 'https://cdn.humanatlas.io/ui/ccf-rui/wc.js';

/** RUI style URL */
const STYLE_URL = 'https://cdn.humanatlas.io/ui/ccf-rui/styles.css';

/** Sample JSON file URL */
export const SAMPLE_JSON_FILE_URL = new InjectionToken<string>('', {
  providedIn: 'root',
  factory: () => 'assets/sample-data/cell-population-sample.json',
});

/** Sample JSON file */
export const SAMPLE_JSON_FILE = new InjectionToken('Sample file', {
  providedIn: 'root',
  factory: loadSampleFileFactory,
});

/**
 * Loads a sample JSON file from the configured assets URL and wraps it in a File object.
 * @returns A HttpResourceRef that resolves to a File or undefined
 */
function loadSampleFileFactory(): HttpResourceRef<File | undefined> {
  const assetsHref = inject(APP_ASSETS_HREF);
  const fileUrl = inject(SAMPLE_JSON_FILE_URL);
  const url = Location.joinWithSlash(assetsHref(), fileUrl);
  return httpResource.text(url, {
    parse: (content) => new File([content], 'sample.json', { type: 'application/json' }),
  });
}

/**
 * Cell Population Predictor Page Component
 */
@Component({
  selector: 'hra-cell-population-predictor',
  standalone: true,
  imports: [
    CommonModule,
    ButtonsModule,
    MatIconModule,
    WorkflowCardModule,
    TooltipCardComponent,
    OverlayModule,
    DeleteFileButtonComponent,
    RouterModule,
    EmbeddedRuiComponent,
    ProductHeaderComponent,
  ],
  templateUrl: './cell-population-predictor.component.html',
  styleUrl: './cell-population-predictor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictorComponent {
  /** File */
  protected file?: File = undefined;

  /** Sample file */
  private readonly sampleFile = inject(SAMPLE_JSON_FILE).value.asReadonly();

  /** HRA pop Predictions Service */
  private readonly predictionsService = inject(HraPopPredictionsService);

  /** Whether to show upload info tooltip */
  protected uploadInfoOpen = false;

  /** Whether to show create info tooltip   */
  protected createInfoOpen = false;

  /** Whether to show RUI form */
  protected ruiOpen = false;

  /** Tooltip Position */
  protected readonly tooltipPosition: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: 12,
      offsetY: 12,
    },
  ];

  /** Tooltip content */
  protected readonly tooltip: TooltipContent[] = [
    {
      description: TOOLTIP_CONTENT,
    },
  ];

  /** Supported organs */
  protected readonly supportedOrgans = this.predictionsService.supportedOrgans.value.asReadonly();

  /** For accessing DOM  */
  private readonly document = inject(DOCUMENT);

  /** For manuplating DOM elements */
  private readonly renderer = inject(Renderer2);

  /** Router */
  private readonly router = inject(Router);

  /**
   * Constructor that initializes the component and sets up effects for supported organs and sets script and link tags
   */
  constructor() {
    this.setupScriptAndStyleTags();
  }

  /** Triggered when user uploads a file */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  /** Output file from RUI */
  onFileCreated(file: File): void {
    this.file = file;
  }

  /** Use sample JSON file */
  async onUseSampleClicked(): Promise<void> {
    this.file = this.sampleFile();
  }

  /** Method that sets script and link tags with appropriate URLs */
  private setupScriptAndStyleTags(): void {
    const { document, renderer } = this;
    const script = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    const styles = document.querySelector(`link[href="${STYLE_URL}"]`);

    if (script === null) {
      const el = renderer.createElement('script');
      renderer.setAttribute(el, 'src', SCRIPT_URL);
      renderer.setAttribute(el, 'type', 'module');
      document.head.appendChild(el);
    }

    if (styles == null) {
      const el = renderer.createElement('link');
      renderer.setAttribute(el, 'href', STYLE_URL);
      renderer.setAttribute(el, 'rel', 'stylesheet');
      document.head.appendChild(el);
    }
  }

  /** Triggered when user click the predict button */
  onPredictClicked() {
    this.router.navigate(['us1/result'], {
      info: { file: this.file },
    });
  }
}
