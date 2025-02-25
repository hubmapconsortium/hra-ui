import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/buttons/delete-file-button';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { ProductHeaderComponent } from '../../../components/product-header/product-header.component';
import { PredictionsService } from '../services/predictions.service';
import { EmbeddedRuiComponent } from './rui/embedded-rui.component';
import { toSignal } from '@angular/core/rxjs-interop';

/** Tooltip Content */
const TOOLTIP_CONTENT = `An extraction site defines the 3D spatial size, translation, rotation, reference organ (with laterality and sex)
and metadata (creator name, creation date) for a tissue block. Importantly, an extraction site also contains a
list of anatomical structures that a tissue block collides with, either via bounding-box or mesh-based
collision detection. Extraction sites are generated using the Registration User Interface (RUI).`;

/** RUI script URL */
const SCRIPT_URL = 'https://cdn.humanatlas.io/ui/ccf-rui/wc.js';

/** RUI style URL */
const STYLE_URL = 'https://cdn.humanatlas.io/ui/ccf-rui/styles.css';

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
  protected file?: File;

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

  /** Predictions Service */
  protected readonly predictionsService = inject(PredictionsService);

  /** Supported organs */
  protected supportedOrgans = toSignal(this.predictionsService.loadSupportedReferenceOrgans(), {
    initialValue: [],
  });

  /** For accessing DOM  */
  private readonly document = inject(DOCUMENT);

  /** For manuplating DOM elements */
  private readonly renderer = inject(Renderer2);

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
      this.predictionsService.setFile(this.file);
    }
  }

  /** Output file from RUI */
  onFileCreated(file: File): void {
    this.file = file;
    this.predictionsService.setFile(file);
  }

  /** Use sample JSON file */
  onUseSampleClicked(): void {
    this.predictionsService.setSampleFile();
    this.file = this.predictionsService.getFile();
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
}
